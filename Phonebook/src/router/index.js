import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Directory from '../views/Directory'
import AddContact from '../components/AddContact'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
      component: Home,
  
  },
  {
    path: '/directory',
    name: 'Directory',
      component: Directory,
  
  },
  // {
  //   path: '/addcontact',
  //   name: 'AddContact',
  //     component: AddContact,
  
  // },
  
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  
})
export default router
