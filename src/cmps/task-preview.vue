<template>
  <div class="task-wrapper flex">
    <div :style="taskColor" class="task-color-box-start"></div>
    <div class="remove-btn-wrapper" @click="removeTask">
      <font-awesome-icon class="header-icon remove-btn" icon="trash" />
    </div>
    <input
      v-if="editMode"
      ref="input"
      v-model="taskToEdit.title"
      @keyup.enter="updateTask"
      @focusout="updateTask"
      class="task-title-input"
    />
    <div v-else class="task-title">
      <label class="task-title-label" @click="handleEdit">
        {{ taskToEdit.title }}
      </label>
      <font-awesome-icon
        @click="openTaskDetails"
        class="header-icon"
        icon="comment"
      />
    </div>
    <div class="task-members-container" @click="addTaskMembers">
      <font-awesome-icon class="add-btn" icon="plus" />
      <div v-if="task.members" class="avatar-container">
        <el-avatar
          v-for="member in task.members"
          :key="member._id"
          :size="30"
          :src="member.imgUrl"
        ></el-avatar>
      </div>
      <el-avatar v-else icon="el-icon-user-solid" class="avatar"></el-avatar>
    </div>
    <div class="status-container">
      <h3
        class="task-status"
        @click="isSelectingStatus = !isSelectingStatus"
        v-if="task.status"
        :style="{ 'background-color': task.status.color }"
      >
        {{ task.status.title }}
      </h3>
      <h3 class="status-h3" v-else @click="isSelectingStatus = !isSelectingStatus">Status</h3>
      <status-picker
        @setStatus="setStatus"
        @addStatus="addStatus"
        @deleteStatus="deleteStatus"
        v-if="isSelectingStatus"
      ></status-picker>
    </div>
    <div class="date-container">
      <!-- <input type="date" name="due-date" id="due-date" v-model="dueDate" /> -->
      <!-- <el-date-picker v-model="dueDate" type="datetime" default-time="12:00:00"> -->
      <!-- </el-date-picker> -->
 <div class="date-container">
    <el-date-picker
      v-model="dueDate"
      type="datetime"
      placeholder="Select date and time">
    </el-date-picker>
  </div>
    </div>
    <div class="task-color-box-end"></div>
  </div>
</template>

<script>
import moment from "moment";
import statusPicker from "./status-picker.vue";

export default {
  name: "task-preview",
  props: ["task", "groupColor", "groupId"],
  data() {
    return {
      dueDate: "",
      isSelectingStatus: false,
      editMode: false,
      taskToEdit: null,
      styles: {
        "border-color": this.groupColor,
      },
    };
  },
  methods: {
    addTaskMembers() {},
    handleEdit() {
      this.editMode = true;
      setTimeout(() => {
        this.$refs.input.focus();
      }, 0);
    },
    addStatus(status) {
      this.$emit("addStatus", status);
    },
    deleteStatus(statusId) {
      if (this.task.status.id === statusId) this.task.status = null;
      this.$emit("deleteStatus", statusId);
    },
    openTaskDetails() {
      this.$store.commit({ type: "toggleIsDetails" });
      this.$router.push(
        `/board/${this.boardId}/${this.groupId}/task/${this.task.id}`
      );
    },
    setStatus(status) {
      this.isSelectingStatus = false;
      this.taskToEdit.status = status;
      this.$emit("updateTask", this.taskToEdit);
    },
    updateTask() {
      this.editMode = false;
      this.$emit("updateTask", this.taskToEdit);
    },
    removeTask() {
      this.$emit("removeTask", this.task.id);
    },
  },
  computed: {
    taskColor() {
      return `border-left-color: ${this.groupColor}`;
    },
    boardId() {
      return this.$store.getters.currBoardId;
    },
  },
  created() {
    this.taskToEdit = JSON.parse(JSON.stringify(this.task));
  },
  watch: {
    task: function (newVal, oldVal) {
      this.taskToEdit = JSON.parse(JSON.stringify(newVal));
    },
  },
  components: {
    statusPicker,
  },
};
</script>

