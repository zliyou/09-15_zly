<!-- 规格管理 -->
<template>
  <div>
    

    <tabl @ite="edit" />
    <Alter :info="info" ref="alt"></Alter>
  </div>
</template>

<script>
import Alter from "./alter";
import tabl from "./tabl";

export default {
  data() {
    return {
      info: {
        altshow: false,
        istit: false,
      },
    };
  },
  created() {},
  async mounted() {
    // let aaa = await getGoods();
    // console.log(aaa);
  },
  components: { Alter, tabl },

  computed: {
    // ...mapGetters({
    //   menuList: "menu/menuList",
    // }),
  },

  methods: {
    add() {
      this.info.altshow = this.info.istit = true;
    },

   
    edit(item) {
      this.info.altshow = true;
      this.info.istit = false;
      
      this.$refs.alt.seckinfor(item);
      // console.log(this.$refs.alt.menuinfor);
    },
  },
};
</script>
<style lang='less' scoped>
</style>