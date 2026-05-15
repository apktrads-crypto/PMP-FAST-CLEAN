import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { pin } = await req.json();
    
    const settings = await prisma.settings.findUnique({
      where: { id: "global" }
    });

    const adminPin = settings?.adminPin || "CHANGE_ME";
    const staffPin = settings?.staffPin || "1234";

    if (pin === adminPin) {
      return NextResponse.json({ success: true, role: "ADMIN" });
    } else if (pin === staffPin) {
      return NextResponse.json({ success: true, role: "STAFF" });
    } else {
      return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
