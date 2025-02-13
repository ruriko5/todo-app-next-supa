import { updateTodo } from "@/app/todos/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Todo } from "@/types/custom";
import { Edit2Icon } from "lucide-react";

export function EditDialog({ todo }: { todo: Todo }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit todo</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <form id="todoForm" className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="todo" className="text-right">
                Task
              </Label>
              <Input
                id="todo"
                name="todo"
                defaultValue={todo.task!}
                required
                className="col-span-3"
              />
            </form>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              form="todoForm"
              formAction={async (FormData) => {
                "use server";
                await updateTodo(todo.id, FormData);
              }}
            >
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
