<!-- 弹框 -->
<template>
  <el-dialog :title="info.istit?'添加':'修改'" :visible.sync="info.altshow" width="45%" @close="rest">
    <el-form :model="categoryinfo" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="上级目录">
        <el-select v-model="categoryinfo.pid" placeholder="请选择">
          <el-option label="顶级目录" :value="0"></el-option>
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品分类名称" prop="catename">
        <el-input v-model="categoryinfo.catename" placeholder="请输入商品分类名称"></el-input>
      </el-form-item>

      <el-form-item label="图片">
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
          <el-dialog :visible.sync="dialogVisible" size="tiny" :append-to-body="true" >
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>

          <!-- <img v-if="categoryinfo.img" :src="categoryinfo.img | imgUrl" class="avatar" width="100%" /> -->
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="categoryinfo.status" :active-value="1" :inactive-value="2"></el-switch>
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
import { addCate, editCate } from "@/require/category";
let categoryinfo = {
  pid: 0,
  catename: "",
  img: "",
  status: 1,
};
let opcategoryinfo = { ...categoryinfo };
export default {
  data() {
    return {
      categoryinfo: { ...categoryinfo },
      rules: {
        catename: [{ required: true, message: "必填", trigger: "blur" }],
      },
      imageUrl: "",
      dialogVisible: false,
      dialogImageUrl: "",
      filelist: [],
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
    }),
    sse(file, fileList) {
      // this.filelist = fileList;
      this.categoryinfo.img = file.raw;
      // console.log(file);
    },
    aaa(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    categoryinfor(val) {
      if (val.img) {
        this.filelist = [
          {
            name: val.catename,
            url: this.$host + val.img,
          },
        ];
      }
      // else{
      //   this.filelist = [
      //     {
      //       name: '图片废了',
      //       url:'',
      //     },
      //   ];
      // }
      val.children ? delete val.children : "";

      categoryinfo = { ...val };
      this.categoryinfo = { ...val };

      this.getCategory();
    },
    remove(file, fileList){
       this.categoryinfo.img =''
    },
    async addCon() {
      // console.log(this.categoryinfo)
      // return
      let res = null;
      this.$refs.form.validate(async (res) => {
        if (res) {
          let md = new FormData();
          console.log();
          for (let item in this.categoryinfo) {
            md.append(item, this.categoryinfo[item]);
          }

          if (this.info.istit) {
            // console.log("添加");
            res = await addCate(md);

            // console.log(res);
          } else {
            // console.log("修改");
            res = await editCate(md);
          }

          if (res.code == 200 && res.list) {
            this.$message.success(res.msg);
            this.info.altshow = false;
            // this.categoryinfo = { ...categoryinfo };

            // this.categoryinfo = { ...opcategoryinfo };
            this.getCategory();
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
      console.log(categoryinfo);
      
      if (this.info.istit) {
        
        this.filelist = []
        this.categoryinfo = { ...opcategoryinfo };

      } else {
        // 修改
        this.categoryinfor(categoryinfo)
        this.categoryinfo = { ...categoryinfo };
      }
    },
    rest() {
      this.filelist = [];
      this.categoryinfo = { ...opcategoryinfo };
    },
  },
};
</script>
<style lang='less' scoped>
</style>