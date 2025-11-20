import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, address, cart } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: "Cart items missing" }, { status: 400 });
    }

    // Calculate total
    const total = cart.reduce((s, item) => s + item.price * item.quantity, 0);

    // Create order + order items
    const order = await prisma.order.create({
      data: {
        userId,
        address,
        total,
        paymentMethod: "cod",
        status: "Pending",
        items: {
          create: cart.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image || null,
          })),
        },
      },
      include: {
        items: true,
        customer: true,
      },
    });

    return NextResponse.json(
      { message: "COD order created successfully", order },
      { status: 200 }
    );
  } catch (err) {
    console.error("COD ORDER ERROR:", err);
    return NextResponse.json(
      { error: "Failed to create COD order", details: err.message },
      { status: 500 }
    );
  }
}
