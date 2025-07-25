import React from "react";
import { cn } from "@/utils/cn";

const Select = React.forwardRef(({ 
  className, 
  children,
  error = false,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-3 py-2 bg-white border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 appearance-none cursor-pointer";
  
  const stateStyles = error 
    ? "border-error focus:border-error focus:ring-error/20" 
    : "border-gray-300 focus:border-primary focus:ring-primary/20 hover:border-gray-400";
  
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(baseStyles, stateStyles, className)}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
});

Select.displayName = "Select";

export default Select;