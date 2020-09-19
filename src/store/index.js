import Vue from 'vue';
import Vuex from 'vuex';

import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'
import category from './modules/category'
import specs from './modules/specs'
import goods from './modules/goods'
import banner from './modules/banner'
import seckill from './modules/seckill'
import member from './modules/member'
Vue.use(Vuex);

let store = new Vuex.Store({
  state:{
    isiscollapse:true
  },
  getters:{

  },
  mutations:{
    SCOLLAPSE(state){
      state.isiscollapse = !state.isiscollapse;
    }
  },
  actions:{
    
  },
  modules:{
    menu,role,user,category,specs,goods,banner,seckill,member
  }
})

export default store;