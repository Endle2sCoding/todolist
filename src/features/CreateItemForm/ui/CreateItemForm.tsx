import { useState, type ChangeEvent, type KeyboardEvent } from "react";

interface CreateItemFormProps {
  createItem: (title: string) => void;
  className?: string;
}
export const CreateItemForm = ({
  createItem,
  className,
}: CreateItemFormProps) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const createTaskHandler = () => {
    if (value.trim() !== "") {
      createItem(value);
      setValue("");
    } else {
      setError("Field is required!");
    }
  };

  return (
    <div className={`${className ? className : ""}`}>
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
  );
};
