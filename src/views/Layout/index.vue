<!-- 主题框架 -->
<template>
  <el-container>
    <el-aside :width=" isiscollapse?'200px': '64px'" class="ly-nav">
      <!-- Aside content -->
    <side/>
    </el-aside>
    <el-container>
      <el-header height class="ly-header">
        
        <headr/>
      </el-header>
      <el-main height class="ly-main">
        <!-- Main content -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import headr from './comn/headers'
import side from './comn/side'
import {mapState} from 'vuex';

export default {
  data() {
    return {};
  },

  components: {
    headr,side
  },

  computed: {
    ...mapState(['isiscollapse'])
  },

  methods: {},
};
</script>
<style lang='less' scoped>
.ly-nav{
  height: 100vh;
  // border: 1px solid #000;
  background:#545c64;
  // overflow: hidden;
}
.ly-header{
  // border: 1px solid #000;
  background: #fff;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ly-main{
  width: 100%;
  // height: ;
  background: #eee;
}
</style>