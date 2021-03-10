<template>
    <div>
        <label class="formItem">
            <span class="name">{{filedName}}</span>
            <template v-if="type === 'date'">
                <input :type="type"
                :value="x(value)"
               @input="onValueChanged($event.target.value)"
               :placeholder="placeholder">

            </template>
            <template v-else>
                <input type="text"
                       :value="value"
                       @input="onValueChanged($event.target.value)"
                       :placeholder="placeholder">
                <!--            :value="value"  @input="value=$event.target.value" 简写成  v-recordListModel ="value"-->
            </template>

        </label>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop} from 'vue-property-decorator';
    import dayjs from 'dayjs';
    @Component
  export default class FormItem extends Vue{
    @Prop() readonly filedName!: string;
    @Prop() readonly placeholder?: string
    @Prop({default:''}) readonly value!: string
    @Prop(String)type?: string
    onValueChanged(value: string){
    this.$emit('update:value',value)
    }
    x(isoString: string){
       return dayjs(isoString).format('YYYY-MM-DD')
    }
    // onInput(event: keyboardEvent){
    //     const input =event.target as HTMLInputElement
    //     this.value=input.value
    // }
  }
</script>

<style lang="scss" scoped>
    .formItem{
        font-size: 14px;
        padding-left: 16px;
        display: flex;
        align-items: center;
        .name{
            padding-right: 16px;
        }
        input{
            height: 40px;
            flex-grow:1;
            background: transparent;
            border:none;
            padding-right: 16px;
        }
    }
</style>