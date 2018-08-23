<template>
      <div class="body">
          <steps></steps>
        <div>
          <router-view></router-view>
        </div>
      </div>
</template>

<script>
    import steps from '@/components/steps'
    // import ShopSetting from './shopSetting'
    // import staffset from './staffSetting'
    export default {
        name: "index",
        components:{
          steps
        }
    }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin";
  .body{
    width: 100%;
    display: flex;

  }
</style>
