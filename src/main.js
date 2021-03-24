import Vue from 'vue'
import dueApp from './due-app.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/styles/styles.scss'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale'
import VModal from 'vue-js-modal'
import VueDatePicker from '@mathieustan/vue-datepicker';
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';
import 'element-ui/lib/theme-chalk/index.css';


locale.use('EN')
Vue.use(ElementUI, { locale });
Vue.use(VModal)
Vue.use(VueDatePicker, {
    lang: 'en'
});



import { library } from '@fortawesome/fontawesome-svg-core'
import { faTh, faComment, faChartLine, faPlus, faThLarge, faBell, faInbox, faCalendarCheck, faUserPlus, faSearch, faCaretSquareDown, faTrash, faClosedCaptioning, faUserFriends, faSignOutAlt, faUser, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTh, faComment, faChartLine, faPlus, faThLarge, faBell, faInbox, faCalendarCheck, faUserPlus, faSearch, faCaretSquareDown, faTrash, faClosedCaptioning, faUserFriends, faSignOutAlt, faUser, faEllipsisH)

Vue.component('font-awesome-icon', FontAwesomeIcon)



Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(dueApp)
}).$mount('#app')