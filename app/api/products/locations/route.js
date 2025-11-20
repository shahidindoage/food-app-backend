import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch all products where location is not null
    const products = await prisma.product.findMany({
    
      select: { location: true },
    });

    // Get unique locations
    const uniqueLocations = [...new Set(products.map(p => p.location))];

    return NextResponse.json({ locations: uniqueLocations });
  } catch (err) {
    console.error("Failed to fetch locations:", err);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}
