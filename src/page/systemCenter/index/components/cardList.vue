  <!--精选商品-->

<template>
  <div>
    <div class="header">
      <!--<div class="return" @click="goback" >返回</div>-->
      <!--<div class="new">新建优惠券</div>-->
      <!--<div class="manage">管理</div>-->
      <!--<div class="del">删除</div>-->
      <div class="goods-btns">
        <div class="">
          <div class="new" :class="{'disable':disableAdd}" @click="openGoods">
            <img src="@/assets/images/icon/addBtn.png" alt="">新建服务
          </div>
          <div class="manage" :class="{'disable':disableManage}" @click="manage">批量管理</div>
          <div class="del" style="margin-left: 30px" :class="{'disable':disableSort}" @click="Sort">排序</div>
        </div>
        <ys-search @search="search"></ys-search>
      </div>
      <el-row class="edit-btns" v-if="!disableManage">
        <el-col :span="4">
          <el-row>
            <el-col :span="4" :offset="8">
              <div class="coupon-radio" @click="chooseAll">
                <div class="coupon-radio-point" v-show="allChoosed"></div>
              </div>
            </el-col>
            <el-col :span="6" class="choose-word" >
              全选
            </el-col>
          </el-row>
        </el-col>

        <el-col  :span="4"  :offset="16" class="edit-del" >
          <div @click="delGoods">删除</div>
        </el-col>
      </el-row>
    </div>
    <!--<div class="card">-->
      <!--&lt;!&ndash;<template v-for="item in list">&ndash;&gt;-->
        <!--&lt;!&ndash;<ys-card&ndash;&gt;-->
          <!--&lt;!&ndash;:detail="item"&ndash;&gt;-->
          <!--&lt;!&ndash;@reMake="reMake"&ndash;&gt;-->
          <!--&lt;!&ndash;:marginBottom="60"&ndash;&gt;-->
        <!--&lt;!&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;</ys-card>&ndash;&gt;-->
      <!--&lt;!&ndash;</template>&ndash;&gt;-->
    <!--</div>-->
    <div class="goods-list">
      <template v-for="(item,index) in hotGoodsList">
        <ys-goods-card :detail="item"
                    :index="index"
                       :noneBtn="false"
                    :isSort="isSort"
                    @up="upSort"
                    @down="downSort"
                    @chooseCurrent="chooseCurrent1"
                    ></ys-goods-card>
      </template>
    </div>
    <!--<ys-goods-card></ys-goods-card>-->

    <!--选择精选商品-->
    <ys-popup
      v-show="showModal"
      :height="height"
      :width="width"
      @close="close"
    >
      <div style="width: 100%;padding: 50px">
        <el-row>
          <el-col :span="4"><h3>添加服务</h3></el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="4">服务分类</el-col>
          <el-col :span="10">
            <el-select v-model="valueFirstType"
                       @change="chooseFirstType"
                       size="small"
                       placeholder="一级分类">
              <el-option
                v-for="item  in typeList"
                :key ="item.GoodsTypeId"
                :label="item.Name"
                :value="item.GoodsTypeId"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="10">
            <el-select v-model="valueSecondType"
                       @change="chooseSecondType"
                       size="small"
                       placeholder="一级分类">
              <el-option
                v-for="item  in secondType"
                :key ="item.GoodsTypeId"
                :label="item.Name"
                :value="item.GoodsTypeId"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="goods-list">
          <el-col>
            <el-scrollbar style="width: 800px; height: 550px">
                <el-row :gutter="40" >
                  <el-col :span="12" style="margin-bottom: 30px" v-for="(item,index) in goodsList">
                      <div class="goods-card">
                        <div>
                          <img :src="item.Pic" alt="">
                        </div>
                        <div>
                          <h4>{{item.Name}}</h4>
                          <div class="price-old">原价：{{item.Price}}</div>
                          <div class="price-new">现价：￥{{item.discountPrice||0}}</div>
                        </div>
                        <div class="circle" v-show="item.hasChecked" @click="choose(index)">
                          <div class="point" v-show="item.isChecked" ></div>
                        </div>
                      </div>
                  </el-col>
                </el-row>
            </el-scrollbar>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="base-btns" @click="confirm">确定</div>
          </el-col>
        </el-row>
      </div>

    </ys-popup>
  </div>

</template>

<script>
  import  ysSearch from '@/components/search'
  import  ysCard from "@/components/coupon"
  import  ysPopup from '@/components/popup'
  import ysGoodsCard from "@/components/goodsCard"
  export default {
    name: "cardList",
    components: {
      ysSearch,
      ysCard,
      ysPopup,
      ysGoodsCard
    },
    data(){
        return {
          showModal:false,//显示弹窗
          width:880,
          height:855,
          isSort:false,
          allChoosed:false,
          typeList:[],//分类列表
          disableAdd:false,//是否禁用
          disableManage:true,//批量管理
          disableSort:true,//
          goodsList:[],
          valueFirstType:'',
          valueSecondType:'',
          secondType:'',
          hotGoodsList:[]
        }
    },
    watch:{
      goodsList(){
        let aPrice=this.goodsList.SpecList;
        console.log(this.goodsList);
        let a=[]
        try{
          aPrice.forEach(item=>{
            a.push(item.Price)
          })
          function s(a,b) {
            return a-b
          }
          a.sort(s)
          return a[0]
        }catch (e) {
          console.log(e);
        }

      }
    },
    methods:{
      search(val){
        this.getHotGoods(val)
      },
      goback(){
        this.$router.go(-1)
          this.$emit('back',this.show)
      },
      chooseCurrent1(index,state){
        console.log(index, state);
        this.hotGoodsList[index].isChecked=state;
      },
      reMake(e){
        console.log(e);
        this.showModal=!this.showModal
        console.log(this.showModal);
      },
      //打开弹窗
      openGoods(){
        if(!this.disableAdd){//不是禁止才可以点击
          this.showModal=true
        }
      },

      //选择一级
      chooseFirstType(e){
        let index1='';
        this.getGoodsList(e)
        this.typeList.forEach((item,index)=>{
          console.log(item.GoodsTypeId);
          console.log(e);
          if(item.GoodsTypeId==e){
            index1=index
          }
          this.valueSecondType='';
        })
        let arr=this.typeList[index1].ChildGoodsType
        if(arr.length){
          this.secondType=arr
        }else{
          this.secondType=[{
            GoodsTypeId:0,
            Name:'无'
          }]
        }
      },
      chooseSecondType(e){
        console.log(e);
        this.getGoodsList(this.valueFirstType,e)
      },
      //全选按钮
      chooseAll(){
          if(this.allChoosed){
            this.hotGoodsList.forEach(item=>{
              item.isChecked=false
              this.allChoosed=false
            })
          }else{
            this.hotGoodsList.forEach(item=>{
              item.isChecked=true
              this.allChoosed=true
            })
          }
      },
      choose(index){
        console.log(index);
        this.goodsList[index].isChecked=!this.goodsList[index].isChecked
      },
      //确认分类
      confirm(){
        let arr=[]
          this.goodsList.forEach(item=>{

            if(item.isChecked){
                arr.push(item.GoodsId)
            }

          })
        this.$util.post(this,this.$api.hotGoods,{goodsIds:arr,isSelected:1},()=>{
          this.showModal=false;
          this.getHotGoods()
          this.valueSecondType="";
          this.valueFirstType="";
        },true)
      },
      //批量管理
      manage(){
        if(!this.disableManage){//是启用状态
          this.disableManage=true;
          this.disableAdd=false
          this.disableSort=true
          this.isSort=false
          this.hotGoodsList.forEach(item=>{
            item.hasChecked=false
          })
        }else{//是禁止状态
          this.disableManage=false;
          this.disableAdd=true;
          this.isSort=false
          this.disableSort=true;
          this.hotGoodsList.forEach(item=>{
            item.hasChecked=true
          })
        }
      },
      //删除精选商品
      delGoods(){
        let arr=[]
        this.hotGoodsList.forEach((item,index)=>{
          if(item.isChecked){
            arr.push(this.hotGoodsList[index].GoodsId)
          }
        })
        this.$util.post(this,this.$api.hotGoods,{goodsIds:arr,isSelected:0},
          (data)=>{
              this.disableManage=false
               this.getHotGoods()
        },true)
      },
      // 开始排序
      Sort(){
        if(!this.disableSort){
          this.isSort=false
          this.disableAdd=false;
          this.disableManage=true;
          this.disableSort=true
          this.hotGoodsList.forEach(item=>{
            item.hasChecked=false
          })
        }else{
          this.isSort=true
          this.disableAdd=true;
          this.disableManage=true;
          this.disableSort=false
          this.hotGoodsList.forEach(item=>{
            item.hasChecked=false
          })
        }
      },
      //todo 修改排序请求接口
      upSort(index){
        let obj={
          firstid:this.hotGoodsList[index-1].GoodsId,
          secondid:this.hotGoodsList[index].GoodsId
        }
        this.$util.post(this,this.$api.sortGoods,obj,()=>{
          let old1=this.hotGoodsList[index-1]
          let old2=this.hotGoodsList[index]
          this.hotGoodsList.splice(index-1,1,old2)
          this.hotGoodsList.splice(index,1,old1)
        },true)

      },
      //todo 修改排序单位请求接口
      downSort(index){
        let obj={
          firstid:this.hotGoodsList[index].GoodsId,
          secondid:this.hotGoodsList[index+1].GoodsId
        }
        this.$util.post(this,this.$api.sortGoods,obj,()=>{
          let old1=this.hotGoodsList[index]
          let old2=this.hotGoodsList[index+1]
          this.hotGoodsList.splice(index,1,old2)
          this.hotGoodsList.splice(index+1,1,old1)
        },true)
      },
      close(e){
        console.log(e);
        this.showModal=e
      },
      //获取分类列表
      getTypeList :async function() {
        let json= await this.$http.post(this.$api.typeList, {type: 2});
        let data=json.data;
        if(data.isSuc==true){
          this.allTypeList=data.result;
          let shopId=data.result[0].UserId;
          let arr=[]
          data.result.forEach((item)=>{
            if(item.UserId==shopId){
              arr.push(item)
            }
          })
          this.typeList=arr
        }
      },
      getHotGoods(key=""){
          this.$util.post(this,this.$api.hotGoodsList,{keyword:key,pageIndex:1, pageSize:100},(data)=>{
            data.Items.forEach(item=>{
              item.hasChecked=false;
              item.isChecked=false
            })
            this.hotGoodsList=data.Items
          },true)
      },
      //获取商品列表
      // @param
      getGoodsList(p=0,c=0){
        this.$http.post(this.$api.goodsList,{ pageIndex:1, pageSize:10, goodTypeParentId:p, goodsTypeId:c}).then(json=>{
          let data=json.data;
          if(data.isSuc==true){
            let arr=[];
            data.result.Items.forEach(item=>{
              item.hasChecked=true;
              item.isChecked=false
            })
            this.goodsList=data.result.Items
          }
        })

      },
      //获取分组列表
      // getGroupList(shopId,re){
      //   this.$http.post(this.$api.waterGroupList,
      //     {pageindex:1,pagesize:10,userId:shopId}).then(json=>{
      //     if(json.data.isSuc==true){
      //       this.groupList=json.data.result.Items;
      //       if(re){
      //         console.log('re');
      //         this.UserId=this.groupList[0].UserId;
      //         let a=JSON.parse(JSON.stringify(this.groupList));
      //         let obj={sizeName:'',sizePrice:''};
      //         let obj2={valuePerson:[],groupList:a,shopValue:shopId,};
      //         // a.newPrice='';
      //         this.aSize.push(obj);
      //         this.aPeople.push(obj2)
      //       }
      //     }else{
      //       this.$message({
      //         message:'获取失败',
      //         icon:'error'
      //       })
      //     }
      //   })
      // },

    },
    mounted(){
      // this.getGroupList();
      this.getHotGoods();
      this.getTypeList();
      this.getGoodsList();
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin";
  //todo  设置选择框的宽度
  /deep/ .el-select--small{
    width: 100%;
  }
  /deep/ input{
    text-align: center;
  }
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .header{
    width: 1200px;
    height: 38px;
    margin-top: 10px;
    margin-bottom: 30px;
    .return{
      float: left;
      .base-btn-111;
      background: #282828;
      color:#fafafa;
      margin-right: 100px;

    }
    .new{
      float: left;
      .base-btn-111;
      margin-right: 30px;
    }
    .manage{
      float: left;
      .base-btn-111;
    }
    .del{
      .base-btn-111;
      float: right;
    }
  }
  .card{
    display: flex;
    flex-wrap: wrap;
  }


  /*弹窗*/
  .popup-slide-left{
    width: 350px;
    height: 100%;
    border-right: 1px solid #d8d8d8;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    .list-title{
      height:28px;
      font-size:20px;
      color:rgba(40,40,40,1);
      line-height:28px;
      text-align: left;
      margin-top: 41px;
      margin-left: 33px;
    }
    .list-btns{
      margin-top: 68px;
      text-align: center;
      margin-left: 30px;
        li{
          text-align: left;
          display: flex;
          justify-content: space-between;
          width: 276px;
          height: 48px;
          border-radius: 4px;
          background: @bs-color;
          align-items: center;
          font-size: 16px;
          i{
            font-weight: bold;
            display: inline-block;
            margin: 0 20px;
          }
        }
    }
  }
  .popup-slide-right{
    .card-select{
        width: 500px;
      margin-top: 137px;
      margin-left: 100px;
      display: flex;
      div:first-child{
        width: 80px;
        height: 40px;
        font-size: 16px;
        line-height: 40px;
      }
      .select{
          /deep/ input{
            /*width: 373px;*/
            /*height: 36px;*/
            text-align: center;
          }
          width: 383px!important;
        margin-left: 30px;
        /*text-align: center;*/
        input.el-input__inner{
          text-align: center!important;
        }
      }
    }
  }
  .scroll{
    width: 590px !important;
    margin-left: 100px;
    margin-top: 30px;
    height: 490px;
  }
  .scroll el-scrollbar_warp{
    overflow: hidden;
  }
  .card-border{
    width:489px;
    height:144px;
    background:rgba(255,255,255,1);
    margin-bottom: 30px;
    border-radius:8px;
    display: flex;
    justify-content: center;
    align-items: center;
    border:2px solid rgba(225,225,225,1);
    position: relative;
    .coupon-radio{
      width: 34px;
      height: 34px;
      position: absolute;
      top:55px;
      right: -17px;
      border-radius: 50%;
      border: 2px solid #ffd73a;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      .coupon-radio-point{
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #ffd73a;
      }
  }

  }
  .btn{
    .base-btn-111;
    margin-top: 30px;
  }

  .box {
    width: 1200px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
  }
  .disable{
    background: #E5E5E5 !important;
  }
  .coupon-radio {
    width: 21px;
    height: 21px;
    /*position: absolute;*/
    /*top:-17px;*/
    /*right: -17px;*/
    border-radius: 50%;
    border: 2px solid #ffd73a;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    .coupon-radio-point {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: #ffd73a;
    }
  }

  .header {
    width: 100%;
    height: 38px;
    /*margin-top: 60px;*/
    /*margin-bottom: 30px;*/
    .new {
      float: left;
      .base-btn-111;
      margin-right: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      /*margin-top: 30px;*/
      /*margin-bottom: 30px;*/
      img {
        width: 15px;
        height: 15px;
        margin-right: 10px;
      }
    }

    .manage {
      float: left;
      .base-btn-111;
    }
    .del {
      .base-btn-111;
    }
  }

  .choose-word {
    height: 21px;
    line-height: 21px;
  }

  .edit-btns {
    margin-bottom: 20px;
  }

  .edit-move, .edit-del {
    .base-btn-111;
    background: #e5e5e5;
  }

  .goods-btns {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .goods-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
    padding-top: 30px;
    justify-content: flex-start;
    /*column-count: 4;*/
    >div{
      margin-right: 60px;
    }
    >div:nth-child(5n+0){
      margin-right: 0;
    }
  }

  .goods-main {
    min-width: 835px;
    padding-right: 17px;
    overflow-y: visible;
    overflow-x: hidden;
  }

  .goods-list {
    margin-top: 30px;
    width: 1200px;
    .goods-card {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      width: 360px;
      height: 144px;
      position: relative;
      border-radius: 8px;
      border: 1px solid rgba(151, 151, 151, 1);
      img {
        width: 108px;
        height: 108px;
        margin-right: 30px;
      }
    }
    .price-old {
      line-height: 20px;
      text-decoration: line-through;
      color: #B4B4B4;
      font-size: 14px;
    }
    .price-new {
      font-size: 14px;
      color: #D0021B;
    }
    .circle{
      position: absolute;
      top:50px;
      background: #fff;
      right: -17px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      width: 34px;
      height: 34px;
      border: 2px solid @bs-color;
      .point{
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: @bs-color;
      }
    }

  }
  .base-btns{
    .base-btn(770px)
  }


</style>
