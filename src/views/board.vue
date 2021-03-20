<template>
  <div class="board-surface">
    <!-- <div ref="capture"> -->
    <app-header />
    <div v-if="board" class="flex board" ref="screen">
      <task-details :drawer="isActivitiesOpen" />
      <div class="flex column board-container">
        <div class="flex column board-header">
          <div class="flex space-between top-header">
            <!-- <h1 class="board-title">{{ board.title }}</h1> -->
            <input
              class="board-title"
              v-if="editMode"
              v-model="boardToEdit.title"
              @keyup.enter="saveBoard(boardToEdit)"
              @focusout="saveBoard(boardToEdit)"
            />
            <div v-else>
              <h1 class="board-title" @click="editMode = true">
                {{ board.title }}
              </h1>
            </div>

            <div class="board-actions">
              <button>
                <font-awesome-icon class="header-icon plus" icon="plus" />
                Invite
              </button>
              <button @click="openActivities">
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
            <div :class="tableActive" @click="activateMainTable" class="main-table-wrapper">
              <button>Main Table</button>
            </div>
            <div :class="viewActive" @click="activateView" class="add-view-wrapper">
              <button>+ Add View</button>
            </div>
          </nav>
        </div>

        <div class="board-content-wrapper">
          <div class="groups-list">
            <draggable
              v-model="boardToEdit.groups"
              @change="saveBoard(boardToEdit)"
            >
              <group
                v-for="group in boardToEdit.groups"
                :group="group"
                :key="group.id"
              />
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import group from "../cmps/group";
import appHeader from "../cmps/header";
import draggable from "vuedraggable";
import taskDetails from "../cmps/task-details";

import { boardService } from "../services/board.service";

export default {
  name: "board",
  data() {
    return {
      board: null,
      boardToEdit: null,
      editMode: false,
      mainTable: true,
      addView: false
    };
  },
  methods: {
    activateMainTable() {
      this.addView = false
      this.mainTable = true
      console.log(this.mainTable);
    },
    activateView() {
      this.mainTable = false
      this.addView = true
      console.log(this.mainTable);
    },
    openActivities() {
      this.$store.commit({ type: "toggleActivities" });
    },
    async loadBoard() {
      try {
        const boardId = this.$route.params.boardId;
        const board = await this.$store.dispatch({
          type: "loadBoard",
          boardId,
        });
        this.board = board;
        this.boardToEdit = { ...board };
      } catch (err) {
        console.log("err:", err);
      } finally {
      }
    },
    async saveBoard(board) {
      this.editMode = false;
      console.log("saving");
      const boardWithUrl = await this.printScr(board);
      await this.$store.dispatch("saveBoard", boardWithUrl);
      await this.loadBoard();
    },
    async addNewGroup() {
      try {
        const newBoard = JSON.parse(JSON.stringify(this.board));
        newBoard.groups.unshift(boardService.getEmptyGroup());
        const savedBoard = await this.$store.dispatch("saveBoard", newBoard);
        this.loadBoard();
      } catch (err) {}
    },
    async printScr(board) {
      return html2canvas(this.$refs.screen).then((canvas) => {
        // console.log("canvas:", canvas);
                const pageImg = canvas.toDataURL();
                // console.log('pageImg:', pageImg);
        board.thumbnail = pageImg;
        return board;
      });
    },
  },
  computed: {
    isActivitiesOpen() {
      return this.$store.getters.isActivitiesOpen;
    },
    viewActive() {
      return { active: this.addView }
    },
    tableActive() {
      return { active: this.mainTable }
    }
  },
   created() {
      this.loadBoard();
  },
  components: {
    appHeader,
    group,
    draggable,
    taskDetails,
  },
};
</script>
    
