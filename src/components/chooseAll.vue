/**
*   Created By  YS  on 2018/8/29
*/
<template>
    <div class="radio" @click="choose">
        <div class="radio-chose" v-show="chosed"></div>
    </div>
</template>

<script>
    export default {
        name: "chooseAll",
      props:{
        ischosed:{
            type:Boolean,
            default(){
                return false
            }
          }
      },
      data(){
          return{
            chosed:this.ischosed
          }
      },
      methods:{
          choose(){
              this.chosed=!this.chosed;
              this.$emit('chooseAll',this.chosed)
          }
      }
    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";
    .radio{
      width: 21px;
      height: 21px;
      border: 1px solid @bs-color;
      display: flex;
      background: #fff;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      &-chose{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: @bs-color;
      }
    }
</style>
