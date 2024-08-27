<!-- src/components/TaskForm.vue -->
<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    // FOR EDITING GET id, name, date_assigned
    taskForm: {
      type: Object as PropType<{ id: number | null; name: string; date_assigned: string }>,
      required: true
    },
    isEditing: {
      type: Boolean,
      required: true
    }
  },
  emits: ['submit', 'reset'], 
  methods: {
    resetForm() {
      this.$emit('reset');
    },
    addTask() {
      this.$emit('submit', 'add');
    },
    updateTask() {
      this.$emit('submit', 'update');
    }
  }
});
</script>

<template>
  <div class="mt-6">
    <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Update Task' : 'Add New Task' }}</h2>
    <form @submit.prevent="isEditing ? updateTask() : addTask()" class="bg-white p-4 rounded shadow-md border border-gray-200">
      <!-- NAME -->
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-medium mb-2">Task Name</label>
        <input v-model="taskForm.name" id="name" type="text" placeholder="Task Name" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required>
      </div>
      <!-- DATE -->
      <div class="mb-4">
        <label for="date_assigned" class="block text-gray-700 font-medium mb-2">Date Assigned</label>
        <input v-model="taskForm.date_assigned" id="date_assigned" type="date" placeholder="Date Assigned" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required>
      </div>
      <div class="flex justify-end space-x-4">
        <!-- Cancel button v=-if"isEditing" -->
        <button v-if="isEditing" type="button" @click="resetForm" class="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600">Cancel</button>
        <!-- SUBMIT -->
        <button type="submit" class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          {{ isEditing ? 'Update Task' : 'Add Task' }}
        </button>
      </div>
    </form>
  </div>
</template>
  

  