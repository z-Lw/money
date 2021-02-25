<template>
   <Layout class-prefix="layout">
       {{recordList}}
      <NumberPad :value.sync="record.amount" @submit="saveRecord"/>                        <!-- @update:value="onUpdateAmount"-->
       <Types  :value.sync="record.type" /><!--    @update:value="onUpdateType"-->
       <Notes @update:value="onUpdateNotes"/>
       <Tags :dataSource.sync="tags" @update:value="onUpdateTags"/>
   </Layout>
</template>
<script lang="ts">
  import Vue from 'vue'
  import NumberPad from '@/components/Money/NumberPad.vue'
  import Notes from '@/components/Money/Notes.vue'
  import Types from '@/components/Money/Types.vue'
  import Tags from '@/components/Money/Tags.vue'
  import {Component,Watch} from 'vue-property-decorator'

  type Record={
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date; //类/构造函数  ？可存在也可不存在
  }
  @Component({
    components:{Tags, Types, Notes, NumberPad}
  })
  export default class Money extends Vue{
    tags=['衣','食','住','行'];
    recordList: Record[]=JSON.parse(window.localStorage.getItem('recordList')||'[]')
    record: Record={
      tags:[],notes:'',type:'-',amount:0
    }

    onUpdateTags(value: string[]){
      this.record.tags=value
    }
    onUpdateNotes(value: string){
      this.record.notes=value
    }
    saveRecord(){
      const record2: Record=JSON.parse(JSON.stringify(this.record))
      record2.createdAt=new Date()
      this.recordList.push(record2)
    }
    @Watch('recordList')
    onRecordListChange(){
      window.localStorage.setItem('recordList',JSON.stringify(this.recordList))
    }
    //   this.record.type=value
    // onUpdateType(value:string){
    // }
    // onUpdateAmount(value:string){
    //   this.record.amount=parseFloat(value)
    // }
  }
</script>
<style lang="scss">
    .layout-content{
        display: flex;
        flex-direction: column-reverse;
    }
</style>

