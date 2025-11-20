import Stripe from "stripe";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, cart, address, successUrl, cancelUrl } = body;

    if (!userId || !cart || cart.length === 0 || !address) {
      return NextResponse.json({ error: "Missing details" }, { status: 400 });
    }

    // Stripe requires LINE ITEMS format
    const lineItems = cart.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : []
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,

      metadata: {
        userId: userId.toString(),
        address,
        cart: JSON.stringify(cart),
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      sessionUrl: session.url, // <-- IMPORTANT
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}
