"use client";

import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface IFormInput {
  title: string;
}

export default function AddTodoForm() {
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const form = useForm<IFormInput>({
    defaultValues: {
      title: "",
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setIsAddingTodo(true);

      const res = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });

      if (!res.ok) throw new Error("Failed to create a todo");

      form.reset();
      router.refresh();
      toast.success("Todo has been created");
    } catch (err) {
      console.log(`Error while adding todo: ${err}`);
    } finally {
      setIsAddingTodo(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h3 className="text-4xl font-bold tracking-tighter mb-3">
          Add your todo
        </h3>
        <div className="flex flex-col gap-3">
          <FormField
            name="title"
            control={form.control}
            rules={{
              required: { value: true, message: "Required" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Take out the trash" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="self-end" type="submit" disabled={isAddingTodo}>
            {isAddingTodo ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              "Add"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
