import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className, 
  type = "text",
  error = false,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-3 py-2 bg-white border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 placeholder:text-gray-400";
  
  const stateStyles = error 
    ? "border-error focus:border-error focus:ring-error/20" 
    : "border-gray-300 focus:border-primary focus:ring-primary/20 hover:border-gray-400";
  
  return (
    <input
      ref={ref}
      type={type}
      className={cn(baseStyles, stateStyles, className)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;