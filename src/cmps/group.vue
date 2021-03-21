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
          <el-dropdown-item>Action 3</el-dropdown-item>
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
        />
        <div v-else>
          <h1 class="group-title" @click="handleEdit">
            {{ groupToEdit.title }}
          </h1>
        </div>
        <!-- <label v-for="(header, idx) in group.headers" :key="idx">{{
          header
        }}</label> -->
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
      <div class="space-box"></div>
    </div>
    <draggable
      v-model="groupToEdit.tasks"
      @change="saveGroup"
      v-bind="dragOptions">
   <transition-group type="transition">
        <task-preview
          :groupId="group.id"
          :groupColor="group.style.color"
          @removeTask="removeTask"
          v-for="task in groupToEdit.tasks"
          :key="task.id"
          :task="task"
          @updateTask="updateTask"
        />
      </transition-group> 
    </draggable>
    <div class="group-footer">
      <div class="add-task-wrapper">
        <form class="flex add-task-form" @submit.prevent="addTask()">
          <input
            class="add-task-input"
            type="text"
            placeholder="    + Add Task"
            v-model="taskToEdit.title"
          />
          <button v-if="taskToEdit" class="add-task-btn">Add</button>
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
    handleEdit() {
      this.editMode = true;
      setTimeout(() => {
        this.$refs.input.focus();
      }, 0);
    },
    handleCommand(command) {
      this.$message("click on item " + command);
      switch (command) {
        case "removeGroup":
          this.removeGroup();
        case "saveGroup":
          this.saveGroup();
      }
    },
    async addTask() {
      this.taskToEdit.createdAt = Date.now();
      const task=await this.$store.dispatch({
        type: "addTask",
        taskToEdit: this.taskToEdit,
        groupId: this.group.id,
      });
      this.groupToEdit.tasks.push(task)
      this.$emit('loadBoard');
      this.taskToEdit = {
        title: "",
        createdAt: null,
        status: null,
      };
    },
    async updateTask(task) {
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
    async removeTask(taskId) {
      console.log("task from group emit", taskId);
        this.$emit('removeTask', taskId, this.group.id);
      // try {
      //   await this.$store.dispatch({
      //     type: "removeTask",
      //     taskId,
      //     groupId: this.group.id,
      //   });
      // } catch (err) {
      //   console.log("Couldn`t remove Task", err);
      //   throw err;
      // }
    },
    async saveGroup() {
      try {
        console.log("saving group");
        this.editMode = false;
        await this.$store.dispatch("saveGroup", this.groupToEdit);
        this.groupToEdit = JSON.parse(JSON.stringify(this.group));
        // { ...this.group };
      } catch (err) {
        console.log("Couldn`t Save Group", err);
        throw err;
      }
    },
    async removeGroup() {
      try {
        await this.$store.dispatch({
          type: "removeGroup",
          groupId: this.group.id,
        });
        console.log("removed group successfully");
      } catch (err) {
        console.log("err:", err);
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
  },
  created() {
    this.groupToEdit = JSON.parse(JSON.stringify(this.group));
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