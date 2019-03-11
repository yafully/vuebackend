/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-12 17:15:28
 * @version $Id$
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import def from '@/lang/def'

import Layout from '@views/index/pages/'
import Login from '@views/index/pages/Login'
import HomeMain from '@views/index/pages/home/'
//路由重定向(Reload)
const Reloader = () => import('@views/redirect/')
const Guide = () => import('@views/index/pages/guide/') 
//用户管理
const Table = () => import('@views/index/pages/users/Table')
const Contacts = () => import('@views/index/pages/users/Contacts')
const Echarts = () => import('@views/index/pages/users/Echarts')
const DragTable = () => import('@views/index/pages/users/DragTable')
//权限管理
const RolePage = () => import('@views/index/pages/role/RolePage')
const RoleUser = () => import('@views/index/pages/role/RoleUser')
const Featrues = () => import('@views/index/pages/role/Featrues')
//Excel Import & Export
const ExportExcel = () => import('@views/index/pages/excel/ExportExcel')
const ImportExcel = () => import('@views/index/pages/excel/ImportExcel')
//Article
const CreateArticle = () => import('@views/index/pages/article/create')
const ArticleList = () => import('@views/index/pages/article/list')

Vue.use(VueRouter)
let routeName = def.routeName

//noCache 模块是否需要缓存标识
//modName 模块名，用于缓存识别
//leaf 单节点标识
/**
  *
  *
  * meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in Page title
    noCache: true                if true, the page will no be cached(default is false)
    noClose: false               if true, The TabTags item will not show close btn 
    modName: String              The route component name, this will used in vuex cachedViews 
    注意子路由若是绝对路径则不会显示父路由层级
  }    
**/
let defaultRouter = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: Reloader
      }
    ]
  },
  // { 
  //   path: '/',
  //   redirect: '/index',
  //   hidden: true,
  //   children: []
  // },
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true,
    children: []
  },
  {
    path: '/home',
    iconCls: 'el-icon-tickets', // 图标样式class
    redirect: '/home/index',
    name:'',
    leaf: true,//只有一个节点
    component: Layout,
    children: [
      {
        path: '/index',
        iconCls: 'el-icon-tickets', // 图标样式class
        name: routeName.home,
        component: HomeMain,
        meta: {
            modName: 'Layout',
            noClose:true,
            title: routeName.home
        },
        children: []
      }
    ]
  },
  {
    path: '/guide',
    name:'',
    component: Layout,
    redirect: '/guide/user-guide',
    hidden: true,
    children: [
      {
        path: 'user-guide',
        component: Guide,
        name: routeName.guide,
        meta: { 
            modName: 'Guide',
            title: routeName.guide, 
            noCache: true 
        },
        children: []
      }
    ]
  },
  {
    path: '/error',
    name: 'error',
    hidden: true,
    component: Layout,
    children: [
      // {
      //   path: '401',
      //   component: () => import('@/views/errorPage/401'),
      //   name: 'Page401',
      //   meta: { title: 'page401', noCache: true }
      // },
      {
        path: '404',
        component: () => import('@views/error'),
        name: routeName.notfound,
        meta: { title: 'page404', noCache: true },
        children: []
      }
    ]
  }
]

let addRouter = [
    {
        id: 'f1000',
        path: '/',
        component: Layout,
        name: routeName.userManage,
        iconCls: 'el-icon--user',//图标样式class
        meta: {
            role: ['superAdmin', 'admin'],
            title: routeName.userManage
        },
        children: [
            {
                id: 'f1001',
                path: '/userlist', 
                component: Table, 
                name: routeName.userLsit,
                iconCls: 'el-icon-users',
                meta: {
                    modName: 'Table',
                    role: ['superAdmin', 'admin'],
                    title: routeName.userLsit
                },
                children: []
            },
            { 
                id: 'f1002',
                path: '/contacts', 
                component: Contacts, 
                name: routeName.contactUs,
                iconCls: 'el-icon-contacts',
                meta: {
                    modName: 'Contacts',
                    role: ['superAdmin'],
                    title: routeName.contactUs
                },
                children: []
            },
            { 
                id: 'f1003',
                path: '/usersort', 
                component: DragTable, 
                name: routeName.userSort,
                iconCls: 'el-icon-sort',
                meta: {
                    modName: 'DragTabe',
                    role: ['superAdmin'],
                    title: routeName.userSort
                },
                children: []
            },
            { 
                id: 'f1004',
                path: '/statistics', 
                component: Echarts, 
                name: routeName.userChart,
                iconCls: 'el-icon-chart',
                meta: {
                    modName: 'Echarts',
                    role: ['superAdmin', 'admin'],
                    title: routeName.userChart
                },
                children: []
            }
        ]
    },
    {
        id: 'f2000',
        path: '/role',
        component: Layout,
        name: routeName.privilegeManage,
        iconCls: 'el-icon-featrues',//图标样式class
        meta: {
            role: ['superAdmin','admin'],
            title: routeName.privilegeManage
        },
        children: [
            { 
                id: 'f2001',
                path: '/editrole', 
                component: RolePage, 
                name: routeName.roleManage,
                iconCls: 'el-icon-role',
                meta: {
                    modName: 'RolePage',
                    role: ['superAdmin','admin'],
                    title: routeName.roleManage
                },
                children: [] 
            },
            { 
                id: 'f2002',
                path: '/user-role', 
                component: RoleUser, 
                name: routeName.adminManage,
                iconCls: 'el-icon-user-set',
                meta: {
                    modName: 'RoleUser',
                    role: ['superAdmin'],
                    title: routeName.adminManage
                },
                children: [] 
            },
            { 
                id: 'f2003',
                path: '/three', 
                component: Featrues, 
                name: routeName.functionPrivilege,
                iconCls: 'el-icon-tree',
                meta: {
                    role: ['superAdmin'],
                    title: routeName.functionPrivilege
                },
                children: [
                    { 
                        id: 'f3001',
                        path: '/featrues', 
                        component: Featrues, 
                        name: routeName.functionPrivilegeAllow,
                        iconCls: 'el-icon-user-auth',
                        meta: {
                            modName: 'Featrues',
                            role: ['superAdmin'],
                            title: routeName.functionPrivilegeAllow
                        },
                        children: []
                    },
                    { 
                        id: 'f3002',
                        path: '/leve3', 
                        component: HomeMain, 
                        name: routeName.level3,
                        iconCls: 'el-icon-user-auth',
                        meta: {
                            modName: 'Layout',
                            role: ['superAdmin'],
                            title: routeName.level3
                        },
                        children: []
                    }
                ]
            }
        ]
    },
    {
        id: 'f4000',
        path: '/excel',
        component: Layout,
        name: routeName.excel,
        iconCls: 'el-icon-excel',//图标样式class
        meta: {
            role: ['superAdmin','admin'],
            title: routeName.excel
        },
        children: [
            { 
                id: 'f4001',
                path: '/export-excel', 
                component: ExportExcel, 
                name: routeName.exportExcel,
                iconCls: 'el-icon-export',
                meta: {
                    modName: 'ExportExcel',
                    role: ['superAdmin','admin'],
                    title: routeName.exportExcel
                },
                children: []
            },
            { 
                id: 'f4002',
                path: '/import-excel', 
                component: ImportExcel, 
                name: routeName.importExcel,
                iconCls: 'el-icon-export',
                meta: {
                    modName: 'ImportExcel',
                    role: ['superAdmin','admin'],
                    title: routeName.importExcel
                },
                children: []
            }       
        ]
    }
    ,
    {
        id: 'f5000',
        path: '/aticle',
        redirect: '/aticle/list',
        component: Layout,
        name: routeName.aticle,
        iconCls: 'el-icon-excel',//图标样式class
        meta: {
            role: ['superAdmin','admin'],
            title: routeName.aticle
        },
        children: [
            { 
                id: 'f5001',
                path: 'create', 
                component: CreateArticle, 
                name: routeName.createArticle,
                iconCls: 'el-icon-export',
                meta: {
                    modName: 'ArticleCreate',
                    role: ['superAdmin','admin'],
                    title: routeName.createArticle
                },
                children: []
            },
            { 
                id: 'f5002',
                path: 'list', 
                component: ArticleList, 
                name: routeName.articleList,
                iconCls: 'el-icon-export',
                meta: {
                    modName: 'ArticleList',
                    role: ['superAdmin','admin'],
                    title: routeName.articleList
                },
                children: []
            } 
        ]
    }
    //,
    //{ path: '*', redirect: '/error/404', hidden: true, name: '', children: []}
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
