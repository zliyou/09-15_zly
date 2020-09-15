<!-- 弹框 -->
<template>
  <el-dialog :title="info.istit?'添加':'修改'" :visible.sync="info.altshow" width="45%" @close='rest'>
    <el-form :model="menuinfo" ref="form" :rules="rules" label-width='80px'>
      <el-form-item label="菜单类型"   label-width="80px">
        <el-radio-group v-model="menuinfo.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="menuinfo.type==2" label="上级目录">
        <el-select v-model="menuinfo.pid" placeholder="请选择">
          <el-option label="顶级目录" :value="0"></el-option>
          <el-option
            v-for="item in menuList"
            v-if="item.type==1"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="menuinfo.type==1?'目录名称':'菜单名称'" prop="title">
        <el-input v-model="menuinfo.title" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="menuinfo.icon" placeholder="请输入图标类名">
          <template>
            <i :class="menuinfo.icon"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="菜单地址" v-if="menuinfo.type==2" prop="url">
        <el-input v-model="menuinfo.url" placeholder="请输入菜单地址"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="menuinfo.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addCon">确 定</el-button>
        <el-button type="warning" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="info.altshow = false">取 消</el-button>
      <el-button type="primary" @click="addCon">确 定</el-button>
    </span>-->
  </el-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { addMenu, editMenu } from "@/require/menu";
let menuinfo = {
  pid: 0,
  title: "",
  icon: "",
  type: 1,
  url: "",
  status: 1,
};
let opmenuinfo = { ...menuinfo };
export default {
  data() {
    return {
      menuinfo: { ...menuinfo },
      rules: {
        title: [{ required: true, message: "必填", trigger: "blur" }],
        url: [{ required: true, message: "必填", trigger: "blur" }],
      },
      options: [],
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
    console.log(this.menuList.length);
    if (!this.menuList.length) {
      this.getmenu();
    }
  },
  methods: {
    ...mapActions({
      getmenu: "menu/getmenu",
    }),
    menuinfor(val) {
      menuinfo = { ...val };
      this.menuinfo = { ...val };
      this.getmenu();
    },
    async addCon() {
      let res = null;
      this.$refs.form.validate(async (res) => {
        console.log(res);
        if (res) {
          if (this.info.istit) {
            // console.log("添加");
            res = await addMenu({ ...this.menuinfo });

            // console.log(res);
          } else {
            // console.log("修改");
            res = await editMenu({ ...this.menuinfo });
          }

          if (res.code == 200 && res.list) {
            this.$message.success(res.msg);
            this.info.altshow = false;
            this.menuinfo = { ...menuinfo };
            // this.reset();
            this.menuinfo = { ...opmenuinfo };
            this.getmenu();
          } else {
            this.$message.error(res.msg);
          }




        }else{
          console.log("aaa");
        }
      });
    },
    reset() {
      this.menuinfo = { ...menuinfo };
    },
    rest(){
      
      this.menuinfo = { ...opmenuinfo };
    }
  },
};
</script>
<style lang='less' scoped>
</style>