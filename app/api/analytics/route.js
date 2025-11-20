// app/api/admin/analytics/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Total counts
    const totalUsers = await prisma.user.count();
    const totalProducts = await prisma.product.count();
    const totalOrders = await prisma.order.count();
    const totalRevenueData = await prisma.order.aggregate({
      _sum: { total: true },
    });
    const totalRevenue = totalRevenueData._sum.total || 0;

    // Orders per day (last 7 days)
    const today = new Date();
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      return d;
    }).reverse();

    const ordersPerDay = [];
    for (const day of last7Days) {
      const start = new Date(day);
      start.setHours(0, 0, 0, 0);
      const end = new Date(day);
      end.setHours(23, 59, 59, 999);

      const count = await prisma.order.count({
        where: { createdAt: { gte: start, lte: end } },
      });

      ordersPerDay.push({
        date: day.toISOString().split("T")[0],
        orders: count,
      });
    }

    // Revenue trend (last 30 days)
    const last30Days = Array.from({ length: 30 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      return d;
    }).reverse();

    const revenueTrend = [];
    for (const day of last30Days) {
      const start = new Date(day);
      start.setHours(0, 0, 0, 0);
      const end = new Date(day);
      end.setHours(23, 59, 59, 999);

      const totalData = await prisma.order.aggregate({
        _sum: { total: true },
        where: { createdAt: { gte: start, lte: end } },
      });

      revenueTrend.push({
        date: day.toISOString().split("T")[0],
        revenue: totalData._sum.total || 0,
      });
    }

    // Top 5 selling products
    const topProductsData = await prisma.orderItem.groupBy({
      by: ["productId", "name"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    });

    const topProducts = topProductsData.map((p) => ({
      name: p.name,
      quantity: p._sum.quantity,
    }));

    return NextResponse.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      ordersPerDay,
      revenueTrend,
      topProducts,
    });
  } catch (err) {
    console.error("Analytics Error:", err);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
