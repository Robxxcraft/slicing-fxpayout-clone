import React from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

type ButtonVariant = "primary" | "primary-light" | "outline" | "outline-light" | "outline-primary" | "light" | "danger" | "no-bg";
type ButtonSize = "xl" | "lg" | "md";
type IconPosition = "left" | "right";
type ButtonType = "link" | "button" | "submit";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  buttonType?: ButtonType;
  urlTo?: string;
  target?: string;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  variant = "primary",
  size = "lg",
  children,
  className = "",
  icon,
  iconPosition = "left",
  buttonType = "button",
  urlTo,
  disabled,
  loading,
  target = "_self",
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative h-fit rounded-full text-[15px] md:text-base 2xl:text-xl font-semibold transition-all duration-300 ease-out border inline-flex items-center justify-center gap-3";

  let variantStyles = "";
  let sizeStyles = "";
  let spinnerCircle = "";

  if (variant === "primary") {
    variantStyles =
      "bg-linear-to-t from-dark-primary to-primary text-white border-black hover:brightness-80 active:brightness-60 disabled:from-black/30 disabled:active:brightness-100 disabled:to-black/30 disabled:hover:brightness-100";
    spinnerCircle = "text-white";
  }
  if (variant === "primary-light") {
    variantStyles =
      "bg-linear-to-t from-dark-primary to-primary text-white border-white hover:brightness-80 active:brightness-60 disabled:from-black/30 disabled:active:brightness-100 disabled:to-black/30 disabled:hover:brightness-100";
    spinnerCircle = "text-white";
  }

  if (variant === "danger") {
    variantStyles =
      "bg-my-red text-white border-white hover:brightness-80 active:brightness-60 disabled:bg-black/30 disabled:active:brightness-100 disabled:hover:brightness-100";
    spinnerCircle = "text-white";
  }

  if (variant === "outline") {
    variantStyles = `bg-transparent text-black border-black hover:bg-primary hover:text-white active:brightness-80 disabled:hover:bg-transparent disabled:hover:text-black disabled:active:brightness-80 disabled:text-black/60 disabled:border-black/60`;
    spinnerCircle = "text-black/20";
  }
  if (variant === "outline-primary") {
    variantStyles = `bg-transparent text-primary border-primary hover:bg-primary hover:text-white active:brightness-80 disabled:hover:bg-transparent disabled:hover:text-primary disabled:active:brightness-80 disabled:text-primary/60 disabled:border-primary/60`;
    spinnerCircle = "text-black/20";
  }
  if (variant === "outline-light") {
    variantStyles =
      "bg-transparent text-white border-white hover:bg-white hover:text-primary active:brightness-80 disabled:active:brightness-90";
    spinnerCircle = "text-black/20";
  }

  if (variant === "light") {
    variantStyles =
      "bg-white text-black border-white hover:bg-primary hover:text-white active:brightness-80 disabled:hover:bg-white disabled:hover:text-black disabled:active:brightness-80 disabled:text-black/60";
    spinnerCircle = "text-black/20";
  }

  if (variant === "no-bg") {
    variantStyles =
      "bg-transparent text-black border-transparent hover:underline active:brightness-80 disabled:active:text-black/60 disabled:text-black/60";
    spinnerCircle = "text-black/20";
  }

  if (size === "xl") {
    sizeStyles = "px-8 md:px-6 lg:px-12 2xl:px-14 py-5 md:py-4 2xl:py-5";
  }

  if (size === "lg") {
    sizeStyles = "px-5 xl:px-8 2xl:px-10 py-[10px] xl:py-[14px] 2xl:py-[18px]";
  }

  if (size === "md") {
    sizeStyles = "px-6 2xl:px-8 py-4";
  }

  const finalClass = `${baseStyles} ${variantStyles} ${sizeStyles} ${className}
    ${loading ? "disabled:cursor-wait" : "disabled:cursor-auto"}
    cursor-pointer`;

  if (buttonType === "link") {
    return (
      <Link to={urlTo || "#"} target={target} className={finalClass}>
        {/* ICON LEFT */}
        {icon && iconPosition === "left" && <span className="flex">{icon}</span>}
        {children}
        {/* ICON RIGHT */}
        {icon && iconPosition === "right" && <span className="flex">{icon}</span>}
      </Link>
    );
  }

  return (
    <button type={buttonType} className={finalClass} {...props} disabled={disabled}>
      {loading && 
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner circle={spinnerCircle} />
        </div>
      }
      <div className={`flex items-center gap-2 ${loading ? "opacity-0" : "opacity-100"}`}>
        {/* ICON LEFT */}
        {icon && iconPosition === "left" && <span className="flex">{icon}</span>}
        {children}
        {/* ICON RIGHT */}
        {icon && iconPosition === "right" && <span className="flex">{icon}</span>}
      </div>
    </button>
  );
}
