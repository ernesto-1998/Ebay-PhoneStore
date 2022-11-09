// import { route } from 'quasar/wrappers'
// import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
// import routes from './routes'

// /*
//  * If not building with SSR mode, you can
//  * directly export the Router instantiation;
//  *
//  * The function below can be async too; either use
//  * async/await or return a Promise which resolves
//  * with the Router instance.
//  */

// export default route(function (/* { store, ssrContext } */) {
//   const createHistory = process.env.SERVER
//     ? createMemoryHistory
//     : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

//   const Router = createRouter({
//     scrollBehavior: () => ({ left: 0, top: 0 }),
//     routes,

//     // Leave this as is and make changes in quasar.conf.js instead!
//     // quasar.conf.js -> build -> vueRouterMode
//     // quasar.conf.js -> build -> publicPath
//     history: createHistory(process.env.VUE_ROUTER_BASE)
//   })

//   return Router
// })

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import NuevoAnuncio from '../pages/NuevoAnuncio.vue'
import Anuncio from '../pages/AnuncioView.vue'
import Error404 from '../pages/ErrorView404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/nuevo/:id',
      name: 'nuevo',
      component: NuevoAnuncio,
    },
    {
      path: '/anuncio/:id',
      name: 'anuncio',
      component: Anuncio,
    },
    {
      path: '/:pathMatch(.*)*',
      component: Error404
    }
  ]
})

export default router
