<!-- 弹框 -->
<template>
  <el-dialog
    :title="info.istit?'添加角色':'修改角色'"
    :visible.sync="info.altshow"
    width="45%"
    @close="didid"
  >
    <el-form :model="menuinfo" ref="form" :rules="rules" label-width="80px">
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="menuinfo.rolename" placeholder="请输入角色名称"></el-input>
      </el-form-item>

      <el-form-item label="角色权限">
        <el-tree
          :data="menuList"
          node-key="id"
          ref="tree"
          :props="{ children:'children',label:'title' }"
          show-checkbox
          :check-strictly="checkStrictly"
          :default-expand-all="true"
        ></el-tree>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="menuinfo.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addCon">确 定</el-button>
        <el-button type="warning" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { addRole, editRole, delRole, getRole } from "@/require/role";
let menuinfo = {
  rolename: "", //角色名称
  menus: null, //角色权限
  status: 1,
};
let opmenuinfo = { ...menuinfo };
export default {
  data() {
    return {
      menuinfo: { ...menuinfo },
      rules: {
        rolename: [{ required: true, message: "必填", trigger: "blur" }],
      },
      checkStrictly: false,
    };
  },
  props: {
    info: {
      type: Object,
      default() {
        return {
          altshow: false,
          istit: false,
          // 为true添加  否则修改
        };
      },
    },
  },

  components: {},

  computed: {
    ...mapGetters({
      menuList: "menu/menuList",
    }),
  },
  mounted() {
    if (!this.menuList.length) {
      this.getmenu();
    }
  },
  methods: {
    ...mapActions({
      getmenu: "menu/getmenu",
      GetRole: "role/GetRole",
    }),
    menuinfor(val) {
      let idrt = val.menus.split(",");
      if (idrt[0]) {
        this.checkStrictly = true; //不关联

        this.$nextTick(() => {
          // console.log(idrt);
          this.$refs.tree.setCheckedKeys(idrt);
          this.checkStrictly = false; //关联
        });
      } 
      menuinfo = { ...val };
      this.menuinfo = { ...val };
    },
    async addCon() {
      let idarr = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());

      if (idarr.length) {
        this.menuinfo.menus = idarr;
      } else {
        this.$message.warning("请选择权限节点");
        return;
      }
      let res = null;
      this.$refs.form.validate(async (res) => {
        console.log(res);
        if (res) {
          if (this.info.istit) {
            // console.log("添加");
            res = await addRole({ ...this.menuinfo });

            // console.log(res);
          } else {
            // console.log("修改");
            res = await editRole({ ...this.menuinfo });
          }

          if (res.code == 200 && res.list) {
            this.$message.success(res.msg);
            this.info.altshow = false;
            this.menuinfo = { ...menuinfo };
            // this.reset();
            this.menuinfo = { ...opmenuinfo };
            // this.getmenu();
            this.GetRole();
          } else {
            this.$message.error(res.msg);
          }
        }

      });
    },
    reset() {
      if(this.info.istit){
        // 添加
         this.$refs.tree.setCheckedKeys([]);
      }else{
        // 修改
        this.menuinfor({...menuinfo});
      }
      // this.menuinfo = { ...menuinfo };
    },
    didid() {
      this.$refs.tree.setCheckedKeys([]);
      this.menuinfo = { ...opmenuinfo };
    },
  },
};
</script>
<style lang='less' scoped>
.el-form-item__label {
  display: inline-block;
}
</style>