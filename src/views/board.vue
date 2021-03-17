<template>
  <div v-if="board" class="board-container">
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
    addNewGroup() {
      this.$store.commit('addNewGroup')
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
    group,
  },
};
</script>
