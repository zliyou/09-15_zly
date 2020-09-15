import Vue from 'vue'
import Router from 'vue-router'

import store from "@/store";

Vue.use(Router)


const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
}


let vuerouter = new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/views/Layout'),
      meta: { title: '框架' },
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: '主页',
          component: () => import('@/views'),
          meta: { title: '主页' }
        },
        {
          path: '/system/role',
          name: '角色管理',
          component: () => import('@/views/System/Role'),
          meta: { title: '角色管理' }
        },
        {
          path: '/system/menu',
          name: '菜单管理',
          component: () => import('@/views/System/Menu'),
          meta: { title: '菜单管理' }
        },
        {
          path: '/system/user',
          name: '管理员管理',
          component: () => import('@/views/System/User'),
          meta: { title: '管理员管理' }
        },
        {
          path: '/goods/category',
          name: '商品分类',
          component: () => import('@/views/Shop/Category'),
          meta: { title: '商品分类' }
        },
        {
          path: '/goods/specs',
          name: '商品规格',
          component: () => import('@/views/Shop/Specs'),
          meta: { title: '商品规格' }
        },
        {
          path: '/goods/goods',
          name: '商品管理',
          component: () => import('@/views/Shop/Goods'),
          meta: { title: '商品管理' }
        },
        {
          path: '/goods/member',
          name: '会员管理',
          component: () => import('@/views/Shop/Member'),
          meta: { title: '会员管理' }
        },
        {
          path: '/goods/banner',
          name: '轮播图',
          component: () => import('@/views/Shop/Banner'),
          meta: { title: '轮播图' }
        },
        {
          path: '/goods/seckill',
          name: '秒杀管理',
          component: () => import('@/views/Shop/Seckill'),
          meta: { title: '秒杀管理' }
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: () => import('@/views/Login'),
      meta: { title: '登录' }
    }

  ]
})

vuerouter.beforeEach((to, from, next) => {
  // next()
  // console.log(to);
  // console.log();
  if (to.path == '/login') {

    next();
  } else {
    // console.log("aaa");
    if (localStorage.getItem("userInfo")) {
      let white = store.getters['user/getmenus_url'];
      white.push('/index');
      if (white.includes(to.path)) {
        next();
        document.title = to.name;
      }
    } else {
      next('/login')
    }
  }
})



export default vuerouter;
