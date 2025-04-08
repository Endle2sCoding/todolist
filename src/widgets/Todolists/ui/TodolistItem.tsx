import { AppButon } from "@/shared/ui/AppButon/AppButon";
import { FilterTypes, Task, Todolist } from "./Todolists";
import { ChangeEvent } from "react";
import s from "./Todolists.module.scss";
import { CreateItemForm } from "@/features/CreateItemForm";
import { EditableSpan } from "@/features/EditableSpan/ui/EditableSpan";

interface TodolistItemProps {
  title: string;
  tasks: Task[];
  className?: string;
  removeTask: (taksId: string, todolistId: string) => void;
  changeTaskFilter: (taksId: string, filter: FilterTypes) => void;
  changeTaskStatus: (
    taksId: string,
    status: boolean,
    todolistId: string
  ) => void;
  changeTaskTitle: (taksId: string, title: string, todolistId: string) => void;
  changeTodolistTitle: (todolistId: string, title: string) => void;
  createTask: (title: string, todolistId: string) => void;
  error: string | null;
  setError: (value: string | null) => void;
  filter: FilterTypes;
  todolist: Todolist;
  deleteTodolist: (todolistId: string) => void;
}
export const TodolistItem = ({
  title,
  tasks,
  className,
  removeTask,
  changeTaskFilter,
  createTask,
  changeTaskStatus,
  todolist,
  deleteTodolist,
  changeTaskTitle,
  changeTodolistTitle,
}: TodolistItemProps) => {
  const createTaskHandler = (value: string) => {
    createTask(value, todolist.id);
  };
  return (
    <div className={`${className ? className : ""}`}>
      <>
        <EditableSpan
          value={title}
          changeTitle={(value: string) =>
            changeTodolistTitle(todolist.id, value)
          }
        />

        <AppButon onClick={() => deleteTodolist(todolist.id)}>X</AppButon>
      </>
      <CreateItemForm createItem={createTaskHandler} />
      {tasks.length === 0 ? (
        <div>Тасок нет</div>
      ) : (
        <ul>
          {tasks.map((t) => (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  changeTaskStatus(t.id, e.currentTarget.checked, todolist.id);
                }}
              />

              <EditableSpan
                value={t.title}
                changeTitle={(value: string) =>
                  changeTaskTitle(t.id, value, todolist.id)
                }
              />
              <AppButon onClick={() => removeTask(t.id, todolist.id)}>
                x
              </AppButon>
            </li>
          ))}
        </ul>
      )}
      <div>
        <AppButon
          className={todolist.filter === "all" ? s["active-filter"] : ""}
          onClick={() => changeTaskFilter(todolist.id, "all")}
        >
          All
        </AppButon>
        <AppButon
          className={todolist.filter === "active" ? s["active-filter"] : ""}
          onClick={() => changeTaskFilter(todolist.id, "active")}
        >
          Active
        </AppButon>
        <AppButon
          className={todolist.filter === "competed" ? s["active-filter"] : ""}
          onClick={() => changeTaskFilter(todolist.id, "competed")}
        >
          Completed
        </AppButon>
      </div>
    </div>
  );
};
