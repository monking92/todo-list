import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

export default createRouter({
  history: createWebHashHistory(),
  routes,
  // strict: true, // 应用到所有路由
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  // parseQuery(query) {},
  // stringifyQuery(obj) {},
})
