"use client";

import {
  Check,
  ClipboardEdit,
  Loader2,
  Minus,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ITodo, TodoStatus } from "@/types";

interface TodoOperationsProps {
  todo: Pick<ITodo, "_id" | "status">;
}

export default function TodoOperations({ todo }: TodoOperationsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRemovingTodo, setIsRemovingTodo] = useState(false);

  const { _id, status } = todo;

  const router = useRouter();

  const handleRemoveClick = async () => {
    try {
      setIsRemovingTodo(true);

      const res = await fetch(`http://localhost:3000/api/todos/${_id}`, {
        method: "DELETE",
      });

      if (!res.ok) toast.error("Failed to remove todo");

      setIsRemovingTodo(false);
      setIsDialogOpen(false);
      router.refresh();
    } catch (err) {
      setIsRemovingTodo(false);
      console.log(err);
    }
  };

  const handleToggleStatus = async (status: TodoStatus) => {
    try {
      const res = await fetch(`http://localhost:3000/api/todos/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) toast.error("Failed to remove todo");

      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() =>
              status === "completed"
                ? handleToggleStatus("active")
                : handleToggleStatus("completed")
            }
          >
            {status === "completed" ? (
              <>
                <Minus size={15} className="mr-3" />
                Mark as active
              </>
            ) : (
              <>
                <Check size={15} className="mr-3" />
                Mark as completed
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ClipboardEdit size={15} className="mr-3" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDialogOpen(true)}
            className="text-destructive"
          >
            <Trash size={15} className="mr-3" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
    </>
  );
}
