/**
*   Created By  YS  on 2018/8/22
*/
<template>
      <div class="fodderCenter-box">
        <step
          :navList="fodderCenter"
        >
        </step>
        <router-view></router-view>
      </div>

</template>

<script>
    import  step from "@/components/steps"
    import {fodderCenter} from "../../assets/script/stepsData";

    export default {
        name: "fodder",
      components:{
        step
      },
      data(){
          return {
            fodderCenter:fodderCenter
          }
      }
    }
</script>

<style lang='less' scoped>
  @import " ~@/assets/style/mixin";
.fodderCenter-box{
  display: flex;
}

</style>
