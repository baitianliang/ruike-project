import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
    mode: 'hash',
    routes: [
      {
        path: '/Guide',
        name: 'Guide',
        component: () => import('../view/guide.vue'),
      }, {
        path: '/BusinessForm',
        name: 'BusinessForm',
        component: () => import('../view/businessForm.vue'),
      },
    ]
})