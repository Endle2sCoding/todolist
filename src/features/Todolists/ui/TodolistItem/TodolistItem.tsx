import { TodolistTitle } from "@/features/Todolists/ui/TodolistItem/TodolistTitle/TodolistTitle";
import { Tasks } from "@/features/Todolists/ui/TodolistItem/Tasks/Tasks";
import { CreateItemForm } from "@/features/CreateItemForm";
import { Todolist } from "../../api/api";
import { TasksState } from "../../model/types/todolist";

interface TodolistItemProps {
  todolist: Todolist;
  tasks: TasksState;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, title: string) => void;
  createTask: ({ todolistId, title }: { todolistId: string; title: string }) => void;
  removeTask: ({ todolistId, taskId }: { todolistId: string; taskId: string }) => void;
  changeTaskTitle: ({ todolistId, taskId, title }: { todolistId: string; taskId: string; title: string }) => void;
  changeTaskStatus: ({ todolistId, taskId, isDone }: { todolistId: string; taskId: string; isDone: boolean }) => void;
}
export const TodolistItem = ({
  todolist,
  tasks,
  removeTodolist,
  changeTodolistTitle,
  createTask,
  removeTask,
  changeTaskTitle,
  changeTaskStatus,
}: TodolistItemProps) => {
  const createTaskHandler = (title: string) => {
    createTask({ todolistId: todolist.id, title });
  };
  return (
    <div>
      <TodolistTitle changeTodolistTitle={changeTodolistTitle} removeTodolist={removeTodolist} todolist={todolist} />
      <CreateItemForm onCreateItem={createTaskHandler} />
      <Tasks
        tasks={tasks}
        todolist={todolist}
        changeTaskStatus={changeTaskStatus}
        removeTask={removeTask}
        changeTaskTitle={changeTaskTitle}
      />
      {/* <FilterButtons todolist={todolist} /> */}
    </div>
  );
};
