import { ChangeEvent, KeyboardEvent, useState } from "react";
import s from "./CreateItemForm.module.scss";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

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
      <TextField
        label={"Enter a title"}
        variant={"outlined"}
        className={error ? "error" : ""}
        value={inputValue}
        size={"small"}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.currentTarget.value);
          setError(null);
        }}
        onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            createTaskHandler();
          }
        }}
        error={!!error}
        helperText={error}
      />
      <Button
        variant="contained"
        onClick={createTaskHandler}
      >
        +
      </Button>
    </div>
  );
};
