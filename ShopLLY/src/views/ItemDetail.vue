<template>
    <div>
        <h1> {{ shoppingItem.name }}</h1>
        <Logo></Logo>
    </div> 
</template>

<script>
import Logo from "@/components/Logo.vue"
import { mapState } from 'vuex'
export default {
  name: 'ItemDetail',
  props: ['id'],
  components: {
  Logo
  },
 
  created() {
    this.$store.dispatch('moduleList/fetchShoppingItem', this.id)
    .catch(error => {
          console.log("Error in created() found in ItemDetail.vue Error founded:" + error)
        }) 
  },
  computed: mapState("moduleList", {shoppingItem:'shoppingItem'})
}
</script>

<style scoped>

</style>