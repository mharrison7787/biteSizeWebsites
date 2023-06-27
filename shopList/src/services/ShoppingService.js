import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    //gets the full list
    getShoppingLists() {
        return apiClient.get('/shoppingListsDB')
    },
    //gets the single item by id
    getShoppingItem(id) {
        return apiClient.get('/shoppingListsDB/' + id)
    },
    //post the newly created item to the database shopping list
    postShoppingItem(shoppingItem) {
        //console.log(shoppingItem)
        return apiClient.post('/shoppingListsDB', shoppingItem)
    },
    deleteShoppingItem(id) {
        return apiClient.delete('/shoppingListsDB/' + id)
    },
    editShoppingItem(shoppingItem) {
        console.log("In the axios call editShoppingItem:" + shoppingItem.name)
        return apiClient.put('/shoppingListsDB/' + shoppingItem.id, shoppingItem)
    },
    itemDone(shoppingItem) {
        return apiClient.put('/shoppingListsDB/' + shoppingItem.id, shoppingItem)
    },
    itemUnDone(shoppingItem) {
        return apiClient.put('/shoppingListsDB/' + shoppingItem.id, shoppingItem)
    },
}
