<template>
  <div id="app">
    <TCNnavbar></TCNnavbar>
    <HelloWorld />

    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <slideDeck></slideDeck>
        </div>
        <div class="col-md-7">
          <slideDeckRight></slideDeckRight>
        </div>
      </div>
    </div>
    <TCNBottmNavbar></TCNBottmNavbar>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import TCNnavbar from './components/TCNnavbar.vue';
import slideDeck from './components/slideDeck.vue';
import slideDeckRight from './components/slideDeckRight.vue';
import TCNBottmNavbar from './components/TCNBottmNavbar.vue';
export default {
  name: 'App',
  components: {
    HelloWorld,
    TCNnavbar,
    slideDeck,
    slideDeckRight,
    TCNBottmNavbar,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
