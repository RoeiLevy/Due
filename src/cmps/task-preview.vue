<template>
  <div class="task-wrapper flex">
    <div :style="taskColor" class="task-color-box-start"></div>
    <div class="remove-btn-wrapper">
      <font-awesome-icon
        @click="removeTask"
        class="header-icon remove-btn"
        icon="trash"
      />
    </div>
    <input
      v-if="editMode"
      v-model="taskToEdit.title"
      @keyup.enter="updateTask"
      @focusout="updateTask"
    />
    <div v-else class="task-title">
      <label class="task-title-label" @click="editMode = true">
        {{ taskToEdit.title }}
      </label>
      <font-awesome-icon
        @click="openActivities"
        class="header-icon"
        icon="comment"
      />
    </div>
    <div class="task-members-container">
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
      <h3 v-else @click="isSelectingStatus = !isSelectingStatus">Status</h3>
      <status-picker
        @setStatus="setStatus"
        v-if="isSelectingStatus"
      ></status-picker>
    </div>
    <div class="date-container">
      <!-- <input type="date" name="due-date" id="due-date" v-model="dueDate" /> -->
      <el-date-picker v-model="dueDate" type="datetime" default-time="12:00:00">
      </el-date-picker>
    </div>
    <div class="task-color-box-end"></div>
  </div>
</template>

<script>
import moment from "moment";
import statusPicker from "./status-picker.vue";
export default {
  props: ["task", "groupColor"],
  data() {
    return {
      dueDate: "",
      isSelectingStatus: false,
      editMode: false,
      taskToEdit: null,
      styles: {
         'border-color': this.groupColor,
      }
    };
  },
  methods: {
    openActivities() {
      this.$store.commit({ type: "toggleActivities" });
    },
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
    removeTask() {
      console.log(this.task);
      this.$emit("removeTask", this.task.id);
    },
  },
  computed: {
    taskColor() {
      return `border-color: ${this.groupColor}`
    },
  },
  created() {
    console.log(this.groupColor);
    this.taskToEdit = { ...this.task };
  },
  components: {
    statusPicker,
  },
};
</script>

