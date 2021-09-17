<template >
    <div class="p-5">
        <router-link to='/'><button class="btn btn-outline-info">Back</button></router-link>       
        <div class="card mt-5" v-for="items in Resource" :key="items._id">    
            <ul>
            <li><p>contactName:{{items.contactName}}</p>
              <p>email:{{items.email}}</p>
              <p>website:{{items.website}}</p>
              <p v-if='items.image'>image:<img class="w-25" :src="imgUrl+items.image"></p>
              <p>contactType:{{items.contactType}}</p>
              <p>contactNumber:{{items.contactNumber}}</p>
            </li>
            </ul>  
        </div>
        <router-link to='/'><button class="btn btn-outline-info mt-4 mb-5">Back</button></router-link>   
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState({
            Resource:state=>state.Resource,
            imgUrl:state=>state.imgUrl
        })
    },
}
</script>
<style lang="">
    
</style>