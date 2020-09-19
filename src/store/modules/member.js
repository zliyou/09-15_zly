import { getMember } from '@/require/member';




export default {

  namespaced: true,
  state: {
    // 用户列表
    memberList: [],
  },
  getters: {
    memberList: state => state.memberList

  },
  mutations: {

    GETUSER(state, data) {
      state.memberList = data;
    }

  },

  actions: {


    async getMemberList({ commit }) {
      let res = await getMember();

      commit('GETUSER', res)
    },
    
   
  }
};