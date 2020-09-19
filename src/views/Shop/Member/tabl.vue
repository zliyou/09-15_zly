<!-- 表格 -->
<template>
  <div>
    <el-table :data="memberList" style="width: 100%">
      

      <el-table-column label="用户ID" prop="uid" width='300px' align="center"></el-table-column>
      <el-table-column label="昵称"  prop='nickname' align="center"> </el-table-column>
      <el-table-column label="手机号"  prop='phone' align="center">
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
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>





<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  mounted() {
    

    if (!this.memberList.length) {
      this.getMemberList();
    }
  },
  components: {},
  
  computed: {
    ...mapGetters({
      memberList: "member/memberList",
    }),
  },

  methods: {

    ...mapActions({
      getMemberList: "member/getMemberList"
    }),

    edit(item) {
      // console.log(item);
      this.$emit("ite", item);
    },
  },
};
</script>
<style lang='less' scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>