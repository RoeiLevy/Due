import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import loginSignup from '../views/login-signup.vue'
import userProfile from '../views/user-profile.vue'
import board from '../views/board.vue'
import boardList from '../views/board-list.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: home
    },
    {
        path: '/board',
        name: 'Board List',
        component: boardList
    },

    {
        path: '/board/:boardId?',
        name: 'Board',
        component: board,

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