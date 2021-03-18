<template>
  <div class="task-wrapper flex">
      <font-awesome-icon class="header-icon remove-btn" icon="trash" />
    <input
      v-if="editMode"
      v-model="taskToEdit.title"
      @keyup.enter="updateTask"
      @focusout="updateTask"
    />
    <div v-else class="task-title">
      <label class="task-title" @click="editMode = true">
        {{ taskToEdit.title }}
      </label>
    </div>

    <el-avatar
      v-for="member in task.members"
      :key="member._id"
      :size="30"
      :src="member.imgUrl"
    ></el-avatar>
    <div class="status-container">
      <h3
      class="task-status"
        @click="isSelectingStatus = !isSelectingStatus"
        v-if="task.status"
        :style="{ 'background-color': task.status.color }"
      >
        {{ task.status.title }}
      </h3>
      <h3 v-else @click="isSelectingStatus = !isSelectingStatus">Status</h3>
      <status-picker
        @setStatus="setStatus"
        v-if="isSelectingStatus"
      ></status-picker>
    </div>
    <input type="date" name="due-date" id="due-date" v-model="dueDate" />
  </div>
</template>

<script>
import moment from "moment";
import statusPicker from "./status-picker.vue";
export default {
  props: ["task"],
  data() {
    return {
      dueDate: "",
      isSelectingStatus: false,
      editMode: false,
      taskToEdit: null,
    };
  },
  methods: {
    async setStatus(status) {
      this.isSelectingStatus = false;
      try {
        this.taskToEdit.status = status;
        this.$emit("updateTask", this.taskToEdit);
        // await this.$store.dispatch("updateTask", this.taskToEdit);
        // this.taskToEdit = { ...this.task };
      } catch (err) {
        console.log("Couldn`t Save Task", err);
        throw err;
      }
    },
    updateTask() {
      console.log("test");
      this.editMode = false;
      this.$emit("updateTask", this.taskToEdit);
    },
  },
  created() {
    this.taskToEdit = { ...this.task };
  },
  components: {
    statusPicker,
  },
};
</script>

