/**
*   Created By  YS  on 2018/8/10
*     订单管理
*/
<template>
  <div class="box">
    <div class="order-header">
      <div class="base-btn-111" @click="exportExcel"> 导出excel</div>
      <ys-search :placeholder="placeholder" @search="search"></ys-search>
      <ys-select-shop
        :marginLeft="500"
        @getShop="getShop"
        @selectShop="selectShop"></ys-select-shop>
    </div>


    <!--下载整个表单-->
    <el-table
      :data="Data2"
      id="test-table"
      class="table"
      style="width: 100%;position: fixed;top:-10000px">
      <el-table-column
        label="顾客名称"
        width="105">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.TrueName|| '无'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="联系方式"
        width="125">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.Tel||'13350900722' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="门店名称"
        width="127">
        <template slot-scope="scope">
          <!--<el-popover trigger="hover" placement="top">-->
          <!--<p>姓名: {{ scope.row.name }}</p>-->
          <!--<p>住址: {{ scope.row.address }}</p>-->
          <!--<div slot="reference" class="name-wrapper">-->
          <!--<el-tag size="medium">{{ scope.row.StoreName||'成都店' }}</el-tag>-->
          <!--</div>-->
          <!--</el-popover>-->
          <span style="margin-left: 10px">{{ scope.row.StoreName||'成都店' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="订单编号"
        width="145">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.OrderNo||'123' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="139">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.CreateDate|dateChange}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="挂单人"
        width="106">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.SinglePersonName||'无' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="金额"
        width="77">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.AmountPrice||'0' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="tap"
        :filters="[{ text: '待服务', value: '待服务' }, { text: '已服务', value: '已服务' }]"
        :filter-method="filterTag"
        width="100">
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
    </el-table>
    <!--下载整个表单-->

    <el-table
      :data="Data"
      class="table"
      style="width: 100%">
      <el-table-column
        label="顾客名称"
        width="105">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.TrueName|| '无'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="联系方式"
        width="125">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.Tel||'13350900722' }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--label="门店名称"-->
        <!--width="127">-->
        <!--<template slot-scope="scope">-->
          <!--&lt;!&ndash;<el-popover trigger="hover" placement="top">&ndash;&gt;-->
            <!--&lt;!&ndash;<p>姓名: {{ scope.row.name }}</p>&ndash;&gt;-->
            <!--&lt;!&ndash;<p>住址: {{ scope.row.address }}</p>&ndash;&gt;-->
            <!--&lt;!&ndash;<div slot="reference" class="name-wrapper">&ndash;&gt;-->
              <!--&lt;!&ndash;<el-tag size="medium">{{ scope.row.StoreName||'成都店' }}</el-tag>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-popover>&ndash;&gt;-->
          <!--<span style="margin-left: 10px">{{ scope.row.StoreName||'成都店' }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        label="订单编号"
        width="215">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.OrderNo||'123' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="159">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.CreateDate|dateChange}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="挂单人"
        width="106">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.SinglePersonName||'无' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="金额"
        width="87">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.AmountPrice||'0' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="tap"
        :filters="[{ text: '未收款', value: '4' }, { text: '已收款', value: '12' }]"
        :filter-method="filterTag"
        width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px;color:red;" >{{ scope.row.State|state}}</span>
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
            class="bs-btn"
            @click="openDetailPopup(scope.$index, scope.row.GoodsOrderFormId)">
            详情
          </el-button>
          <el-button
            size="mini"
            class="bs-btn"
            :class="{'disable':scope.row.disable}"
            @click="handleEdit(scope.$index, scope.row)">收款
          </el-button>
          <!--<el-button-->
            <!--size="mini"-->
            <!--class="bs-btn"-->
            <!--@click="handleDelete(scope.$index, scope.row)">结单-->
          <!--</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="page-size-box">
      <el-pagination
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        @size-change="changeSize"
        @prev-click="prev"
        @next-click="next"
        @current-change="current"
        layout="prev, pager, next"
        class="page"
        :total="total">
      </el-pagination>
    </div>
    <!--<el-row class="order-btn">-->
      <!--<el-col :span="4">-->
        <!--<div class="base-btn-111" @click="openOrder">挂单</div>-->
      <!--</el-col>-->
    <!--</el-row>-->

    <!--<el-pagination-->
      <!--prev-text="上一页"-->
      <!--next-text="下一页"-->
      <!--@size-change="changeSize"-->
      <!--@prev-click="prev"-->
      <!--@current-change="current"-->
      <!--layout="prev, pager, next"-->
      <!--class="page"-->
      <!--style="margin-top: 30px"-->
      <!--:total="1000">-->
    <!--</el-pagination>-->
    <!--*******查看订单详情********-->
    <ys-popup
      :width="detail.width"
      :height="detail.height"
      v-show="detail.showModal"
      @close="closeDetailPopup"
    >
      <div class="content">
        <el-row>
          <el-col :span="2" :offset="1" class="title"><h3>详情</h3></el-col>
        </el-row>
        <el-scrollbar style="width: 99.5%;height: 700px">
          <el-row class="row">
            <el-col :span="2" :offset="1">顾客名称</el-col>
            <el-col :offset="12" :span="8">{{currentDetail.GameUserName}}</el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="2" :offset="1">联系方式</el-col>
            <el-col :offset="12" :span="8">{{currentDetail.Tel}}</el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="2" :offset="1">服务单号</el-col>
            <el-col :offset="12" :span="8">{{currentDetail.OrderNo}}</el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="2" :offset="1">下单时间</el-col>
            <el-col :offset="12" :span="8">{{currentDetail.CreateDate|dateChange}}</el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="2" :offset="1">价格</el-col>
            <el-col :offset="12" :span="8">{{currentDetail.AmountPrice}}</el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="2" :offset="1">状态</el-col>
            <el-col :offset="12" :span="8">{{currentDetail.State}}</el-col>
          </el-row>
          <div style="background: #f5f5f5;margin-top: 5px" v-for="item in currentDetail.list">
            <el-row class="row row-server">
              <el-col :span="2" :offset="1">服务名称</el-col>
              <el-col :offset="12" :span="8">{{item.GoodsName}}</el-col>
            </el-row>
            <el-row class="row row-server">
              <el-col :span="2" :offset="1">服务规格</el-col>
              <el-col :offset="12" :span="8">{{item.GoodsSpecName}}</el-col>
            </el-row>
            <el-row class="row row-server">
              <el-col :span="2" :offset="1">服务人员</el-col>
              <el-col :offset="12" :span="8">
                <span v-for="itemSon in item.GroupEmployee">
                  {{itemSon.NickName}},
                </span>
                <!--{{currentDetail.servicePeople}}-->
              </el-col>
            </el-row>
          </div>

          <el-row class="row">
            <el-col :span="2" :offset="1">备注</el-col>
            <el-col :offset="12" :span="8">
              {{currentDetail.Remark||'无'}}
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="2" :offset="1" class="none">.</el-col>
            <el-col :offset="12" :span="8" v-if="currentDetail.remarkImage">
              <img :src="currentDetail.remarkImage"
                   alt=""
                   @click="openImage"
                   class="image">
            </el-col>
          </el-row>
        </el-scrollbar>

      </div>
    </ys-popup>

    <!--收款-->
    <ys-popup
      :width="order.width"
      :height="order.height"
      v-show="order.showModal"
      @close="closeOrder"
    >
      <div class="make-order">
        <el-row>
          <el-col :span="6" :offset="2"><div class="base-h3">收款</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="2">
            顾客名称：{{currentDetail.GameUserName}}
          </el-col>
          <el-col :span="5">
            {{currentDetail.Tel}}
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
            <el-col :span="8" class="base-col">服务及服务员</el-col>
          <el-col :span="16">
              <el-scrollbar class="make-order-scroll">
                <template v-for="(item,index) in currentDetail.list">
                  <el-row v-if="item.UserIds" style="margin-right: 10px">
                    <el-col class="server-card" >
                      <el-row :gutter="10" class="server-li">
                        <el-col :span="4" class="base-col">服务</el-col>
                        <el-col :span="20" class="base-text">
                          {{item.GoodsName}}
                        </el-col>
                      </el-row>
                      <el-row :gutter="10" class="server-li">
                        <el-col :span="4" class="base-col">规格</el-col>
                        <el-col :span="20" class="base-text">
                          {{item.GoodsSpecName}}
                        </el-col>
                      </el-row>
                      <el-row :gutter="10" class="server-li">
                        <el-col :span="4" class="base-col">人员</el-col>
                        <el-col :span="20" class="base-text">
                          <el-select size="small">
                            <el-option></el-option>
                          </el-select>
                        </el-col>
                      </el-row>

                    </el-col>
                  </el-row>
                  <el-row v-else style="margin-right: 10px">
                    <el-col class="server-card" >
                      <el-row :gutter="10" class="server-li">
                        <el-col :span="4" class="base-col">服务</el-col>
                        <el-col :span="20" >
                          <el-select v-model="item.serverNameValue"
                                     filterable
                                     size="small"
                                     placeholder="请输入您想搜索的服务">
                            <el-option
                              v-for="itemSon in item.serverNameValue"
                              :key="itemSon.GoodsId"
                              :label="itemSon.Name"
                              :value="itemSon.GoodsId"
                            >
                            </el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10" class="server-li">
                        <el-col :span="4" class="base-col">规格</el-col>
                        <el-col :span="20" >
                          <el-select v-model="item.serverNameValue"
                                     size="small"
                                     placeholder="请选择该服务的规格">
                            <el-option
                              v-for="itemSon in item.serverNameValue"
                              :key="itemSon.GoodsId"
                              :label="itemSon.Name"
                              :value="itemSon.GoodsId"
                            >
                            </el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10" class="server-li">
                        <el-col :span="4" class="base-col">人员</el-col>
                        <el-col :span="20" >
                          <el-select size="small">
                            <el-option></el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                      <span class="el-icon-error del-btn" @click="deleteServer(index)" ></span>
                    </el-col>
                  </el-row>
                </template>
                <el-row>
                  <el-col>
                    <span class="plus" @click="addServer">+</span>
                  </el-col>
                </el-row>
              </el-scrollbar>
          </el-col>
        </el-row>
        <el-row class="server-count">
          <el-col :span="6" :offset="2">
            共计金额：<span class="server-money">￥399</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="confirm">
              收款
            </div>
          </el-col>
        </el-row>
      </div>

    </ys-popup>


  </div>
</template>

<script>
  import ysSearch from '@/components/search'
  import  ysPopup from '@/components/popup'
import ysSelectShop from '@/components/selectShop'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    name: "orderManage",
    components: {
      ysSearch,
      ysPopup,
      ysSelectShop
    },
    filters:{
      state(val){
        let str
        if(val==12){
          str='已收款'
        }else{
          str='未收款'
        }
        return str

      },
      //转换时间
      dateChange(val){
        try{
          var first =val.indexOf('(');
          var last =val.indexOf(')');
          var time=val.substring(first+1,last)
          // console.debug(123);
          // console.log(123);
        }catch(err){
          console.debug(err);
        }

         time=new Date(parseInt(time-8*60*60*1000));
        const year = time.getFullYear()
        const month = time.getMonth() + 1
        const day = time.getDate()
        const hour = time.getHours()
        const minute = time.getMinutes()
        const second = time.getSeconds()
        const formatNumber = n => {
          n = n.toString()
          return n[1] ? n : '0' + n
        }
        return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')

      }
    },
    data() {
      return {
        order:{//挂单
           width:670,
          height:595,
          showModal:false
        },
        detail:{//订单详情
          width:900,
          height:880,
          showModal:false
        },
        value8:'',
        options: [],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          disable:false,
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        placeholder:'输入人员名称，电话或订单号',
        total:11,
        pageSize:10,
        Data:[],//表格数据
        Data2:[],
        currentDetail:'',//详情
        orderServerList:[{goods:'',size:'',people:'',hasPlus:true}],
        currentShopId:'',
        serverData:'',//所有服务的数据
        searchVal:'',//搜索数据
      }
    },
    methods: {
      // 获取到店铺
      getShop(e){
        this.currentShopId=e
          this.getOrderList(e)
      },
      selectShop(id){
        this.currentShopId=id
        this.getOrderList(id)
      },

      search(val){
        this.searchVal=val
        this.$util.post(this,this.$api.getOrderList,
          {shopId:this.currentShopId,pageIndex:1,pageSize:10,state:-1,key:val},
          (data)=>{
            this.Data=data.Items;
            this.total=data.TotalItems
            // this.Data.forEach(item=>{
            //   item.CreateDate=this.$util.
            // })
          },true
        )
      },
      //打开付款弹窗
      handleEdit(index, row) {
        this.order.showModal=true;
        this.$util.post(this,this.$api.orderDetail,{goodsOrderFormId:row.GoodsOrderFormId},(data)=>{
          this.currentDetail=data
        })
      },
      //关闭付款弹窗
      closeOrder(){
          this.order.showModal=false

      },



      filterTag(value,row){
        console.log(value);
        console.log(row);
        return row.State == value;
      },
      // 查看图片详情
      openImage(){},
      //打开详情弹窗
      openDetailPopup(i,id){
        console.log(i, id);
        console.log(id);
        this.detail.showModal=true;
        this.$util.post(this,this.$api.orderDetail,{goodsOrderFormId:id},(data)=>{
              this.currentDetail=data
        })
      },
      //获取某店铺下的订单
      getOrderList(shopId,key='',pageIndex=1,pageSize=10){
          this.$util.post(this,this.$api.getOrderList,
            {shopId:shopId,pageIndex,pageSize,state:-1,key:key},
            (data)=>{
                this.Data=data.Items;
                this.total=data.TotalItems
                // this.Data.forEach(item=>{
                //   item.CreateDate=this.$util.
                // })
            },true
          )
      },
      //添加服务
      addServer(){
        this.$util.post(this,this.$api.getAllServerList,{pageIndex:1, pageSize:100,name:''},(data)=>{
              this.serverData=data
        })
        let obj={}
          obj.server='';
          obj.serverNameValue='';//当前服务的服务名称
          this.currentDetail.list.push(obj)
      },
      //结算时删除当前服务
      deleteServer(index){
          this.currentDetail.list.splice(index,1)
      },
      exportExcel(){
        this.$util.post(this, this.$api.getOrderList,
          {shopId: this.currentShopId, pageIndex: 1, pageSize: 100000, state: -1, key: ''},
          (data) => {
            this.Data2 = data.Items
            setTimeout(() => {
              var wb = XLSX.utils.table_to_book(document.querySelector('#test-table'), {raw: true})
              /* get binary string as output */
              var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
              try {
                // self.saveAs(xlsxUtils.format2Blob(wb), fileName +".xlsx");
                FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '订单.xlsx')
              } catch (e) {
                if (typeof console !== 'undefined') console.log(e, wbout)
              }
              return wbout
            }, 2000)

          }
        )

      },

      //关闭详情弹窗
      closeDetailPopup(){
        console.error(123)
        this.detail.showModal=false;
      },
      //获取详情
      changeSize(e){
        console.log(e);
      },
      // 上一页
      prev(e){
        console.log(e);
        this.getOrderList(this.currentShopId,this.searchVal,e,10)
      },
      // 下一页
      next(e){
        console.log(e);
        this.getOrderList(this.currentShopId,this.searchVal,e,10)
      },
      // 当前页点击
      current(e){
        console.log(e);
        this.getOrderList(this.currentShopId,this.searchVal,e,10)
      },
      addOrderServer(){
          this.orderServerList.forEach(item=>{
            item.hasPlus=false
          })
          this.orderServerList.push({goods:'',size:'',people:'',hasPlus:true})
      }
    }
  }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  /deep/.el-button:hover, .el-button:focus {
    color: #282828;
  }
  /deep/ .el-table th > .cell.highlight{
    color:#282828;
  }
  /deep/ .el-select--small{
    width: 100%;
  }
  /deep/ input{
    text-align: center;
  }
  /deep/ .el-col-offset-12{
    text-align: right;
  }
  /deep/ .el-col-offset-1{
    text-align: left;
  }
  /deep/ .table  thead tr th:first-child{

    border-top-left-radius: 4px;
  }
  /deep/ .table  thead tr th:last-child{
    border-top-right-radius: 4px;
  }
  .box {
    width: 1200px;
    .order-header {
      display: flex;
      margin: 30px 0;
      .base-btn-111 {
        margin-right: 30px;
      }
    }
    .table /deep/ thead tr th {

      background: #ffd73a;
      color: #222;
      text-align: center;
    }
  }
  .order-btn{
    padding: 30px 0;
    background: #fff;
  }

  /*挂单弹窗样式*/
  .open-order-box{
    width: 100%;
  }
  .order-scroll{
    height: 500px;
  }
  //按钮颜色
  .bs-btn{
    background: @bs-color;
    border:none
  }

  .disable{
    background: #d8d8d8 !important;
  }

  //详情
  .content{
    margin-top: 100px;
    width: 100%;
    .title{
      font-size: 20px;
      color:#282828;
      font-weight: 600;
    }
    .row{
      padding-top: 15px;
      padding-bottom: 15px;
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
    .row-server{
      background: #f5f5f5;
    }
  }
  .img-detail{
    width: 500px;
    height: 500px;
  }
  //收款弹窗
  .make-order{
    width: 100%;
    .make-order-scroll{
      width: 100%;
      height: 330px;
    }
    .plus{
      display: inline-block;
      width:27px;
      height:27px;
      background:rgba(255,215,54,1);
      text-align: center;
      line-height: 27px;
      color: #fff;
      border-radius:4px;
      margin-top: 20px;
    }
    .server-card{
      background: #F5F5F5;
      padding: 20px;
      margin-top: 20px;
      position: relative;
      .server-li{
        margin: 5px 0;
      }
      .del-btn{
        display:inline-block;
        width: 14px;
        height: 14px;
        position: absolute;
        top:0;
        right: 0;
      }
    }
    .server-count{
      margin-top: 20px;
      margin-bottom: 20px;
      .server-money{
        color:#D0021B;
        font-size: 20px;
      }
    }
    .confirm{
      .base-btn(400px);
      margin-top: 20px;
    }
    .base-text{
      height: 36px;
      background: #fff;
      text-align: center;
      line-height: 36px;
        font-size: 16px;
      border-radius: 4px;
    }
  }

  .page-size-box{
    margin-top: 50px;
  }
</style>
