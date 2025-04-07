import { Task } from "./Todolists";

interface TodolistItemProps {
  title: string;
  tasks: Task[];
  className?: string;
}
export const TodolistItem = ({
  title,
  tasks,
  className,
}: TodolistItemProps) => {
  return (
    <div className={`${className ? className : ""}`}>
      <div>{title}</div>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {tasks.length !== 0 ? (
          tasks.map((t) => (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.isDone}
              />{" "}
              <span>{t.title}</span>
            </li>
          ))
        ) : (
          <div>Тасок нет</div>
        )}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};
