import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-4">
        {/* Header skeleton */}
        <div className="animate-pulse">
          <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-6"></div>
        </div>
        
        {/* Task items skeleton */}
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item * 0.1 }}
            className="animate-pulse"
          >
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="flex space-x-2">
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;