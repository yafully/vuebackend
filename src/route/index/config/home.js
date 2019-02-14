import Home from '@/views/index/pages'
import Login from '@/views/index/pages/Login'
//Vue.use(Router)
// export default {
//     path: '/',
//     name: 'Home',
//     component: Home
// }
// export default new Router({
//   mode: 'history',  //  指定以传统方式访问‘hash’可选   
//   routes: [
//     {
//       path: '/',
//       name: 'Home',
//       components: {
//         default: Home
//       }
//     }
//   ]
// })
export default [
    {
        path: '/login',
	    name: 'Login',
	    component: Login
    },
    {
        path: '/',
	    name: 'Home',
	    component: Home
    }
]