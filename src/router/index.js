import Vue from 'vue'
import VueRouter from 'vue-router'
// import Dashboard from '../views/Dashboard.vue'
// import Team from '../views/Team.vue'
// import Projects from '../views/Projects.vue'
// import Grids from '../views/Grids.vue'
// import Settings from '../views/Settings.vue'


Vue.use(VueRouter)

const routes = [

  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: Dashboard,
  // },
  // {
  //   path: '/team',
  //   name: 'Team',
  //   component: Team
  // },
  // {
  //   path: '/projects',
  //   name: 'Projects',
  //   component: Projects
  // },
  // {
  //   path: '/settings',
  //   name: 'Settings',
  //   component: Settings
  // },
  // {
  //   path: '/grids',
  //   name: 'Grids',
  //   component: Grids
  // },
]

const router = new VueRouter({
  routes
})

export default router
