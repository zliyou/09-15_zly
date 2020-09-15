import {getRole} from '@/require/role';

export default {

  namespaced:true,
  state: {
    roleList:[]
  },
  getters: {
    roleList:state=>state.roleList
  },
  mutations: {
      GETROLE(state,data){
        state.roleList = data;
      },
      
  },

  actions: {

    async GetRole({commit}){
      let res = await getRole();
      console.log(res);
      commit('GETROLE',res.list)
    },

  }
};