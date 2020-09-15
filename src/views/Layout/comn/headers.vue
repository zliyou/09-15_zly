<!-- 头部内容 -->
<template>
  <div class="heard">
    <div class="hder-left">
      <el-button
        type="primary"
        class="iconfs"
        v-if="isiscollapse"
        icon="el-icon-d-arrow-left"
        @click="SCOLLAPSE"
      ></el-button>
      <el-button
        type="primary"
        class="iconfs"
        v-else
        icon="el-icon-d-arrow-right"
        @click="SCOLLAPSE"
      ></el-button>
      <!-- el-icon-d-arrow-right -->
      <el-breadcrumb style="margin:0 15px" separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ path:$route.path }"
          v-if="$route.path=='/index'?false:true"
        >{{$route.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button
        circle
        size="small"
        icon="el-icon-caret-left"
        @click="$router.go(-1)"
        v-if="$route.path=='/index'?false:true"
      ></el-button>
    </div>
    <div class="hder-rig">
      <el-dropdown>
        <span class="el-dropdown-link">
          欢迎你：{{ getusername }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="brek">退出登录</el-dropdown-item>
          <el-dropdown-item @click.native="buttoncli">切换全屏</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import screenfull from "screenfull";
export default {
  data() {
    return {};
  },
  created() {
    // console.log(this.$route);
  },
  components: {},

  computed: {
    ...mapState(["isiscollapse"]),
    ...mapGetters({
      getusername: "user/getusername",
    }),
  },

  methods: {
    ...mapMutations({
      SCOLLAPSE: "SCOLLAPSE",
    }),
    brek() {
      this.$confirm("确定退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          localStorage.removeItem("userInfo");
          this.$router.replace("/login");
        })
        .catch(() => {});
    },
    buttoncli() {
      console.log(screenfull);
      if (!screenfull.isEnabled) {
        // 如果不允许进入全屏，发出不允许提示
        this.$message({
          message: "不支持全屏",
          type: "warning",
        });
        return false;
      }
      screenfull.toggle();
      this.$message({
        message: "全屏啦",
        type: "success",
      });
    },
  },
};
</script>
<style lang='less' scoped>
.heard {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .hder-left {
    display: flex;
    align-items: center;
    .iconfs {
      font-size: 15px;
    }
  }
}
</style>