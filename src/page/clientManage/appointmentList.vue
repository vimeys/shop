/**
*   Created By  YS  on 2018/8/3
*预约管理
*/
<template>
  <div class="box">
    <div class="header">
      <div class="btn" @click="exportExcel">导出EXCEL</div>
      <ys-search :isLeft="isLeft" :placeholder="placeholder"></ys-search>
      <!--<el-select v-model="value"-->
                 <!--style="margin-left: 500px"-->
                 <!--placeholder="请选择"-->
                 <!--@change="chooseShop"-->
                 <!--v-if="shopList.length">-->
        <!--<el-option-->
          <!--v-for="item in shopList"-->
          <!--:key="item.value"-->
          <!--:label="item.Name"-->
          <!--:value="item.UserId">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <ys-select-shop :marginLeft="500" @selectShop="selectShop"></ys-select-shop>
    </div>
    <div class="table">
      <el-table
        :data="table"
        id="test-table"
        style="width: 100%">
        <el-table-column
          label="顾客名称"
          width="120">
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
            <span style="margin-left: 10px">{{ scope.row.Name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="联系方式"
          width="140">
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
            <span style="margin-left: 10px">{{ scope.row.Phone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="服务编号"
          width="180">
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
            <span style="margin-left: 10px">{{ scope.row.OrderNum }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="预约时间"
          width="180">

          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.OrderTime }}</span>
            <!--<el-popover trigger="hover" placement="top">-->
              <!--<p>姓名: {{ scope.row.name }}</p>-->
              <!--<p>住址: {{ scope.row.address }}</p>-->
              <!--<div slot="reference" class="name-wrapper">-->
                <!--<el-tag size="medium">{{ scope.row.OrderTime }}</el-tag>-->
              <!--</div>-->
            <!--</el-popover>-->
          </template>
        </el-table-column>
        <el-table-column
          label="价格"
          width="120">
          <template slot-scope="scope">
            <!--<el-popover trigger="hover" placement="top">-->
              <!--<p>姓名: {{ scope.row.name }}</p>-->
              <!--<p>住址: {{ scope.row.address }}</p>-->
              <!--<div slot="reference" class="name-wrapper">-->
                <!--<el-tag size="medium">{{ scope.row.Price }}</el-tag>-->
              <!--</div>-->
            <!--</el-popover>-->
            <span style="margin-left: 10px">{{ scope.row.Price }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          prop="tap"
          :filters="[{ text: '待服务', value: '待服务' }, { text: '已服务', value: '已服务' }]"
          :filter-method="filterTag"
          width="140">
          <template slot-scope="scope">
            <span style="margin-left: 10px;color:red;" >{{ scope.row.State }}</span>
            <!--<el-popover trigger="hover" placement="top">-->
              <!--<p>姓名: {{ scope.row.name }}</p>-->
              <!--<p>住址: {{ scope.row.address }}</p>-->
              <!--<div slot="reference" class="name-wrapper">-->
                <!--<el-tag size="medium">{{ scope.row.State }}</el-tag>-->
              <!--</div>-->
            <!--</el-popover>-->
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">删除</el-button>
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--详情-->
    <ys-popup
      :showModal="showModal"
      v-show="showModal"
      @close="close"
      :width='pWidth'
      :height="pHeight"
    >
      <div class="content">
        <el-row>
          <el-col :span="2" :offset="1" class="title">详情</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">顾客名称</el-col>
          <el-col :offset="12" :span="8">{{currentDetail.Name}}</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">联系方式</el-col>
          <el-col :offset="12" :span="8">{{currentDetail.Phone}}</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">服务单号</el-col>
          <el-col :offset="12" :span="8">{{currentDetail.OrderNum}}</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">预约时间</el-col>
          <el-col :offset="12" :span="8">{{currentDetail.OrderTime}}</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">价格</el-col>
          <el-col :offset="12" :span="8">{{currentDetail.Price}}</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">状态</el-col>
          <el-col :offset="12" :span="8">{{currentDetail.State}}</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">服务名称</el-col>
          <el-col :offset="12" :span="8">{{currentDetail.serviceName}}</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">规格</el-col>
          <el-col :offset="12" :span="8">{{currentDetail.Size}}</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">服务人员</el-col>
          <el-col :offset="12" :span="8">{{currentDetail.servicePeople}}</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">备注</el-col>
          <el-col :offset="12" :span="8">
            {{currentDetail.remark}}
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1" class="none">.</el-col>
          <el-col :offset="12" :span="8">
            <img :src="currentDetail.remarkImage"
                 alt=""
                 @click="openImage"
                 class="image">
          </el-col>
        </el-row>
      </div>
    </ys-popup>
    <ys-popup
      :showModel="showModal2"
      v-show="showModal2"
      @close="close2"
      :width="pWidth2"
      :height="pHeight2"
      :zIndex="zIndex">
      <img src="@/assets/images/goods.jpg" alt="" class="img-detail">
    </ys-popup>
  </div>
</template>

<script>
  import ysSearch from '@/components/search';
  import  ysPopup from '@/components/popup'
  import  ysSelectShop from '@/components/selectShop'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
    export default {
      name: "appointmentList",
      components:{
        ysSearch,
        ysPopup,
        ysSelectShop
      },
      data(){
          return {
            isLeft:true,
            showModal:false,
            pWidth:900,
            pHeight:800,
            zIndex:1000,
            showModal2:false,
            pWidth2:500,
            pHeight2:500,
            zIndex2:1000,
            placeholder:'输入客户名称，电话或订单号',
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
            table:[],
            list:[1,2,3],
            currentDetail:"",
            shopList:''
          }
      },
      methods:{
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
          this.showModal=true
          this.currentDetail=row;
        },

        //选择店铺
        selectShop(e){
          console.log(e);
        },
        filterTag(val,row){
          return row.State === val;
        },
        //打开图片
        openImage(){
          this.showModal2=true
        },
        //关闭模态框
        close(e){
          console.log(e);
          this.showModal=e;

        },
        close2(e){
            this.showModal2=e
        },
        getAppList(){
            this.$http.post('http://rap2api.taobao.org/app/mock/84341/appList',{})
              .then(json=>{
                console.log(json);
                this.table=json.data.table;
              })
        },
        //导出excel
        exportExcel () {
          /* generate workbook object from table */
          var wb = XLSX.utils.table_to_book(document.querySelector('#test-table'))
          /* get binary string as output */
          var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
          try {
            FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '预约客户.xlsx')
          } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
          return wbout
        },
        // 获取店铺列表
        getShopList(){
          this.$http.post(this.$api.shopList,{}).then(json=>{
            let data=json.data
            if(data.isSuc==true){
              this.shopList=data.result;
              // let firstShopId=data.result[0].UserId;
              // this.currentShopId=firstShopId
              // this.getGroupList(this.currentShopId)
              this.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'warning'
              })
            }
          }).catch(err=>{
            console.log(err);
          })}
      },
      mounted(){
        this.getAppList();
        this.getShopList()
      }
    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";
  /deep/ .el-table th > .cell.highlight{
    color:#282828;
  }
  /deep/ .el-col-offset-12{
    text-align: right;
  }
  /deep/ .el-col-offset-1{
    text-align: left;
  }
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
  .btn{
    .base-btn-111;
    margin-right: 80px;
  }
  .table{
    padding-top:40px;
  }
  .table /deep/ thead tr th{
    background: #ffd73a;
    color:#222;
    text-align: center;
  }
.content{
  margin-top: 100px;
  width: 100%;
  .title{
    font-size: 20px;
    color:#282828;
  }
  .row{
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 16px;
    .none{
      color:#fff;
      font-size: 1px;
    }
    .image{
      width: 74px;
      height: 74px;
      margin-right: 10px;
    }
  }

}
  .img-detail{
    width: 500px;
    height: 500px;
  }
</style>
