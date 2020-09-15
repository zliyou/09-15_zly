<!-- 表格 -->
<template>
  <el-table
    :data="menuList"
    border
    style="width: 100%"
    row-key="id"
    :tree-props="{children: 'children'}"
  >
    <el-table-column prop="id" align="center" label="ID"></el-table-column>
    <el-table-column prop="title" align="center" label="标题"></el-table-column>
    <el-table-column prop="url" align="center" label="地址"></el-table-column>
    <el-table-column prop="icon" align="center" label="图标">
      <template slot-scope="scope">
        <i :class="scope.row.icon"></i>
      </template>
    </el-table-column>
    <el-table-column prop="type" align="center" label="类型">
      <template slot-scope="scope">
        <el-tag type="success" v-if="scope.row.type==1">目录</el-tag>
        <el-tag type="warning" v-if="scope.row.type==2">菜单</el-tag>
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
import { delMenu } from "@/require/menu";
export default {
  data() {
    return {};
  },

  components: {},

  computed: {
    ...mapGetters({
      menuList: "menu/menuList",
    }),
  },

  methods: {
    ...mapActions({
      getmenu: "menu/getmenu",
    }),
    async del(item) {
      // console.log(item.id);

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delMenu(item.id);
          if (res.code == 200) {
            this.getmenu();
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