<template>
  <a
    class="flex items-center justify-center w-7 h-7 hover:bg-gray-100 rounded-full mx-2 flex-none"
    @click="handleClick"
  >
    <svg
      class="h-5 w-5"
      :class="color"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <slot />
    </svg>
  </a>
</template>

<script setup>
const props = defineProps({
  onClick: Function,
  color: String
})

const handleClick = () => {
  if (props.onClick) {
    props.onClick()
  }
}
</script>
