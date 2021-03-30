<template>
  <div class="home">
    <close-screen @close="closeMenu" />
    <header class="home-header">
      <div class="header-container">
        <div class="logo-wrapper">
          <img class="logo" src="@/assets/final.png" />
          <h2 class="due">Due<span class="com">.com</span></h2>
        </div>
        <div @click="toggleMenu" class="burger-wrapper">
          <font-awesome-icon icon="bars" />
        </div>

        <div class="nav" :class="menu">
          <div
            v-if="!loggedInUser || loggedInUser.fullname === 'Guest'"
            class="nav-links"
          >
            <router-link class="login" to="/login">Login</router-link>
            <!-- <span>|</span> -->
            <router-link class="sign-up" to="/signup">Sign Up</router-link>
          </div>

          <div v-else class="nav-links">
            <button @click="logout" class="logout-btn">Logout</button>
            <h2 class="username" v-if="loggedInUser">
              Hello {{ loggedInUser.fullname }}
            </h2>
            <!-- <span>|</span> -->
          </div>
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
          <!-- <img src="@/assets/due.png" /> -->
          <img src="@/assets/homepage-due.png" />
        </div>
        <div class="desc2-wrapper">
          <h4 class="desc2">
            Planning, tracking and delivering your team’s best work
            has never been easier.
          </h4>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import CloseScreen from '../cmps/close-screen.vue';

export default {
  name: "home",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      this.$store.commit('toggleCloseScreen')
      console.log("this.isMenuOpen:", this.isMenuOpen);
    },
    pushRoute() {
      this.$router.push("/board");
      this.$store.commit('toggleCloseScreen')
    },
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
      this.$store.commit('toggleCloseScreen')
      try {
      } catch (err) {}
    },
    closeMenu() {
      this.isMenuOpen = false
    },
    closeScreen() {
      this.$store.commit('shutCloseScreen')
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    menu() {
      return { open: this.isMenuOpen };
    },
  },
  destroyed() {
    this.closeScreen()
  },
  components: {
    CloseScreen
  }
};
</script>
