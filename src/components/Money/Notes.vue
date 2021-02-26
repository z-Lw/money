<template>
    <div>
        <label class="notes">

            <span class="name">{{filedName}}</span>
            <input type="text"
                   v-model ="value"
                   :placeholder="placeholder">
<!--            :value="value"  @input="value=$event.target.value" 简写成  v-recordListModel ="value"-->
        </label>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop, Watch} from 'vue-property-decorator';
    @Component
  export default class Notes extends Vue{
    @Prop() readonly filedName!: string;
    @Prop() readonly placeholder?: string
    value='';
    @Watch("value")
    onValueChanged(value: string){
    this.$emit('update:value',value)
    }

      // onInput(event: keyboardEvent){
    //     const input =event.target as HTMLInputElement
    //     this.value=input.value
    // }
  }
</script>

<style lang="scss" scoped>
    .notes{
        font-size: 14px;
        background: #f5f5f5;
        padding-left: 16px;
        display: flex;
        align-items: center;
        .name{
            padding-right: 16px;
        }
        input{
            height: 64px;
            flex-grow:1;
            background: transparent;
            border:none;
            padding-right: 16px;
        }
    }
</style>