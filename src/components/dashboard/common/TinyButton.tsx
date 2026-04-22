import Spinner from "@/components/ui/Spinner";
import { Link } from "react-router-dom";

type IconPosition = "left" | "right";
type ButtonType = "button" | "link" | "submit";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode,
  iconPosition?: IconPosition;
  children: React.ReactNode;
  buttonType: ButtonType;
  urlTo?: string;
  target?: string;
  disabled?: boolean;
  loading?: boolean;
}

const TinyButton = ({
  children,
  icon,
  iconPosition,
  buttonType,
  urlTo,
  target="_self",
  disabled,
  loading,
  ...props
}: ButtonProps) => {
  const buttonClassName = `${icon ? "px-2 py-1" : "px-2.5 py-1.5"} relative flex items-center rounded-lg bg-primary text-white cursor-pointer hover:brightness-95 active:brightness-80 transition-all duration-300 ease-out disabled:bg-disabled disabled:hover:brightness-100 disabled:active:brightness-100 disabled:cursor-auto`;
  const spinnerCircle = "text-white";

  if (buttonType === "link") {
    return (
      <Link to={urlTo || "#"} target={target} className={buttonClassName}>
        {icon && iconPosition === "left" && <span>{icon}</span>}
        <span className="text-sm">{children}</span>
        {icon && iconPosition === "right" && <span>{icon}</span>}
      </Link>
    )
  }
  return (
    <button type={buttonType} className={buttonClassName} disabled={disabled} {...props}>
      {loading && 
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner h="h-5" circle={spinnerCircle} />
        </div>
      }
      <div className={`${loading ? "opacity-0" : "opacity-100"} flex items-center`}>
        {icon && iconPosition === "left" && <span>{icon}</span>}
        <span className="text-sm">{children}</span>
        {icon && iconPosition === "right" && <span>{icon}</span>}
      </div>
    </button>
  )
}

export default TinyButton;
