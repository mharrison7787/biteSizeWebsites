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
    //! Array element and update specific elemnt
    EDIT_SHOPPING_LIST_ITEM(state, shoppingItem) {
        var index = state.shoppingLists.findIndex(item => item.id === shoppingItem.id)
        state.shoppingLists[index] = shoppingItem
    },
    DONE_SHOPPING_LIST_ITEM(state, shoppingItem) {
        state.shoppingItem.completedStatus = true;
    },
    UNDONE_SHOPPING_LIST_ITEM(state, shoppingItem) {
        state.shoppingItem.completedStatus = false;
    }
}
export const actions = {
    //Post the newly create item to our data base
    //Calls the mutation to add this item to the shopping list
    createShoppingItem({ commit }, shoppingItem) {
        return ShoppingService.postShoppingItem(shoppingItem).then(() => {
            commit('ADD_SHOPPING_LIST_ITEM', shoppingItem)
        }).catch(error => {
            console.log("Error in createShoppingItem found in shoppingLists module Error found " + error.response)
        })
    },
    deleteShoppingItem({ commit }, id) {
        return ShoppingService.deleteShoppingItem(id).then(() => {
            commit('DELETE_SHOPPING_LIST_ITEM', id)
        }
        ).catch(error => {
            console.log("Error in deleteShoppingItem found in shoppingLists module Error found " + error.response)
        })
    },
    editShoppingItem({ commit }, shoppingItem) {
        console.log("In edit Shopping Item")
        return ShoppingService.editShoppingItem(shoppingItem).then(() => {
            commit('EDIT_SHOPPING_LIST_ITEM', shoppingItem)
        }
        ).catch(error => {
            console.log("Error in editShoppingItem found in shoppingLists module Error found " + error.response)
        })
    },
    itemDone({ commit }, shoppingItem) {
        shoppingItem.completedStatus = true;
        return ShoppingService.itemDone(shoppingItem).then(() => {
            commit('DONE_SHOPPING_LIST_ITEM', shoppingItem)
        }).catch(error => {
            console.log("Error in itemDone found in shoppingLists module Error found " + error.response)
        })
    },
    itemUnDone({ commit }, shoppingItem) {
        shoppingItem.completedStatus = false;
        return ShoppingService.itemUnDone(shoppingItem).then(() => {
            commit('UNDONE_SHOPPING_LIST_ITEM', shoppingItem)
        }).catch(error => {
            console.log("Error in itemUnDone found in shoppingLists module Error found " + error.response)
        })
    },
    //Gets the shopping list data from DB and sets the state
    fetchShoppingLists({ commit }) {
        ShoppingService.getShoppingLists()
            .then(response => {
                commit('SET_SHOPPING_LISTS', response.data)
            })
            .catch(error => {
                console.log("Error in fetchShoppingLists found in shoppingLists module Error found " + error.response)
            })
    },
    //Gets the shopping item data from DB and sets the state
    fetchShoppingItem({ commit, getters }, id) {
        //Uses getter to see if the item already exist in the store
        var item = getters.getItemById(id)
        //If item does not equal 0, false, null, undefined aka true
        if (item) {
            //Set the state to contian the item
            commit('SET_SHOPPING_ITEM', item)
        } else {
            //If we can not find the item then find it then set the state 
            ShoppingService.getShoppingItem(id)
                .then(response => {
                    commit('SET_SHOPPING_ITEM', response.data)
                })
                .catch(error => {
                    console.log("Error in fetchShoppingItem found in shoppingLists module Error found ", error.response)
                })
        }
    }
}
export const getters = {
    getItemById: function (state) {
        return function (id) {
            return state.shoppingLists.find(function (shoppingItem) {
                return shoppingItem.id === id;
            });
        };
    }
};
