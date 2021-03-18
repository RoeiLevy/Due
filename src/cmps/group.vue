<template>
  <section class="group-container">
    <div class="flex group-header">
      <el-dropdown @command="handleCommand" class="drop-down" trigger="click">
        <span class="el-dropdown-link">
          <font-awesome-icon class="header-icon" icon="caret-square-down" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="removeTask">Delete Group</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="group-title-wrapper">
        <input
          v-if="editMode"
          v-model="groupToEdit.title"
          @keyup.enter="saveGroup"
        />
        <div v-else>
          <label class="group-title" @click="editMode = true">
            {{ groupToEdit.title }}
          </label>
        </div>
      </div>
    </div>

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
        @updateTask="updateTask"
      />
    </draggable>
    <div class="group-footer">
      <div class="add-task-wrapper">
      <form @submit.prevent="addTask()">
        <input
          class="add-task-input"
          type="text"
          placeholder="Add Task"
          v-model="taskToEdit.title"
        />
        <button v-if="taskToEdit" class="add-task">Add</button>
      </form>
      </div>
    </div>
  </section>
</template>


<script>
import taskPreview from "./task-preview.vue";
import draggable from "vuedraggable";
import { Dropdown } from "element-ui";
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
      editMode: false,
    };
  },
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
      switch (command) {
        case "removeTask":
          this.removeTask();
      }
    },
    async removeTask() {
      try {
      } catch (err) {
        console.log("err:", err);
      }
    },
    async addTask() {
      this.taskToEdit.createdAt = Date.now();
      await this.$store.dispatch({
        type: "addTask",
        taskToEdit: this.taskToEdit,
        groupId: this.group.id,
      });

      this.taskToEdit = {
        title: "",
        createdAt: null,
        status: null,
      };
    },
    async updateTask(task) {
      console.log("task from group emit", task);
      try {
        await this.$store.dispatch({
          type: "updateTask",
          taskToEdit: task,
          groupId: this.group.id,
        });
      } catch (err) {
        console.log("Couldn`t update Task", err);
        throw err;
      }
    },
    async saveGroup() {
      try {
        this.editMode = false;

        await this.$store.dispatch("saveGroup", this.groupToEdit);
        this.groupToEdit = { ...this.group };
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
    // this.$on("updateTask", this.updateTask);
  },
  components: {
    taskPreview,
    draggable,
    Dropdown,
  },
};
</script>

<style>
</style>