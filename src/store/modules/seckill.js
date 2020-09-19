import { getSecklist ,getCateGoods} from '@/require/seckill';




export default {

  namespaced: true,
  state: {
    // 用户列表
    seckList: [],
    categoods:[]
  },
  getters: {
    seckList: state => state.seckList,
    categoods: state => state.categoods

  },
  mutations: {
    
    CLEARCGS(state){
      
      state.categoods=[]
    },

    GETUSER(state, data) {
      state.seckList = data;
    },

    GETGOODSINF(state,data){
      state.categoods = data;
    }

  },

  actions: {

    clearcgs({commit}){
      commit('CLEARCGS');
    },

    async getCateGoods({commit},data){
      // data格式：{fid:一级分类,sid:二级分类id}
      let res = await getCateGoods(data);
      // console.log(res);
      commit("GETGOODSINF",res.list.list);
    },


    async getSecklist({ commit, state, dispatch }) {
      let res = await getSecklist();

      commit('GETUSER', res.list)
    },
    
   
  }
};