import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { pin } = await req.json();
    
    const settings = await prisma.settings.findUnique({
      where: { id: "global" }
    });

    const inputPin = pin.trim().toUpperCase();
    const adminPin = (settings?.adminPin || "CHANGE_ME").trim().toUpperCase();
    const staffPin = (settings?.staffPin || "1234").trim().toUpperCase();

    if (inputPin === adminPin) {
      return NextResponse.json({ success: true, role: "ADMIN" });
    } else if (inputPin === staffPin) {
      return NextResponse.json({ success: true, role: "STAFF" });
    } else {
      return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
