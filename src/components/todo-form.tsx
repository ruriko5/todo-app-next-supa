import { createTodo } from "@/app/todos/actions";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";

export const TodoForm = () => {
  return (
    <div className="flex justify-center items-center sticky top-16 p-4 bg-slate-100">
      <Card>
        <CardContent className="p-4">
          <form className="space-y-4">
            <Input
              name="todo"
              required
              minLength={3}
              placeholder="Add a new todo"
            />
            <Button formAction={createTodo} className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
