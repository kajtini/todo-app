import TodoItemSkeleton from "@/components/todo-item-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-3">
      <TodoItemSkeleton />
      <TodoItemSkeleton />
      <TodoItemSkeleton />
    </div>
  );
}
