<!-- 登录 -->
<template>
  <div class="login">
    <el-row class="sdf">
      <el-col :span="8" class="cont">
        <h3>XX后台管理系统</h3>
        <el-form :model="formInfo" ref="form" :rules='rules' >
          <el-form-item  prop='username'>
            <el-input v-model="formInfo.username">
              <template slot="prepend">
                <i class="el-icon-s-custom"></i>
              </template>
            </el-input>
          </el-form-item>
           <el-form-item  prop='password'>
            <el-input v-model="formInfo.password" :show-password='true'>
              <template slot="prepend">
                <i class="el-icon-lock"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="butlog" class="butlog">立即登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
export default {
  data() {
    return {
      formInfo: {
        username: "张立友",
        password: "admin",
      },
      rules: {
        username: [{ required: true, message: "必填", trigger: "blur" }],
        password: [{ required: true, message: "必填", trigger: "blur" }]
      },
    };
  },

  components: {},

  computed: {
    ...mapGetters({
      getusername:'user/username',
      getmenus:'user/menus',
      getmenus_url:'user/menus_url',
    })
  },

  methods: {
    ...mapActions({
      Login:'user/Login'
    }),
    butlog(){
      this.Login(this.formInfo);
    }
  },
};
</script>
<style lang='less' scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: cornflowerblue;
  // display: flex;
  // align-items: center;
  .sdf {
    display: flex;

    justify-content: center;
    padding-top: 200px;
    .cont {
      background: #fff;
      // border: 1px solid #000;
    padding: 15px 20px;
      height: 300px;
      h3{
        text-align: center;
        line-height: 80px;
      }
      .butlog{
        width: 100%;
      }
    }
  }
}
</style>