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

      <div class="top-container">
        <div class="desc-container1">
        <h4 class="desc">
          Manage and control your team projects. A platform for work management,
          including tracking projects, deadlines, and team collaboration.
        </h4>
        </div>
        <div class="svg-container">
        <img src="@/assets/homepage-svg/1.svg" /> 
        </div>
      </div>

      <div class="middle-container">
        <el-button @click="pushRoute" class="get-started" type="success" round
          >Get Started</el-button
        >
      </div>

      <div class="bottom-container">
        <div class="svg-container">

        <img src="@/assets/homepage-svg/2.svg" /> 
        </div>
        <div class="desc-container2"   >
        <h4 class="desc">
          Planning, tracking and delivering your team’s best work has never been
          easier.
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
