import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set({
      name: "admin",
      value: "true",
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return res;
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
