// app/api/order/online/route.ts
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });

export async function POST(req) {
  try {
    const { userId, cart, address, name, email, phone } = await req.json();

    if (!cart || !cart.length) return new Response(JSON.stringify({ error: "Cart is empty" }), { status: 400 });

    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

    // 1️⃣ Create order with status 'Pending'
    const order = await prisma.order.create({
      data: {
        userId,
        address,
        total,
        paymentMethod: "online",
        status: "Pending",
        items: {
          create: cart.map((i) => ({
            productId: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image || null,
          })),
        },
      },
    });

    // 2️⃣ Create PaymentIntent with metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // in paise
      currency: "inr",
      payment_method_types: ["card"],
      metadata: {
        orderId: order.id,
        userId,
        name,
        email,
        phone,
        address,
      },
    });

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret, orderId: order.id }), { status: 200 });
  } catch (err) {
    console.error("Order Online Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
