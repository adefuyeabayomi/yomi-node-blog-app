import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/homepage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: HomeView
  },

  {
    path: '/:blogid/:category/create-new-draft',
    name: 'create-new-draft',
    component: () => import("../views/create-draft.vue")
  },

  {
    path: '/:blogid/:category/edit-draft/:draftid',
    name: 'edit-draft/',
    component: () => import("../views/edit-draft.vue")
  },

  {
    path: '/:blogid/manage-homepage',
    name: 'manage-homepage',
    component: () => import("../views/manage-home.vue")
  },

  {
    path: '/:blogid/manage-category/:category',
    name: 'manage-category',
    component: () => import("../views/manage-category.vue")
  },

  {
    path: '/edit-blog/:blogid',
    name: 'edit-blog',
    component: () => import("../views/edit-blog.vue")
  },

  {
    path: '/manage-blog/:blogid',
    name: 'manage-blog',
    component: () => import("../views/manage-blog.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
