import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import dbConnect from "@/lib/mongoose";
import Todo from "@/models/Todo";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const res = await req.json();

    const { title } = res;

    await Todo.create({ title, uid: userId });

    return NextResponse.json({ message: "Todo created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
