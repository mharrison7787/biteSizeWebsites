<template>
  <div id="HomePage">
    <nav><Logo></Logo></nav>
    <h1>Welcome to Shop It List!</h1>
    <button @click="goToCreateItem">Create a New Item</button>
    <router-link to="/ItemDetail/">See The Details</router-link>
    <shoppingListItem v-for="shoppingList in shoppingLists" :key="shoppingList.id" :shoppingList ="shoppingList"></shoppingListItem>
    <router-view/>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue"
import ShoppingService from "@/services/ShoppingService"
import shoppingListItem from "@/components/shoppingListItem.vue"

export default {
  name: 'HomePage',
  components: {
  Logo,
  shoppingListItem
  },
  created() {
    ShoppingService.getShoppingLists()
    .then(response => {
      this.shoppingLists = response.data
    })
    .catch(error => {
      console.log("Error in Homepage:" + error.response) 
    })
  }, 
  data () {
    return {
      shoppingLists: []
    }
  },
  methods: {
    goToCreateItem() {
      this.$router.push('/CreateItem');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: bold;
  color: green;
  font-size: 100px;
  
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img {
  width: 50px;
  height: 50px;
}
button {
  background:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-2210775-jpeg.jpg";
  background-color: #afff80;
  padding: 30px 30px;
  border: 2px solid blue;
  font-family: 'Courier New', Courier, monospace;
}

</style>
