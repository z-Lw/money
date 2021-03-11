<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
        <div class="chart-wrapper" ref="chartWrapper">
            <chart class="chart" :options="chartOptions" />
        </div>
        <ol v-if="groupedList.length>0">

            <li v-for="(group,index) in groupedList" :key="index">
                <h3 class="title">{{beautify(group.title)}} <span>￥{{group.total}}</span></h3>
                <ol>
                    <li v-for="item in group.items" :key="item.id"
                        class="record">
                        <span>{{tagString(item.tags)}}</span>
                        <span class="notes">{{item.notes}}</span>
                        <span>￥{{item.amount}} </span>
                    </li>
                </ol>
            </li>
        </ol>
        <div v-else class="noResult">
            目前没有记录
        </div>
    </Layout>
</template>


<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  import chart from '@/components/chart.vue';
  import Chart from '@/components/chart.vue';
  import _ from 'lodash'
  @Component({
    components: {Chart, echarts: chart, Tabs},
  })
  export default class Statistics extends Vue {
    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' :
        tags.map(t=>t.name).join('，');
    }
    get recordList() {
      return (this.$store.state as RootState).recordList;
    }
    get keyValueList(){
      const today = new Date()
      const array=[]
      for(let i=0;i<=29;i++){
        const date= dayjs(today).subtract(i,'day').format('YYYY-MM-DD')
        const found=_.find(this.groupedList, {title:date})
        const value=found ? found.total:0
        array.push({key:date,value:value})
      }

      array.sort((a,b)=>{
        if(a>b){return 1}
        else if(a===b){return 0}
        else return -1
      })
      return array
    }
    get chartOptions(){

      const key =this.keyValueList.map(item =>item.key)
      const values=this.keyValueList.map(item => item.value)
      return {
        grid:{
          right:0,
          left:0
        },
        xAxis: {
          type: 'category',
          data: key,
          axisTick:{alignWithLabel:true},
          axisLine:{lineStyle:{color:'#666'}},
          axisLabel:{
            formatter: function (value: string) {
                return value.substr(5)
            }
          }
        },
        yAxis: {
          type: 'value'
        },
        tooltip:{
          show:true,
          triggerOn:'click',
          formatter:'{c}',
          position:'top'
        },
        series: [{
          symbolSize:12,
          symbol:'circle',
          itemStyle:{ borderWidth:1,color: '#666',borderColor:'#666'},
          data: values,
          type: 'line'
        }]
      }
    }

    get groupedList() {
      const {recordList} = this;
      if(recordList.length===0){return []}

      const newList =clone(recordList)
        .filter(r => r.type ===this.type)
        .sort((a,b)=> dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
    
      if(newList.length ===0){return [] as Result}
      type Result ={title: string;total?: number;items: RecordItem[]}[]
      const result: Result =[{title:dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items:[newList[0]]}]
      for(let i =1;i<newList.length;i++){
        const current =newList[i]
        const last = result[result.length-1]
        if(dayjs(last.title).isSame(dayjs(current.createdAt),'day')){
          last.items.push(current)
        }else{
          result.push({title:dayjs(current.createdAt).format('YYYY-MM-DD'),items:[current]})
        }
      }
      result.map(group =>{
        group.total=group.items.reduce((sum,item) =>{
          return sum+item.amount
        },0)
      })
      return result
    }
    beforeCreate() {
      this.$store.commit('fetchRecords');
    }
    beautify(string: string){
        const day = dayjs(string)
        const now =dayjs()
      if(day.isSame(now,'day')){
        return '今天'
        } else if(day.isSame(now.subtract(1,'day'),'day')){
          return '昨天'
        }else if(day.isSame(now.subtract(2,'day'),'day')){
          return '前天'
        } else if(day.isSame(now,'year')){
        return day.format('M月D日')
      }else{
        return day.format('YYYY年M月D日')
      }
    }
    mounted(){
      const div = (this.$refs.chartWrapper as HTMLDivElement);
      div.scrollLeft = div.scrollWidth;
    }
    type = '-';
    recordTypeList = recordTypeList;
  }
</script>
<style scoped lang="scss">
    .noResult{
        padding: 16px;
        text-align: center;
    }
    %item {
        padding: 8px 16px;
        line-height: 24px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }
    .title {
        @extend %item;
    }
    .record {
        background: white;
        @extend %item;
    }
    .notes {
        margin-right: auto;
        margin-left: 16px;
        color: #999;
    }
    .chart{
        width: 430%;
        &-wrapper{
            overflow: auto;
            &::-webkit-scrollbar{
                display: none;
            }
        }
    }
</style>
<style scoped lang="scss">
    ::v-deep {
        .type-tabs-item {
            background: #C4C4C4;
            &.selected {
                background: white;
                &::after {
                    display: none;
                }
            }
        }
        .interval-tabs-item {
            height: 48px;
        }
    }
</style>