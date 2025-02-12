import { Todo } from "@/types/custom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { deleteTodo } from "@/app/todos/actions";
import { Trash2Icon } from "lucide-react";

export const TodoItem = ({ todo }: { todo: Todo }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="overflow-hidden text-ellipsis">{todo.task}</p>
      </CardContent>
      <CardFooter>
        <form>
          <Button
            formAction={async () => {
              "use server";
              await deleteTodo(todo.id);
            }}
            variant="ghost"
            size="icon"
          >
            <Trash2Icon />
            <span className="sr-only">Delete Todo</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
