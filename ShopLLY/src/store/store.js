import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        shoppingLists: []
    },
    mutations: {
        ADD_SHOPPING_LIST_ITEM(state, shoppingItem) {
            state.shoppingLists.push(shoppingItem)
        }
    },
    getters: {

    },
    actions: {

    }
})