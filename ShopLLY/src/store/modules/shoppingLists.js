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
    },
    //Should go through the each shoppingItem in the Lists to find which id of shoppingIteme Matches the updatedShoppingItem
    EDIT_SHOPPING_LIST_ITEM(state, shoppingItem) {
        state.shoppingLists.update(shoppingItem)
    },
    DONE_SHOPPING_LIST_ITEM(state, shoppingItem) {
        state.shoppingItem.completedStatus = true;
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
    editShoppingItem({ commit }, shoppingItem) {
        return ShoppingService.editShoppingItem(shoppingItem).then(() => {
            commit('EDIT_SHOPPING_LIST_ITEM', shoppingItem)
        }
        ).catch(error => {
            console.log("Error in editShoppingItem " + error.response)
        })
    },
    //!!!!HERE
    itemDone({ commit }, shoppingItem) {
        shoppingItem.completedStatus = true;
        return ShoppingService.editShoppingItem(shoppingItem).then(() => {
            commit('DONE_SHOPPING_LIST_ITEM', shoppingItem)
        }).catch(error => {
            console.log("Error in itemDone " + error.response)
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