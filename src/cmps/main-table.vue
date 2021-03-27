<template>
  <div class="board-content-wrapper">
    <div class="new-group-wrapper">
      <el-button class="new-group-btn" @click="addNewGroup" type="primary"
        >New Group</el-button
      >
    </div>
    <div class="groups-list">
      <draggable
        v-model="boardToEdit.groups"
        @change="saveBoard"
        v-bind="dragOptions"
      >
        <transition-group type="transition">
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
            @addPriority="addPriority"
            @deletePriority="deletePriority"
          />
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import group from "./group";

export default {
  props: ["board"],
  data(){
    return{
      boardToEdit: null
    }

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
    addPriority(priority) {
      this.$emit("addPriority", priority);
    },
    deletePriority(priorityId) {
      this.$emit("deletePriority", priorityId);
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
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "groups",
        // disabled: false,
        ghostClass: "ghost",
      };
    },
  },
    watch: {
      board: function (newVal, oldVal) {
        // console.log('oldVal', oldVal.groups)
        // console.log('newVal', newVal.groups)
      this.boardToEdit = JSON.parse(JSON.stringify(newVal));
    },

    },
    created(){
      this.boardToEdit = JSON.parse(JSON.stringify(this.board));

    },
  components: {
    group,
    draggable,
  },
};
</script>
