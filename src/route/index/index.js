/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-12 17:15:28
 * @version $Id$
 */
import Home from '@/views/index/pages/'
import Login from '@/views/index/pages/Login'
import Table from '@/views/index/pages/users/Table'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routers = new VueRouter({
    // mode: 'history',
    routes:[
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true,
        meta: {
	        title: '用户登录'
	    }
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
        	{ 
        		path: '/table', 
        		component: Table, 
        		name: 'Table',
		        meta: {
			        title: '用户管理'
			    } 
        	},
        // { path: '/info', component: Info, name: 'Info列表' },
        // { path: '/form', component: Form, name: 'Form' },
        ]
    }
    ]
})

export default routers
