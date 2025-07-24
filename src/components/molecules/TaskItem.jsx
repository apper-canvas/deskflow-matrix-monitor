import { useState } from "react";
import { motion } from "framer-motion";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskItem = ({ task, onComplete, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-error";
      case "normal":
        return "bg-warning";
      case "low":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high":
        return "High";
      case "normal":
        return "Normal";
      case "low":
        return "Low";
      default:
        return "Normal";
    }
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    
    if (isToday(date)) {
      return { text: "Today", className: "text-primary font-medium" };
    } else if (isTomorrow(date)) {
      return { text: "Tomorrow", className: "text-info font-medium" };
    } else if (isPast(date)) {
      return { text: format(date, "MMM d"), className: "text-error font-medium" };
    } else {
      return { text: format(date, "MMM d"), className: "text-gray-600" };
    }
  };

  const dueDateInfo = formatDueDate(task.dueDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ scale: 1.01 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "bg-white rounded-lg p-4 shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md",
        task.completed && "opacity-75"
      )}
    >
      <div className="flex items-center space-x-3">
        <Checkbox
          checked={task.completed}
          onChange={() => onComplete(task.Id)}
        />
        
        <div className="flex-1 min-w-0">
          <div className={cn(
            "text-gray-900 transition-all duration-200",
            task.completed && "line-through text-gray-500"
          )}>
            {task.text}
          </div>
          
          <div className="flex items-center space-x-3 mt-1">
            <div className="flex items-center space-x-1">
              <div className={cn("w-2 h-2 rounded-full", getPriorityColor(task.priority))}></div>
              <span className="text-xs text-gray-500">
                {getPriorityLabel(task.priority)}
              </span>
            </div>
            
            {dueDateInfo && (
              <div className="flex items-center space-x-1">
                <ApperIcon name="Calendar" className="w-3 h-3 text-gray-400" />
                <span className={cn("text-xs", dueDateInfo.className)}>
                  {dueDateInfo.text}
                </span>
              </div>
            )}
            
            <div className="flex items-center space-x-1">
              <ApperIcon name="Clock" className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">
                {format(new Date(task.createdAt), "MMM d, h:mm a")}
              </span>
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0.8 
          }}
          transition={{ duration: 0.15 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.Id)}
            className="text-gray-400 hover:text-error hover:bg-red-50 p-2"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TaskItem;