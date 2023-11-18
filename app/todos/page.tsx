import AddTodoForm from "@/components/add-todo-form";
import TodoItem from "@/components/todo-item";
import dbConnect from "@/lib/mongoose";
import Todo from "@/models/Todo";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const getTodos = async () => {
  try {
    await dbConnect();

    const { userId } = auth();

    if (!userId) throw new Error("Unauthorized");

    const todos = Todo.find().where({ uid: userId });

    return todos;
  } catch (err) {
    console.log(`Error while fetching todos: ${err}`);
  }
};

export default async function TodosPage() {
  const todos = await getTodos();

  const { userId } = auth();

  if (!userId) {
    redirect("/sign-up");
  }

  return (
    <div className="flex flex-grow max-w-7xl mx-auto w-full px-7 py-7 flex-col gap-5">
      <AddTodoForm />

      <ul className="flex flex-col gap-3">
        {todos?.map((todo) => (
          <TodoItem key={todo._id} todo={JSON.parse(JSON.stringify(todo))} />
        ))}
      </ul>
    </div>
  );
}
