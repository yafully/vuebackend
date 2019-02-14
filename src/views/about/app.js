/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-12 16:54:50
 * @version $Id$
 */
import Vue from 'vue';
import router from '../../route/about/'
//import ElementUI from 'element-ui'
import AboutPage from './AboutPage';
// import locale from 'element-ui/lib/locale/lang/en'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI, { locale })
Vue.use(require('vue-wechat-title'))
new Vue({
	render: h => h(AboutPage),
	router
}).$mount('#app2');
