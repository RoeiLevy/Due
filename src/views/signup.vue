<template>
   <section class="sign-up">
          <header class="home-header">
      <router-link to="/">
        <img class="logo" src="@/assets/imgs/logo.png" />
      </router-link>
      <div class="nav-links">
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Sign Up</router-link>
      </div>
    </header>
      <form>
        <div class="box-container">
          <h2 class="heading">Create Your Account</h2>
          <div class="form-fields">
            <input
              id="user_name"
              name="username"
              type="text"
              placeholder="Full name"
            />
          </div>
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
            <button class="createaccount" name="commit" type="submit">
              Create your account
            </button>
          </div>
          <div class="login-choice"><span>or sign up with</span></div>
          <SocialSignUp />
          <div>
            <p class="center">
              By signing up you agree to the
              <a href="#">Terms of Service</a>.
            </p>
          </div>
        </div>
      </form>
       </section>
</template>

<script>
import SocialSignUp from "@/cmps/social-signup";
export default {
  name: "signup",
  components: {
    SocialSignUp,
  },
}


</script>

<style>

</style>