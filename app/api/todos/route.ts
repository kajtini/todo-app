import dbConnect from "@/lib/mongoose";
import Todo from "@/models/Todo";
import { auth } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     await dbConnect();

//     const { userId } = getAuth(req);

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const todos = await Todo.find().where({ uid: userId });
//     // const todos = await Todo.find();

//     return NextResponse.json({ data: { todos } }, { status: 200 });
//   } catch (err) {
//     console.log(`CATCH BLOCK ENETERED: ${err}`);

//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

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
