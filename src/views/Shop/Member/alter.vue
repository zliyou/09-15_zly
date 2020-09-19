<!-- 弹框 -->
<template>
  <el-dialog :title="info.istit?'添加':'修改'" :visible.sync="info.altshow" width="45%" @close="rest">
    <el-form :model="seckinfo" ref="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="20" :offset="2">
          <el-form-item label="昵称" prop="title">
            <el-input v-model="seckinfo.nickname" placeholder="请输入修改的昵称"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="title">
            <el-input v-model="seckinfo.password" placeholder="请输入修改的密码，默认为空不修改"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="seckinfo.status" :active-value="1" :inactive-value="2"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="20" :offset="4">
          <el-form-item class="mto">
            <el-button type="primary" @click="addCon">确 定</el-button>
            <el-button type="warning" @click="reset()">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { editMember } from "@/require/member";

let seckinfo = {
  uid: "",
  nickname: "",
  phone: "",
  password: "",
  status: 1,
};
let opseckinfo = { ...seckinfo };
export default {
  data() {
    return {
      seckinfo: { ...seckinfo },
      rules: {
        nickname: [{ required: true, message: "必填", trigger: "blur" }],
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
      memberList: "member/memberList",
    }),
  },
  mounted() {
    if (!this.memberList.length) {
      this.getMemberList();
    }
  },
  methods: {
    ...mapActions({
      getMemberList: "member/getMemberList",
    }),

    seckinfor(val) {
      
      val.password = ''
      seckinfo = { ...val };
      this.seckinfo = { ...val };

      this.getMemberList();
    },

    async addCon() {
      let res = null;
      this.$refs.form.validate(async (res) => {
        if (res) {
          res = !this.info.istit ? await editMember(this.seckinfo) : "";
         

          if (res.code == 200 && res.list) {
            this.$message.success(res.msg);
            this.info.altshow = false;
            this.getMemberList();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      if (!this.info.istit) {
        this.seckinfor(seckinfo);
        this.seckinfo = { ...seckinfo };
      }
    },
    
  },
};
</script>
<style lang='less' scoped>
.mto {
  margin-top: 30px;
}
.fwb {
  margin-right: 30px;
}
.el-form-item__content {
  margin-left: 10px;
}
</style>