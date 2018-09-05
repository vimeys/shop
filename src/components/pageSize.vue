/**
*   Created By  YS  on 2018/9/5
*     封装分页器
*/
<template>

  <div class="page-size-box">
    <el-pagination
      prev-text="上一页"
      next-text="下一页"
      @size-change="changeSize"
      @prev-click="prev"
      @current-change="current"
      layout="prev, pager, next"
      class="page"
      :total="1000">
    </el-pagination>
  </div>

</template>

<script>
    export default {
        name: "pageSize",
      props:{

      }
    }
</script>

<style lang='less' scoped>
  .page-size-box{
    width: 100%;
  }
  //todo 修改分页器样式
  /deep/ .el-pager li{
    height: 31px;
    width: 31px;
    line-height: 31px;
    color:#282828;
    margin: 0 7px;
    background: #d8d8d8;
    border-radius: 2px;
  }
  /deep/ .el-pager li.active{
    background: #FFD736;
  }
  /deep/.el-pagination button{
    width:72px;
    padding: 0 6px;
    height:31px !important;
    text-align: center;
    background:rgba(216,216,216,1);
    border-radius:2px;;
  }
  /deep/ .el-pagination .btn-next{
    background: #FFD736;
    color: #282828;
    margin-left: 10px;
  }
  /deep/ .el-pagination .btn-prev{
    background: #FFD736;
    color: #282828;
    margin-right: 10px;
  }


</style>
