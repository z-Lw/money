<template>
   <Layout class-prefix="layout">
      <NumberPad :value.sync="record.amount" @submit="saveRecord"/>                        <!-- @update:value="onUpdateAmount"-->
       <!--    @update:value="onUpdateType"-->
       <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
       <div class="notes">
           <FormItem filed-name="备注"
                     placeholder="请输入备注"
                     :value="record.notes"
                     @update:value="onUpdateNotes"/>
       </div>

       <Tags @update:value="record.tags=$event"/>
   </Layout>
</template>
<script lang="ts">
  import Vue from 'vue'
  import NumberPad from '@/components/Money/NumberPad.vue'
  import FormItem from '@/components/Money/FormItem.vue'
  import Tags from '@/components/Money/Tags.vue'
  import {Component} from 'vue-property-decorator'
  import store from '@/store'
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList'


  @Component({
    components:{Tabs, Tags,  FormItem, NumberPad},
  })
  export default class Money extends Vue{
    recordTypeList=recordTypeList
    get recordList(){
      return store.state.recordList
    }
    record: RecordItem={
      tags:[],notes:'',type:'-',amount:0
    }
    onUpdateNotes(value: string){
      this.record.notes=value
    }
    created(){
      store.commit('fetchRecords')
    }
    saveRecord(){
      if(!this.record.tags || this.record.tags.length===0){
        return window.alert('请至少选择一个标签')
      }
      this.$store.commit('createRecord',this.record)
      if(this.$store.state.createRecordError ===null){
        window.alert('已保存')
        this.record.notes=''
      }
    }

    //   this.record.type=value
    // onUpdateType(value:string){
    // }
    // onUpdateAmount(value:string){
    //   this.record.amount=parseFloat(value)
    // }
  }
</script>
<style lang="scss" scoped>
    ::v-deep .layout-content{
        display: flex;
        flex-direction: column-reverse;
    }
    .notes{
        padding: 12px 0;
    }
</style>

