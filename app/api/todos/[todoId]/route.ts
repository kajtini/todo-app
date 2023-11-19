import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import dbConnect from "@/lib/mongoose";
import Todo from "@/models/Todo";

export async function DELETE(
  req: NextRequest,
  params: { params: { todoId: string } }
) {
  try {
    await dbConnect();

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthroized" }, { status: 401 });
    }

    const {
      params: { todoId },
    } = params;

    await Todo.findByIdAndDelete(todoId);

    return NextResponse.json({ data: null }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  params: { params: { todoId: string } }
) {
  try {
    await dbConnect();

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthroized" }, { status: 401 });
    }

    const {
      params: { todoId },
    } = params;

    const data = await req.json();

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, data);

    return NextResponse.json({ data: { todo: updatedTodo } }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
