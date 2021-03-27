<template>
  <div class="home">
    <header class="home-header">
      <div class="header-container">
        <h2 class="due">Due<span class="com">.com</span></h2>
        <div
          v-if="!loggedInUser || loggedInUser.fullname === 'Guest'"
          class="nav-links"
        >
          <router-link to="/login">Login</router-link>
          <span>|</span>
          <router-link to="/signup">Sign Up</router-link>
        </div>
        <div v-else class="nav-links">
          <h2 class="username" v-if="loggedInUser">
            Hello {{ loggedInUser.fullname }}
          </h2>
          <span>|</span>
          <button @click="logout" class="logout-btn">Logout</button>
        </div>
      </div>
    </header>

    <main class="main-content flex column">
      <div class="title-wrapper">
        <h1>Stay in control</h1>
      </div>

      <div class="desc-wrapper">
        <h4 class="desc">
          A platform for work management, including tracking projects,
          deadlines, and team collaboration.
        </h4>
      </div>

      <div class="btn-wrapper">
        <el-button @click="pushRoute" class="get-started" type="success"
          >Get Started<span>❯</span>
        </el-button>
      </div>
      <div class="bottom-wrapper">
        <div class="img-wrapper">
          <img src="@/assets/monday.png" />
        </div>
        <div class="desc2-wrapper">
          <h4 class="desc2">
            Planning, tracking and delivering your team’s best work <br> has never
             been easier.
          </h4>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "home",
  methods: {
    pushRoute() {
      this.$router.push("/board");
    },
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
      try {
      } catch (err) {}
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
};
</script>
