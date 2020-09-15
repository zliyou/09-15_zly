<!-- 表格 -->
<template>
  <div>
    <el-table :data="goodsList" border style="width: 100%" row-key="id">
      <!--  :tree-props="{children: 'children'}" -->
      <el-table-column prop="first_cateid" align="center" label="一级分类编号"></el-table-column>
      <el-table-column prop="goodsname" align="center" label="二级分类"></el-table-column>
      
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
      :page-sizes="[1, 2, 3, 4]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>





<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { delGoods } from "@/require/goods";
export default {
  data() {
    return {};
  },
  mounted() {
    this.GetTotal();

    if (!this.goodsList.length) {
      
      this.getGoodslist();
    }
  },
  components: {},

  computed: {
    ...mapGetters({
      goodsList: "goods/goodsList",
      size: "goods/size",
      page: "goods/page",
      total: "goods/total",
    }),
  },

  methods: {
    ...mapMutations({
      SETPAGE: "goods/SETPAGE",
    }),
    ...mapActions({
      getGoodslist: "goods/getGoodslist",
      GetTotal: "goods/GetTotal",
      setpage: "goods/setpage",
      setsize: "goods/setsize",
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
          let res = await delGoods(item.id);
          
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