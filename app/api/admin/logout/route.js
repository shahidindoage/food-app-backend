import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set({
    name: "admin",
    value: "",
    path: "/",
    maxAge: 0,
  });
  return res;
}
