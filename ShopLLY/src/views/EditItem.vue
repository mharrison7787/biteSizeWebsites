<template>
    <div>
        <form @submit.prevent="editShoppingItem">
            <label>Rename Your Item:</label>
            <input v-model="name" >
            <br>
            <label>New Description For Your Item:</label>
            <input v-model="description">
            <br>
            <Label>New Amount:</Label>
            <select>
                <option v-for="amount in amounts" :value="amount" :key="amount">{{ amount }}</option>
            </select>
            <br>
            <br>
            <Label>New Priority:</Label>
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
        <Logo></Logo>
    </div> 
</template>

<script>
import Logo from "@/components/Logo.vue"
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {
  name: 'EditItem',
  props: {
    id: 
    {
      type: Number, 
      required: true
    }
  },
  components: {
  Logo
  },
  data() {
    return {
        name: '',
        description: '',
        amounts: [],
        selectedPriority: '',
    }
  },
  mounted() {
    this.name = this.shoppingItem.name
    this.description = this.shoppingItem.description
    this.generateOptions();
  },
  computed: {
  ...mapState("moduleList", [
    
  ]),
  ...mapGetters({
    getItemById: "moduleList/getItemById"
  }), 
  shoppingItem() {
    return this.getItemById(this.id)
  }
},
  methods: {
    editShoppingItem() {
     this.$store.dispatch('moduleList/editShoppingItem').then(() => {
      this$.router.push({
        name: "ItemDetail",
        params: {id: this.shoppingItem.id}
      })
      this.shoppingItem = this.editShoppingItemObject()
     }).catch(() => {
      console.log ("Error in editShoppingItem in EditItem.vue line 67" + error.response)
     })
    },
    print() {
        console.log(this.shoppingItem.id)
    },
    generateOptions() {
      for (let i = 1; i <= 10; i++) {
        this.amounts.push(i);
      }
    },
    handleCheckboxChange(value) {
      this.shoppingItem.selectedPriority = value
    }, 
    editShoppingItemObject() {
      console.log("Inside editShoppingItemObject line 82")
      return {
        name: '',
        id: this.id, //Trying to use the same id as the one passed in
        description: '',
        selectedPriority: '',
        amount: ''
      }
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