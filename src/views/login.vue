<template>
  <div class="main-container">
    <header class="home-header">
      <router-link to="/">
        <img class="logo" src="@/assets/imgs/logo.png" />
      </router-link>
      <div class="nav-links">
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Sign Up</router-link>
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
    }
  },
  components: {
    SocialSignUp,
  },
};
</script>

<style>
</style>