import mockTasks from "@/services/mockData/tasks.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage (simulating database)
let tasks = [...mockTasks];

const taskService = {
  async getAll() {
    await delay(300);
    // Sort by creation date, newest first
    return tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  },

  async create(taskData) {
    await delay(250);
    
    // Find the highest existing Id and increment
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
    const newTask = {
      Id: maxId + 1,
      ...taskData,
      createdAt: taskData.createdAt || new Date().toISOString()
    };
    
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updateData) {
    await delay(200);
    
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(id));
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }
    
    tasks[taskIndex] = { ...tasks[taskIndex], ...updateData };
    return { ...tasks[taskIndex] };
  },

  async delete(id) {
    await delay(200);
    
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(id));
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }
    
    tasks.splice(taskIndex, 1);
    return true;
  }
};

export default taskService;