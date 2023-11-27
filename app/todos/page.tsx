import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import TodoItem from "@/components/todo-item";
import dbConnect from "@/lib/mongoose";
import Todo from "@/models/Todo";
import { ITodo, TodoStatus } from "@/types";
import TodoPagination from "@/components/todo-pagination";
import { PER_PAGE } from "@/lib/constants";

const getTodos = async (
  status: TodoStatus | undefined,
  page: string = "1"
): Promise<{ todos: ITodo[]; totalTodos: number }> => {
  try {
    await dbConnect();

    const { userId } = auth();

    if (!userId) throw new Error("Unauthorized");

    let query = Todo.find().where({ uid: userId }).sort({ updatedAt: -1 });

    if (status) {
      query = query.where({ status: status });
    }

    const queryClone = query.clone();

    if (page) {
      query = query.limit(PER_PAGE).skip(PER_PAGE * +page - PER_PAGE);
    }

    const todos: ITodo[] = await query;
    const totalTodos = (await queryClone).length;

    return { todos, totalTodos };
  } catch (err) {
    console.log(`Error while fetching todos: ${err}`);

    throw new Error(`${err}`);
  }
};

export default async function TodosPage({
  searchParams,
}: {
  searchParams: { status: TodoStatus; page: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-up");
  }

  const { status, page } = searchParams;

  const { todos, totalTodos } = await getTodos(status, page);

  return (
    <>
      {todos?.length === 0 && (
        <p className="text-muted-foreground">
          You have no {!!status && status} todos
        </p>
      )}

      <ul className="flex flex-col gap-3">
        {todos?.map((todo) => (
          <TodoItem key={todo._id} todo={JSON.parse(JSON.stringify(todo))} />
        ))}
      </ul>

      <TodoPagination
        currentPageTodosNum={todos.length}
        totalTodos={totalTodos}
      />
    </>
  );
}
