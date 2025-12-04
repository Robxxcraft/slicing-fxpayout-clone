import React from "react";
import { Link } from "react-router-dom";

type ButtonVariant = "primary" | "primary-light" | "outline" | "outline-light" | "light";
type ButtonSize = "xl" | "lg" | "md";
type IconPosition = "left" | "right";
type ButtonType = "link" | "button";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  buttonType?: ButtonType;
  urlTo?: string;
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
  ...props
}: ButtonProps) {
  const baseStyles =
    "h-fit rounded-full text-[15px] xl:text-base 2xl:text-xl font-semibold transition-all duration-300 ease-out cursor-pointer border inline-flex items-center justify-center gap-3";

  let variantStyles = "";
  let sizeStyles = "";

  if (variant === "primary") {
    variantStyles =
      "bg-linear-to-t from-dark-primary to-primary text-white border-black hover:brightness-80";
  }
  if (variant === "primary-light") {
    variantStyles =
      "bg-linear-to-t from-dark-primary to-primary text-white border-white hover:brightness-80";
  }

  if (variant === "outline") {
    variantStyles =
      "bg-transparent text-black border-black hover:bg-primary hover:text-white";
  }
  if (variant === "outline-light") {
    variantStyles =
      "bg-transparent text-white border-white hover:bg-white hover:text-primary";
  }

  if (variant === "light") {
    variantStyles =
      "bg-white text-black border-white hover:bg-primary hover:text-white";
  }

  if (size === "xl") {
    sizeStyles = "px-8 md:px-12 2xl:px-14 py-5 md:py-4 2xl:py-5";
  }

  if (size === "lg") {
    sizeStyles = "px-5 xl:px-8 2xl:px-10 py-[10px] xl:py-[14px] 2xl:py-[18px]";
  }

  if (size === "md") {
    sizeStyles = "px-6 2xl:px-8 py-4 md:py-3 2xl:py-4";
  }

  const finalClass = `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`;

  if (buttonType === "link") {
    return (
      <Link to={urlTo || "#"} className={finalClass}>
        {/* ICON LEFT */}
        {icon && iconPosition === "left" && <span className="flex">{icon}</span>}
        {children}
        {/* ICON RIGHT */}
        {icon && iconPosition === "right" && <span className="flex">{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={finalClass} {...props}>
      {/* ICON LEFT */}
      {icon && iconPosition === "left" && <span className="flex">{icon}</span>}
      {children}
      {/* ICON RIGHT */}
      {icon && iconPosition === "right" && <span className="flex">{icon}</span>}
    </button>
  );
}
