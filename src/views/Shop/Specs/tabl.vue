<!-- 表格 -->
<template>
  <div>
    <el-table :data="specsList" border style="width: 100%" row-key="id">
      <!--  :tree-props="{children: 'children'}" -->
      <el-table-column prop="id" align="center" label="ID"></el-table-column>
      <el-table-column prop="specsname" align="center" label="规格名称"></el-table-column>
      <el-table-column align="center" label="规格属性">
        <template slot-scope="scope">
          <el-tag
            type="success"
            :prop="item.id"
            v-for="(item, index) in scope.row.attrs"
            @click="asdasd(item)"
            :key="index"
          >{{ item }}</el-tag>
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

    <el-pagination
      @size-change="setsize"
      @current-change="setpage"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>





<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { delSpecs } from "@/require/specs";
export default {
  data() {
    return {};
  },
  mounted() {
    this.GetTotal();

    if (!this.specsList.length) {
      console.log("进入了");
      this.getSpecslist();
    }
  },
  components: {},

  computed: {
    ...mapGetters({
      specsList: "specs/specsList",
      size: "specs/size",
      page: "specs/page",
      total: "specs/total",
    }),
  },

  methods: {
    ...mapMutations({
      SETPAGE: "specs/SETPAGE",
    }),
    ...mapActions({
      getSpecslist: "specs/getSpecslist",
      GetTotal: "specs/GetTotal",
      setpage: "specs/setpage",
      setsize: "specs/setsize",
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
          let res = await delSpecs(item.id);
          
          if (res.code == 200) {
            
            if (this.specsList.length == 1 && this.page != 1) {
              this.SETPAGE(this.page - 1);
            }
            
            this.getSpecslist();
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