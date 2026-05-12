import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, customerPhone, address, paymentMethod, items, totalAmount } = body;

    if (!customerName || !customerPhone || !address || !items || items.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // In a real app with real Paytm/PhonePe integration, we would verify payment signature here
    const status = paymentMethod === "COD" ? "PENDING" : "PROCESSING";

    const order = await prisma.order.create({
      data: {
        customerName,
        customerPhone,
        address,
        paymentMethod,
        totalAmount,
        status,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Failed to process checkout" }, { status: 500 });
  }
}
