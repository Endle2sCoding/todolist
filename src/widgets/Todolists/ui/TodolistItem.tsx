import { AppButon } from "@/shared/ui/AppButon/AppButon";
import { FilterTypes, Task } from "./Todolists";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import s from "./Todolists.module.scss";

interface TodolistItemProps {
  title: string;
  tasks: Task[];
  className?: string;
  removeTask: (id: string) => void;
  changeTaskFilter: (filter: FilterTypes) => void;
  createTask: (title: string) => void;
  changeTaskStatus: (id: string, status: boolean) => void;
  error: string | null;
  setError: (value: string | null) => void;
  filter: FilterTypes;
}
export const TodolistItem = ({
  title,
  tasks,
  className,
  removeTask,
  changeTaskFilter,
  createTask,
  changeTaskStatus,
  error,
  setError,
  filter,
}: TodolistItemProps) => {
  const [valueValue, setInputValue] = useState<string>("");

  const createTaskHandler = () => {
    createTask(valueValue);
    setInputValue("");
  };
  return (
    <div className={`${className ? className : ""}`}>
      <div>{title}</div>
      <div>
        <input
          value={valueValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.currentTarget.value);
            setError(null);
          }}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              createTaskHandler();
            }
          }}
          className={`${error ? s.error : ""}`}
        />
        <AppButon onClick={createTaskHandler}>+</AppButon>
        {error && <div className={s["error-message"]}>{error}</div>}
      </div>
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
                  changeTaskStatus(t.id, e.currentTarget.checked);
                }}
              />
              <span>{t.title}</span>
              <AppButon onClick={() => removeTask(t.id)}>x</AppButon>
            </li>
          ))}
        </ul>
      )}
      <div>
        <AppButon
          className={filter === "all" ? s["active-filter"] : ""}
          onClick={() => changeTaskFilter("all")}
        >
          All
        </AppButon>
        <AppButon
          className={filter === "active" ? s["active-filter"] : ""}
          onClick={() => changeTaskFilter("active")}
        >
          Active
        </AppButon>
        <AppButon
          className={filter === "competed" ? s["active-filter"] : ""}
          onClick={() => changeTaskFilter("competed")}
        >
          Completed
        </AppButon>
      </div>
    </div>
  );
};
