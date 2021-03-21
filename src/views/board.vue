<template>
  <div class="board-surface">
    <!-- <div ref="capture"> -->
    <app-header />
    <!-- <bar-chart v-if="board" :board="board"></bar-chart> -->

    <div v-if="board" class="flex board" ref="screen">
      <social-modal v-if="isAddingMembers" :members="board.members"></social-modal>
      <task-details :drawer="isActivitiesOpen" />
      <div class="flex column board-container">
        <div class="flex column board-header">
          <div class="flex space-between top-header">
            <div class="board-title-container">
            <input
              class="board-title"
              v-if="editMode"
              ref="input"
              v-model="boardToEdit.title"
              @keyup.enter="saveBoard(boardToEdit)"
              @focusout="saveBoard(boardToEdit)"
            />
            <div v-else>
              <h1 class="board-title" @click="handleEdit">
                {{ boardToEdit.title }}
              </h1>
            </div>

<!-- //////////////////////////////////// -->

            <input
              class="board-description"
              v-if="editMode"
              ref="input"
              v-model="boardToEdit.description"
              @keyup.enter="saveBoard(boardToEdit)"
              @focusout="saveBoard(boardToEdit)"
            />
            <div v-else>
              <p class="board-description" @click="handleEdit">
                {{ boardToEdit.description }}
              </p>
            </div>
          </div>

<!-- //////////////////////////////////// -->

            <div class="board-actions">
              <button @click="isAddingMembers=!isAddingMembers">
                <font-awesome-icon class="header-icon" icon="user-friends" />
                Members/
                <font-awesome-icon class="header-icon plus" icon="user-plus" />
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
import socialModal from '../cmps/social-modal'
import appHeader from "../cmps/header";
import draggable from "vuedraggable";
import taskDetails from "../cmps/task-details";
import barChart from "../cmps/bar-chart";

import { boardService } from "../services/board.service";

export default {
  name: "board",
  data() {
    return {
      groups: [],
      board: null,
      boardToEdit: null,
      editMode: false,
      mainTable: true,
      addingView: false,
      isAddingMembers: false,
    };
  },
  methods: {
    async removeTask(taskId, groupId){
      console.log('group id:', groupId)
      console.log('task id:', taskId)
      
        const groupIdx = this.boardToEdit.groups.findIndex(group => group.id === groupId);
            const taskIdx = this.boardToEdit.groups[groupIdx].tasks.findIndex(item => item.id === taskId);
            this.boardToEdit.groups[groupIdx].tasks.splice(taskIdx, 1);
            this.saveBoard({...this.boardToEdit});
      //       try {
      //   await this.$store.dispatch({
      //     type: "removeTask",
      //     taskId,
      //     groupId,
      //   });
      // } catch (err) {
      //   console.log("Couldn`t remove Task", err);
      //   throw err;
      // }

    },
    addView(view) {
      this.boardToEdit.views.push(view);
      this.saveBoard(this.boardToEdit);
    },
    handleEdit() {
      this.editMode = true;
      setTimeout(() => {
        this.$refs.input.focus();
      }, 0);
    },
    activateMainTable() {
      this.addingView = false;
      this.mainTable = true;
      console.log(this.mainTable);
    },
    activateView() {
      this.mainTable = false;
      this.addingView = true;
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
        console.log("board:", board);
        // this.groups = { ...board.groups };
        this.board = board;
        this.boardToEdit = { ...board };
      } catch (err) {
        console.log("err:", err);
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
  mounted() {
    // if(this.board)this.printScr()
    // else setTimeout(()=>this.printScr(),1000);
  },
  computed: {
    currBoard() {
      return this.$store.getters.boardForDisplay;
    },
    isActivitiesOpen() {
      return this.$store.getters.isActivitiesOpen;
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
    socialModal
  },
};
</script>
    
