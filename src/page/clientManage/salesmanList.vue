/**
*   Created By  YS  on 2018/8/5
*销售人员管理
*/
<template>
  <div class="box">
    <div class="header">
      <ys-search  :placeholder="placeholder"></ys-search>
      <ys-select-shop
        :marginLeft="700"
        @getShop="getShop"
        @selectShop="selectShop"></ys-select-shop>
    </div>
    <div class="table">
      <el-table
        :data="list"
        style="width: 100%">
        <el-table-column
          label="分销商名称"
          width="300">
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
            <span style="margin-left: 10px">{{ scope.row.ServicePersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="联系方式"
          width="300">
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
            <span style="margin-left: 10px">{{ scope.row.ContactPhoneNum }}</span>
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
      <div class="page-size-box">
        <el-pagination
          prev-text="上一页"
          next-text="下一页"
          @prev-click="prev"
          :page-size="pageSize"
          @next-click="next"
          @current-change="current"
          layout="prev, pager, next"
          class="page"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import ysSearch from '@/components/search';
  import  ysPopup from '@/components/popup'
  import ysSelectShop from '@/components/selectShop'
    export default {
        name: "salesmanList",
      components:{
        ysSearch,
        ysPopup,
        ysSelectShop
      },
      data(){
          return {
            pWidth:900,
            pHeight:800,
            zIndex:1000,
            showModal2:false,
            currentShopId:"",
            pageSize:5,
            total:"",
            placeholder:'输入名称、电话',
            list:[],//分销人员列表
          }
      },
      methods:{
        getShop(e){
          this.currentShopId=e
            this.getSalesman(e)
        },
        selectShop(e){
          this.currentShopId=e
          this.getSalesman(e)
        },
        handleEdit(index,data){
          console.log(data);
          console.log(index);
        },
        prev(e){
          this.getSalesman(this.currentShopId,e,5)
        },
        next(e){
          this.getSalesman(this.currentShopId,e,5)
        },
        current(e){
          this.getSalesman(this.currentShopId,e,5)
        },

        //获取经销商列表
        getSalesman(shopId,index=1,size=10){
            let obj={
              query:{
                pageIndex:index,
                pageSize:size,
                key:'',
                shopId:shopId
              }
            };
            // this.$http.post('http://rap2api.taobao.org/app/mock/84341/gameusershop/list',{}).then(json=>{
            //   console.log(json);
            //   let data=json.data;
            //   if(data.isSuc==true){
            //     this.list=data.result.Items
            //     console.log(this.list);
            //   }
            //   // let data=json.data;
            //   // if(data.isSuc==true){
            //   //   this.list=data.result.Items
            //   // }
            // })
          this.$util.post(this,this.$api.getSalesman,obj,(data)=>{
            console.log(data);
          })
        }
      },
      mounted(){
          // this.getSalesman()
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
  .page-size-box{
    margin-top: 30px;
  }
</style>
