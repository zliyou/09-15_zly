import { getUser, getTotal, GetLogin } from '@/require/user';
import { Message } from 'element-ui';
import router from '@/router';


let userInfo = localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem('userInfo')) :{}

export default {

  namespaced: true,
  state: {
    // 用户列表
    userList: [],
    // 每页数量
    size: 1,
    // 当前页
    page: 1,
    // 总页数
    total: null,
    // 登录的用户信息
    userinfo: userInfo
  },
  getters: {
    userList: state => state.userList,
    size: state => state.size,
    page: state => state.page,
    total: state => state.total,
    getusername:state=>state.userinfo.username,
    getmenus:state=>state.userinfo.menus,
    getmenus_url:state=>state.userinfo.menus_url,

  },
  mutations: {
    SETUSERINFO(state, data) {
      state.userinfo = data;
    },
    GETUSER(state, data) {
      state.userList = data;
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

    

    async Login({ commit }, data) {
      // console.log(data);
      let res = await GetLogin(data);
      if (res.code == 200) {
        commit('SETUSERINFO',res.list);
        Message.success(res.msg);
        localStorage.setItem("userInfo",JSON.stringify(res.list));
        // console.log(router);
        router.push('/');
      } else {
        Message.error(res.msg);
      }
    },


    async GetUser({ commit, state, dispatch }) {
      let res = await getUser(state.size, state.page);

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
      dispatch('GetUser');
    },
    setsize({ commit, dispatch }, data) {
      // console.log(data)
      commit('SETSIZE', data);
      dispatch('GetUser');
    }
  }
};