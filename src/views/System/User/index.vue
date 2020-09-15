<!-- 角色管理 -->
<template>
  <div>
    <el-button type="primary" @click="add">
      <i class="el-icon-circle-plus"></i> 管理员添加
    </el-button>

    <tabl @ite="edit" />
    <Alter :info="info" ref="alt"></Alter>
  </div>
</template>

<script>
import Alter from "./alter";
import tabl from "./tabl";
import { mapGetters, mapActions } from "vuex";

import { delRole, getRole, editRole } from "@/require/role";

export default {
  data() {
    return {
      info: {
        altshow: false,
        istit: false,
      },
    };
  },
  created() {},
  async mounted() {
    let aaa = await getRole();
    // console.log(aaa);
  },
  components: { Alter, tabl },

  computed: {
    // ...mapGetters({
    //   menuList: "menu/menuList",
    // }),
  },

  methods: {
    add() {
      this.info.altshow = this.info.istit = true;
    },

    ...mapActions({
      GetRole: "role/GetRole",
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
            this.GetRole();
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    },
    edit(item) {
      this.info.altshow = true;
      this.info.istit = false;
     
      this.$refs.alt.menuinfor(item);
      // console.log(this.$refs.alt.menuinfor);
    },
  },
};
</script>
<style lang='less' scoped>
</style>