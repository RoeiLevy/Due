<template>
  <div class="board-surface">
    <app-header />
    <div v-if="boardToEdit" class="flex board" ref="screen">
      <workspace />
      <social-modal
        v-if="isAddingMembers"
        :members="boardToEdit.members"
        @addMember="addMember"
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
              <el-tabs v-model="activeTab">
                <el-tab-pane label="Main Table" name="main"></el-tab-pane>
                <el-tab-pane
                  v-for="(view, idx) in currBoard.views"
                  :key="idx"
                  :label="view"
                  :name="view"
                >
                  {{ view }}
                </el-tab-pane>
              </el-tabs>
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
              <el-dropdown-menu class="view-dropdown">
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
import boardActivities from "../cmps/board-activities.vue";
import workspace from "../cmps/workspace.vue";

import { boardService } from "../services/board.service";
import { utilService } from "../services/util.service";
import { socketService } from "../services/socket.service";

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
      activeTab: "main",
    };
  },
  methods: {
    async addStatus(status) {
      try {
        this.boardToEdit.statuses.push(status);
        await this.saveBoard();
        this.$store.dispatch({
          type: "sendActivity",
          txt: "Created a new status",
        });
      } catch (err) {
        console.log("err:", err);
      }
    },
    async deleteStatus(statusId) {
      try {
        const idx = this.boardToEdit.statuses.findIndex(
          (s) => s.id === statusId
        );
        this.boardToEdit.statuses.splice(idx, 1);
        await this.saveBoard();
        this.$store.dispatch({ type: "sendActivity", txt: "Removed a status" });
      } catch (err) {
        console.log("err:", err);
      }
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
        this.$store.dispatch({ type: "sendActivity", txt: "Removed a group" });
        // Add user msg
      } catch (err) {
        console.log("Couldn`t remove Group", err);
        throw err;
      }
    },
    async saveGroup(groupToEdit) {
      try {
        const groupIdx = this.boardToEdit.groups.findIndex(
          (g) => g.id === groupToEdit.id
        );
        this.boardToEdit.groups.splice(groupIdx, 1, groupToEdit);
        const savedGroup = await this.$store.dispatch({
          type: "saveBoard",
          boardToSave: this.boardToEdit,
        });

        // this.$store.dispatch({ type: "sendActivity", txt: "Edited a group" });
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
        this.$store.dispatch({
          type: "sendActivity",
          txt: `Created a new task "${newTask.title}"`,
          task: { id: newTask.id, title: newTask.title },
        });

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

        this.$store.dispatch({
          type: "sendActivity",
          txt: "Updated a task",
          task: { id: task.id, title: task.title },
        });
        // Add user msg
      } catch (err) {
        console.log("Couldn`t remove Task", err);
        throw err;
      }
    },
    async removeTask(task, groupId) {
      try {
        const boardCopy = JSON.parse(JSON.stringify(this.boardToEdit));

        const groupIdx = boardCopy.groups.findIndex(
          (group) => group.id === groupId
        );
        const taskIdx = boardCopy.groups[groupIdx].tasks.findIndex(
          (item) => item.id === task.id
        );
        boardCopy.groups[groupIdx].tasks.splice(taskIdx, 1);

        this.boardToEdit = boardCopy;

        const removedTask = await this.$store.dispatch({
          type: "saveBoard",
          boardToSave: this.boardToEdit,
        });

        this.$store.dispatch({
          type: "sendActivity",
          txt: `Removed task "${task.title}"`,
        });
        // Add user msg
      } catch (err) {
        console.log("err:", err);
      }
    },
    addView(command) {
      this.boardToEdit.views.push(command);
      this.saveBoard();
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
        const savedBoard = await this.$store.dispatch({
          type: "saveBoard",
          boardToSave: boardWithUrl,
        });

        return savedBoard;
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
        this.$store.dispatch({ type: "sendActivity", txt: "Added a group" });
        // Add user msg
      } catch (err) {
        console.log("err:", err);
      }
    },
    async printScr(board) {
      try {
        const canvas = await html2canvas(this.$refs.screen);
        const pageImg = canvas.toDataURL();
        const cloudUrl = await utilService.uploadImg(pageImg);
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
    addActivity(newActivity) {
      const boardCopy = JSON.parse(JSON.stringify(this.boardToEdit));
      boardCopy.activities.unshift(newActivity);
      this.boardToEdit = boardCopy;
    },
    setBoard(board) {
      this.boardToEdit = board;
    },
    async addMember(email) {
      try {
        const memberToAdd = await this.$store.dispatch({
          type: "validateUserByEmail",
          email,
        });
        this.boardToEdit.members.unshift(memberToAdd);
        this.$store.dispatch({
          type: "saveBoard",
          boardToSave: this.boardToEdit,
        });
      } catch (err) {
        console.log("err:", err);
      }
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
    const boardId = this.$route.params.boardId;
    // socketService.setup();
    socketService.emit("chat topic", boardId);
    socketService.on("add activity", this.addActivity);
    socketService.on("get board", this.setBoard);
  },
  destroyed() {
    socketService.off("get board", this.setBoard);
    socketService.off("add activity", this.addMsg);
    socketService.terminate();
  },
  components: {
    appHeader,
    group,
    draggable,
    taskDetails,
    barChart,
    socialModal,
    boardActivities,
    workspace,
  },
};
</script>
    
