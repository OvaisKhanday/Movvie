import { FC, HTMLAttributes } from "react";
import { cn } from "../../../lib/utils";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit";
}

const Button: FC<ButtonProps> = ({
  type = "button",
  children,
  className,
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(
        "w-full rounded bg-primary font-sans font-light text-sm text-onPrimary px-3 py-2 mt-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
