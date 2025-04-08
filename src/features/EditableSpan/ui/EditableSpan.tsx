import { ChangeEvent, KeyboardEvent, useState } from "react";
import s from "./EditableSpan.module.scss";
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
        <input
          value={title}
          autoFocus
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value);
          }}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value);
            if (e.key === "Enter") {
              changeTitle(e.currentTarget.value);
              setIsEditMode(false);
            }
          }}
          onBlur={() => setIsEditMode(false)}
          className={`${s.editableSpan} ${className ? className : ""}`}
        />
      )}
    </>
  );
};
