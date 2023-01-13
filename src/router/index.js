import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*', redirect: '/RuleTable'
  }, {
    path: '/', redirect: '/RuleTable'
  }, {
    path: '/RuleTable',
    name: 'RuleTable',
    component: () => import('../components/Table/RuleTable.vue')
  }, {
    path: '/LogTable',
    name: 'LogTable',
    component: () => import('../components/Table/LogTable.vue')
  }, {
    path: '/MlogTable',
    name: 'MlogTable',
    component: () => import('../components/Table/MlogTable.vue')
  }, {
    path: '/ConnectionTable',
    name: 'ConnectionTable',
    component: () => import('../components/Table/ConnectionTable.vue')
  }, {
    path: '/About',
    name: 'About',
    component: () => import('../components/Table/About.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
