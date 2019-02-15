/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-12 16:42:59
 * @version $Id$
 */
import Vue from 'vue'
import router from '../../route/index/'
import ElementUI from 'element-ui'
import IndexPage from './IndexPage'
import locale from 'element-ui/lib/locale/lang/en'
import Mock from '../../mock'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/less/common.less'
Vue.use(ElementUI, { locale })
Vue.use(require('vue-wechat-title'))
Mock.bootstrap();

//获取来路判断session前置跳转页面
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'))
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

new Vue({
	router,
	render: h => h(IndexPage)
}).$mount('#app')
