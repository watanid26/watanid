import { cookies } from "next/headers";
import { ADMIN_COOKIE } from "@/lib/admin-constants";

export { ADMIN_COOKIE };

export function adminCookieMatches(value: string | undefined): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token || !value) return false;
  return value === token;
}

export function isAdminFromCookies(): boolean {
  return adminCookieMatches(cookies().get(ADMIN_COOKIE)?.value);
}
