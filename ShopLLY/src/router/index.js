import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage'
import CreateItem from '@/views/CreateItem'
import ItemDetail from '@/views/ItemDetail'
import EditItem from '@/views/EditItem'
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
    },
    {
      path: '/EditItem/:id',
      name: 'EditItem',
      component: EditItem,
      props(route) {
        return {
          id: parseInt(route.params.id) || 0
        }
      },
    },
  ]
})
