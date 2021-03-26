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
      <el-badge
        v-if="task.comments"
        :hidden="isTaskComments"
        :value="task.comments.length"
        class="comment-badage"
        type="primary"
      >
        <font-awesome-icon
          @click="openTaskDetails"
          class="header-icon"
          icon="comment"
        />
      </el-badge>
    </div>
    <div class="task-members-container">
      <font-awesome-icon
        @click="toggleAddingMember"
        class="add-btn"
        icon="plus"
      >
      </font-awesome-icon>
      <task-add-member
        :taskMembers="task.members"
        @toggleMember="toggleMember"
        v-if="isAddingMember"
      ></task-add-member>
      <div v-if="task.members" class="avatar-container">
        <el-badge type=info v-if="extraMembers" :value="extraMembers" class="members-badage"></el-badge>
        <avatar
          class="member-avatar"
          v-for="member in membersToShow"
          :key="member._id"
          :size="30"
          :username="member.fullname"
          :src="member.imgUrl"
        ></avatar>
      </div>
      <el-avatar v-else icon="el-icon-user-solid" class="avatar"></el-avatar>
    </div>
    <div class="status-container">
      <h3
        class="task-status"
        @click="toggleAddingStatus"
        v-if="taskToEdit.status"
        style="text-transform: capitalize"
        :style="{ 'background-color': taskToEdit.status.color }"
      >
        {{ taskToEdit.status.title }}
      </h3>
      <h3 class="status-h3" v-else @click="toggleAddingStatus">Status</h3>
      <status-picker
        @setStatus="setStatus"
        @addStatus="addStatus"
        @deleteStatus="deleteStatus"
        v-if="isSelectingStatus"
      ></status-picker>
    </div>
    <div class="date-container">
      <VueDatePicker v-model="dueDate" clearable :placeholder="pickDate" />
    </div>
    <div class="priority-container">
      <h3
        class="task-priority"
        @click="toggleAddingPriority"
        v-if="taskToEdit.priority"
        style="text-transform: capitalize"
        :style="{ 'background-color': taskToEdit.priority.color }"
      >
        {{ taskToEdit.priority.title }}
      </h3>
      <h3 class="priority-h3" v-else @click="toggleAddingPriority">Priority</h3>
      <priority-picker
        @setPriority="setPriority"
        @addPriority="addPriority"
        @deletePriority="deletePriority"
        v-if="isSelectingPriority"
      ></priority-picker>
    </div>
    <div class="task-color-box-end"></div>
  </div>
</template>

<script>
import statusPicker from "./status-picker";
import priorityPicker from "./priority-picker";
import taskAddMember from "./task-add-member";
import Avatar from "vue-avatar";

export default {
  name: "task-preview",
  props: ["task", "groupColor", "groupId"],
  data() {
    return {
      dueDate: null,
      isSelectingStatus: false,
      isSelectingPriority: false,
      isAddingMember: false,
      editMode: false,
      taskToEdit: null,
      styles: {
        "border-color": this.groupColor,
      },
    };
  },
  methods: {
    toggleMember(member) {
      if (!this.taskToEdit.members) this.taskToEdit.members = [];
      if (this.taskToEdit.members.some((m) => m._id === member._id)) {
        const memberIdx = this.taskToEdit.members.findIndex(
          (m) => m._id === member._id
        );
        this.taskToEdit.members.splice(memberIdx, 1);
      } else {
        this.taskToEdit.members.unshift(member);
      }
      console.log("task members", this.taskToEdit.members);
      this.updateTask();
    },
    toggleAddingMember() {
      this.isAddingMember = !this.isAddingMember;
      this.$store.commit("toggleCloseScreen");
    },
    toggleAddingStatus() {
      this.isSelectingStatus = !this.isSelectingStatus;
      this.$store.commit("toggleCloseScreen");
    },
    toggleAddingPriority() {
      this.isSelectingPriority = !this.isSelectingPriority;
      this.$store.commit("toggleCloseScreen");
    },
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
        `/board/${this.boardId}/maintable/${this.groupId}/task/${this.task.id}`
      );
    },
    setStatus(status) {
      this.isSelectingStatus = false;
      this.taskToEdit.status = { ...status };
      this.$emit("updateTask", this.taskToEdit);
      this.$store.commit("toggleCloseScreen");
    },
    addPriority(priority) {
      this.$emit("addPriority", priority);
    },
    deletePriority(priorityId) {
      if (this.task.priority.id === priorityId) this.task.priority = null;
      this.$emit("deletePriority", priorityId);
    },
    setPriority(priority) {
      this.isSelectingPriority = false;
      this.taskToEdit.priority = { ...priority };
      this.$emit("updateTask", this.taskToEdit);
      this.$store.commit("toggleCloseScreen");
    },
    updateTask() {
      this.editMode = false;
      this.$emit("updateTask", this.taskToEdit);
      // this.dueDate = null;
    },
    removeTask() {
      this.$emit("removeTask", this.task);
    },
  },
  computed: {
     membersToShow() {
      if (this.task.members.length > 3) {
        return this.task.members.slice(0, 3);
      } else return this.task.members
    },
    extraMembers() {
        if  (this.task.members.length > 3) {
            return `+ ${this.task.members.length - 3}` 
        } else return false
    },
    isCloseScreen() {
      return this.$store.getters.isCloseScreen;
    },
    isTaskComments() {
      return this.task.comments.length ? false : true;
    },
    taskColor() {
      return `border-left-color: ${this.groupColor}`;
    },
    boardId() {
      return this.$store.getters.currBoardId;
    },
    pickDate() {
      return this.taskToEdit.dueDate ? this.taskToEdit.dueDate : "Choose Date";
    },
  },
  created() {
    this.taskToEdit = JSON.parse(JSON.stringify(this.task));
  },
  watch: {
    task: function (newVal, oldVal) {
      this.taskToEdit = JSON.parse(JSON.stringify(newVal));
    },
    dueDate: function () {
      this.taskToEdit.dueDate = this.dueDate;
      this.updateTask();
    },
    isCloseScreen(newValue) {
      if (!newValue) {
        this.isAddingMember = false;
        this.isSelectingStatus = false;
        this.isSelectingPriority = false;
      }
    },
  },
  components: {
    statusPicker,
    taskAddMember,
    Avatar,
    priorityPicker,
  },
};
</script>

