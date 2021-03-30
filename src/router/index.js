import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home'
import login from '../views/login'
import signup from '../views/signup'
import userProfile from '../views/user-profile'
import board from '../views/board'
import boardList from '../views/board-list'
import taskDetails from '../cmps/task-details'
import dashboard from '../cmps/dashboard'
import calendar from '../cmps/calendar'
import mainTable from '../cmps/main-table'
import kanban from '../cmps/kanban'

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
            path: 'maintable',
            name: 'Main Table',
            component: mainTable,
            children: [
                {
                    path: ':groupId/task/:taskId',
                    name: 'task details',
                    component: taskDetails,
                }
            ]
        },
        {
            path: 'dashboard',
            name: 'Dashboard',
            component: dashboard,
        },
        {
            path: 'calendar',
            name: 'Calendar',
            component: calendar,
        },
        {
            path: 'kanban',
            name: 'Kanban',
            component: kanban,
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