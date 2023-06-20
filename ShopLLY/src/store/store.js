import Vue from 'vue'
import Vuex from 'vuex'
import ShoppingService from '@/services/ShoppingService'
import * as moduleList from '@/store/modules/shoppingLists.js'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        moduleList //The shoppingLists 
    },
    state: {

    }
})