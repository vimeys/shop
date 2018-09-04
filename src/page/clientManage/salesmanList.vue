/**
*   Created By  YS  on 2018/8/5
*销售人员管理
*/
<template>
  <div class="box">
    <div class="header">
      <ys-search  :placeholder="placeholder"></ys-search>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="分销商名称"
          width="300">
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="联系方式"
          width="300">
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="上级分销"
          width="300">
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="medium"
              class="base-input"
              @click="handleEdit(scope.$index, scope.row)">授权分销商{{scope.row.date}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import ysSearch from '@/components/search';
  import  ysPopup from '@/components/popup'
    export default {
        name: "salesmanList",
      components:{
        ysSearch,
        ysPopup
      },
      data(){
          return {
            pWidth:900,
            pHeight:800,
            zIndex:1000,
            showModal2:false,
            placeholder:'输入名称、电话',
            tableData: [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
              tag:'已服务'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄',
              tag:'已服务'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              tag:'待服务'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄',
              tag:'待服务'
            }],
          }
      },
      methods:{
        handleEdit(index,data){
          console.log(data);
          console.log(index);
        },
        //获取经销商列表
        getSalesman(){
            let obj={
              query:{
                pageIndex:1, pageSize:10, key:''
              }
            };
            this.$http.post(this.$api.getSalesman,obj).then(json=>{
              console.log(json);
            })
        }
      },
      mounted(){
          this.getSalesman()
      }
    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";
  .box{
    width: 1200px;
  }
  .header{
    display: flex;
    justify-content: flex-start;
    margin-top: 60px;
    padding-bottom: 30px;
    border-bottom:1px solid #D8D8D8;
  }
  .table{
    padding-top:40px;
  }
  //todo 表格倒圆角及表头颜色这只
  .table /deep/ thead tr th{
    background: #ffd73a;
    color:#222;
    text-align: center;
  }
  .table /deep/ thead tr th:first-child{

    border-top-left-radius: 4px;
  }
  .table /deep/ thead tr th:last-child{
    border-top-right-radius: 4px;
  }
  .full-btn{
    background:@bs-color;
  }
</style>
