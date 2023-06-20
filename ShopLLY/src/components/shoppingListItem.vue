<template>
  <div>
    <router-link class="event-link" :to="{ name: 'ItemDetail', params: { id: shoppingList.id } }">
    <div class="event-card -shadow">
      <span class="eyebrow"> <!--The problematoc axios call-->
        {{ shoppingList.name }} : {{ shoppingList.description }}
      </span>
    </div>
  </router-link>
  <button @click="deleteItem">Delete</button>
  <button @click="editItem"> Edit </button>
</div>
    
</template>

<script>
    export default {
    props: {
        shoppingList: Object
    },
    methods: {
      deleteItem() {
        if (window.confirm('Are you sure you want to delete this item?')) {
        // User confirmed, proceed with deletion
        this.$store.dispatch('moduleList/deleteShoppingItem', this.shoppingList.id) //I want to pass in the shoppingItem so we delete it
        //! MOST DEF SHOULD FIND A BETTER WAY OF DOING THIS
        //? Triggers a reload of the current route. 
        //this.$router.go();
            }
         }, 
      editItem() {
        this.$router.push('/EditItem');
      }
      }
    }
</script>

<style  scoped>
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}
.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>