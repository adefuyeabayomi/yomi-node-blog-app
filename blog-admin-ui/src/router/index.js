import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/homePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: HomeView
  },
  {
    path: '/create-new-draft',
    name: 'create-new-draft',
    component: () => import("../views/initDraft.vue")
  },
  {
    path: '/edit-draft',
    name: 'edit-draft',
    component: () => import("../views/editDraft.vue")
  },
  {
    path: '/manage-homepage',
    name: 'manage-homepage',
    component: () => import("../views/manageHomepage.vue")
  },
  {
    path: '/manage-category',
    name: 'manage-category',
    component: () => import("../views/manageCategories.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
