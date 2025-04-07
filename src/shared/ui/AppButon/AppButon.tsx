import { ButtonHTMLAttributes, ReactNode } from "react";

interface AppButonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}
export const AppButon = ({
  children,
  className,
  ...otherProps
}: AppButonProps) => {
  return (
    <button
      {...otherProps}
      className={`${className ? className : ""}`}
    >
      {children}
    </button>
  );
};
