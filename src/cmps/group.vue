<template>
  <section class="group-container">
    <!-- <draggable
        v-model="board.groups"
        @change="saveGroup"
        v-bind="dragOptions"
      > -->
    <!-- <transition-group type="transition"> -->

    <div class="flex group-header">
      <el-dropdown @command="handleCommand" class="drop-down" trigger="click">
        <span :style="groupColor" class="el-dropdown-link">
          <el-tooltip
            class="item"
            effect="dark"
            content="Group Menu"
            placement="top-start"
          >
            <font-awesome-icon class="header-icon" icon="caret-square-down" />
          </el-tooltip>
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
          v-if="editMode"
          ref="input"
          v-model="groupToEdit.title"
          @keyup.enter="saveGroup"
          @focusout="saveGroup"
          class="group-title"
          :style="{ color: groupToEdit.style.color }"
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
        <label>Due Date</label>
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

      <div class="progress-bar-container">
        <div class="div-1"></div>
        <div class="div-2"></div>
        <div class="div-3"></div>
        <progress-bar :group="group"></progress-bar>
        <div class="div-4"></div>
        <progress-bar-priorities :group="group"></progress-bar-priorities>
        <div class="div-5"></div>
      </div>
    </div>
    <!-- </transition-group> -->
    <!-- </draggable> -->

    <!-- <div class="task-wrapper flex transparent">
      <div class="task-color-box-start"></div>
      <div class="task-title"></div>
      <div class="task-members-container"></div>
      <div class="status-container">
        <progress-bar :group="group"></progress-bar>
      </div>
      <div class="date-container"></div>
      <div class="priority-container">
        <progress-bar-priorities :group="group"></progress-bar-priorities>

      </div>
      <div class="task-color-box-end"></div> -->
    <!-- </div> -->
  </section>
</template>


<script>
import taskPreview from "./task-preview";
import draggable from "vuedraggable";
import progressBar from "../cmps/progress-bar";
import { Dropdown } from "element-ui";
import progressBarPriorities from "./progress-bar-priorities";

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
      if (!this.groupToEdit.title) {
        this.groupToEdit.title = "New Group";
        return;
      }
      try {
        this.editMode = false;
        await this.$emit("saveGroup", this.groupToEdit);
      } catch (err) {
        console.log("err:", err);
      }
    },
    // removeGroup() {
    //   this.$emit("removeGroup", this.group.id);
    // },
    async removeGroup() {
      try {
        await this.$confirm(
          "This will permanently delete the Group. Continue?",
          "Warning",
          {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        );
        try {
          this.$emit("removeGroup", this.group.id);
          this.$message({
            type: "success",
            message: "Delete completed",
          });
        } catch (err) {
          console.log("Couldn`t delete group", err);
        }
      } catch (err) {
        this.$message({
          type: "info",
          message: "Delete canceled",
        });
      }
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
    board() {
      return this.$store.getters.boardForDisplay;
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
    progressBarPriorities,
  },
};
</script>

<style>