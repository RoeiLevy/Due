import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import loginSignup from '../views/login-signup.vue'
import userProfile from '../views/user-profile.vue'
import dueApp from '../due-app.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/board/:boardId?',
        name: 'Due App',
        component: dueApp,

    },
    {
        path: '/login',
        name: 'Login Signup',
        component: loginSignup
    },
    {
        path: '/user/:userId',
        name: 'User Profile',
        component: userProfile
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router