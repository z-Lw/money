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
  import model from '@/model';


  const recordList=model.fetch();


  @Component({
    components:{Tags, Types, Notes, NumberPad}
  })
  export default class Money extends Vue{
    tags=['衣','食','住','行'];
    recordList: RecordItem[]=recordList
    record: RecordItem={
      tags:[],notes:'',type:'-',amount:0
    }

    onUpdateTags(value: string[]){
      this.record.tags=value
    }
    onUpdateNotes(value: string){
      this.record.notes=value
    }
    saveRecord(){
      const record2: RecordItem=model.clone(this.record)
      record2.createdAt=new Date()
      this.recordList.push(record2)
    }
    @Watch('recordList')
    onRecordListChange(){
      model.save(this.recordList);
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

