/**
*   Created By  YS  on 2018/8/3
*预约管理
*/
<template>
  <div class="box">
    <div class="header">
      <div class="btn" @click="exportExcel">导出EXCEL</div>
      <ys-search :isLeft="isLeft" @search="search" :placeholder="placeholder"></ys-search>
      <ys-select-shop :marginLeft="500" @getShop="getShop" @selectShop="selectShop">
      </ys-select-shop>
    </div>
    <!--下载表格-->
    <div class="table" style="position: fixed;top:-10000px">
      <el-table
        :data="table2"
        id="test-table"
        style="width: 100%">
        <el-table-column
          label="顾客名称"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.GameUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="联系方式"
          width="140">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.ContactNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="服务编号"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.OrderNo }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="预约时间"
          width="180">

          <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.SubscribeStartDate|dateChange }}</span>

          </template>
        </el-table-column>
        <el-table-column
          label="价格"
          width="120">
          <template slot-scope="scope">
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
            <span style="margin-left: 10px;color:red;" >{{ scope.row.State|state }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <div class="table">
      <el-table
        :data="table"
        style="width: 100%">
        <el-table-column
          label="顾客名称"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.GameUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="联系方式"
          width="140">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.ContactNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="服务编号"
          width="210">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.OrderNo }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="预约时间"
          width="180">

          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.SubscribeStartDate|dateChange }}</span>

          </template>
        </el-table-column>
        <el-table-column
          label="价格"
          width="120">
          <template slot-scope="scope">

            <span style="margin-left: 10px">{{ scope.row.Price }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          prop="tap"
          :filters="[{ text: '待服务', value: '3' }, { text: '已服务', value: '6' }]"
          :filter-method="filterTag"
          width="140">
          <template slot-scope="scope">
            <span style="margin-left: 10px;color:red;" >{{ scope.row.State|state }}</span>

          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              class="bs-btn"
              @click="handleEdit(scope.$index, scope.row.SubscribeId)">删除</el-button>
            <el-button
              size="mini"
              class="bs-btn"
              @click="handleDelete(scope.$index, scope.row.SubscribeId)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-size-box">
      <el-pagination
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        @prev-click="prev"
        @next-click="next"
        @current-change="current"
        layout="prev, pager, next"
        class="page"
        :total="total">
      </el-pagination>
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
          <el-col :offset="12" :span="8">{{currentDetail.GameUserName}}</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">联系方式</el-col>
          <el-col :offset="12" :span="8">{{currentDetail.ContactNumber}}</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">服务单号</el-col>
          <el-col :offset="12" :span="8">{{currentDetail.OrderNo}}</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">预约时间</el-col>
          <el-col :offset="12" :span="8">{{currentDetail.SubscribeStartDate|dateChange}}</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">价格</el-col>
          <el-col :offset="12" :span="8">{{currentDetail.Price}}</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">状态</el-col>
          <el-col :offset="12" :span="8">{{currentDetail.State|state}}</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">服务名称</el-col>
          <el-col :offset="12" :span="8">{{currentDetail.GoodsName}}</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">规格</el-col>
          <el-col :offset="12" :span="8">{{currentDetail.GoodsSpecName}}</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">服务人员</el-col>
          <el-col :offset="12" :span="8">{{currentDetail.servicePeople}}</el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1">备注</el-col>
          <el-col :offset="12" :span="8">
            {{currentDetail.Remark}}
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1" class="none">.</el-col>
          <el-col :offset="12" :span="8">
            <template v-for="item in currentDetail.Picture">
              <img :src="item"
                   alt=""
                   @click="openImage"
                   class="image">
            </template>

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
      computed:{

      },
      filters:{
        //转换时间
        state(val){
          let str
          if(val==6){
            str='已服务'
          }else{
            str='未服务'
          }
          return str
        },

        //转换时间
        dateChange(val){
          if(val){//判断预约时间是否为空
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
          }else{
            return '无预约时间'
          }


        }
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
            total:2,
            pageSize:5,
            placeholder:'输入人员名称，电话或订单号',
            tableData: [],
            table:[],
            table2:[],
            currentShopId:'',
            list:[1,2,3],
            currentDetail:"",
            shopList:'',
            searchVal:''//搜索的接口
          }
      },
      methods:{
        getShop(id){
          this.currentShopId=id
          this.getOrderList(id)
        },
        selectShop(id){
          this.currentShopId=id
          this.getOrderList(id)
        },

        //搜索
        search(val){
          this.searchVal=val
          this.$util.post(this,this.$api.getAppOrderList,{shopId:this.currentShopId,pageIndex:1,pageSize:10,state:-1,key:this.searchVal},(data)=>{
            this.table=data.Items;
            this.total=data.TotalItems;
            this.pageSize=data.ItemsPerPage
          },true)
        },



        //删除订单
        handleEdit(index, id) {
          console.log(index, id);
          this.$util.confirm(this).then(()=>{
            this.$util.post(this,this.$api.delAppOrder,{subscribeId:id},(data)=>{
              console.log(data);
              this.getOrderList(this.currentShopId)
            })
          })
        },
      //查看订单详情
        handleDelete(index, id) {
          this.showModal=true
          this.$util.post(this,this.$api.appOrderDetail,{subscribeId:id},(data)=>{
            this.currentDetail=data
            this.currentDetail.Picture=data.Picture.split(',')
          })
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

        // getAppList(){
        //     this.$http.post('http://rap2api.taobao.org/app/mock/84341/appList',{})
        //       .then(json=>{
        //         console.log(json);
        //         this.table=json.data.table;
        //       })
        // },
        //导出excel
        exportExcel () {
          this.$util.post(this,this.$api.getAppOrderList,{shopId:this.currentShopId,pageIndex:1,pageSize:100000,state:-1,key:''},(data)=>{
            this.table2=data.Items
          })
          setTimeout(()=>{
            var wb = XLSX.utils.table_to_book(document.querySelector('#test-table'),{raw:true});
            /* get binary string as output */
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
              FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '预约客户.xlsx')
            } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
            return wbout
          },2000)

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

            }
          }).catch(err=>{
            console.log(err);
          })},
        // 上一页
        prev(e){
          console.log(e);
          this.getOrderList(this.currentShopId,e,10)
        },
        // 下一页
        next(e){
          console.log(e);
          this.getOrderList(this.currentShopId,e,10)
        },
        // 当前页点击
        current(e){
          console.log(e);
          this.getOrderList(this.currentShopId,e,10)
        },
        //获取订单列表
        getOrderList(shopId,pageIndex=1,pageSize=10){
            this.$util.post(this,this.$api.getAppOrderList,{shopId:shopId,pageIndex,pageSize,state:-1,key:''},(data)=>{
              this.table=data.Items
              this.total=data.TotalItems;
              this.pageSize=data.ItemsPerPage
            },true)
        }
      },
      mounted(){
        // this.getAppList();
        // this.getShopList()
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
  .table /deep/ thead tr th:first-child{

    border-top-left-radius: 4px;
  }
  .table /deep/ thead tr th:last-child{
    border-top-right-radius: 4px;
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
  margin-top: 50px;
  width: 100%;
  .title{
    font-size: 20px;
    color:#282828;
    font-weight:  600;
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
  .bs-btn{
    background: @bs-color;
    border:none
  }
  /deep/.el-button:hover, .el-button:focus {
    color: #282828;
  }
  .img-detail{
    width: 500px;
    height: 500px;
  }
  .page-size-box{
    margin-top: 50px;
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
  /deep/ .el-pager li.active{
    color:#282828;
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
  /deep/ .el-pagination button:disabled{
    background: #ccc!important;
  }

</style>
