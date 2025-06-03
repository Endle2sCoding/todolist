import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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
      <TextField
        label={"Enter a title"}
        variant={"outlined"}
        className={error ? "error" : ""}
        value={value}
        size={"small"}
        error={!!error}
        helperText={error}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
          if (value !== "") {
            setError("");
          }
        }}
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
