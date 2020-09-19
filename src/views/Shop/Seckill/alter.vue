<!-- 弹框 -->
<template>
  <el-dialog :title="info.istit?'添加':'修改'" :visible.sync="info.altshow" width="45%" @close="rest">
    <el-form :model="seckinfo" ref="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="20" :offset="2">
          <el-tabs v-model="activeName" type="border-card">
            <el-form-item label="活动名称" prop="title">
              <el-input v-model="seckinfo.title" placeholder="请输入活动名称"></el-input>
            </el-form-item>
            <el-form-item label="活动时间">
              <el-date-picker
                v-model="value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="一级分类">
              <el-select v-model="seckinfo.first_cateid" placeholder="请选择" @change="yjfl">
                <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.catename"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="二级分类">
              <el-select v-model="seckinfo.second_cateid" placeholder="请选择" @change="erjis">
                <el-option
                  v-for="item in erjifl"
                  :key="item.id"
                  :label="item.catename"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="活动商品">
              <el-select v-model="seckinfo.goodsid" placeholder="请选择商品">
                <el-option
                  v-for="item in categoods"
                  :key="item.id"
                  :label="item.goodsname"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="状态">
              <el-switch v-model="seckinfo.status" :active-value="1" :inactive-value="2"></el-switch>
            </el-form-item>
          </el-tabs>
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
import { mapState, mapGetters, mapActions } from "vuex";
import { addSeck, editSeck } from "@/require/seckill";

let seckinfo = {
  title: "",
  begintime: "",
  endtime: "",
  first_cateid: "",
  second_cateid: "",
  goodsid: "",
  status: 1,
};
let opseckinfo = { ...seckinfo };
export default {
  data() {
    return {
      seckinfo: { ...seckinfo },
      rules: {
        title: [{ required: true, message: "必填", trigger: "blur" }],
      },
      imageUrl: "",
      dialogVisible: false,
      dialogImageUrl: "",
      filelist: [],
      activeName: "first",
      // 二级分类
      erjifl: [],
      spsx: [],
      // 绑定日期
      value1: [],
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
      categoryList: "category/categoryList",
      categoods: "seckill/categoods",
    }),
  },
  mounted() {
    if (!this.categoryList.length) {
      this.getCategory();
    }

  },
  methods: {
    ...mapActions({
      getCategory: "category/getCategory",
      getSecklist: "seckill/getSecklist",
      getCateGoods: "seckill/getCateGoods",
      clearcgs:'seckill/clearcgs'
    }),
   
    
    yjfl(v) {
      // console.log(v);
      // this.categoods=[]
      (this.erjifl = []), (this.seckinfo.second_cateid = "");
      this.clearcgs();
      this.goodsid = ''
      this.categoryList.forEach((ele) => {
        if (ele.id == v) {
          // console.log(ele.children);
          this.erjifl = ele.children;
        }
      });
    },
    erjis(sid) {
      
      this.getCateGoods({sid});
    },
    seckinfor(val) {
      
      // console.log(val);
      this.value1 = []

      this.value1.push( new Date(parseInt (val.begintime)),new Date(parseInt(val.endtime)) )
      console.log(this.value1);
      


      this.yjfl(val.first_cateid);
      this.erjis(val.second_cateid);
      seckinfo = { ...val };
      this.seckinfo = { ...val };

      this.getSecklist();
    },
    
    async addCon() {
      // first_cateid    second_cateid
      // console.log(this.value1);
      // this.erjis(this.seckinfo.second_cateid)

      // return;
      let res = null;
      this.$refs.form.validate(async (res) => {
        if (res) {
          // console.log(this.value1);
          this.seckinfo.begintime = this.value1[0].getTime()
          this.seckinfo.endtime = this.value1[1].getTime()
         
          if (this.info.istit) {
            // console.log(md);
            
            res = await addSeck(this.seckinfo);

            // console.log(res);
          } else {
            // return
            // console.log("修改");
            res = await editSeck(this.seckinfo);
          }

          if (res.code == 200 && res.list) {
            this.$message.success(res.msg);
            this.info.altshow = false;
            // console.log("进入了");
            this.getSecklist();
            this.rest();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      // console.log(seckinfo);

      if (this.info.istit) {
        this.rest()
        // (this.filelist = this.erjifl = []),
        //   (this.seckinfo = { ...opseckinfo });
        // console.log();
      } else {
        // 修改
        this.seckinfor(seckinfo);
        this.seckinfo = { ...seckinfo };
      }
    },
    rest() {
      (this.filelist = this.erjifl =this.value1= []), (this.seckinfo = { ...opseckinfo });
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