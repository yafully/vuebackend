/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-12 16:42:59
 * @version $Id$
 */
import Vue from 'vue'
import store from '@/vuex'
import router from '../../route/index/'
import ElementUI from 'element-ui'
import IndexPage from './IndexPage'
import locale from 'element-ui/lib/locale/lang/en'
import { getRole } from '@api/api'
import Mock from '../../mock'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/less/common.less'
Vue.use(ElementUI, { locale })
Vue.use(require('vue-wechat-title'))

Mock.bootstrap();

//获取来路判断session前置跳转页面
router.beforeEach((to, from, next) => {
  // console.log(store.getters.token)
  // console.log(store.state.token)
  if (store.getters.token) {
    //console.log(JSON.parse(sessionStorage.getItem('myrole')))
    //store.dispatch('setToken', store.getters.token)
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      if (!store.getters.info.role) {
        getAddRouters()
      }else{
        next()
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    }
    next({path: '/login'})
  }

  async function getAddRouters () {
    // console.log(store.getters.token)
    // console.log(store.state.token)
    await Role()
    let userinfo = JSON.parse(sessionStorage.getItem('info'))
    await store.dispatch('getInfo', userinfo)
    console.log(store.getters.token)
    console.log(store.getters.info.role)
    await store.dispatch('newRoutes', store.getters.info.role)
    await router.addRoutes(store.getters.addRouters)
    next({path: '/index'})
  }

  function Role () {
    let para = {
      name: store.getters.token
    }
    getRole(para).then((res) => {
      sessionStorage.setItem('info', JSON.stringify(res.data))
      //console.log(sessionStorage.getItem('info'))
    })
  }
  // if (to.path == '/login') {
  //   sessionStorage.removeItem('user');
  // }
  // let user = JSON.parse(sessionStorage.getItem('user'))
  // if (!user && to.path != '/login') {
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
})

new Vue({
	router,
  store,
	render: h => h(IndexPage)
}).$mount('#app')
