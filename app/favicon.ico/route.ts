import { NextResponse } from "next/server";

export function GET(request: Request) {
  const iconUrl = new URL("/logo/main.png", request.url);
  return NextResponse.redirect(iconUrl, 307);
}
