import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let settings = await prisma.settings.findUnique({
      where: { id: "global" }
    });

    if (!settings) {
      settings = await prisma.settings.create({
        data: { id: "global" }
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const settings = await prisma.settings.upsert({
      where: { id: "global" },
      update: {
        activeTheme: data.activeTheme,
        qrCodeUrl: data.qrCodeUrl,
        upiId: data.upiId,
      },
      create: {
        id: "global",
        activeTheme: data.activeTheme,
        qrCodeUrl: data.qrCodeUrl,
        upiId: data.upiId,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
