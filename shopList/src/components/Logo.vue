<template>
    <div>
      <router-link :to="{ name: 'HomePage'}"> 
        <img src="../assets/shopCart.png"> 
      </router-link>
    </div>
</template>

<script>
    export default {
    methods: {
    goToHomePage() {
      this.$router.push('/')
      .catch(error => {
        console.log("Error in Logo.vue Error founded:" + error)
      });
    }, 
  }
    }
</script>

<style scoped>
img {
  position: absolute;
  top: 8px;
  left: 16px;
  width: 150px;
  height: auto;
  background-color: white;
}
</style>