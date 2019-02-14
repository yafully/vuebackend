import ErrorComp from '@/views/error/'
//import About from '@/views/about/pages'
export default [
    {
        path: '/error',
        name: 'error',
        component: ErrorComp
    },
    {
        path: '*',
        redirect: '/error'
    }
]