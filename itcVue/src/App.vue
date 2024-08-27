<template>
  <div>
    <TodoList :todos="todos" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue';
import TodoList from './components/TaskComponent.vue';
// import './assets/assets/tailwind.css';

export default defineComponent({
  name: 'App',
    components: {
    TodoList
  },
  setup() {
    const todos = ref<Array<{ id: number, name: string }>>([]);
    return { todos };
  }

});
</script>
