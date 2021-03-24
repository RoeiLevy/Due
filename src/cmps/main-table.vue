<template>
  <div class="board-content-wrapper">
    <div class="new-group-wrapper">
      <el-button class="new-group-btn" @click="addNewGroup" type="primary"
        >New Group</el-button
      >
    </div>
    <div class="groups-list">
      <!-- <draggable
        v-model="boardToEdit.groups"
        @change="saveBoard"
        v-bind="dragOptions"
      >
        <transition-group type="transition"> -->
          <group
            v-for="group in board.groups"
            :key="group.id"
            :group="group"
            @removeTask="removeTask"
            @updateTask="updateTask"
            @saveGroup="saveGroup"
            @addTask="addTask"
            @removeGroup="removeGroup"
            @addStatus="addStatus"
            @deleteStatus="deleteStatus"
          />
        <!-- </transition-group>
      </draggable> -->
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import group from "./group";
export default {
  props: ["board"],
  data() {
    return {
    };
  },
  methods: {
    addTask(newTask, groupId) {
      this.$emit("addTask", newTask, groupId);
    },
    addStatus(status) {
      this.$emit("addStatus", status);
    },
    deleteStatus(statusId) {
      this.$emit("deleteStatus", statusId);
    },
    updateTask(task, groupId) {
      this.$emit("updateTask", task, groupId);
    },
    removeTask(task, groupId) {
      this.$emit("removeTask", task, groupId);
    },
    async saveGroup(groupToEdit) {
      this.$emit("saveGroup", groupToEdit);
    },
    removeGroup(groupId) {
      this.$emit("removeGroup", groupId);
    },
    addNewGroup() {
      this.$emit("addNewGroup");
    },
    saveBoard() {
      this.$emit("saveBoard", this.boardToEdit);
    },
  },
  computed:{
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    }
  },
  components: {
    group,
    draggable
  },
};
</script>
