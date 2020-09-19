<!-- 表格 -->
<template>
  <el-table
    :data="bannerList"
    border
    style="width: 100%"
    
    
  >
    <el-table-column prop="id" align="center" label="ID"></el-table-column>
    <el-table-column prop="title" align="center" label="banner名称"></el-table-column>
    <el-table-column prop='img'  align="center" label="banner图片">
      <template slot-scope="scope">
       
        <img :src="scope.row.img | imgUrl" v-if="scope.row.img" alt="" width="80">
        <span v-else>暂无图片</span>
      </template>
    </el-table-column>
    <el-table-column prop="status" align="center" label="状态">
      <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="danger" v-if="scope.row.status==2">禁用</el-tag>
        </template>
    </el-table-column>
    
    <el-table-column prop="caoz" align="center" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row)" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" @click="del(scope.row)" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { delBanner } from "@/require/banner";

export default {
  data() {
    return {};
  },

  components: {},

  computed: {
    ...mapGetters({
      bannerList: "banner/bannerList",
    }),
  },

  methods: {
    ...mapActions({
      getBannerlist: "banner/getBannerlist",
    }),
    async del(item) {

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          console.log(item.id);
          let res = await delBanner(item.id);
          if (res.code == 200) {
            this.getBannerlist();
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    },
    edit(item) {
      this.$emit("ite", item);
    },
  },
};
</script>
<style lang='less' scoped>
</style>