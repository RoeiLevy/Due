<template>
  <section class="board-list-container">
    <close-screen @close="closeMenu" />
    <header class="home-header">
      <div class="header-container">
        <div @click="pushToHome" class="logo-wrapper">
          <img class="logo" src="@/assets/final.png" />
          <h2 class="due">Due<span class="com">.com</span></h2>
        </div>
        <div @click="toggleMenu" class="burger-wrapper">
          <font-awesome-icon icon="bars" />
        </div>

        <div :class="menu" class="nav flex">
          <div
            v-if="!loggedInUser || loggedInUser.fullname === 'Guest'"
            class="nav-links"
          >
            <router-link to="/login">Login</router-link>
            <router-link class="sign-up" to="/signup">Sign Up</router-link>
          </div>
          <div v-else class="nav-links">
            <h2 class="username" v-if="loggedInUser">
              Hello {{ loggedInUser.fullname }}
            </h2>
            <button @click="logout" class="logout-btn">Logout</button>
          </div>
          <div class="switch-container">
            <p>Switch View</p>
            <el-switch
              class="switch"
              v-model="viewValue"
              active-color="#323338"
              inactive-color="#323338"
            >
            </el-switch>
          </div>
        </div>
      </div>
    </header>
    <div class="board-list">
      <h2 v-if="!loggedInUser">Select Your Board</h2>
      <h2 v-else>Hello {{ loggedInUser.fullname }}</h2>
      <el-input placeholder="Search Boards" v-model="filterBy.txt"> </el-input>
      <el-row v-if="viewValue">
        <el-col :span="5" :offset="1" @click="addNewBoard">
          <el-card class="card" :body-style="{ height: '100%' }">
            <div class="add-new-board-card" @click="addNewBoard">
              <i class="el-icon-plus" style="font-size: 40px"></i>
              <div style="padding: 14px">
                <span>Add A New Board</span>
                <div class="bottom clearfix"></div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="5" v-for="board in boards" :key="board._id" :offset="1">
          <el-card closeable :body-style="{ padding: '0px' }" class="card">
            <el-button
              class="close-card-btn card-view-btn"
              type="text"
              @click="removeBoard(board._id)"
            >
              <font-awesome-icon class="header-icon remove-btn" icon="trash" />
            </el-button>
            <div @click="showBoard(board._id)">
              <img :src="board.thumbnail" class="image" />
              <div style="padding: 14px">
                <span>{{ board.title }}</span>
                <div class="bottom clearfix">
                  <time class="time"
                    >{{ new Date(board.createdAt).toLocaleString() }}
                  </time>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-carousel
        v-else
        class="carousel"
        :interval="4000"
        type="card"
        height="300px"
      >
        <el-carousel-item
          class="carousel-item"
          v-for="board in boards"
          :key="board._id"
        >
          <h3 class="medium" @click="showBoard(board._id)">
            {{ board.title }}
          </h3>
          <img
            class="carousel-img"
            :src="board.thumbnail"
            @click="showBoard(board._id)"
          />
          <el-button
            class="close-card-btn"
            type="text"
            @click="removeBoard(board._id)"
          >
            <font-awesome-icon class="header-icon remove-btn" icon="trash" />
          </el-button>
        </el-carousel-item>

        <el-carousel-item class="carousel-item add-board-container">
          <h3 class="medium">Add Board</h3>
          <div class="add-board carousel-img" @click="addNewBoard">
            <i class="el-icon-plus" style="font-size: 40px"></i>
            <div style="padding: 14px">
              <span>Add A New Board</span>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import boardPreview from "../cmps/board-preview.vue";
import CloseScreen from "../cmps/close-screen.vue";
export default {
  data() {
    return {
      viewValue: true,
      isMenuOpen: false,
      filterBy: {
        txt: null,
      },
    };
  },
  methods: {
    pushToHome() {
      this.$router.push("/");
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      this.$store.commit("toggleCloseScreen");
      console.log("this.isMenuOpen:", this.isMenuOpen);
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    closeScreen() {
      this.$store.commit("shutCloseScreen");
    },
    showBoard(boardId) {
      this.$router.push(`/board/${boardId}/maintable`);
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
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
      try {
      } catch (err) {}
    },
  },
  computed: {
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
    menu() {
      return { open: this.isMenuOpen };
    },
  },
  created() {
    this.$store.dispatch("loadBoards");
  },
  destroyed() {
    this.closeScreen();
  },
  components: {
    boardPreview,
    CloseScreen,
  },
};
</script>
