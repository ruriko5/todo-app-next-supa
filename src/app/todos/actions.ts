"use server";

import { revalidatePath } from "next/cache";
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

  if (!user) throw new Error("User is not logged in");

  const { error } = await supabase.from("todos").insert({
    task: todoText,
    user_id: user.id,
  });

  if (error) throw new Error("Error: Create todo");

  revalidatePath("/todos");
}

export const getTodos = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User is not logged in");

  const { data, error } = await supabase
    .from("todos")
    .select()
    .order("inserted_at", { ascending: false });

  if (error) throw new Error("Error: Get todos");

  return data;
};

export const deleteTodo = async (id: number) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User is not logged in");

  const { error } = await supabase.from("todos").delete().match({
    user_id: user.id,
    id: id,
  });

  if (error) throw new Error("Error: Delete todo");

  revalidatePath("/todos");
};

export const updateTodo = async (todo: Todo) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User is not logged in");

  const { error } = await supabase.from("todos").update(todo).match({
    user_id: user.id,
    id: todo.id,
  });

  if (error) throw new Error("Error: Update todo");

  revalidatePath("/todos");
};
