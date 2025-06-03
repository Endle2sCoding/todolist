import TextField from "@mui/material/TextField";
import { useState, type ChangeEvent, type KeyboardEvent } from "react";

interface EditableSpanProps {
  value: string;
  changeValue: (value: string) => void;
}
export const EditableSpan = ({ value, changeValue }: EditableSpanProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value);
  return (
    <>
      {!isEdit ? (
        <span onDoubleClick={() => setIsEdit(true)}>{inputValue}</span>
      ) : (
        <TextField
          variant={"outlined"}
          size={"small"}
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.currentTarget.value)
          }
          onBlur={() => {
            setIsEdit(false);
            changeValue(inputValue);
          }}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
            {
              if (e.key === "Enter") {
                setIsEdit(false);
                changeValue(inputValue);
              }
            }
          }}
          autoFocus
        />
      )}
    </>
  );
};
