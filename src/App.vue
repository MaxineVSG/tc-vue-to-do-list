<template>
  <div id="app" class="min-h-screen flex p-6 md:px-80">
    <div class="mx-auto">
      <img class="mb-6 w-40" src="./assets/logo.svg" alt="True Compliance Logo" />
      <h1>To Dos</h1>
      <!-- Add New Task -->
      <div class="flex items-center space-x-4 mb-6 relative">
        <input
          v-model="newTask"
          id="newTaskInput"
          @keyup.enter="addTask"
          class="w-80 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label
          for="newTaskInput"
          class="absolute text-sm text-gray-500 -translate-y-6 scale-80 top-4 z-10 bg-white px-1 rounded-md"
          >Create a new task</label
        >
        <TcButton @click="addTask" variant="default" :disabled="!newTask"> Add Task </TcButton>
      </div>

      <ul class="w-full max-w-md">
        <!-- No Tasks/All Completed -->
        <li
          v-if="checkTasks()"
          class="flex flex-col justify-between items-center mb-3 p-2 block p-6 bg-white border border-gray-200 rounded-lg shadow"
        >
          <svg
            class="h-8 w-8 text-primary mb-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
            />
          </svg>
          <div class="text-lg">Way to go!</div>
          <div class="text-xs">You have no tasks to complete</div>
        </li>
        <!-- Task List -->
        <TodoItem
          v-for="task in sortedTasks.slice().reverse()"
          :key="task.id"
          :task="task"
          @deleteTask="deleteTask"
          @updateTask="updateTask"
          @toggleComplete="toggleComplete"
        />
      </ul>
      <TcButton @click="clearDone" variant="link" v-if="checkForCompleted()" class="w-full">
        Clear Completed Tasks
      </TcButton>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue'
import { useTaskStore } from './stores/taskStore'
import TodoItem from './components/TodoItem.vue'
import TcButton from './components/ui/button/TcButton.vue'

export default {
  name: 'App',
  components: { TodoItem, TcButton },
  setup() {
    const taskStore = useTaskStore()
    const newTask = ref('')

    const addTask = () => {
      taskStore.addTask(newTask.value)
      newTask.value = ''
    }

    const deleteTask = (taskId) => {
      taskStore.deleteTask(taskId)
    }

    const updateTask = (updatedTask) => {
      taskStore.updateTask(updatedTask)
    }

    const toggleComplete = (taskId) => {
      taskStore.toggleComplete(taskId)
    }

    const clearDone = () => {
      taskStore.clearDone()
    }

    const checkTasks = () => {
      return !tasks.value.length || tasks.value.every((task) => task.completed)
    }

    const checkForCompleted = () => {
      return tasks.value.some((task) => task.completed)
    }

    // Move completed tasks to bottom of list
    const sortedTasks = computed(() => {
      return taskStore.tasks.slice().sort((a, b) => {
        if (a.completed && !b.completed) return -1
        if (!a.completed && b.completed) return 1
        return 0
      })
    })

    onMounted(() => {
      taskStore.loadFromLocalStorage()
    })

    const tasks = ref(taskStore.tasks)

    watch(
      () => taskStore.tasks,
      (newTasks) => {
        tasks.value = newTasks
      },
      { deep: true }
    )

    return {
      newTask,
      tasks,
      addTask,
      deleteTask,
      updateTask,
      clearDone,
      toggleComplete,
      checkTasks,
      checkForCompleted,
      sortedTasks
    }
  }
}
</script>
