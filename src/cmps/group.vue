<template>
  <section class="group-container">
    <div class="flex group-header">
      <el-dropdown @command="handleCommand" class="drop-down" trigger="click">
        <span :style="groupColor" class="el-dropdown-link">
          <font-awesome-icon class="header-icon" icon="caret-square-down" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="removeGroup"
            >Delete Group</el-dropdown-item
          >
          <el-dropdown-item class="dropdown-change-color"
            >Change Group Color
            <el-color-picker
              @change="saveGroup"
              v-model="groupToEdit.style.color"
              size="mini"
            ></el-color-picker>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="group-title-wrapper">
        <input
          required
          v-if="editMode"
          ref="input"
          v-model="groupToEdit.title"
          @keyup.enter="saveGroup"
          @focusout="saveGroup"
          class="group-title"
        />
        <div v-else>
          <h1
            :style="{ color: groupToEdit.style.color }"
            class="group-title"
            @click="handleEdit"
          >
            {{ group.title }}
          </h1>
        </div>
      </div>
      <div class="members-wrapper">
        <label>Members</label>
      </div>
      <div class="status-wrapper">
        <label>Status</label>
      </div>
      <div class="dueDate-wrapper">
        <label>dueDate</label>
      </div>
      <div class="priority-wrapper">
        <label>Priority</label>
      </div>
      <div class="space-box"></div>
    </div>
    <draggable
      v-model="groupToEdit.tasks"
      @change="saveGroup"
      v-bind="dragOptions"
    >
      <transition-group type="transition">
        <task-preview
          :groupId="group.id"
          :groupColor="group.style.color"
          v-for="task in group.tasks"
          :key="task.id"
          :task="task"
          @removeTask="removeTask"
          @updateTask="updateTask"
          @addStatus="addStatus"
          @deleteStatus="deleteStatus"
          @addPriority="addPriority"
          @deletePriority="deletePriority"
        />
      </transition-group>
    </draggable>
    <div class="group-footer">
      <div class="add-task-wrapper">
        <form class="flex add-task-form" @submit.prevent="addTask()">
          <input
            :style="{ 'border-left-color': group.style.color }"
            class="add-task-input"
            type="text"
            placeholder="    + Add Task"
            v-model="taskToEdit.title"
          />
          <button v-if="taskToEdit" class="add-task-btn">Add</button>
        </form>
      </div>
      <progress-bar :group="group"></progress-bar>
    </div>
  </section>
</template>


<script>
import taskPreview from "./task-preview";
import draggable from "vuedraggable";
import progressBar from "../cmps/progress-bar";
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
        priority: null,
        comments: [],
      },
      editMode: false,
    };
  },
  methods: {
    handleEdit() {
      this.editMode = true;
      setTimeout(() => {
        this.$refs.input.focus();
      }, 0);
    },
    handleCommand(command) {
      switch (command) {
        case "removeGroup":
          this.removeGroup();
          break;
        case "saveGroup":
          this.saveGroup();
          break;
      }
    },
    addTask() {
      const newTask = JSON.parse(JSON.stringify(this.taskToEdit));
      this.$emit("addTask", newTask, this.group.id);
      this.taskToEdit = {
        title: "",
        createdAt: null,
        status: null,
        comments: [],
      };
    },
    addStatus(status) {
      this.$emit("addStatus", status);
    },
    deleteStatus(statusId) {
      this.$emit("deleteStatus", statusId);
    },
    addPriority(priority) {
      this.$emit("addPriority", priority);
    },
    deletePriority(priorityId) {
      this.$emit("deletePriority", priorityId);
    },
    updateTask(task) {
      this.$emit("updateTask", task, this.group.id);
    },
    removeTask(task) {
      this.$emit("removeTask", task, this.group.id);
    },
    async saveGroup() {
      try {
        this.editMode = false;
        await this.$emit("saveGroup", this.groupToEdit);
      } catch (err) {
        console.log("err:", err);
      }
    },
    removeGroup() {
      this.$emit("removeGroup", this.group.id);
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    groupColor() {
      return `color: ${this.group.style.color}`;
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  created() {
    this.groupToEdit = JSON.parse(JSON.stringify(this.group));
  },
  watch: {
    group: function (newVal, oldVal) {
      this.groupToEdit = JSON.parse(JSON.stringify(newVal));
    },
  },
  components: {
    taskPreview,
    draggable,
    Dropdown,
    progressBar,
  },
};
</script>

<style>
</style>