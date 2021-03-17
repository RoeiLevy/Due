import Vue from 'vue'
import dueApp from './due-app.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/styles/styles.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


import { library } from '@fortawesome/fontawesome-svg-core'
import { faThLarge, faBell, faInbox, faCalendarCheck, faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faThLarge, faBell, faInbox, faCalendarCheck, faUserPlus, faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(dueApp)
}).$mount('#app')