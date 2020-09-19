<!-- 弹框 -->
<template>
  <el-dialog :title="info.istit?'添加bann图':'修改bann图'" :visible.sync="info.altshow" width="45%" @close="rest">
    <el-form :model="bannerinfo" ref="form" :rules="rules" label-width="120px">
      

      <el-form-item label="bann图名称" prop="title">
        <el-input v-model="bannerinfo.title" placeholder="请输入bann图名称"></el-input>
      </el-form-item>

      <el-form-item label="bann图片">
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

          <!-- <img v-if="bannerinfo.img" :src="bannerinfo.img | imgUrl" class="avatar" width="100%" /> -->
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="bannerinfo.status" :active-value="1" :inactive-value="2"></el-switch>
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
import { addBanner, editBanner } from "@/require/banner";
let bannerinfo = {
  title: '',
  img: "",
  status: 1,
};
let opbannerinfo = { ...bannerinfo };
export default {
  data() {
    return {
      bannerinfo: { ...bannerinfo },
      rules: {
        title: [{ required: true, message: "必填", trigger: "blur" }],
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
      bannerList: "banner/bannerList",
    }),
  },
  mounted() {
    if (!this.bannerList.length) {
      this.getBannerlist();
    }
  },
  methods: {
    ...mapActions({
      getBannerlist: "banner/getBannerlist",
    }),
    sse(file, fileList) {
      // this.filelist = fileList;
      this.bannerinfo.img = file.raw;
      // console.log(file);
    },
    aaa(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    bannerinfor(val) {
      if (val.img) {
        this.filelist = [
          {
            name: val.catename,
            url: this.$host + val.img,
          },
        ];
      }
      // val.children ? delete val.children : "";

      bannerinfo = { ...val };
      this.bannerinfo = { ...val };

      this.getBannerlist();
    },
    remove(file, fileList){
       this.bannerinfo.img =''
    },
    async addCon() {
      // console.log(this.bannerinfo)
      // return
      let res = null;
      this.$refs.form.validate(async (res) => {
        if (res) {
          let md = new FormData();
          // console.log();
          for (let item in this.bannerinfo) {
            md.append(item, this.bannerinfo[item]);
          }

          if (this.info.istit) {
            // console.log("添加");
            res = await addBanner(md);

            // console.log(res);
          } else {
            // console.log("修改");
            res = await editBanner(md);
          }

          if (res.code == 200 && res.list) {
            this.$message.success(res.msg);
            this.info.altshow = false;
            // this.bannerinfo = { ...bannerinfo };

            // this.bannerinfo = { ...opbannerinfo };
            this.getBannerlist();
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
      console.log(bannerinfo);
      
      if (this.info.istit) {
        
        this.filelist = []
        this.bannerinfo = { ...opbannerinfo };

      } else {
        // 修改
        this.bannerinfor(bannerinfo)
        this.bannerinfo = { ...bannerinfo };
      }
    },
    rest() {
      this.filelist = [];
      this.bannerinfo = { ...opbannerinfo };
    },
  },
};
</script>
<style lang='less' scoped>
</style>