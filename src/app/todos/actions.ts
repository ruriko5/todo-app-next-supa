"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { Todo } from "@/types/custom";

export async function createTodo(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const todoText = formData.get("todo") as string;

  if (!todoText) throw new Error("Text is required");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  const { error } = await supabase.from("todos").insert({
    task: todoText,
    user_id: user.id,
  });

  if (error) {
    redirect("/error");
  }

  revalidatePath("/todos", "layout");
}

export const getTodos = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  const { data, error } = await supabase
    .from("todos")
    .select()
    .order("inserted_at", { ascending: false });

  if (error) redirect("/error");

  return data;
};

export const deleteTodo = async (id: number) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  const { error } = await supabase.from("todos").delete().match({
    user_id: user.id,
    id: id,
  });

  if (error) redirect("/error");

  revalidatePath("/todos");
};

export const updateTodo = async (todo: Todo) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  const { error } = await supabase.from("todos").update(todo).match({
    user_id: user.id,
    id: todo.id,
  });

  if (error) return redirect("/error");

  revalidatePath("/todos");
};
