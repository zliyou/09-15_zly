import {getBanner} from '@/require/banner';

export default {

  namespaced:true,
  state: {
    bannerList:[]
  },
  getters: {
    bannerList:state=>state.bannerList
  },
  mutations: {
      GETMENU(state,data){
        state.bannerList = data;
      },
      
  },

  actions: {

    async getBannerlist({commit}){
      let res = await getBanner();
      // console.log(res);
      commit('GETMENU',res.list)
    },

  }
};