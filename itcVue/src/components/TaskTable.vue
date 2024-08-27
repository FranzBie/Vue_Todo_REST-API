<!-- src/components/TaskTable.vue -->
<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    tasks: {
      type: Array as PropType<{ id: number; name: string; date_assigned: string }[]>,
      required: true
    },
    editTask: {
      type: Function as PropType<(task: { id: number; name: string; date_assigned: string }) => void>,
      required: true
    },
    deleteTask: {
      type: Function as PropType<(id: number) => void>,
      required: true
    }
  }
});
</script>
<template>
  <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
    <thead>
      <tr class="bg-gray-100 border-b">
        <th class="py-2 px-4 text-left text-gray-600">Task Name</th>
        <th class="py-2 px-4 text-left text-gray-600">Date Assigned</th>
        <th class="py-2 px-4 text-left text-gray-600">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="task in tasks" :key="task.id" class="border-b hover:bg-gray-50">
        <td class="py-2 px-4">{{ task.name }}</td>
        <td class="py-2 px-4">{{ task.date_assigned }}</td>
        <td class="py-2 px-4">
          <button @click="editTask(task)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</button>
          <button @click="deleteTask(task.id)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

  