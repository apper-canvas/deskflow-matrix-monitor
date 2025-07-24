import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ onAddTask }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="max-w-sm mx-auto">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
          <ApperIcon name="CheckSquare" className="w-12 h-12 text-primary" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          All caught up!
        </h3>
        
        <p className="text-gray-600 mb-6">
          No tasks yet. Add your first task to get started with your productive day.
        </p>
        
        <button
          onClick={onAddTask}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
        >
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          Add Your First Task
        </button>
        
        <div className="mt-8 text-sm text-gray-500">
          <p className="mb-2">💡 Quick tip: Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">Enter</kbd> to add tasks quickly</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Empty;