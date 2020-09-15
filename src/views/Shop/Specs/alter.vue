<!-- 弹框 -->
<template>
  <el-dialog
    :title="info.istit?'添加规格':'修改规格'"
    :visible.sync="info.altshow"
    width="45%"
    @close="didid"
  >
    <el-form :model="menuinfo" ref="form" :rules="rules" label-width="100px">
      <el-form-item label="规格属性" prop="specsname">
        <el-input v-model="menuinfo.specsname" placeholder="请输入规格属性"></el-input>
      </el-form-item>
      <el-form-item label="规格属性值">
        <label v-for="(item, index) in list" :key="index">
          <el-input v-model="item.value" placeholder="请输入规格属性值" style="width:200px"></el-input>

          <el-button type="primary" v-if="index==0" @click="addlist">添加属性</el-button>
          <el-button v-else :value="item.value" type="primary" @click="dellist(index)">删除属性</el-button>
        </label>
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
import { addSpecs, editSpecs, delSpecs } from "@/require/specs";
let menuinfo = {
  specsname: "", //角色名称
  attrs: "", //角色权限
  status: 1,
};
let opmenuinfo = { ...menuinfo };
export default {
  data() {
    return {
      menuinfo: { ...menuinfo },
      rules: {
        specsname: [{ required: true, message: "必填", trigger: "blur" }],
      },
      list: [{ value: "" }],
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
      roleList: "role/roleList",
    }),
  },
  mounted() {
    if (!this.roleList.length) {
      this.getSpecslist();
    }
  },
  methods: {
    ...mapActions({
      getSpecslist: "specs/getSpecslist",
    }),
    menuinfor(val) {
      // val.attrs
      console.log(val.attrs.map((v) => ({ value: v })));

      this.list = val.attrs.map((v) => ({ value: v }));
      // this.list = newarr

      menuinfo = { ...val };
      this.menuinfo = { ...val };
      // console.log(this.list);
    },
    addlist() {
      this.list.push({ value: "" });
    },
    dellist(idx) {
      this.list.splice(idx, 1);
    },
    async addCon() {
      let str = this.list.every((val) => val.value);
      if (!str) {
        return;
      }

      let res = null;
      this.$refs.form.validate(async (res) => {
        if (res) {
          let sssa = this.list.map((val) => val.value);
          let ste = sssa.join(",");

          this.menuinfo.attrs = ste;
          if (this.info.istit) {
            // console.log("添加");

            res = await addSpecs({ ...this.menuinfo });

            // console.log(res);
          } else {
            

            res = await editSpecs({ ...this.menuinfo });
          }

          if (res.code == 200 && res.list) {
            this.$message.success(res.msg);
            this.info.altshow = false;
            
            this.didid();
            this.getSpecslist();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      if (this.info.istit) {
        // 添加
        this.didid();
      } else {
        // 修改
        this.menuinfor({ ...menuinfo });
      }
    },
    didid() {
      this.menuinfo = { ...opmenuinfo };
      this.list=[{value:''}]
    },
  },
};
</script>
<style lang='less' scoped>
.el-form-item__label {
  display: inline-block;
}
</style>