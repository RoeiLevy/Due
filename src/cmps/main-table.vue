<template>
  <div class="board-content-wrapper">
    <div class="new-group-wrapper">
      <el-button class="new-group-btn" @click="addNewGroup" type="primary"
        >New Group</el-button
      >
        <div class="search-bar">
              <div class="search" @click.stop="searchMode = true">
                <font-awesome-icon
                  v-if="!searchMode"
                  icon="search"
                  class="search-bar-icon"
                />
                <el-input
                  v-else
                  @blur="searchMode = false"
                  placeholder="Search"
                  v-model="filterBy.txt"
                  @input="setFilter"
                >
                </el-input>
                <p v-if="!searchMode" class="search-title">Search</p>
              </div>

              <div class="filter" @click="filterMode = !filterMode">
                <font-awesome-icon
                  v-if="!filterMode"
                  icon="filter"
                  class="search-bar-icon"
                />
                <el-select
                  @blur="filterMode = !filterMode"
                  @clear="filterMode = !filterMode"
                  v-else
                  v-model="filterBy.member"
                  placeholder="By Members"
                  :clearable="true"
                  @change="setFilter"
                >
                  <el-option
                    v-for="member in boardToEdit.members"
                    :key="member.id"
                    :label="member.fullname"
                    :value="member"
                  >
                  </el-option>
                </el-select>
                <p v-if="!filterMode" class="filter-title">Filter</p>
              </div>
            </div>
    </div>
    <div class="groups-list">
      <draggable
        v-model="boardToEdit.groups"
        @change="saveBoard"
        v-bind="dragOptions"
      >
        <transition-group type="transition">
          <group
            v-for="group in boardToEdit.groups"
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
  data() {
    return {
      boardToEdit: null,
        filterBy: {
        txt: null,
        member: null,
      },
      searchMode: false,
      filterMode: false,
    };
  },
  methods: {
    setFilter() {
      this.$emit('setFilter', this.filterBy)
      console.log('this.filterBy:', this.filterBy)
    },
    async saveBoard() {
      try {
        await this.$store.dispatch({
          type: "saveBoard",
          boardToSave: this.boardToEdit,
        });
      } catch (err) {
        console.log("err:", err);
      }
    },
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
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "groups",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  watch: {
    board: function (newVal, oldVal) {
      this.boardToEdit = JSON.parse(JSON.stringify(newVal));
    },
  },
  created() {
    this.boardToEdit = JSON.parse(JSON.stringify(this.board));
  },
  components: {
    group,
    draggable,
  },
};
</script>
