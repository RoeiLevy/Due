<template>
  <section class="group-container">
    <h2 class="group-title">{{ group.title }}</h2>
    <task-preview v-for="task in group.tasks" :key="task.id" :task="task" />
    <form @submit.prevent="addTask()">
      <input
        class="add-task-input"
        type="text"
        placeholder="+Add Task"
        v-model="taskToEdit.title"
      />
      <button v-if="taskToEdit" class="add-task">Add</button>
    </form>
  </section>
</template>

<script>
import taskPreview from "./task-preview.vue";

export default {
  name: 'group',
  props: ['group'],
  data() {
    return {
      taskToEdit: {
        title: '',
      },
    };
  },
  methods: {
    async addTask() {
      await this.$store.dispatch({ type: 'addTask', task: this.taskToEdit });
      this.taskToEdit = { title: '' };
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  created() {
  },
  components: {
    taskPreview,
  },
};
</script>

<style>
</style>