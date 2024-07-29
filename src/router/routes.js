import Todo from '@/views/todo'
import Login from '@/views/login'

export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Todo,
    alias: '/home',
    strict: true, // 不会匹配 /index/
    sensitive: true, // 不会匹配 /Index
    props: true,
    meta: {},
    /* children: [
      {
        // UserHome 将被渲染
        path: '',
        name: 'user',
        component: UserHome
      }
    ] */
  },
  {
    path: '/login',
    component: Login,
    children: [
      {
        path: 'exact',
        component: Login
      }
    ]
  }
]
