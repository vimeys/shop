<template>
  <div class="bs-search">
    <input class="input" type="text" :placeholder="placeholder" v-model="searchVal">
    <i class="el-icon-search search-icon-right" :class="{'search-icon-left':isLeft} " @click="$emit('search',searchVal)"></i>
  </div>
</template>

<script>
    export default {
        name: "search",
      props:{
        placeholder:{
          type:String,
          default(){
            return '输入服务名称、价格'
          }
        },
        isLeft:{//搜索框是否在左边
          type:Boolean,
          default(){
            return false
          }
        }
      },
      data(){
        return {
          // left:this.isLeft
          searchVal:''
        }
      },
      computed:{

      },
      methods:{

      },
      created(){

      }
    }
</script>

<style lang="less" scoped>
  .bs-search{
    display: flex;
    flex-direction: row;
    width: 279px;
    height: 35px;
    position: relative;
    .input{
       width: 100%;
      border-radius: 4px;
      border: 1px solid #F9F9F9;
      position: absolute;
      top:0;
      left: 0;
      height: 35px;
      font-size:14px;
      text-align: center;
      background:#fafafa;
      box-sizing: border-box;
      padding-right: 35px;
    }
    .search-icon-right{
      width: 44px;
     height: 35px;
      display: inline-block;
      background: #FDD731;
      border-radius: 4px;
      position: absolute;
      top:0;
      right: 0;
      line-height: 35px;
    }
    .search-icon-left{
      width: 44px;
     height: 35px;
      display: inline-block;
      background: #FDD731;
      border-radius: 4px;
      position: absolute;
      top:0;
      left: -43px;
      line-height: 35px;
    }
  }
</style>
