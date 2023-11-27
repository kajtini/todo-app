"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ITodo } from "@/types";
import { API_URL } from "@/lib/constants";

interface EditTodoDialogProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todo: Pick<ITodo, "_id" | "title">;
}

interface IFormInput {
  title: string;
}

export default function EditTodoDialog({
  isEditDialogOpen,
  setIsEditDialogOpen,
  todo,
}: EditTodoDialogProps) {
  const [isTodoUpdating, setIsTodoUpdating] = useState(false);

  const router = useRouter();

  const { _id, title } = todo;

  const form = useForm<IFormInput>({
    defaultValues: {
      title,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setIsTodoUpdating(true);

      const res = await fetch(`${API_URL}/api/todos/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) toast.error("Failed to update todo");

      setIsTodoUpdating(false);
      setIsEditDialogOpen(false);
      router.refresh();
      toast.success("Todo successfully updated");
    } catch (err) {
      setIsTodoUpdating(false);
      console.log(err);
    }
  };

  useEffect(() => {
    form.reset({
      title,
    });
  }, [title, form.reset]);

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit todo</DialogTitle>
          <DialogDescription>
            Make changes to your todo here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              name="title"
              control={form.control}
              rules={{ required: { value: true, message: "Required" } }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="self-end"
              disabled={isTodoUpdating}
            >
              {isTodoUpdating && (
                <Loader2 size={18} className="animate-spin mr-2" />
              )}

              <span>Save</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
