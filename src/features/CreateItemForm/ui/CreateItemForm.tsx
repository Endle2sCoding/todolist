import { ChangeEvent, KeyboardEvent, useState } from "react";
import s from "./CreateItemForm.module.scss";
import { AppButon } from "@/shared/ui/AppButon/AppButon";
interface CreateItemFormProps {
  createItem: (value: string) => void;
  className?: string;
}
export const CreateItemForm = ({
  createItem,
  className,
}: CreateItemFormProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const createTaskHandler = () => {
    if (inputValue.trim().length === 0) {
      setError("Text is required");
    } else {
      createItem(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className={`${s.createItemForm} ${className ? className : ""}`}>
      <input
        value={inputValue}
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
  );
};
