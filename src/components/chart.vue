<template>
    <div class="wrapper" ref="wrapper"></div>
    
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import echarts, {EChartOption,ECharts} from  'echarts'

  @Component
  export default class chart extends Vue {
    chart?: ECharts
    @Prop()options?: EChartOption
    mounted(){
      if(!this.options){
        return console.error('options为空')
      }
      this.chart =echarts.init(this.$refs.wrapper as HTMLDivElement)
      this.chart.setOption(this.options)
    }
    @Watch('options')
    onOptionsChange(newValue: EChartOption){
      this.chart!.setOption(newValue)
    }
  }

</script>

<style lang="scss" scoped>
.wrapper{
    height: 400px;
}
</style>