import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import login from '../views/login.vue'
import signup from '../views/signup.vue'
import userProfile from '../views/user-profile.vue'
import board from '../views/board.vue'
import boardList from '../views/board-list.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/board',
        name: 'board list',
        component: boardList
    },

    {
        path: '/board/:boardId?',
        name: 'board',
        component: board,

    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/signup',
        name: 'signup',
        component: signup
    },
    {
        path: '/user/:userId',
        name: 'user profile',
        component: userProfile
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router