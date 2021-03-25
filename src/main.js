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
import VCalendar from 'v-calendar';


locale.use('EN')
Vue.use(ElementUI, { locale });
Vue.use(VModal)
Vue.use(VueDatePicker, {
    lang: 'en'
});
Vue.use(VCalendar, {
    componentPrefix: 'vc'
});



import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight, faTh, faComment, faChartLine, faPlus, faThLarge, faBell, faInbox, faCalendarCheck, faUserPlus, faSearch, faCaretSquareDown, faTrash, faClosedCaptioning, faUserFriends, faSignOutAlt, faUser, faEllipsisH, faCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronRight, faTh, faComment, faChartLine, faPlus, faThLarge, faBell, faInbox, faCalendarCheck, faUserPlus, faSearch, faCaretSquareDown, faTrash, faClosedCaptioning, faUserFriends, faSignOutAlt, faUser, faEllipsisH, faCircle, faCheckCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)



Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(dueApp)
}).$mount('#app')