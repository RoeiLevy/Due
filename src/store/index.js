import Vue from 'vue'
import Vuex from 'vuex'

import { userStore } from './user.store'
import { socketStore } from './socket.store'
import { boardStore } from './board.store'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    modules: {
        userStore,
        socketStore,
        boardStore
    },
    state: {},
    mutations: {},
    actions: {}
})