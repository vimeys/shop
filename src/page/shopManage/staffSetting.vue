/**
*   Created By  YS  on 2018/8/11
*/
<template>
  <div class="box">
      <div>

        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span>总数：2人</span>
        <ys-search></ys-search>
      </div>
  </div>
</template>

<script>
    import ysSearch from '@/components/search'
    export default {
        name: "staffSetting",
        components:{
          ysSearch
        },
      data(){
          return {
            placeholder:'搜索姓名或手机号'
          }
      }
    }
</script>

<style lang='less' scoped>

</style>
