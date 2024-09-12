<template>
  <li
    class="flex items-center mb-3 p-2 block p-6 bg-white border border-gray-200 rounded-lg shadow"
  >
    <input
      class="hidden"
      type="checkbox"
      :id="task.id"
      :checked="task.completed"
      @click="$emit('toggleComplete', task.id)"
    />
    <label class="flex items-center h-10 pl-2 pr-4 rounded cursor-pointer" :for="task.id">
      <span
        class="flex items-center justify-center w-6 h-6 text-transparent border-2 border-gray-300 rounded-full"
      >
        <svg
          class="h-4 w-4 text-white"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M5 12l5 5l10 -10" />
        </svg>
      </span>
    </label>
    <input
      v-if="isEditing"
      v-model="editedText"
      @keyup.enter="saveEdit"
      class="p-2 border border-gray-300 rounded-md mr-auto w-full"
    />
    <span v-else :class="{ 'line-through opacity-40': task.completed }" class="mr-auto break-all">{{
      task.text
    }}</span>

    <!-- Edit Task -->
    <IconButton @click="toggleEditMode" v-if="!isEditing && !task.completed" color="text-blue-300">
      <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
      <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
      <line x1="16" y1="5" x2="19" y2="8" />
    </IconButton>

    <!-- Save Edit -->
    <IconButton @click="saveEdit" v-if="isEditing" color="text-green-500">
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M5 12l5 5l10 -10" />
    </IconButton>

    <!-- Cancel Edit -->
    <IconButton @click="cancelEdit" v-if="isEditing" color="text-grey-500">
      <path stroke="none" d="M0 0h24v24H0z" />
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </IconButton>

    <!-- Delete Task -->
    <IconButton @click="$emit('deleteTask', task.id)" color="text-red-500">
      <path stroke="none" d="M0 0h24v24H0z" />
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </IconButton>
  </li>
</template>

<script>
import { ref, watch } from 'vue'
import IconButton from '../components/ui/button/IconButton.vue'

export default {
  name: 'TodoItem',
  components: { IconButton },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const isEditing = ref(false)
    const editedText = ref(props.task.text)

    // Watch for prop changes to update internal state
    watch(
      () => props.task.text,
      (newText) => {
        editedText.value = newText
      }
    )

    const toggleEditMode = () => {
      isEditing.value = true
    }

    const cancelEdit = () => {
      isEditing.value = false
      editedText.value = props.task.text
    }

    const saveEdit = () => {
      emit('updateTask', { id: props.task.id, text: editedText.value })
      isEditing.value = false
    }

    return {
      isEditing,
      editedText,
      toggleEditMode,
      cancelEdit,
      saveEdit
    }
  }
}
</script>
