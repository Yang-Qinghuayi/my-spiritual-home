// types
import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const Discover = () => import('@/pages/Discover.vue')
const FourOhFour = () => import('@/pages/errors/FourOhFour.vue')
const Home = () => import('@/pages/Home.vue')

const one = () => import('@/pages/forMoon/one.vue')
const two = () => import('@/pages/forMoon/two.vue')
const Setting = () => import('@/pages/setting/Setting.vue')

const appRoutes: RouteRecordRaw[] = [
  {
    path: '/zero',
    name: 'zero',
    component: import('@/pages/forMoon/zero.vue'),
    // meta: { keepAlive: true }
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting,
  },
  {
    path: '/one',
    name: 'one',
    component: one,
    // meta: { keepAlive: true }
  },
  {
    path: '/two',
    name: 'two',
    component: two,
    // meta: { keepAlive: true }
  },
]

export function useRouter(app: App) {
  const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: (to, from, savedPosition) => savedPosition || ({ x: 0, y: 0 } as any),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        children: appRoutes,
        redirect: { path: '/zero' },
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'FourOhFour',
        component: FourOhFour,
      },
    ],
  })
  app.use(router)
  return router
}
