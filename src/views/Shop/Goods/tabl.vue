<!-- 表格 -->
<template>
  <div>
    <el-table :data="goodsList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="一级分类名称">
              <span>{{ props.row.firstcatename }}</span>
            </el-form-item>

            <el-form-item label="商品名称">
              <span>{{ props.row.goodsname }}</span>
            </el-form-item>
            <el-form-item label="二级分类名称">
              <span>{{ props.row.secondcatename }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="市场价格">
              <span>{{ props.row.market_price }}</span>
            </el-form-item>
            <!-- <el-form-item label="商品规格">
            <span>{{ props.row.specsid }}</span>
            </el-form-item>-->
            <el-form-item label="商品属性">
              <span v-for="(item,idx) in props.row.specsattr" :key="idx">{{ item }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <img :src="props.row.img |imgUrl" v-if="props.row.img" width="80" />
              <span v-else>暂无图片</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column label="商品名称" prop="goodsname"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
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
            if (this.goodsList.length == 1 && this.page != 1) {
              this.SETPAGE(this.page - 1);
            }

            this.getGoodslist();
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