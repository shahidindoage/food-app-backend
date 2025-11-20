// app/api/payment-intent/route.ts
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  try {
    const { amount, userId, cart, address, name, email, phone } = await req.json();

    if (!amount || amount <= 0) {
      return new Response(JSON.stringify({ error: "Amount must be greater than 0" }), { status: 400 });
    }

    // Create PaymentIntent with metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // in smallest currency unit
      currency: "inr",
      payment_method_types: ["card"],
      metadata: {
        userId: userId || "",
        cart: JSON.stringify(cart || []),
        address: address || "",
        name: name || "",
        email: email || "",
        phone: phone || "",
      },
    });

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Stripe PaymentIntent Error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
