import { ButtonHTMLAttributes, ReactNode } from "react";

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}
export const AppButton = ({
  children,
  className,
  ...otherProps
}: AppButtonProps) => {
  return (
    <button
      {...otherProps}
      className={`${className ? className : ""}`}
    >
      {children}
    </button>
  );
};
