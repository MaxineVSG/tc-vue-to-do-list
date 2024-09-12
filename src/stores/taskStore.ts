import { defineStore } from 'pinia'

interface Task {
  id: number
  text: string
  completed: boolean
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[]
  }),

  actions: {
    addTask(text: string) {
      if (!text.trim()) return
      const newTask: Task = {
        id: Date.now(),
        text,
        completed: false
      }
      this.tasks.push(newTask)
      this.saveToLocalStorage()
    },

    deleteTask(taskId: number) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId)
      this.saveToLocalStorage()
    },

    updateTask(updatedTask: { id: number; text: string }) {
      const task = this.tasks.find((task) => task.id === updatedTask.id)
      if (task) {
        task.text = updatedTask.text
        this.saveToLocalStorage()
      }
    },

    toggleComplete(taskId: number) {
      const task = this.tasks.find((task) => task.id === taskId)
      if (task) {
        task.completed = !task.completed
        this.saveToLocalStorage()
      }
    },

    clearDone() {
      this.tasks = this.tasks.filter((task) => !task.completed)
      this.saveToLocalStorage()
    },

    loadFromLocalStorage() {
      const savedTasks = localStorage.getItem('tasks')
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks)
      }
    },

    saveToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
  }
})
