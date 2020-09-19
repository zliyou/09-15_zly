<!-- 表格 -->
<template>
  <div>
    <el-table :data="seckList" style="width: 100%">
      

      <el-table-column label="活动商品名称" prop="title"></el-table-column>
      <el-table-column label="开始时间" >
        <!-- prop="begintime" -->
        <template slot-scope="scope">
          <span >{{ scope.row.begintime | timegs }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" >
        <template slot-scope="scope">
          <span >{{ scope.row.endtime | timegs }}</span>
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

  </div>
</template>





<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { delSeck } from "@/require/seckill";
import Moment from 'moment'
export default {
  data() {
    return {};
  },
  mounted() {
    

    if (!this.seckList.length) {
      this.getSecklist();
    }
  },
  components: {},
  filters:{
    timegs(val){
      let aaa = new Date(parseInt(val))
      return  Moment(aaa).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  computed: {
    ...mapGetters({
      seckList: "seckill/seckList",
    }),
  },

  methods: {
    ...mapActions({
      getSecklist: "seckill/getSecklist"
    }),
    asdasd(i) {
      console.log(this.specsList);
    },
    async del(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          
          let res = await delSeck(item.id);
          console.log(res);
          if (res.code == 200) {
           

            this.getSecklist();
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