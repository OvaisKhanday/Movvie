import React, { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "password" | "number";
  label: string;
  error?: string;
}

// forwardRef<Ref, Props>
const Input: FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(
  function ({ type = "text", label, error, ...props }, ref) {
    return (
      <div className="relative w-full h-10">
        <input
          type={type}
          ref={ref}
          placeholder={label}
          {...props}
          className={`bg-inherit w-full h-full transition duration-300 ease-in outline-none border-b focus:border-b focus:border-b-onPrimary/100 invalid:border-b invalid:border-b-primary/80 px-3 py-2 font-sans text-sm font-light text-onPrimary/80 placeholder:font-sans placeholder:text-sm placeholder:font-light placeholder:text-onPrimary/50 placeholder:capitalize ${error ? "border-b-primary/80" : "border-b-onPrimary/50 "}`}
        />
        {error && (
          <p className="absolute text-[10px] font-sans font-light text-primary top-[30%] right-0">
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default Input;
