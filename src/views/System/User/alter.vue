<!-- 弹框 -->
<template>
  <el-dialog
    :title="info.istit?'添加管理员':'修改管理员'"
    :visible.sync="info.altshow"
    width="45%"
    @close="didid"
  >
    <el-form :model="menuinfo" ref="form" :rules="rules" label-width="100px">
      <el-form-item label="管理员角色" prop='roleid'>
        <el-select v-model="menuinfo.roleid" placeholder="请选择角色">
          <el-option v-for="item in roleList"
            :key="item.id"
            :label="item.rolename"
            :value="item.id">
          </el-option>
        </el-select>
        
      </el-form-item>
      <el-form-item label="管理员名称" prop="username">
        <el-input v-model="menuinfo.username" placeholder="请输入管理员名称"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码" v-if="info.istit" prop='password'>
        <el-input v-model="menuinfo.password" placeholder="请输入管理员密码"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码" v-else>
        <el-input v-model="menuinfo.password" placeholder="密码为空则默认不修改"></el-input>
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
import { addUser, editUser, delUser } from "@/require/user";
let menuinfo = {
  username: "", //角色名称
  password: '', //角色权限
  status: 1,
};
let opmenuinfo = { ...menuinfo };
export default {
  data() {
    return {
      menuinfo: { ...menuinfo },
      rules: {
        username: [{ required: true, message: "必填", trigger: "blur" }],
        password: [{ required: true, message: "必填", trigger: "blur" }]
      },
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
      roleList:'role/roleList'
    }),
  },
  mounted() {
    if (!this.roleList.length) {
      this.GetRole();
    }
  },
  methods: {
    ...mapActions({
      // getmenu: "menu/getmenu",
      GetRole: "role/GetRole",
      GetUser:'user/GetUser'
    }),
    menuinfor(val) {
      // let idrt = val.menus.split(",");
      // if (idrt[0]) {
      //   this.checkStrictly = true; //不关联

      //   this.$nextTick(() => {
      //     // console.log(idrt);
      //     this.$refs.tree.setCheckedKeys(idrt);
      //     this.checkStrictly = false; //关联
      //   });
      // }
      val.password = ''
      menuinfo = { ...val };
      this.menuinfo = { ...val };
    },
    async addCon() {
      // let idarr = this.$refs.tree
      //   .getCheckedKeys()
      //   .concat(this.$refs.tree.getHalfCheckedKeys());

      // if (idarr.length) {
      //   this.menuinfo.menus = idarr;
      // } else {
      //   this.$message.warning("请选择权限节点");
      //   return;
      // }
      let res = null;
      this.$refs.form.validate(async (res) => {
        // console.log(res);
        if (res) {
          if (this.info.istit) {
            // console.log("添加");
            res = await addUser({ ...this.menuinfo });

            // console.log(res);
          } else {
            // console.log("修改");
            res = await editUser({ ...this.menuinfo });
          }

          if (res.code == 200 && res.list) {
            this.$message.success(res.msg);
            this.info.altshow = false;
            this.menuinfo = { ...menuinfo };
            // this.reset();
            this.menuinfo = { ...opmenuinfo };
            // this.getmenu();
            this.GetUser();
          } else {
            this.$message.error(res.msg);
          }
        }

      });
    },
    reset() {
      if(this.info.istit){
        // 添加
        //  this.$refs.tree.setCheckedKeys([]);
          this.menuinfo = { ...menuinfo };
      }else{
        // 修改
        this.menuinfor({...menuinfo});
      }
      // this.menuinfo = { ...menuinfo };
    },
    didid() {
      // this.$refs.tree.setCheckedKeys([]);
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