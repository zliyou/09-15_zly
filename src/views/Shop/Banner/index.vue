<!-- 菜单管理 -->
<template>
  <div>
    <el-button type="primary" @click="add">
      <i class="el-icon-circle-plus"></i> 添加banner图
    </el-button>

    
    <tabl @ite="edit" />
    <Alter :info="info" ref="alt"></Alter>
  </div>
</template>

<script>
import Alter from "./alter";
import tabl from "./tabl";
import { mapGetters, mapActions } from "vuex";

// import { delCate } from "@/require/category";

export default {
  data() {
    return {
      info: {
        altshow: false,
        istit: false,
      },
    };
  },
  mounted() {
    
  },
  components: { Alter, tabl },

  computed: {
    
  },

  methods: {
    add() {
      this.info.altshow = this.info.istit = true;
    },

    // ...mapActions({
    //   getCategory: "category/getCategory",
    // }),
   
    edit(item) {
      this.info.altshow = true;
      this.info.istit = false;

      this.$refs.alt.bannerinfor({...item});


    },
  },
};
</script>
<style lang='less' scoped>
</style>