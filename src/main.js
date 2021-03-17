import Vue from 'vue'
import dueApp from './due-app.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/styles/styles.scss'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(dueApp)
}).$mount('#app')