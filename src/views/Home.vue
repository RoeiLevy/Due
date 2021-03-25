<template>
  <div class="home">
    <header class="home-header">
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
    </header>
    <main class="main-content flex column">
      <section class="info-container flex column">
        <!-- <h1>DUE</h1> -->
        <div class="logo-container">
          <img class="logo" src="@/assets/imgs/logo.png" />
        </div>
        <div class="desc">
          <h2>
            Planning, tracking and delivering your team’s best work has never
            been easier.
          </h2>
          <h4>
            Manage and control your team projects. A platform for work
            management, including tracking projects, deadlines, and team
            collaboration.
          </h4>
        </div>
      </section>
      <el-button @click="pushRoute" class="get-started" type="success" round
        >Get Started</el-button
      >
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
