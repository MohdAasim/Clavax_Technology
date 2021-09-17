<template id="modal-template">
    <div class="p-4">
           <div class="col-4 p-4">
               <router-link to='/directory'><button class="btn btn-outline-info mt-5">Phone Book</button></router-link>        
           </div>
           <div class="input-group mt-4 ">
               <input class="w-50" placeholder="Search" v-model="search" @input="handleInput">         
              <!-- <router-link to='/addcontact'> -->
              <button class="btn btn-outline-info ml-2" @click='hello'>New Contact</button>
              <!-- </router-link>   -->
           </div>
            <div v-if="search">
                   <div v-for="item in searchResource" :key="item._id">
                       <button  class="btn btn-light w-50" @click="showcard" :value='item.contactName'>{{item.contactName }}</button>
                   </div>
               </div>
           <div class="card mt-5 p-4" v-for="item in cardSearch" :key='item._id'>
              <div><p>contactName :{{item.contactName}}</p>
              <p>email:{{item.email}}</p>
              <p>website:{{item.website}}</p>
              <p v-if="item.image">image:<img class="w-25" :src="imgUrl+item.image"></p>
              <p>contactType:{{item.contactType}}</p>
              <p>contactNumber:{{item.contactNumber}}</p>
              </div>
           </div>
            <add-contact v-if="showModal" @close="showModal = false"></add-contact>
    </div>       
</template>

<script>
import {mapState} from 'vuex'
import AddContact from './AddContact.vue'
    export default {
  components: { AddContact },
        data() {
            return {
                search:"",
                searchResource:[],
                cardSearch:[], 
                 showModal: false
            }
        },
        component:{
          AddContact
        },
        computed:{
            ...mapState({
                Resource:state=>state.Resource,
                  imgUrl:state=>state.imgUrl
            })
        },methods: {
            hello(){
                this.showModal = true
            },
            handleInput(e){
               if(this.search==''){
                   this.searchResource=[]
               }
                if(this.search.length>2){
                if(/^[a-zA-Z]+$/.test(this.search)){
                    this.searchResource = this.Resource.filter((item)=>{
                    return item.contactName.toLowerCase().includes(this.search.toLowerCase())
                })}else{  
                 this.searchResource = this.Resource.filter((item)=>{
                 return item.contactNumber.includes(this.search)
                })
                }
                }
            },
            showcard(e){
                const value = e.target.value;
                 this.cardSearch = this.Resource.filter((item)=>{
                    return item.contactName.match(value)
                })
                this.searchResource=[]
                this.search=''
            },
        },

    }
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>