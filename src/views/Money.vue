<template>
   <Layout class-prefix="layout">
       <NumberPad/>
       <Types/>
       <Notes/>
       <Tags/>
   </Layout>
</template>
<script>
  import NumberPad from '@/components/Money/NumberPad'
  import Notes from '@/components/Money/Notes'
  import Types from '@/components/Money/Types'
  import Tags from '@/components/Money/Tags'
  export default {
    name: 'Money',
    components: {Tags, Types, Notes, NumberPad},
  }
</script>
<style lang="scss">
    .layout-content{
        display: flex;
        flex-direction: column-reverse;
    }
</style>
<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";
</style>
