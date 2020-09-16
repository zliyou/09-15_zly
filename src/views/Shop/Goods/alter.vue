<!-- 弹框 -->
<template>
  <el-dialog :title="info.istit?'添加':'修改'" :visible.sync="info.altshow" width="65%" @close="rest">
    <el-form :model="goodsinfo" ref="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="20" :offset="2">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="基本信息" name="first">
              <el-form-item label="一级分类">
                <el-select v-model="goodsinfo.first_cateid" placeholder="请选择" @change="yjfl">
                  <el-option
                    v-for="item in categoryList"
                    :key="item.id"
                    :label="item.catename"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="二级分类">
                <el-select v-model="goodsinfo.second_cateid" placeholder="请选择">
                  <el-option
                    v-for="item in erjifl"
                    :key="item.id"
                    :label="item.catename"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="商品名称" prop="goodsname">
                <el-input v-model="goodsinfo.goodsname" placeholder="请输入商品名称"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="catename">
                <el-input v-model="goodsinfo.price" placeholder="请输入商品价格"></el-input>
              </el-form-item>
              <el-form-item label="市场价格" prop="catename">
                <el-input v-model="goodsinfo.market_price" placeholder="请输入市场价格"></el-input>
              </el-form-item>

              <el-form-item label="商品图片">
                <!-- img -->
                <el-upload
                  action
                  list-type="picture-card"
                  :auto-upload="false"
                  :limit="1"
                  :on-change="sse"
                  :on-preview="aaa"
                  :file-list="filelist"
                  :on-remove="remove"
                >
                  <el-dialog :visible.sync="dialogVisible" size="tiny" :append-to-body="true">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>

                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="商品规格">
                <el-select v-model="goodsinfo.specsid" placeholder="请选择" @change="spgg">
                  <el-option
                    v-for="item in specsList"
                    :key="item.id"
                    :label="item.specsname"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="规格属性值">
                <el-select v-model="goodsinfo.specsattr" placeholder="请选择" :multiple="true">
                  <el-option v-for="item in spsx" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-tab-pane>

            <el-tab-pane label="详细描述" name="second">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="是否新品" prop="catename">
                    <el-switch v-model="goodsinfo.isnew" :active-value="1" :inactive-value="2"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否热卖" prop="catename">
                    <el-switch v-model="goodsinfo.ishot" :active-value="1" :inactive-value="2"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="状态">
                    <el-switch v-model="goodsinfo.status" :active-value="1" :inactive-value="2"></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label>
                    
                    <vue-wangeditor
                      ref="wangedit"
                      class="fwb"
                      id="editor"
                      v-model="goodsinfo.description"
                      :isRealtime="true"
                    ></vue-wangeditor>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="10" :offset="4">
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
import { addGoods, editGoods } from "@/require/goods";
import vueWangeditor from "vue-wangeditor";

let goodsinfo = {
  first_cateid: "",
  second_cateid: "",
  goodsname: "",
  price: "",
  market_price: "",
  img: "",
  description: "",
  specsid: "",
  specsattr: [],
  isnew: 2,
  ishot: 2,
  status: 1,
};
let opgoodsinfo = { ...goodsinfo };
export default {
  data() {
    return {
      goodsinfo: { ...goodsinfo },
      rules: {
        goodsname: [{ required: true, message: "必填", trigger: "blur" }]
      },
      imageUrl: "",
      dialogVisible: false,
      dialogImageUrl: "",
      filelist: [],
      activeName: "first",
      erjifl: [],
      spsx: [],
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

  components: { vueWangeditor },

  computed: {
    ...mapGetters({
      categoryList: "category/categoryList",
      specsList: "specs/specsList",
    }),
  },
  mounted() {
    if (!this.categoryList.length) {
      this.getCategory();
    }
    if (!this.specsList.length) {
      this.getSpecslist();
    }
  },
  methods: {
    ...mapActions({
      getCategory: "category/getCategory",
      getSpecslist: "specs/getSpecslist",
      getGoodslist: "goods/getGoodslist",
    }),
    sse(file, fileList) {
      // this.filelist = fileList;
      this.goodsinfo.img = file.raw;
      // console.log(file);
    },
    aaa(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    yjfl(v) {
      // console.log(v);
      (this.erjifl = []), (this.goodsinfo.second_cateid = "");
      this.categoryList.forEach((ele) => {
        if (ele.id == v) {
          // console.log(ele.children);
          this.erjifl = ele.children;
        }
      });
    },
    spgg(v) {
      // specsList
      (this.spsx = []), (this.goodsinfo.specsattr = []);
      this.specsList.forEach((ele) => {
        if (ele.id == v) {
          // console.log(ele.attrs)

          this.spsx = ele.attrs;
        }
      });
    },
    goodsinfor(val) {
      
      // console.log(val.specsattr.split(','));
      
      if (val.img) {
        this.filelist = [
          {
            name: val.catename,
            url: this.$host + val.img,
          },
        ];
      }
      
      
      
      this.$nextTick(()=>{
        this.$refs.wangedit.setHtml(val.description);
      })
      val.specsattr =val.specsattr instanceof Array?val.specsattr: val.specsattr.split(',');
      this.yjfl(val.first_cateid);
      this.spgg(val.specsid);
      
      goodsinfo = { ...val };
      this.goodsinfo = { ...val };

      this.getCategory();
    },
    remove(file, fileList) {
      this.goodsinfo.img = "";
    },
    async addCon() {


      
      let res = null;
      this.$refs.form.validate(async (res) => {
        if (res) {
          "firstcatename" in this.goodsinfo
            ? delete this.goodsinfo.firstcatename
            : "";
          "secondcatename" in this.goodsinfo
            ? delete this.goodsinfo.secondcatename
            : "";
            this.goodsinfo.description = this.$refs.wangedit.getHtml();
          let md = new FormData();
          // console.log();
          for (let item in this.goodsinfo) {
            md.append(item, this.goodsinfo[item]);
          }
          
          if (this.info.istit) {
            
            // console.log("添加");
            res = await addGoods(md);

            // console.log(res);
          } else {
            // return
            // console.log("修改");
            res = await editGoods(md);
          }

          if (res.code == 200 && res.list) {
            this.$message.success(res.msg);
            this.info.altshow = false;
            // console.log("进入了");
            this.getGoodslist();
            this.rest();
          } else {
            this.$message.error(res.msg);
          }
        }
        // else{
        //   console.log("aaa");
        // }
      });
    },
    reset() {
      // console.log(goodsinfo);

      if (this.info.istit) {
        
        (this.filelist=this.erjifl = this.spsx = []), (this.goodsinfo = { ...opgoodsinfo });
        // console.log();
        this.$refs.wangedit.clear();

      } else {
        // 修改
        this.goodsinfor(goodsinfo);
        this.goodsinfo = { ...goodsinfo };
      }
    },
    rest() {
      this.$refs.wangedit.clear();
      (this.filelist=this.erjifl = this.spsx = []), (this.goodsinfo = { ...opgoodsinfo });
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