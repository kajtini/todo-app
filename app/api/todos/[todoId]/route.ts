import Todo from "@/models/Todo";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  params: { params: { todoId: string } }
) {
  try {
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
