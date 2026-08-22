import { env } from "cloudflare:workers";

export const SESSION_COOKIE_NAME = "sf_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
export const SESSION_MAX_AGE_SECONDS = Math.floor(SESSION_TTL_MS / 1000);
const PBKDF2_ITERATIONS = 100_000;

function getAuthDatabase() {
  if (!env.DB) throw new Error("Account database is unavailable");
  return env.DB;
}

function getSessionSecret(): string {
  const secret = env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not configured");
  return secret;
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function derivePasswordHash(password: string, saltHex: string): Promise<string> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const derived = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: fromHex(saltHex) as BufferSource, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    256,
  );
  return toHex(derived);
}

export async function hashPassword(password: string): Promise<string> {
  const saltHex = toHex(crypto.getRandomValues(new Uint8Array(16)).buffer);
  const hashHex = await derivePasswordHash(password, saltHex);
  return `${saltHex}:${hashHex}`;
}

async function verifyPasswordHash(password: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  const candidate = await derivePasswordHash(password, saltHex);
  return timingSafeEqual(candidate, hashHex);
}

async function signSessionId(sessionId: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(sessionId));
  return toHex(signature);
}

export type Account = {
  id: string;
  displayName: string;
  authType: string;
  status: string;
};

export function getSessionCookieFromRequest(headerSource: { get(name: string): string | null }): string | undefined {
  const header = headerSource.get("cookie");
  if (!header) return undefined;
  const prefix = `${SESSION_COOKIE_NAME}=`;
  const match = header
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));
  return match ? match.slice(prefix.length) : undefined;
}

export async function verifyAdminLogin(
  password: string,
): Promise<{ cookieValue: string; account: Account } | null> {
  const row = await getAuthDatabase()
    .prepare(
      "SELECT id, display_name, auth_type, credential_hash, status FROM accounts WHERE auth_type = 'admin' AND status = 'active' LIMIT 1",
    )
    .first<{
      id: string;
      display_name: string;
      auth_type: string;
      credential_hash: string | null;
      status: string;
    }>();

  if (!row || !row.credential_hash) return null;
  if (!(await verifyPasswordHash(password, row.credential_hash))) return null;

  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();

  await getAuthDatabase()
    .prepare(
      "INSERT INTO admin_sessions (id, account_id, created_at, expires_at) VALUES (?1, ?2, CURRENT_TIMESTAMP, ?3)",
    )
    .bind(sessionId, row.id, expiresAt)
    .run();

  await getAuthDatabase()
    .prepare("UPDATE accounts SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?1")
    .bind(row.id)
    .run();

  const signature = await signSessionId(sessionId);
  return {
    cookieValue: `${sessionId}.${signature}`,
    account: { id: row.id, displayName: row.display_name, authType: row.auth_type, status: row.status },
  };
}

export async function resolveSession(cookieValue: string | undefined): Promise<Account | null> {
  if (!cookieValue) return null;
  const [sessionId, signature] = cookieValue.split(".");
  if (!sessionId || !signature) return null;

  if (!timingSafeEqual(signature, await signSessionId(sessionId))) return null;

  const row = await getAuthDatabase()
    .prepare(
      `SELECT accounts.id as id, accounts.display_name as display_name, accounts.auth_type as auth_type,
              accounts.status as status, admin_sessions.expires_at as expires_at
       FROM admin_sessions
       JOIN accounts ON accounts.id = admin_sessions.account_id
       WHERE admin_sessions.id = ?1`,
    )
    .bind(sessionId)
    .first<{ id: string; display_name: string; auth_type: string; status: string; expires_at: string }>();

  if (!row) return null;
  if (row.status !== "active") return null;
  if (new Date(row.expires_at).getTime() < Date.now()) return null;

  return { id: row.id, displayName: row.display_name, authType: row.auth_type, status: row.status };
}

export async function destroySession(cookieValue: string | undefined): Promise<void> {
  if (!cookieValue) return;
  const [sessionId] = cookieValue.split(".");
  if (!sessionId) return;
  await getAuthDatabase().prepare("DELETE FROM admin_sessions WHERE id = ?1").bind(sessionId).run();
}
