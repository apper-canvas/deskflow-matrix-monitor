import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = React.forwardRef(({ 
  className, 
  checked = false,
  onChange,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange && onChange(!checked)}
      className={cn(
        "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20",
        checked 
          ? "bg-gradient-to-br from-primary to-accent border-primary text-white shadow-sm" 
          : "bg-white border-gray-300 hover:border-primary hover:bg-gray-50",
        className
      )}
      {...props}
    >
      {checked && (
        <ApperIcon name="Check" className="w-3 h-3" />
      )}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;