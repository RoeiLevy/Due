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
      <form>
        <div class="box-container">
          <h2 class="heading">Sign In</h2>
          <div class="form-fields">
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Email Address"
            />
          </div>
          <div class="form-fields">
            <input
              id="password"
              name="password"
              type="text"
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
  components: {
    SocialSignUp,
  },
};
</script>

<style>
</style>