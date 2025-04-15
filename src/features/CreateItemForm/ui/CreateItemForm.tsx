import { ChangeEvent, KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";

import s from "./CreateItemForm.module.scss";

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

  const createItemHandler = () => {
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
            createItemHandler();
          }
        }}
        error={!!error}
        helperText={error}
      />
      <IconButton
        onClick={createItemHandler}
        color={"primary"}
      >
        <AddBoxIcon />
      </IconButton>
    </div>
  );
};
