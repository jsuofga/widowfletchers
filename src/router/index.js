import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Zones from '../views/Zones.vue'


Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/zones',
    name: 'Zones',
    component: Zones,
  },

]

const router = new VueRouter({
  routes
})

export default router

