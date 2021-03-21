<template>
  <section class="board-list-container">
    <header class="home-header">
      <router-link to="/">
        <img class="logo" src="@/assets/imgs/logo.png" />
      </router-link>
      <div class="switch-container">
      <p>Switch View</p>
   <el-switch
  v-model="viewValue"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
      </div>


    </header>

    <div class="board-list">
      <h2>Select Your Board</h2>
      <el-carousel v-if="viewValue" class="carousel" :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="board in boards" :key="board._id">
          <h3 class="medium" @click="showBoard(board._id)">
            {{ board.title }}
          </h3>
          <img
            class="carousel-img"
            :src="board.thumbnail"
            @click="showBoard(board._id)"
          />
        </el-carousel-item>
      </el-carousel>
      <el-row v-else>
        <el-col :span="5" v-for="board in boards" :key="board._id" :offset="1">
          <el-card :body-style="{ padding: '0px' }" class="card">
            <div @click="showBoard(board._id)">
              <img :src="board.thumbnail" class="image" />
              <div style="padding: 14px">
                <span>{{ board.title }}</span>
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
        <el-col :span="5" :offset="1" @click="addNewBoard">
          <el-card class="card" :body-style="{ height: '100%' }">
            <div @click="addNewBoard">
              <i class="el-icon-plus" style="font-size: 40px"></i>
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
  </section>
</template>

<script>
import moment from "moment";
import boardPreview from "../cmps/board-preview.vue";
export default {
  data() {
    return {
        viewValue: true,

    };
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
        console.log("Couldn`t add board", err);
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
