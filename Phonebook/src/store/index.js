import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Resource:[],
    imgUrl:'http://localhost:5000/public/data/uploads/'
  },
  mutations: {
    setResources(state){
      state.Resource=[]
    }
  },
  actions: {
     getDirectory(context){
      context.state.Resource=[]
       axios.get('/getdirectory').then((res)=>{
         const result = res.data
         context.state.Resource=result;
       }).catch((err)=>{
         console.log(err)
       })
     },
     POST_DIRECTORY(context,payload){
       console.log(payload)
      axios.post('/save',payload).then((res)=>{
        if(res){
          alert("Contact Saved")
          context.dispatch('getDirectory')
        }     
      }).catch((err)=>{
        console.log(err)
      })
    }
  },
  
})
