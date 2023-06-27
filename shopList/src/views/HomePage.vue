<template>
  <div id="HomePage">
    <nav>
      <Logo></Logo>
    </nav>
    <h1>Welcome to Shop It List!</h1>
    <button @click="goToCreateItem">Create a New Item</button>
    <shoppingListItem class="high" v-for="shoppingItem in highShoppingItems" :key="shoppingItem.id"
      :shoppingList="shoppingItem"></shoppingListItem>
    <shoppingListItem class="med" v-for="shoppingItem in medShoppingItems" :key="shoppingItem.id"
      :shoppingList="shoppingItem"></shoppingListItem>
    <shoppingListItem class="low" v-for="shoppingItem in lowShoppingItems" :key="shoppingItem.id"
      :shoppingList="shoppingItem"></shoppingListItem>
    <shoppingListItem class="complete" v-for="shoppingItem in completedShoppingItems" :key="shoppingItem.id"
      :shoppingList="shoppingItem"></shoppingListItem>
    <router-view />
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue"
import shoppingListItem from "@/components/shoppingListItem.vue"
import { mapState } from 'vuex'

export default {
  name: 'HomePage',
  components: {
    Logo, //Terrible ms paint drawling
    shoppingListItem //Each indivudal item on the list
  },
  //Gets all the db data and gets the full list of items
  created() {
    this.$store.dispatch('moduleList/fetchShoppingLists')
  },
  //creates the componets for the store module (ShoppingLists)
  computed: {
    ...mapState("moduleList", {
      shoppingLists: 'shoppingLists'
    }),
    completedShoppingItems() {
      return this.shoppingLists.filter(item => item.completedStatus === true);
    },
    incompletedShoppingItems() {
      return this.shoppingLists.filter(item => item.completedStatus === false);
    },
    highShoppingItems() {
      return this.shoppingLists.filter(item => item.selectedPriority === 'high' && item.completedStatus === false);
    },
    medShoppingItems() {
      return this.shoppingLists.filter(item => item.selectedPriority === 'med' && item.completedStatus === false);
    },
    lowShoppingItems() {
      return this.shoppingLists.filter(item => item.selectedPriority === 'low' && item.completedStatus === false);
    }
  },

  //Routes to create item when clicked on the button
  methods: {
    goToCreateItem() {
      this.$router.push('/CreateItem')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
  background: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-2210775-jpeg.jpg";
  background-color: #afff80;
  padding: 30px 30px;
  border: 2px solid blue;
  font-family: 'Courier New', Courier, monospace;
}

.complete {
  text-decoration: line-through;
  background-color: lightgrey;
}

.high {
  background-color: red
}

.med {
  background-color: orange
}

.low {
  background-color: green
}</style>
