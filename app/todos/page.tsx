import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import AddTodoForm from "@/components/add-todo-form";
import TodoItem from "@/components/todo-item";
import dbConnect from "@/lib/mongoose";
import Todo from "@/models/Todo";
import TodoFilters from "@/components/todo-filters";
import { TodoStatus } from "@/types";

const getTodos = async (status: TodoStatus | undefined) => {
  try {
    await dbConnect();

    const { userId } = auth();

    if (!userId) throw new Error("Unauthorized");

    let query = Todo.find().where({ uid: userId }).sort({ createdAt: -1 });

    if (status) {
      query = query.where({ status: status });
    }

    const todos = await query;

    return todos;
  } catch (err) {
    console.log(`Error while fetching todos: ${err}`);
  }
};

export default async function TodosPage({
  searchParams,
}: {
  searchParams: { status: TodoStatus };
}) {
  const { status } = searchParams;
  const todos = await getTodos(status);

  const { userId } = auth();

  if (!userId) {
    redirect("/sign-up");
  }

  return (
    <div className="flex flex-grow max-w-7xl mx-auto w-full px-7 py-7 flex-col gap-5">
      <AddTodoForm />

      <TodoFilters />

      <ul className="flex flex-col gap-3">
        {todos?.map((todo) => (
          <TodoItem key={todo._id} todo={JSON.parse(JSON.stringify(todo))} />
        ))}
      </ul>
    </div>
  );
}
