<!-- 表格 -->
<template>
  <el-table :data="roleList" border style="width: 100%" row-key="id">
    <!--  :tree-props="{children: 'children'}" -->
    <el-table-column prop="id" align="center" label="ID"></el-table-column>
    <el-table-column prop="rolename" align="center" label="角色名称"></el-table-column>
    <!-- <el-table-column prop="url" align="center" label="地址"></el-table-column> -->
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
import { delRole } from "@/require/role";
export default {
  data() {
    return {};
  },
  mounted() {
    if (!this.roleList.length) {
      // this.getmenu();
      this.GetRole();
    }
  },
  components: {},

  computed: {
    ...mapGetters({
      roleList: "role/roleList",
    }),
  },

  methods: {
    ...mapActions({
      GetRole: "role/GetRole",
    }),
    async del(item) {
      

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delRole(item.id);
          if (res.code == 200) {
            this.GetRole();
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    },
    edit(item) {
      

      // console.log(item);
      this.$emit("ite", item);
    },
  },
};
</script>
<style lang='less' scoped>
</style>