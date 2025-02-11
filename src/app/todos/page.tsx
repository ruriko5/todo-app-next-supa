import { TodoForm } from "@/components/todo-form";
import { getTodos } from "./actions";
import { TodoList } from "@/components/todo-list";
import { Header } from "@/components/header";

export default async function TodosPage() {
  const data = await getTodos();

  return (
    <div className="flex flex-col">
      <Header />
      <TodoForm />
      <TodoList todos={data} />
    </div>
  );
}
