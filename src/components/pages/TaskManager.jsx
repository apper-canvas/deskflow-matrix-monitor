import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TaskInput from "@/components/molecules/TaskInput";
import TaskList from "@/components/organisms/TaskList";
import ApperIcon from "@/components/ApperIcon";
import taskService from "@/services/api/taskService";
import { toast } from "react-toastify";

const TaskManager = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const inputRef = useRef(null);

  const handleAddTask = async (taskData) => {
    try {
      await taskService.create({
        ...taskData,
        completed: false,
        createdAt: new Date().toISOString()
      });
      
      setRefreshTrigger(prev => prev + 1);
      toast.success("Task added successfully! 🎯");
    } catch (err) {
      toast.error("Failed to add task. Please try again.");
      console.error("Error adding task:", err);
    }
  };

  const focusInput = () => {
    const input = document.querySelector('input[type="text"]');
    if (input) {
      input.focus();
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+N to focus input
      if (e.ctrlKey && e.key === "n") {
        e.preventDefault();
        focusInput();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-4 shadow-lg">
            <ApperIcon name="CheckSquare" className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            DeskFlow
          </h1>
          <p className="text-gray-600">
            Streamlined task management for productive office work
          </p>
        </motion.div>

        {/* Task Input */}
        <TaskInput onAddTask={handleAddTask} />

        {/* Task List */}
        <TaskList 
          refreshTrigger={refreshTrigger} 
          onFocusInput={focusInput}
        />
      </div>
    </div>
  );
};

export default TaskManager;