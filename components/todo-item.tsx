"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Trash } from "lucide-react";

import { ITodo } from "@/types";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TodoItemProps {
  todo: ITodo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isRemovingTodo, setIsRemovingTodo] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  };

  const createdAt = new Date(todo.createdAt).toLocaleString("en-US", options);
  const updatedAt = new Date(todo.updatedAt).toLocaleString("en-US", options);

  const handleRemoveClick = async () => {
    try {
      setIsRemovingTodo(true);

      const res = await fetch(`http://localhost:3000/api/todos/${todo._id}`, {
        method: "DELETE",
      });

      if (!res.ok) toast.error("Failed to remove todo");

      setIsRemovingTodo(false);
      setIsDialogOpen(false);
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className="px-4 py-2 border-border border rounded-lg">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p>{todo.title}</p>
          <p className="text-sm text-muted-foreground">{createdAt}</p>
        </div>
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="ghost">
              <Trash size={18} className="text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                todo and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveClick();
                }}
                className="bg-red-600"
              >
                {isRemovingTodo ? (
                  <Loader2 size={18} className="animate-spin mr-2" />
                ) : (
                  <Trash size={18} className="mr-2" />
                )}

                <span>Remove</span>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </li>
  );
}
