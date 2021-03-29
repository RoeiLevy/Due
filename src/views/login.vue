<template>
  <div class="main-container">
   <header class="home-header">
      <div class="header-container">
        <div class="logo-wrapper">
          <img class="logo" src="@/assets/final.png" />
          <h2 class="due">Due<span class="com">.com</span></h2>
        </div>
        <div
          v-if="!loggedInUser || loggedInUser.fullname === 'Guest'"
          class="nav-links"
        >
          <router-link to="/">Home</router-link>
          <router-link class="sign-up" to="/signup">Sign Up</router-link>
        </div>
        <div v-else class="nav-links">
          <h2 class="username" v-if="loggedInUser">
            Hello {{ loggedInUser.fullname }}
          </h2>
          <button @click="logout" class="logout-btn">Logout</button>
        </div>
      </div>
    </header>

    <section class="login">
      <form @submit.prevent="login">
        <div class="box-container">
          <h2 class="heading">Sign In</h2>
          <div class="form-fields">
            <input
              id="email"
              name="email"
              type="email"
              v-model="credantials.email"
              placeholder="Email Address"
            />
          </div>
          <div class="form-fields">
            <input
              id="password"
              name="password"
              type="password"
              v-model="credantials.password"
              placeholder="Password"
            />
          </div>
          <div class="form-fields">
            <button class="signIn" name="commit" type="submit">Sign In</button>
          </div>
          <div class="login-choice"><span>or sign In with</span></div>
          <SocialSignUp />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import SocialSignUp from "@/cmps/social-signup";
export default {
  name: "login",
  data() {
    return {
      credantials: {
        email: "",
        password: "",
      },
    };
  },
  methods:{
    async login(){
      try {
        await this.$store.dispatch('login',this.credantials)
        this.$router.push('/board')
      } catch (err) {
        console.log('Invalid Email/Password');
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
     loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  components: {
    SocialSignUp,
  },
};
</script>

<style>
</style>