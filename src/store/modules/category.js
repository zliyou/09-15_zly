import {getCate} from '@/require/category';

export default {

  namespaced:true,
  state: {
    categoryList:[]
  },
  getters: {
    categoryList:state=>state.categoryList
  },
  mutations: {
      GETMENU(state,data){
        state.categoryList = data;
      },
      
  },

  actions: {

    async getCategory({commit}){
      let res = await getCate();
      // console.log(res);
      commit('GETMENU',res.list)
    },

  }
};