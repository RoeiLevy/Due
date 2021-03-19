<template>
  <div class="board-list">
        <header class="home-header">
      <router-link to="/">
        <img class="logo" src="@/assets/imgs/logo.png" />
      </router-link>
    </header>

    <h3>Select Your Board</h3>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="board in boards" :key="board._id">
        <h3 class="medium">{{ board.title }}</h3>
        <img :src="board.thumbnail" @click="showBoard(board._id)" />
      </el-carousel-item>
    </el-carousel>
    <el-row>
      <el-col
        :span="5"
        v-for="board in boards"
        :key="board._id"
        :offset="1"
      >
        <el-card :body-style="{ padding: '0px' }" class="card">
          <div @click="showBoard(board._id)">
            <img :src="board.thumbnail" class="image" />
            <div style="padding: 14px">
              <span>Yummy hamburger</span>
              <div class="bottom clearfix">
                <time class="time"
                  >{{ new Date(board.createdAt).toLocaleString() }}
                </time>
                <!-- <el-button type="text" class="button">Operating</el-button> -->
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-card class="card" :body-style="{ height: '100%' }">
          <div @click="addNewBoard">
            <i class="el-icon-plus"></i>
            <div style="padding: 14px">
              <span>Add A New Board</span>
              <div class="bottom clearfix">
                <!-- <el-button type="text" class="button">Operating</el-button> -->
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- <button>Add a new board</button> -->
  </div>
</template>

<script>
import moment from "moment";
import boardPreview from "../cmps/board-preview.vue";
export default {
  data() {
    return {};
  },
  methods: {
    showBoard(boardId) {
      this.$router.push(`/board/${boardId}`);
    },
    async addNewBoard() {
      try {
        const newBoard = await this.$store.dispatch("addNewBoard");
        this.$router.push(`/board/${newBoard._id}`);
      } catch (err) {
        console.log('Couldn`t add board',err);
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
  },
  created() {
    this.$store.dispatch("loadBoards");
  },
  components: {
    boardPreview,
  },
};
</script>
