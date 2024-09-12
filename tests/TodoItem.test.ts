import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useTaskStore } from '../src/stores/taskStore'

describe('Task Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should add a new task', () => {
    const taskStore = useTaskStore()
    taskStore.addTask('New Task')

    expect(taskStore.tasks.length).toBe(1)
    expect(taskStore.tasks[0].text).toBe('New Task')
  })

  it('should toggle task completion', () => {
    const taskStore = useTaskStore()
    taskStore.addTask('New Task')
    const task = taskStore.tasks[0]

    taskStore.toggleComplete(task.id)
    expect(task.completed).toBe(true)
  })

  it('should edit a task', () => {
    const taskStore = useTaskStore()
    taskStore.addTask('New Task')
    const task = taskStore.tasks[0]

    taskStore.updateTask({ id: task.id, text: 'Updated Task' })
    expect(taskStore.tasks[0].text).toBe('Updated Task')
  })

  it('should delete a task', () => {
    const taskStore = useTaskStore()
    taskStore.addTask('New Task')
    const task = taskStore.tasks[0]

    taskStore.deleteTask(task.id)
    expect(taskStore.tasks.length).toBe(0)
  })

  it('should clear all completed tasks', () => {
    const taskStore = useTaskStore()
    taskStore.addTask('New Task')
    const task = taskStore.tasks[0]

    taskStore.toggleComplete(task.id)
    taskStore.clearDone()
    expect(taskStore.tasks.length).toBe(0)
  })
})
