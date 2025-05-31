import { useState, type ChangeEvent } from "react";

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
        <input
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.currentTarget.value)
          }
          onBlur={() => {
            setIsEdit(false);
            changeValue(inputValue);
          }}
          autoFocus
        />
      )}
    </>
  );
};
