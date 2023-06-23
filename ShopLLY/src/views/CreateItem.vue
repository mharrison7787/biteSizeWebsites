<template>
    <div>
        <h1>Let's Create an Item!</h1>
        <Logo></Logo>
        <form @submit.prevent="createShoppingItem">
            <label>Name Your Item:</label>
            <input v-model="shoppingItem.name" type="text" placeholder="Add a name here!">
            <br>
            <label>Description For Your Item:</label>
            <input v-model="shoppingItem.description" type="text" placeholder="Add a description here!">
            <br>
            <Label>How Many:</Label>
            <select v-model="shoppingItem.amount">
                <option v-for="amount in amounts" :value="amount" :key="amount">{{ amount }}</option>
            </select>
            <br>
            <br>
            <Label>Priority:</Label>
            <input type="checkbox" @change="handleCheckboxChange('high')">
            <label> High</label>
            <input type="checkbox"  @change="handleCheckboxChange('med')">
            <label> Med</label>
            <input type="checkbox"  @change="handleCheckboxChange('low')">
            <label> Low</label>
            <br>
            <br>
            <button type="submit">All Done!</button>
        </form>
    </div>
</template>


<script>
import Logo from "../components/Logo.vue"
    export default {
        components: {
        Logo //Terrbile MS paint drawling
    },
    data() {
    return {
      name: '', //The name of the item
      description: '', //The description of the item
      amounts: [], //How much of the item
      selectedPriority: '', //The priority of the item
      completedStatus: true,
      shoppingItem: this.createShoppingItemObject() //Takes all the prev data to create a new shopping item object with that data
    };
  },
  mounted() {
    this.generateOptions(); //Allows us to generate the different numbers needed for amount after DOM loaded
  },
  methods: {
    createShoppingItem() {
      //Calls the action createShoppingItem and when create pushes user to the route of the newly created item
      this.$store.dispatch('moduleList/createShoppingItem', this.shoppingItem).then(() => {
        this.$router.push({
          name: "ItemDetail",
          params: { id: this.shoppingItem.id }
        })
        this.shoppingItem = this.createShoppingItemObject()
      }).catch(() => {
        console.log('There was a problem in CreateItem')
      })
    },
    //Gets the 1-10 for the amount and pushes to the select tab
    generateOptions() {
      for (let i = 1; i <= 10; i++) {
        this.amounts.push(i);
      }
    },
    //The newly created item object 
    createShoppingItemObject() {
      const id = Math.floor(Math.random() * 10000000)
      return {
      name: '',
      id: id,
      description: '',
      selectedPriority: '',
      amount: '',
      completedStatus: false
      }
    },
    //Sets the boxed choice to be the selected priority for the item object
    handleCheckboxChange(value) {
      this.shoppingItem.selectedPriority = value
    }
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@1,300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&family=Roboto:wght@700&display=swap');
form {
  background:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-2210775-jpeg.jpg";
  background-color: #afff80;
  padding: 50px 50px;
  border: 2px solid blue;
  box-shadow: 15px 15px 1px green, 15px 15px 1px 2px blue;
  width: 20vw;
  height: 40vh;
  align-items: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  

}

h1 {
 color: green;
 font-family: 'Roboto', sans-serif;
font-family: 'Roboto Mono', monospace;
}
input {
  display: block;
  width: 100%;
  font-size: 14pt;
  line-height: 14pt * 2;
  font-family: 14pt;
  margin-bottom: 14pt * 2;
  border: none;
  border-bottom: 5px solid green;
  background: #afff80;
  min-width: 250px;
  padding-left: 5px;
  outline: none;
  color: rgba(0,0,0,1);
}
label {
    color: blue;
    font-family: "Roboto Mono", monospace;
    
}

</style>