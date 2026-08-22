import { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS, verifyAdminLogin } from "../../../../db/admin-auth";

function unavailable(error: unknown) {
  console.error("Admin login error", error);
  return Response.json({ error: "Login is temporarily unavailable" }, { status: 503 });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { password?: unknown };
    const password = typeof payload.password === "string" ? payload.password : "";
    if (!password) {
      return Response.json({ error: "Password required" }, { status: 400 });
    }

    const result = await verifyAdminLogin(password);
    if (!result) {
      return Response.json({ error: "Invalid password" }, { status: 401 });
    }

    const cookie = `${SESSION_COOKIE_NAME}=${result.cookieValue}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_MAX_AGE_SECONDS}`;
    return Response.json(
      { account: { displayName: result.account.displayName } },
      { status: 200, headers: { "Set-Cookie": cookie } },
    );
  } catch (error) {
    return unavailable(error);
  }
}
