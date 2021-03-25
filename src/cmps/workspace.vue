<template>
  <section :class="workspaceClass" class="workspace">
    <!-- <div class="workspace-menu-container">
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

        <ul class="workspace-board-list" v-show="!isCollapse">
          <li
            class="board-li-workspace"
            v-for="board in boards"
            :key="board._id"
            style="text-transform: capitalize"
            @click="showBoard(board._id)"
          >
            {{ board.title }}
          </li>
        </ul>
      </el-menu>
    </div> -->
    <div class="workspace-menu-container">
      <font-awesome-icon
        @click="toggleWorkspace"
        v-if="!isOpen"
        class="header-icon plus workspace-arrow-right"
        icon="arrow-circle-right"
      />
      <font-awesome-icon
        @click="toggleWorkspace"
        v-else
        class="header-icon plus workspace-arrow-left"
        icon="arrow-circle-left"
      />
      <div class="menu-list">
        <!-- <span slot="title">{{ boardTitle() }}</span> -->
        <div v-show="isOpen" class="board-menu-actions">
          <h2 class="title">Board Menu</h2>
          <div class="action"><h3>Add</h3></div>
          <div class="action"><h3>Filters</h3></div>
          <div class="action"><h3>Search</h3></div>
        </div>

        <ul class="workspace-board-list" v-show="isOpen">
          <li
            class="board-li-workspace"
            v-for="board in boards"
            :key="board._id"
            style="text-transform: capitalize"
            @click="showBoard(board._id)"
          >
            {{ board.title }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import boardPreview from "../cmps/board-preview.vue";

export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleWorkspace() {
      this.isOpen = !this.isOpen;
    },
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
      if (currBoardId) {
        if (newBoardId === currBoardId) return;
      }

      this.$router.push(`/board/${newBoardId}/maintable`);
    },
    async addNewBoard() {
      try {
        const newBoard = await this.$store.dispatch("addNewBoard");
        this.$router.push(`/board/${newBoard._id}/maintable`);
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
    workspaceClass() {
      return {
        open: this.isOpen,
      };
    },
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