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
      <group v-for="group in board.groups" :group="group" :key="group.id" />
    </div>
  </div>
</template>

<script>
import group from "../cmps/group";
import appHeader from "../cmps/header";
import { boardService } from "../services/board.service";

export default {
  name: "board",
  data() {
    return {
      board: null,
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
      } catch (err) {
        console.log("err:", err);
      }
    },
    async saveBoard(board) {
      const savedBoard = await this.$store.dispatch("saveBoard", board);
      this.board = savedBoard;
    },
    async addNewGroup() {
      const group = boardService.getEmptyGroup();
      this.board.groups.push(group);
      await this.saveBoard(this.board);
    },
  },
  computed: {
    // reviews() {
    //   return this.$store.getters.reviews;
    // },
    // users() {
    //   return this.$store.getters.users;
    // },
    // loggedInUser() {
    //   return this.$store.getters.loggedinUser;
    // },
  },
  created() {
    this.loadBoard();
  },
  components: {
    appHeader,
    group
  },
};
</script>
