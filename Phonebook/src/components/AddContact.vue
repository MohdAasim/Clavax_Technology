<template >
    <transition name="modal">
    <div class="modal-mask modal-wrapper">
        <div class="card ml-5 mr-5 mt-5 modal-container">
         <h5 class="p-2 ml-2 mt-4">Add Contact Details</h5>
         <input class="p-2 mt-4 ml-2 mr-2" placeholder="contactName" v-model="contactName" type="text">
         <input class="p-2 mt-4 ml-2 mr-2" type="email" placeholder="email" v-model="email">
         <input class="p-2 mt-4 ml-2 mr-2" placeholder="website" v-model="website">
          <div class="mt-4 ml-2 mr-2">
            <img :src="file.name" class="uploading-image w-25" />
            <input type="file" ref="file"  @change=uploadImage>
        </div>
        <select class="p-2 mt-4 ml-2 mr-2" v-model="contactType" >
        <option value="" disabled selected>Contact Type</option>
        <option>Family</option>
        <option>Home</option>
        <option>Office</option>
        <option>Friend</option>
        </select>
         <input class="p-2 mt-4  ml-2 mr-2" placeholder="Primary contactNumber" v-model="contactNumber" type="Number">
         <input class="p-2 mt-4  ml-2 mr-2" placeholder="Secondary contactNumber" v-model="contactNumber1" type="Number">
         <div>
         <button class="btn btn-outline-info mb-4 mt-4  ml-2 mr-2" @click.prevent="saveData">Save</button>
         <button class="btn btn-outline-info mb-4 mt-4  ml-2 mr-2" @click="$emit('close')">Back</button>
         </div>
        </div>     
    </div>
     </transition>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            contactName:"",
            email:"",
            website:"",
            image:"",
            contactType:"",
            contactNumber:"",
            contactNumber1:"",
            file:""
        }
    },
    computed:{
      ...mapState({
          Resource:state=>state.Resource
      })
    },
    methods: {
        uploadImage(e){
              const allowedTypes =["image/jpeg","image/jpg","image/png"]
              const file = this.$refs.file.files[0]
              this.file=file;
              if(!allowedTypes.includes(file.type)){
                  alert("Only images are required")
                  return;
              }
              if(file.size>100000){
                  alert("file size is too larged maximum allowed 100kb");
                  return
              }
        },
        
        saveData(){    
            const allowedTypes =["image/jpeg","image/jpg","image/png"]       
             if(this.contactName==""){
                alert("Fill Contact Name")
            }
            else if(this.contactType==""){
                alert("Fill Contact Type")
            }
            else if(this.contactNumber==""||this.contactNumber.length!=10){
                console.log(this.contactNumber.length)
                alert("Fill primary Contact Number of 10 Numbers")
            }else{      
            for(let item of this.Resource){
                if(this.contactName==item.contactName){
                    alert("name should be unique")
                    return;
                }else if(this.contactNumber==item.contactNumber){
                     alert("number should be unique")
                     return;
                }
            }  
               console.log("length",this.contactNumber.length)
             const formdata = new FormData()
             if(this.file){
            if(!allowedTypes.includes(this.file.type)||this.file.size>100000){
            this.file.size>100000? alert("file size is too larged maximum allowed 100kb") 
            :alert("Only images are required")
              return;
              }else{
             formdata.append('image',this.file,this.file.name)}
             }
             formdata.append('contactName',this.contactName)
             if(this.email){
             formdata.append('email',this.email) }
             if(this.website){
             formdata.append('website',this.website)}
             formdata.append('contactType',this.contactType)
             formdata.append('contactNumber',this.contactNumber)
             formdata.append('contactNumber1',this.contactNumber1)
            this.$store.dispatch('POST_DIRECTORY',formdata);
            this.$emit('close')
            }
        }
    },
}
</script>
<style lang="">
    
</style>