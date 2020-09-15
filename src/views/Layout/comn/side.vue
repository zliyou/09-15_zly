<!-- 侧边导航 -->
<template>
  <div class="logo">
    <div class="titTop">
      <h4>
        {{ isiscollapse?'XX商城后台管理系统' :'XX后台' }}
        
      </h4>
    </div>
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      router
      :default-active="$route.path"
      :collapse="!isiscollapse"
    >
      <el-menu-item index="/">
        <i class="el-icon-house"></i>
        {{ isiscollapse?'主页' :''}}
        
      </el-menu-item>

      <el-submenu :index="index+''" v-for="(item, index) in getmenus" :key="index">
        <template slot="title">
          <i :class="item.icon"></i>
          {{isiscollapse? item.title:'' }}
        </template>
        <el-menu-item v-for="(ite,idx) in item.children" :key="idx" :index="ite.url"><i :class="ite.icon"></i>
          {{ite.title}}
        </el-menu-item>
        <!-- <el-menu-item index='/system/role'>
           角色管理
        </el-menu-item>
        <el-menu-item index='/system/user'>
           管理员管理
        </el-menu-item>-->
      </el-submenu>

      <!-- <el-submenu index="3" >
        <template slot="title">
          <i class="el-icon-setting"></i>
          商城管理</template>
        <el-menu-item index='/goods/category'>
           分类管理
        </el-menu-item>
        <el-menu-item index='/goods/specs'>
           规格管理
        </el-menu-item>
        <el-menu-item index='/goods/goods'>
           商品管理
        </el-menu-item>
        <el-menu-item index='/goods/member'>
           会员管理
        </el-menu-item>
        <el-menu-item index='/goods/banner'>
           轮播图管理
        </el-menu-item>
        <el-menu-item index='/goods/seckill'>
           秒杀管理
        </el-menu-item>
      </el-submenu>-->
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },

  components: {},

  computed: {
    ...mapState(["isiscollapse"]),
    ...mapGetters({
      getmenus: "user/getmenus",
    }),
  },

  mounted() {},
  methods: {},
};
</script>
<style lang='less' scoped>
.logo {
  white-space: nowrap;
  overflow: hidden;
}
.titTop {
  background: #666;
  color: #fff;
  text-align: center;

  h4 {
    line-height: 60px;
  }
}
.el-menu {
  border-right: none;
}
</style>