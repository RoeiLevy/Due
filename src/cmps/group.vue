<template>
  <section class="group-container">
    <h2 class="group-title">{{ group.title }}</h2>
    <draggable
      v-model="groupToEdit.tasks"
      @change="saveGroup"
      @start="drag = true"
      @end="drag = false"
    >
      <task-preview
        v-for="task in groupToEdit.tasks"
        :key="task.id"
        :task="task"
      />
    </draggable>
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
import draggable from "vuedraggable";

export default {
  name: "group",
  props: ["group"],
  data() {
    return {
      groupToEdit: null,
      taskToEdit: {
        title: "",
        createdAt: null,
        status: null,
      },
    };
  },
  methods: {
    async addTask() {
      this.taskToEdit.createdAt = Date.now();
      await this.$store.dispatch({
        type: "saveTask",
        taskToEdit: this.taskToEdit,
        groupId: this.group.id,
      });

      this.taskToEdit = {
        title: "",
        createdAt: null,
        status: null,
      };
    },
    async saveGroup() {
      try {
        console.log(this.groupToEdit);
        const savedGroup = await this.$store.dispatch(
          "saveGroup",
          this.groupToEdit
        );
        this.groupToEdit = savedGroup;
      } catch (err) {
        console.log("Couldn`t Save Group", err);
        throw err;
      }
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  created() {
    this.groupToEdit = { ...this.group };
  },
  components: {
    taskPreview,
    draggable,
  },
};
</script>

<style>
</style>