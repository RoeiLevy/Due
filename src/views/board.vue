<template>
  <div class="board-surface">
    <!-- <div ref="capture"> -->
    <app-header />
    <!-- <bar-chart v-if="boardToEdit" :board="boardToEdit"></bar-chart> -->

    <div v-if="boardToEdit" class="flex board" ref="screen">
      <social-modal
        v-if="isAddingMembers"
        :members="boardToEdit.members"
      ></social-modal>
      <task-details :drawer="isTaskDetails" />
      <board-activities :board="boardToEdit" :drawer="isBoardActivities" />
      <div class="flex column board-container">
        <div class="flex column board-header">
          <div class="flex space-between top-header">
            <div class="board-title-container">
              <input
                class="board-title"
                v-if="titleEditMode"
                ref="title"
                v-model="boardToEdit.title"
                @keyup.enter="saveBoard"
                @focusout="saveBoard"
              />
              <div v-else>
                <h1 class="board-title" @click="handleEdit('title')">
                  {{ boardToEdit.title }}
                </h1>
              </div>

              <!-- //////////////////////////////////// -->

              <input
                class="board-description"
                v-if="descEditMode"
                ref="description"
                v-model="boardToEdit.description"
                @keyup.enter="saveBoard(boardToEdit)"
                @focusout="saveBoard(boardToEdit)"
              />
              <div v-else>
                <p class="board-description" @click="handleEdit('description')">
                  {{ boardDescription }}
                </p>
              </div>
            </div>

            <!-- //////////////////////////////////// -->

            <div class="board-actions">
              <button @click="isAddingMembers = !isAddingMembers">
                <font-awesome-icon class="header-icon" icon="user-friends" />
                Members/
                <font-awesome-icon class="header-icon plus" icon="user-plus" />
                Invite
              </button>
              <button @click="openBoardActivities">
                <font-awesome-icon class="header-icon" icon="chart-line" />
                Activity
              </button>
            </div>
          </div>

          <nav class="flex header-view-bar">
            <div class="new-group-wrapper">
              <el-button
                class="new-group-btn"
                @click="addNewGroup"
                type="primary"
                >New Group</el-button
              >
            </div>
            <div
              :class="tableActive"
              @click="activateMainTable"
              class="main-table-wrapper"
            >
              <button>Main Table</button>
              <div v-for="(view, idx) in currBoard.views" :key="idx">
                <button class="view-btn">
                  {{ view }}
                  <!-- <span class="view-menu-btn">Menu</span> -->
                  <el-dropdown trigger="click" class="view-menu-btn">
                    <span class="el-dropdown-link">
                      <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>Rename</el-dropdown-item>
                      <el-dropdown-item>Duplicate</el-dropdown-item>
                      <el-dropdown-item style="'background-color:red'"
                        >Remove</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </button>
              </div>
            </div>
            <el-dropdown
              class="views-drop-down add-view-wrapper"
              trigger="click"
            >
              <span class="views-el-dropdown-link add-view-wrapper">
                <button>
                  <font-awesome-icon class="header-icon" icon="plus" /> Add View
                </button>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click="addView('Calander')"
                  >Calander</el-dropdown-item
                >
                <el-dropdown-item @click="addView('Chart')"
                  >Chart</el-dropdown-item
                >
                <el-dropdown-item @click="addView('Kanban')"
                  >Kanban</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </nav>
        </div>

        <div class="board-content-wrapper">
          <div class="groups-list">
            <!-- <draggable
              v-model="boardToEdit.groups"
              @change="saveBoard(boardToEdit)"
              v-bind="dragOptions"
            >
              <transition-group type="transition"> -->
            <group
              v-for="group in boardToEdit.groups"
              :key="group.id"
              :group="group"
              @loadBoard="loadBoard"
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
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import group from "../cmps/group";
import socialModal from "../cmps/social-modal";
import appHeader from "../cmps/header";
import draggable from "vuedraggable";
import taskDetails from "../cmps/task-details";
import barChart from "../cmps/bar-chart";

import { boardService } from "../services/board.service";
import { utilService } from "../services/util.service";
import boardActivities from "../cmps/board-activities.vue";

export default {
  name: "board",
  data() {
    return {
      groups: [],
      boardToEdit: null,
      titleEditMode: false,
      descEditMode: false,
      mainTable: true,
      addingView: false,
      isAddingMembers: false,
    };
  },
  methods: {
    addStatus(status) {
      this.boardToEdit.statuses.push(status);
      this.saveBoard();
    },
    deleteStatus(statusId) {
      const idx = this.boardToEdit.statuses.findIndex((s) => s.id === statusId);
      this.boardToEdit.statuses.splice(idx, 1);
      this.saveBoard();
    },
    async removeGroup(groupId) {
      try {
        const groupIdx = this.boardToEdit.groups.findIndex(
          (g) => g.id === groupId
        );
        this.boardToEdit.groups.splice(groupIdx, 1);

        await this.$store.dispatch({
          type: "saveBoard",
          boardToSave: this.boardToEdit,
        });
        // Add user msg
      } catch (err) {
        console.log("Couldn`t remove Group", err);
        throw err;
      }
    },
    async saveGroup(groupToEdit) {
      console.log("saving");
      try {
        const groupIdx = this.boardToEdit.groups.findIndex(
          (g) => g.id === groupToEdit.id
        );
        this.boardToEdit.groups.splice(groupIdx, 1, groupToEdit);
        const savedGroup = await this.$store.dispatch({
          type: "saveBoard",
          boardToSave: this.boardToEdit,
        });

        // Add user msg
        return savedGroup;
      } catch (err) {
        console.log("Couldn`t Save Group", err);
        throw err;
      }
    },
    async addTask(newTask, groupId) {
      try {
        newTask.createdAt = Date.now();
        newTask.id = utilService.makeId();
        const groupIdx = this.boardToEdit.groups.findIndex(
          (g) => g.id === groupId
        );
        this.boardToEdit.groups[groupIdx].tasks.push(newTask);

        const groupToSave = JSON.parse(
          JSON.stringify(this.boardToEdit.groups[groupIdx])
        );
        const savedGroup = await this.saveGroup(groupToSave);

        // Add user msg
        return savedGroup;
      } catch (err) {
        console.log("err:", err);
      }
    },
    async updateTask(task, groupId) {
      try {
        const groupIdx = this.boardToEdit.groups.findIndex(
          (g) => g.id === groupId
        );
        const taskIdx = this.boardToEdit.groups[groupIdx].tasks.findIndex(
          (t) => t.id === task.id
        );
        this.boardToEdit.groups[groupIdx].tasks.splice(taskIdx, 1, task);
        await this.$store.dispatch({
          type: "saveBoard",
          boardToSave: this.boardToEdit,
        });
        // Add user msg
      } catch (err) {
        console.log("Couldn`t remove Task", err);
        throw err;
      }
    },
    async removeTask(taskId, groupId) {
      try {
        const groupIdx = this.boardToEdit.groups.findIndex(
          (group) => group.id === groupId
        );
        const taskIdx = this.boardToEdit.groups[groupIdx].tasks.findIndex(
          (item) => item.id === taskId
        );
        this.boardToEdit.groups[groupIdx].tasks.splice(taskIdx, 1);
        await this.$store.dispatch({
          type: "saveBoard",
          boardToSave: this.boardToEdit,
        });
        // Add user msg
      } catch (err) {
        console.log("err:", err);
      }
    },
    addView(command) {
      this.boardToEdit.views.push(command);
      this.saveBoard(this.boardToEdit);
    },
    handleEdit(item) {
      switch (item) {
        case "description":
          this.descEditMode = true;
          setTimeout(() => {
            this.$refs.description.focus();
          }, 0);
          break;

        case "title":
          this.titleEditMode = true;
          setTimeout(() => {
            this.$refs.title.focus();
          }, 0);
          break;
      }
    },
    activateMainTable() {
      this.addingView = false;
      this.mainTable = true;
    },
    activateView() {
      this.mainTable = false;
      this.addingView = true;
      console.log(this.mainTable);
    },
    openBoardActivities() {
      this.$store.commit({ type: "toggleIsBoardActivities" });
    },
    async loadBoard() {
      try {
        const boardId = this.$route.params.boardId;
        const board = await this.$store.dispatch({
          type: "loadBoard",
          boardId,
        });
        this.boardToEdit = JSON.parse(JSON.stringify(board));
      } catch (err) {
        console.log("err:", err);
      }
    },
    async saveBoard() {
      try {
        this.titleEditMode = false;
        this.descEditMode = false;
        const boardWithUrl = await this.printScr(
          JSON.parse(JSON.stringify(this.boardToEdit))
        );
        await this.$store.dispatch({
          type: "saveBoard",
          boardToSave: boardWithUrl,
        });
        // this.loadBoard();
      } catch (err) {
        console.log("err:", err);
      }
    },
    async addNewGroup() {
      try {
        const newGroup = boardService.getEmptyGroup();
        this.boardToEdit.groups.unshift(newGroup);
        await this.$store.dispatch({
          type: "saveBoard",
          boardToSave: this.boardToEdit,
        });
        // Add user msg
      } catch (err) {
        console.log("err:", err);
      }
    },
    async printScr(board) {
      try {
        const canvas = await html2canvas(this.$refs.screen);
        const pageImg = canvas.toDataURL();
        const cloudUrl= await utilService.uploadImg(pageImg)
        board.thumbnail = cloudUrl;
        return board;
      } catch (err) {
        console.log("err:", err);
      }
      // return html2canvas(this.$refs.screen).then((canvas) => {
      //   const pageImg = canvas.toDataURL();
      //   board.thumbnail = pageImg;
      //   return board;
      // });
    },
  },
  mounted() {
    // if(this.board)this.printScr()
    // else setTimeout(()=>this.printScr(),1000);
  },
  computed: {
    boardDescription() {
      if (!this.boardToEdit.description) return "Add a description";
      else return this.boardToEdit.description;
    },
    currBoard() {
      return this.$store.getters.boardForDisplay;
    },
    isBoardActivities() {
      return this.$store.getters.isBoardActivities;
    },
    isTaskDetails() {
      return this.$store.getters.isTaskDetails;
    },
    viewActive() {
      return { active: this.addingView };
    },
    tableActive() {
      return { active: this.mainTable };
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
    this.loadBoard();
  },
  components: {
    appHeader,
    group,
    draggable,
    taskDetails,
    barChart,
    socialModal,
    boardActivities,
  },
};
</script>
    
