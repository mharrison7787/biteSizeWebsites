import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import CreateItem from '@/components/CreateItem'
import ItemDetail from '@/components/ItemDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/CreateItem',
      name: 'CreateItem',
      component: CreateItem
    },
    {
      path: '/ItemDetail/:id',
      name: 'ItemDetail',
      component: ItemDetail,
      props: true
    }
  ]
})
