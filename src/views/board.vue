<template>
  <div v-if="board" class="flex board-container">
    <app-header />
    <div class="board-header">
      <h1>{{ board.title }}</h1>
      <button>Members & Invite</button>
      <button>Activity</button>
    </div>
    <nav class="views">
      <!-- can collapse -->
      <button>Main Table</button>
      <!-- <button>Calander</button> -->
      <!-- <button>Chart</button> -->
      <!-- <button>Kanban</button> -->
      <button>+ Add View</button>
    </nav>
    <button class="new-group-btn" @click="addNewGroup">New Group</button>
    <div class="groups-list">
      <draggable
        v-model="boardToEdit.groups"
        @change="saveBoard(boardToEdit)"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <group
          v-for="group in boardToEdit.groups"
          :group="group"
          :key="group.id"
        />
      </draggable>
    </div>
  </div>
</template>

<script>
import group from "../cmps/group";
import appHeader from "../cmps/header";
import draggable from "vuedraggable";

import { boardService } from "../services/board.service";

export default {
  name: "board",
  data() {
    return {
      board: null,
      boardToEdit: null,
    };
  },
  methods: {
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
      }
    },
    async saveBoard(board) {
      console.log('saving');
      await this.$store.dispatch("saveBoard", board);
      this.loadBoard();
    },
    async addNewGroup() {
      try {
        const newBoard = JSON.parse(JSON.stringify(this.board));
        newBoard.groups.unshift(boardService.getEmptyGroup());
        const savedBoard = await this.$store.dispatch("saveBoard", newBoard);
        this.loadBoard();
      } catch (err) {}
    },
  },
  computed: {},
  created() {
    this.loadBoard();
  },
  components: {
    appHeader,
    group,
    draggable,
  },
};
</script>
