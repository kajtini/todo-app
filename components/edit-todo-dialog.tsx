"use client";

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
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

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
  const { _id, title } = todo;

  const form = useForm<IFormInput>({
    defaultValues: {
      title,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {};

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

            <Button type="submit" className="self-end">
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
