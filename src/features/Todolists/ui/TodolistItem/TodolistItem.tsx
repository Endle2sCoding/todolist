import { TodolistTitle } from "@/features/Todolists/ui/TodolistItem/TodolistTitle/TodolistTitle";
import { FilterButtons } from "@/features/Todolists/ui/TodolistItem/FilterButtons/FilterButtons";
import { Tasks } from "@/features/Todolists/ui/TodolistItem/Tasks/Tasks";
import { CreateItemForm } from "@/common/components";
import { TodolistType } from "../../model/types/todolist";

interface TodolistItemProps {
  todolist: TodolistType;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, title: string) => void;
}
export const TodolistItem = ({
  todolist,
  removeTodolist,
  changeTodolistTitle,
}: TodolistItemProps) => {
  const createTask = (title: string) => {};
  return (
    <div>
      <TodolistTitle
        changeTodolistTitle={changeTodolistTitle}
        removeTodolist={removeTodolist}
        todolist={todolist}
      />
      <CreateItemForm onCreateItem={createTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  );
};
