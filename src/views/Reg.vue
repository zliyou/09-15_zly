<!-- 注册会员 -->
<template>
  <div class="bods">
    <el-row>
      <el-col :span="8" :offset='8' class="colst">
        <h3>会员注册测试用</h3>
        <br>
        <br>
        <el-form ref="form" :model="formdata" label-width="60px">
          <el-form-item label="手机号">
            <el-input v-model="formdata.phone" placeholder="请输入手机号"></el-input>
            
          </el-form-item>
          
          <el-form-item label="昵称">
            <el-input v-model="formdata.nickname" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formdata.password" placeholder="请输入密码"></el-input>
            
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {reg} from '@/require/reg';
export default {
  data() {
    return {
      formdata:{
        phone:'',
        nickname:'',
        password:''
      }
    };
  },

  components: {},

  computed: {},

  methods: {
    onSubmit(){
      reg(this.formdata);
      this.formdata = {}
    }
  },
};
</script>
<style lang='less' scoped>
.bods {
  background-color: aquamarine;
  width: 100vw;
  height: 100vh;
  .colst{
    background: #fff;
    padding: 40px 35px;
    margin-top: 15vh;
  }
}
</style>