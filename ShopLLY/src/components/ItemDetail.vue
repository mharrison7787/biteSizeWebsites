<template>
    <div>
        <h1> {{ shoppingList }}</h1>
        <Logo></Logo>
    </div> 
</template>

<script>
import Logo from "@/components/Logo.vue"
import ShoppingService from "@/services/ShoppingService"
export default {
  name: 'ItemDetail',
  components: {
  Logo
  },
  data() {
    return {
      shoppingList: {}
    }
  },
  //This is where the error is happening 
  created() {
    ShoppingService.getShoppingLists(this.id)
    .then(response => {
      this.shoppingList = response.data
      console.log("We got all the data")
    })
    .catch(error => {
      console.log("Error in ItemDetail", error.response)
    })
  }
}
</script>

<style scoped>

</style>