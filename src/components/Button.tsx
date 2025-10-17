import type { ReactElement } from "react";

export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantStyles = {
  primary: "bg-blue-400 text-white",
  secondary: "bg-blue-300 text-blue-900",
};

const defaultStyles = "flex items-center justify-center cursor-pointer";

const sizeStyles = {
  sm: "px-4 py-2 m-1 text-sm rounded-sm",
  md: "p-6 py-3 m-1 text-md rounded-md",
  lg: "px-8 py-4 m-1 text-lg rounded-xl",
};

export const Button = (props: ButtonProps) => {
  return (
    <>
      <button
        onClick={props.onClick}
        className={`${props.fullWidth ? "w-full" : null} ${
          variantStyles[props.variant]
        } ${defaultStyles} ${sizeStyles[props.size]} ${props.loading ? "opacity-65" : null}`}
      disabled={props.loading}>
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}{" "}
        {props.text} {props.endIcon}
      </button>
    </>
  );
};
