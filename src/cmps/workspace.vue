<template>
  <section class="workspace">
    <div class="workspace-menu-container">
      <el-menu
        @select="toggleCollapse"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-menu-item index="1">
          <i class="workspace-icon el-icon-menu"></i>

          <span slot="title">{{ boardTitle() }}</span>
        </el-menu-item>

        <ul class="workspace-board-list" v-if="!isCollapse">
          <li 
          class="board-li-workspace"
            v-for="board in boards"
            :key="board._id"
            @click="showBoard(board._id)"
          >
            {{ board.title }}
          </li>
        </ul>
      </el-menu>
    </div>
  </section>
</template>

<script>
import boardPreview from "../cmps/board-preview.vue";

export default {
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    boardTitle() {
      return this.isCollapse ? "Board List" : "Close Board List";
    },
    showBoard(newBoardId) {
      const currBoardId = this.$route.params.boardId;
      if (currBoardId){
        if (newBoardId === currBoardId) return;
      }

      this.$router.push(`/board/${newBoardId}`);
    },
    async addNewBoard() {
      try {
        const newBoard = await this.$store.dispatch("addNewBoard");
        this.$router.push(`/board/${newBoard._id}`);
      } catch (err) {
        console.log("Couldn`t add board", err);
      }
    },
    async removeBoard(boardId) {
      try {
        await this.$confirm(
          "This will permanently delete the Board. Continue?",
          "Warning",
          {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        );
        try {
          await this.$store.dispatch("removeBoard", boardId);
          this.$message({
            type: "success",
            message: "Delete completed",
          });
        } catch (err) {
          console.log("Couldn`t delete board", err);
        }
      } catch (err) {
        this.$message({
          type: "info",
          message: "Delete canceled",
        });
      }
    },
  },
  computed: {
    getTime(time) {
      return moment(time).fromNow();
    },
    boards() {
      return this.$store.getters.boards;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  created() {
    this.$store.dispatch("loadBoards");
  },
  components: {
    boardPreview,
  },
};
</script>