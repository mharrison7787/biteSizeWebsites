import ShoppingService from '@/services/ShoppingService'

export const namespaced = true //namespacing shopping list

export const state = {
    shoppingLists: [], //The entire shopping lists
    shoppingItem: {} //the indivudal shopping item
}
export const mutations = {
    //Adds a new shopping list item
    ADD_SHOPPING_LIST_ITEM(state, shoppingItem) {
        state.shoppingLists.push(shoppingItem)
    },

    DELETE_SHOPPING_LIST_ITEM(state, id) {
        var index = state.shoppingLists.findIndex(shoppingItem => shoppingItem.id === id)
        state.shoppingLists.splice(index, 1)
    },
    //Sets the shopping list state with the current shopping list state
    SET_SHOPPING_LISTS(state, shoppingLists) {
        state.shoppingLists = shoppingLists
    },
    //Sets the shopping item state with the current shopping item state
    SET_SHOPPING_ITEM(state, shoppingItem) {
        state.shoppingItem = shoppingItem
    }
}
export const actions = {
    //Post the newly create item to our data base
    //Calls the mutation to add this item to the shopping list
    createShoppingItem({ commit }, shoppingItem) {
        return ShoppingService.postShoppingItem(shoppingItem).then(() => {
            commit('ADD_SHOPPING_LIST_ITEM', shoppingItem)
        })
    },
    deleteShoppingItem({ commit }, id) {
        return ShoppingService.deleteShoppingItem(id).then(() => {
            commit('DELETE_SHOPPING_LIST_ITEM', id)
        }
        ).catch(error => {
            console.log("Error in deleteShoppingItem " + error.response)
        })
    },
    //Gets the shopping list data from DB and sets the state
    fetchShoppingLists({ commit }) {
        ShoppingService.getShoppingLists()
            .then(response => {
                commit('SET_SHOPPING_LISTS', response.data)
            })
            .catch(error => {
                console.log("Error in Homepage:" + error.response)
            })
    },
    //Gets the shopping item data from DB and sets the state
    fetchShoppingItem({ commit, getters }, id) {
        var item = getters.getItemById(id)
        if (item) {
            //If we already find the itme then set the state
            commit('SET_SHOPPING_ITEM', item)
        } else {
            //If we can not find the item thern find it then set the state 
            ShoppingService.getShoppingItem(id)
                .then(response => {
                    commit('SET_SHOPPING_ITEM', response.data)
                })
                .catch(error => {
                    console.log("Error in ItemDetail", error.response)
                })
        }
    }
}
export const getters = {
    //Returns a state that returns an id to find the spectific item we are looking for by id
    getItemById: state => id => {
        return state.shoppingLists.find(shoppingItem => shoppingItem.id === id)
    }
}