import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json([], { status: 200 });
  }

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: true, customer: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}
