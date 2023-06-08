// Import the necessary dependencies
import Vue from 'vue' // Importing the Vue library
import App from './App.vue' // Importing the root component of the application
import router from './router' // Imported Vue Router instance
import store from './store' // Imported Vue store instance

Vue.config.productionTip = false

new Vue({
  router, //Intergrating the vue rotuer instance into the root vue instance
  store, //Intergrating thje store instance into the root viuue
  render: (h) => h(App), //Rendering the root component (App.vue) within the instance
}).$mount('#app') /// Mounting the Vue instance to the element with id 'app' in the DOM
