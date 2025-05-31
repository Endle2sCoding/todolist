import { type ChangeEvent } from "react";
import type { FilterType, TaskType } from "../../model/types/todolist";
import { CreateItemForm } from "@/features/CreateItemForm";
import { EditableSpan } from "@/features/EditableSpan";

interface TodolistItemProps {
  title: string;
  todolistId: string;
  tasks: TaskType[];
  deleteTask: ({
    todolistId,
    taskId,
  }: {
    todolistId: string;
    taskId: string;
  }) => void;
  filter: FilterType;
  changeFilter: ({
    filter,
    todolistId,
  }: {
    filter: FilterType;
    todolistId: string;
  }) => void;
  createTask: ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => void;
  changeTaskStatus: ({
    todolistId,
    taskId,
    status,
  }: {
    todolistId: string;
    taskId: string;
    status: boolean;
  }) => void;
  changeTaskTitle: ({
    todolistId,
    taskId,
    title,
  }: {
    todolistId: string;
    taskId: string;
    title: string;
  }) => void;
  deleteTodolist: (todolistId: string) => void;
  createTotolist: (title: string) => void;
  changeTodolistTitle: ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => void;
  className?: string;
}
const fBtn: FilterType[] = ["all", "active", "completed"];
export const TodolistItem = ({
  todolistId,
  title,
  tasks,
  filter,
  changeFilter,
  deleteTask,
  createTask,
  changeTaskStatus,
  changeTaskTitle,
  deleteTodolist,
  changeTodolistTitle,
  className,
}: TodolistItemProps) => {
  const createTaskHandler = (title: string) => {
    createTask({ todolistId, title: title });
  };
  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ todolistId, title });
  };

  return (
    <div
      className={`${className ? className : ""}`}
      style={{
        backgroundColor: "#202020",
        padding: "20px",
        borderRadius: "15px",
      }}
    >
      <div>
        <EditableSpan
          value={title}
          changeValue={changeTodolistTitleHandler}
        />
        <button onClick={() => deleteTodolist(todolistId)}>x</button>
      </div>

      <CreateItemForm createItem={createTaskHandler} />
      <ul>
        {tasks.length !== 0 ? (
          tasks.map((t) => {
            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle({ todolistId, taskId: t.id, title: title });
            };
            return (
              <li
                key={t.id}
                className={t.isDone ? "is-done" : ""}
              >
                <input
                  type="checkbox"
                  checked={t.isDone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    changeTaskStatus({
                      todolistId,
                      taskId: t.id,
                      status: e.currentTarget.checked,
                    })
                  }
                />
                <EditableSpan
                  value={t.title}
                  changeValue={changeTaskTitleHandler}
                />
                <button
                  onClick={() => deleteTask({ todolistId, taskId: t.id })}
                >
                  x
                </button>
              </li>
            );
          })
        ) : (
          <div>Тасок нет</div>
        )}
      </ul>
      <div>
        {fBtn.map((b) => (
          <button
            key={b}
            className={filter === b ? "active-filter" : ""}
            onClick={() => {
              changeFilter({ filter: b, todolistId });
            }}
          >
            {b.charAt(0).toUpperCase() + b.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};
