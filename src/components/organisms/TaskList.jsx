import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "@/components/molecules/TaskItem";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import taskService from "@/services/api/taskService";
import { toast } from "react-toastify";

const TaskList = ({ refreshTrigger, onFocusInput }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [refreshTrigger]);

  const handleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      if (!task) return;

      const updatedTask = await taskService.update(taskId, {
        ...task,
        completed: !task.completed
      });

      setTasks(tasks.map(t => t.Id === taskId ? updatedTask : t));
      
      if (updatedTask.completed) {
        toast.success("Task completed! 🎉");
      } else {
        toast.info("Task marked as incomplete");
      }
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(tasks.filter(t => t.Id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Failed to delete task");
      console.error("Error deleting task:", err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case "active":
        return !task.completed;
      case "completed":
        return task.completed;
      default:
        return true;
    }
  });

  const taskStats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTasks} />;

  return (
    <div className="space-y-6">
      {tasks.length === 0 ? (
        <Empty onAddTask={onFocusInput} />
      ) : (
        <>
          {/* Task Stats */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {taskStats.total}
                </div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-warning to-orange-500 bg-clip-text text-transparent">
                  {taskStats.active}
                </div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-success to-emerald-600 bg-clip-text text-transparent">
                  {taskStats.completed}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>

          {/* Task Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={filter === "all" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setFilter("all")}
              className="min-w-[80px]"
            >
              All ({taskStats.total})
            </Button>
            <Button
              variant={filter === "active" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setFilter("active")}
              className="min-w-[80px]"
            >
              Active ({taskStats.active})
            </Button>
            <Button
              variant={filter === "completed" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setFilter("completed")}
              className="min-w-[80px]"
            >
              Completed ({taskStats.completed})
            </Button>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            <AnimatePresence>
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.Id}
                  task={task}
                  onComplete={handleComplete}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
            
            {filteredTasks.length === 0 && filter !== "all" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8 text-gray-500"
              >
                <ApperIcon name="CheckSquare" className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No {filter} tasks found</p>
              </motion.div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;