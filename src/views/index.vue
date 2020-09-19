<!-- 后台主页 -->
<template>
  <div>
    
    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>


  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  mounted() {
    this.drawLine();
  },
  components: {},

  computed: {},

  methods: {
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '销量图表' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
  }
  }


</script>
<style lang='less' scoped>
</style>