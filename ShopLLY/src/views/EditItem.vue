<template>
  <div>
    <form @submit.prevent="editShoppingItem">
      <label>Rename Your Item:</label>
      <input v-model="name" :placeholder="namePlaceHolderText" :class="{ 'empty': nameIsEmpty }">
      <br>
      <label>New Description For Your Item:</label>
      <input v-model="description">
      <br>
      <Label>New Amount:</Label>
      <select v-model="amounts" :class="{ 'amountEmpty': amountIsEmpty }">
        <option v-for="amount in amounts" :value="amount" :key="amount">{{ amount }}</option>
      </select>
      <br>
      <br>
      <Label :class="{ 'priorityEmpty': priorityIsEmpty }">New Priority:</Label>
      <input type="radio" v-model="selectedPriority" value="high"> high
      <input type="radio" v-model="selectedPriority" value="med"> med
      <input type="radio" v-model="selectedPriority" value="low"> low
      <br>
      <br>
      <button type="submit">All Done!</button>
    </form>
    <Logo></Logo>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue"
import { mapActions, mapState } from 'vuex'
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
  //You could add a prop of item_id  to the /edit route you have (if you’re not using a modal) 
  //and on mounted/created you could add a call to fetch that specific item from your db.json  
  //file which would solve all of the data being wiped on refresh
  components: {
    Logo
  },
  data() {
    return {
      name: '',
      description: '',
      amounts: [],
      selectedPriority: '',
      namePlaceHolderText: "Add a name here",
      amountPlaceHolderText: "Amount",
      priorityPlaceHolderText: "Prioirty",
      nameIsEmpty: false,
      amountIsEmpty: false,
      priorityIsEmpty: false
    }
  },
  mounted() {
    console.log("Mounted Hello")
    let that = this
    this.$store.dispatch('moduleList/fetchShoppingItem', this.id).then(() => {
      let shoppingItem = this.getItemById(this.id)
      that.name = shoppingItem.name
      that.description = shoppingItem.description
    })
    this.generateOptions();
  },
  computed: {
    ...mapState("moduleList", [

    ]),
    ...mapGetters({
      getItemById: "moduleList/getItemById"
    }),
  },
  methods: {
    editShoppingItem() {
      let shoppingItem = {
        name: this.name,
        id: this.id,
        description: this.description,
        amount: this.amounts,
        selectedPriority: this.selectedPriority,
        completedStatus: this.completedStatus
      }
      if (shoppingItem.name === "" || !shoppingItem.name.trim()) {
        this.namePlaceHolderText = "Must have a name!"
        this.nameIsEmpty = true;
      } else if (shoppingItem.amount === "") {
        this.amountPlaceHolderText = "Must have a amount"
        this.amountIsEmpty = true;
      } else if (shoppingItem.selectedPriority === "") {
        this.priorityPlaceHolderText = "Must have a prioirty!"
        this.priorityIsEmpty = true;
      } else {
        console.log(shoppingItem)
        this.$store.dispatch('moduleList/editShoppingItem', shoppingItem).then(() => {
          this.$router.push('/');
        }).catch(() => {
          console.log('Error in editShoppingItem found in EditItem.vue')
        })
      }
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
    /*  editShoppingItemObject() {
       console.log("Inside editShoppingItemObject line 82")
       return {
         name: '',
         id: this.id, //Trying to use the same id as the one passed in
         description: '',
         selectedPriority: '',
         amount: ''
       }
     } */
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@1,300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&family=Roboto:wght@700&display=swap');

form {
  background: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-2210775-jpeg.jpg";
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
  color: rgba(0, 0, 0, 1);
}

label {
  color: blue;
  font-family: "Roboto Mono", monospace;

}

.empty::placeholder {
  font-weight: bolder;
  color: blue
}

.amountEmpty {
  font-weight: bolder;
  color: blue;
}

.priorityEmpty {
  font-weight: bolder;
  color: blue;
}</style>