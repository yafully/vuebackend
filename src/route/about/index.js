/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-12 17:15:28
 * @version $Id$
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { 
    	path: '/', 
    	name: 'About', 
    	component: r => { require(['../../views/about/pages'], r) }, 
    	meta: { title: '关于我们' }
    }
]

export default new VueRouter({
	//mode: 'history',
    routes: routes
})