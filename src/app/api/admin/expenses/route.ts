import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { date: 'desc' }
    });
    return NextResponse.json({ expenses });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const expense = await prisma.expense.create({
      data: {
        title: body.title,
        amount: parseFloat(body.amount),
        category: body.category,
        description: body.description,
        date: body.date ? new Date(body.date) : new Date(),
      }
    });
    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add expense" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await prisma.expense.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete expense" }, { status: 500 });
  }
}
