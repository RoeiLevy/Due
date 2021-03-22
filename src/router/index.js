import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home'
import login from '../views/login'
import signup from '../views/signup'
import userProfile from '../views/user-profile'
import board from '../views/board'
import boardList from '../views/board-list'
import taskDetails from '../cmps/task-details'

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
    path: '/board/:boardId',
    name: 'board',
    component: board,
    children: [
        {
            path: ':groupId/task/:taskId',
            name: 'task details',
            component: taskDetails,
        }
    ]
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