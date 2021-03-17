<template>
  <div class="board-container">
    <ul class="groups-list">
    </ul>
  </div>
</template>

<script>
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
};
</script>
