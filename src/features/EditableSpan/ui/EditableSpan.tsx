import { ChangeEvent, KeyboardEvent, useState } from "react";
import s from "./EditableSpan.module.scss";
import { TextField } from "@mui/material";
interface EditableSpanProps {
  value: string;
  changeTitle: (value: string) => void;
  className?: string;
}
export const EditableSpan = ({
  value,
  changeTitle,
  className,
}: EditableSpanProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(value);

  const hangdleChangeTitle = () => {
    changeTitle(title);
    setIsEditMode(false);
  };
  return (
    <>
      {!isEditMode ? (
        <span
          onDoubleClick={() => setIsEditMode(true)}
          className={`${s.editableSpan} ${className ? className : ""}`}
        >
          {value}
        </span>
      ) : (
        <TextField
          variant={"outlined"}
          value={title}
          size={"small"}
          autoFocus
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value);
          }}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              hangdleChangeTitle();
            }
          }}
          onBlur={() => {
            hangdleChangeTitle();
          }}
        />
      )}
    </>
  );
};
