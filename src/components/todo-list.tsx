import { Todo } from "@/types/custom";
import { TodoItem } from "./todo-item";

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 p-4">
      {todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </div>
  );
};
