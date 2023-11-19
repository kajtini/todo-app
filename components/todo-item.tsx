import { ITodo } from "@/types";
import { Badge } from "@/components/ui/badge";
import TodoOperations from "@/components/todo-operations";

interface TodoItemProps {
  todo: ITodo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { status } = todo;

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  };

  const createdAt = new Date(todo.createdAt).toLocaleString("en-US", options);
  const updatedAt = new Date(todo.updatedAt).toLocaleString("en-US", options);

  return (
    <li className="px-4 py-3 border-border border rounded-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div>
            <p>{todo.title}</p>
            <p className="text-sm text-muted-foreground">{createdAt}</p>
          </div>
          <Badge variant={`${status === "active" ? "secondary" : "default"}`}>
            {todo.status}
          </Badge>
        </div>

        <div className="flex item-center gap-1">
          <TodoOperations todo={todo} />
        </div>
      </div>
    </li>
  );
}
