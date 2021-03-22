<template>
  <div class="home">
    <header class="home-header">
      <router-link to="/">
        <img class="logo" src="@/assets/imgs/logo.png" />
      </router-link>
      <div v-if="!loggedInUser" class="nav-links">
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Sign Up</router-link>
      </div>
      <div v-else class="nav-links">
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </header>
    <section class="info-container flex column">
      <h2 v-if="loggedInUser">Hello {{ loggedInUser.fullname }}</h2>
      <el-button
        @click="pushRoute"
        type="primary"
        plain
        round
        class="get-started"
        >Get Started</el-button
      >
      <h1>DUE</h1>
      <h2>
        Planning, tracking and delivering your team’s best work has never been
        easier.
      </h2>
      <h4>
        Manage and control your team projects. A platform for work management,
        including tracking projects, deadlines, and team collaboration.
      </h4>
    </section>
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
