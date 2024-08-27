<!-- src/components/TaskComponent.vue -->
<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from '../axios';
import Swal from 'sweetalert2';
import TaskTable from './TaskTable.vue';
import TaskForm from './TaskForm.vue';

export default defineComponent({
  components: { TaskTable, TaskForm },
  setup() {
    const tasks = ref<{ id: number; name: string; date_assigned: string }[]>([]);
    const taskForm = ref<{ id: number | null; name: string; date_assigned: string }>({ id: null, name: '', date_assigned: '' });
    const isEditing = ref(false);

    // GET tasks from the laravel api
    async function fetchTasks() {
      try {
        const response = await axios.get('/tasks');
        tasks.value = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    // ADD task
    async function addTask() {
      try {
        const response = await axios.post('/tasks', taskForm.value);
        tasks.value.push(response.data);
        resetForm();
        Swal.fire('Success!', 'Task added successfully.', 'success');
      } catch (error) {
        console.error('Error adding task:', error);
        Swal.fire('Error!', 'There was an error adding the task.', 'error');
      }
    }

    // EDIT GEt the task name and date
    function editTask(task: { id: number; name: string; date_assigned: string }) {
      taskForm.value = { ...task };
      isEditing.value = true;
    }

    // UPDATE task
    async function updateTask() {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this task?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel!',
      });

      if (result.isConfirmed) {
        try {
          const response = await axios.put(`/tasks/${taskForm.value.id}`, taskForm.value);
          const index = tasks.value.findIndex(task => task.id === taskForm.value.id);
          if (index !== -1) {
            tasks.value.splice(index, 1, response.data);
          }
          resetForm();
          Swal.fire('Updated!', 'Task updated successfully.', 'success');
        } catch (error) {
          console.error('Error updating task:', error);
          Swal.fire('Error!', 'There was an error updating the task.', 'error');
        }
      }
    }

    // DELETE task
    async function deleteTask(id: number) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      });

      if (result.isConfirmed) {
        try {
          await axios.delete(`/tasks/${id}`);
          tasks.value = tasks.value.filter(task => task.id !== id);
          Swal.fire('Deleted!', 'Task has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting task:', error);
          Swal.fire('Error!', 'There was an error deleting the task.', 'error');
        }
      }
    }

    // RESET FORM
    function resetForm() {
      taskForm.value = { id: null, name: '', date_assigned: '' };
      isEditing.value = false;
    }

    // Change form for ADD and UPDATE
    function handleFormSubmit(action: 'add' | 'update') {
      if (action === 'add') {
        addTask();
      } else {
        updateTask();
      }
    }

    fetchTasks();

    return {
      tasks,
      taskForm,
      isEditing,
      editTask,
      deleteTask,
      resetForm,
      handleFormSubmit
    };
  }
});
</script>

<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Tasks</h1>
      <!-- Table -->
      <TaskTable :tasks="tasks" :editTask="editTask" :deleteTask="deleteTask" />
      <!-- Form -->
      <TaskForm :taskForm="taskForm" :isEditing="isEditing" @submit="handleFormSubmit" @reset="resetForm" />
    </div>
</template>
  
 