import {getList} from '@/require/menu';

export default {

  namespaced:true,
  state: {
    menuList:[]
  },
  getters: {
    menuList:state=>state.menuList
  },
  mutations: {
      GETMENU(state,data){
        state.menuList = data;
      },
      
  },

  actions: {

    async getmenu({commit}){
      let res = await getList();
      // console.log(res);
      commit('GETMENU',res.list)
    },

  }
};