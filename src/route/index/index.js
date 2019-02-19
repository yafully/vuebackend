/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-12 17:15:28
 * @version $Id$
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/index/pages/'
import Login from '@/views/index/pages/Login'
import HomeMain from '@/views/index/pages/home/'
//用户管理
const Table = () => import('@/views/index/pages/users/Table')
const Contacts = () => import('@/views/index/pages/users/Contacts')
const Echarts = () => import('@/views/index/pages/users/Echarts')
const DragTable = () => import('@/views/index/pages/users/DragTable')
//权限管理
const RolePage = () => import('@/views/index/pages/role/RolePage')
const Featrues = () => import('@/views/index/pages/role/Featrues')

Vue.use(VueRouter)

let defaultRouter = [
  { 
    path: '/',
    redirect: '/index',
    hidden: true,
    children: []
  },
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true,
    children: []
  },
  {
    path: '/',
    iconCls: 'el-icon-tickets', // 图标样式class
    name: '',
    leaf: true,//只有一个节点
    component: Layout,
    children: [
      {
        path: '/index',
        iconCls: 'el-icon-tickets', // 图标样式class
        name: '仪表盘',
        component: HomeMain
      }
    ]
  }
]

let addRouter = [
    {
        id: 'f1000',
        path: '/',
        component: Layout,
        name: '用户管理',
        iconCls: 'el-icon--user',//图标样式class
        meta: {
            role: ['superAdmin', 'admin'],
            title: '用户管理'
        },
        children: [
            {
                id: 'f1001',
                path: '/userlist', 
                component: Table, 
                name: '用户列表',
                iconCls: 'el-icon-users',
                meta: {
                    role: ['superAdmin', 'admin'],
                    title: '用户列表'
                } 
            },
            { 
                id: 'f1002',
                path: '/contacts', 
                component: Contacts, 
                name: '联系我们',
                iconCls: 'el-icon-contacts',
                meta: {
                    role: ['superAdmin'],
                    title: '联系我们'
                } 
            },
            { 
                id: 'f1003',
                path: '/usersort', 
                component: DragTable, 
                name: '用户排序',
                iconCls: 'el-icon-sort',
                meta: {
                    role: ['superAdmin'],
                    title: '用户排序'
                } 
            },
            { 
                id: 'f1004',
                path: '/statistics', 
                component: Echarts, 
                name: '用户统计',
                iconCls: 'el-icon-chart',
                meta: {
                    role: ['superAdmin', 'admin'],
                    title: '用户统计'
                } 
            }
        ]
    },
    {
        id: 'f2000',
        path: '/',
        component: Layout,
        name: '权限管理',
        iconCls: 'el-icon-featrues',//图标样式class
        meta: {
            role: ['superAdmin'],
        },
        children: [
            { 
                id: 'f2001',
                path: '/editrole', 
                component: RolePage, 
                name: '角色管理',
                iconCls: 'el-icon-role',
                meta: {
                    role: ['superAdmin'],
                    title: '角色管理'
                } 
            },
            { 
                id: 'f2002',
                path: '/featrues', 
                component: Featrues, 
                name: '功能权限',
                iconCls: 'el-icon-tree',
                meta: {
                    role: ['superAdmin'],
                    title: '功能权限'
                } 
            }
        ]
    }
]

export default new VueRouter({
  routes: defaultRouter
})

export {defaultRouter, addRouter}

// const routers = new VueRouter({
//     // mode: 'history',
//     routes:[
//     {
//         path: '/login',
//         component: Login,
//         name: '',
//         hidden: true,
//         meta: {
// 	        title: '用户登录'
// 	    }
//     },
//     {
//         path: '/',
//         component: Layout,
//         name: '用户管理',
//         iconCls: 'el-icon--user',//图标样式class
//         children: [
//         	{ 
//         		path: '/userlist', 
//         		component: Table, 
//         		name: '用户列表',
//                 iconCls: 'el-icon-users',
// 		        meta: {
// 			        title: '用户管理'
// 			    } 
//         	},
//             { 
//                 path: '/contacts', 
//                 component: Contacts, 
//                 name: '联系我们',
//                 iconCls: 'el-icon-contacts',
//                 meta: {
//                     title: '联系我们'
//                 } 
//             },
//             { 
//                 path: '/usersort', 
//                 component: DragTable, 
//                 name: '用户排序',
//                 iconCls: 'el-icon-sort',
//                 meta: {
//                     title: '用户排序'
//                 } 
//             },
//             { 
//                 path: '/statistics', 
//                 component: Echarts, 
//                 name: '用户统计',
//                 iconCls: 'el-icon-chart',
//                 meta: {
//                     title: '用户统计'
//                 } 
//             }
//         // { path: '/info', component: Info, name: 'Info列表' },
//         // { path: '/form', component: Form, name: 'Form' },
//         ]
//     }
//     ]
// })

// export default routers
