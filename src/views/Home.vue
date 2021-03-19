<template>
  <div class="home">
    <header class="home-header">
      <router-link to="/">
        <img class="logo" src="@/assets/imgs/logo.png" />
      </router-link>
      <div class="nav-links">
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Sign Up</router-link>
      </div>
    </header>
    <section class="info-container flex column">
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
  },
  components: {},
};
</script>
