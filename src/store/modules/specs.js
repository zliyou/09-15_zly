import { getSpecslist, getTotal } from '@/require/specs';
import { Message } from 'element-ui';
import router from '@/router';




export default {

  namespaced: true,
  state: {
    // 用户列表
    specsList: [],
    // 每页数量
    size: 10,
    // 当前页
    page: 1,
    // 总页数
    total: null,
  },
  getters: {
    specsList: state => state.specsList,
    size: state => state.size,
    page: state => state.page,
    total: state => state.total

  },
  mutations: {
    SETUSERINFO(state, data) {
      state.specsinfo = data;
    },
    GETUSER(state, data) {
      state.specsList = data;
    },

    SETSIZE(state, data) {
      state.size = data;
    },
    SETPAGE(state, data) {
      state.page = data;
    },

    GETTOTAL(state, data) {
      state.total = data;
    }

  },

  actions: {

    


    async getSpecslist({ commit, state, dispatch }) {
      let res = await getSpecslist(state.size, state.page);

      commit('GETUSER', res.list)
      dispatch('GetTotal')
    },
    async GetTotal({ commit }, data) {
      let res = await getTotal();

      commit('GETTOTAL', res.list[0].total)
    },
    setpage({ commit, dispatch }, data) {
      // console.log(data)
      commit('SETPAGE', data)
      dispatch('getSpecslist');
    },
    setsize({ commit, dispatch }, data) {
      // console.log(data)
      commit('SETSIZE', data);
      dispatch('getSpecslist');
    }
  }
};