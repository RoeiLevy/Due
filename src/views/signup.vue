<template>
  <section class="sign-up">
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
        </div>
        <div v-else class="nav-links">
          <h2 class="username" v-if="loggedInUser">
            Hello {{ loggedInUser.fullname }}
          </h2>
          <span>|</span>
          <button @click="logout" class="logout-btn">Logout</button>
        </div>
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