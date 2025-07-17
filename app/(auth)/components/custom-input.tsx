import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";

type CustomInputProps = React.ComponentProps<"input"> & {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  containerClassName?: ClassValue;
};
export const CustomInput = ({
  className,
  containerClassName,
  type,
  Icon,
  ...props
}: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={cn(
        "w-full flex flex-row gap-1 items-center bg-white/30 px-2 rounded-lg ",
        containerClassName
      )}
    >
      <Icon size={24} strokeWidth={1.4} className="" />
      <input
        type={inputType}
        className={cn(
          "flex-1 w-full focus-within:ring-0 focus-within:outline-0 text-white focus-within:bg-none py-3 autofill:bg-none bg-none",
          className
        )}
        placeholder="Enter your email"
        {...props}
      />
      {isPasswordType && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-white hover:text-gray-300 transition-colors duration-200"
        >
          {showPassword ? (
            <EyeOff size={24} strokeWidth={1.4} />
          ) : (
            <Eye size={24} strokeWidth={1.4} />
          )}
        </button>
      )}
    </div>
  );
};
