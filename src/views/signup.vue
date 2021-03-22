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
    <form @submit.prevent="signup">
      <div class="box-container">
        <h2 class="heading">Create Your Account</h2>
        <div class="form-fields">
          <input
            id="fullname"
            name="fullname"
            type="text"
            v-model="credantials.fullname"
            placeholder="Full name"
          />
        </div>
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
          <input type="file" @change="onUploadImg" />
          
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
import { utilService } from "../services/util.service";
export default {
  name: "signup",
  data() {
    return {
      credantials: {
        fullname: "",
        email: "",
        password: "",
        img: "",
      },
      imgFile: null,
    };
  },
  methods: {
    onUploadImg(ev) {
      this.imgFile = ev.target.files[0];
    },
    async signup() {
      try {
        if (this.imgFile) {
          const imgUrl = await utilService.uploadImg(this.imgFile);
          this.credantials.img = imgUrl;
        }
        await this.$store.dispatch("signup", this.credantials);
        this.$router.push("/login");
      } catch (err) {
        console.log("Couldn`t sign up", err);
      }
    },
  },
  components: {
    SocialSignUp,
  },
};
</script>

<style>
</style>