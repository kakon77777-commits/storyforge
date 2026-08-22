import { SESSION_COOKIE_NAME, destroySession, getSessionCookieFromRequest } from "../../../../db/admin-auth";

export async function POST(request: Request) {
  try {
    await destroySession(getSessionCookieFromRequest(request.headers));
  } catch (error) {
    console.error("Admin logout error", error);
  }

  const cookie = `${SESSION_COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
  return new Response(null, {
    status: 303,
    headers: { "Set-Cookie": cookie, Location: "/admin/login" },
  });
}
