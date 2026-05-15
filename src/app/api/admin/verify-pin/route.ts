import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { pin } = await req.json();
    
    const settings = await prisma.settings.findUnique({
      where: { id: "global" }
    });

    // Fallback PIN if settings not initialized
    const correctPin = settings?.adminPin || "7869278692";

    if (pin === correctPin) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
