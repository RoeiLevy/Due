<template>
  <section :class="workspaceClass" class="workspace">
    <div class="workspace-menu-container">
      <div @click.self="toggleWorkspace" class="menu-toggle-btn">
        <font-awesome-icon
          @click="toggleWorkspace"
          v-if="!isOpen"
          class="toggle-workspace-icon plus arrow-btn"
          icon="chevron-right"
        />
        <font-awesome-icon
          @click="toggleWorkspace"
          v-else
          class="toggle-workspace-icon plus arrow-btn"
          icon="chevron-left"
        />
      </div>
      <div class="menu-list">
        <div v-show="isOpen" class="board-menu-actions">
          <h2 class="title">Board Menu</h2>
          <div @click="addNewBoard" class="action">
            <font-awesome-icon class="header-icon plus" icon="plus-circle" />
            <h3>Add</h3>
          </div>
          <div class="action">
            <font-awesome-icon class="header-icon plus" icon="filter" />
            <h3 @click="isFiltering=!isFiltering">Filter</h3>
            <el-input v-if="isFiltering" placeholder="Search Boards" v-model="filterBy.txt">
            </el-input>
          </div>
          <div class="action">
            <font-awesome-icon class="header-icon plus" icon="search" />
            <h3>Search</h3>
          </div>
        </div>

        <ul class="workspace-board-list" v-show="isOpen">
          <li
            class="board-li-workspace"
            v-for="board in boards"
            :key="board._id"
            style="text-transform: capitalize"
            @click="showBoard(board._id)"
          >
            <font-awesome-icon class="header-icon plus" icon="clipboard" />
            <h3>
              {{ board.title }}
            </h3>
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
      isFiltering:false,
      filterBy:{
        txt:null
      }
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
      var boards = this.$store.getters.boards;
      if (this.filterBy.txt) {
        boards = boards.filter((board) =>
          board.title.toLowerCase().includes(this.filterBy.txt.toLowerCase())
        );
      }
      return boards;
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