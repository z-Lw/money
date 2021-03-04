<template>
   <Layout class-prefix="layout">
       {{recordList}}
      <NumberPad :value.sync="record.amount" @submit="saveRecord"/>                        <!-- @update:value="onUpdateAmount"-->
       <Types  :value.sync="record.type" /><!--    @update:value="onUpdateType"-->
       <div class="notes">
           <FormItem filed-name="备注"  placeholder="请输入备注" @update:value="onUpdateNotes"/>
       </div>

       <Tags />
   </Layout>
</template>
<script lang="ts">
  import Vue from 'vue'
  import NumberPad from '@/components/Money/NumberPad.vue'
  import FormItem from '@/components/Money/FormItem.vue'
  import Types from '@/components/Money/Types.vue'
  import Tags from '@/components/Money/Tags.vue'
  import {Component} from 'vue-property-decorator'
  import store from '@/store'


  @Component({
    components:{Tags, Types, FormItem, NumberPad},
    computed:{
      recordList(){
        return store.state.recordList
      }
    }
  })
  export default class Money extends Vue{


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
      this.$store.commit('createRecord',this.record)
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
    .notes{
        padding: 12px 0;
    }
</style>

