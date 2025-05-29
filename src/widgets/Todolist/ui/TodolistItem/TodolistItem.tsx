import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { FilterType, TaskType } from "../../model/types/todolist";

interface TodolistItemProps {
  title: string;
  tasks: TaskType[];
  deleteTask: (taskId: string) => void;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  createTask: (title: string) => void;
  className?: string;
}
const fBtn: FilterType[] = ["all", "active", "completed"];
export const TodolistItem = ({
  title,
  tasks,
  deleteTask,
  filter,
  setFilter,
  createTask,
  className,
}: TodolistItemProps) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const createTaskHandler = () => {
    if (value.trim() !== "") {
      createTask(value);
      setValue("");
    } else {
      setError("Field is required!");
    }
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
      <h3>{title}</h3>
      <div>
        <input
          className={error ? "error" : ""}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (value.length) {
              setError("");
            }
            setValue(e.currentTarget.value);
          }}
          onFocus={() => setError(null)}
          onBlur={() => {
            if (!value) {
              setError("Field is required!");
            }
          }}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              createTaskHandler();
            }
          }}
        />
        <button onClick={createTaskHandler}>+</button>
        {error && <div className={"error-message"}>{error}</div>}
      </div>
      <ul>
        {tasks.length !== 0 ? (
          tasks.map((t) => (
            <li
              key={t.id}
              className={t.isDone ? "is-done" : ""}
            >
              <input
                type="checkbox"
                checked={t.isDone}
              />
              <span>{t.title}</span>
              <button onClick={() => deleteTask(t.id)}>x</button>
            </li>
          ))
        ) : (
          <div>Тасок нет</div>
        )}
      </ul>
      <div>
        {fBtn.map((b) => (
          <button
            className={filter === b ? "active-filter" : ""}
            onClick={() => {
              setFilter(b);
            }}
          >
            {b.charAt(0).toUpperCase() + b.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};
