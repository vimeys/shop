/**
*   Created By  YS  on 2018/8/10
*   商品列表页面
*/
<template>
  <div class="box">
    <el-container>
      <el-main class="goods-main">
        <div class="goods-btns">
          <div class="header">
            <div class="new" :class="{'disable':disable}" @click="openGoods">
              <img src="@/assets/images/icon/addBtn.png" alt="">新建服务
            </div>
            <div class="manage" @click="manage">批量管理</div>
            <div class="del" :class="{'disable':disable}">排序</div>
          </div>
          <ys-search></ys-search>
        </div>
        <el-row class="edit-btns" v-if="disable">
          <el-col :span="6">
            <el-row>
              <el-col :span="4" :offset="8">
                <div class="coupon-radio" @click="chooseAll">
                  <div class="coupon-radio-point" v-show="allChoosed"></div>
                </div>
              </el-col>
              <el-col :span="4" class="choose-word" >
                全选
              </el-col>
            </el-row>

          </el-col>
          <el-col :span="10">
            移动至
            <el-select v-model="value" placeholder="请选择" size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4" class="edit-move">
            <div>移动</div>
          </el-col>
          <el-col :span="4" class="edit-del" @click="delGoods">
            <div>删除</div>
          </el-col>
        </el-row>
        <div class="goods-list">
          <template v-for="(item,index) in goodsList">
            <goods-card :detail="item" :index="index"></goods-card>
          </template>

          <!--<goods-card></goods-card>-->
          <!--<goods-card></goods-card>-->
          <!--<goods-card></goods-card>-->
          <!--<goods-card></goods-card>-->
        </div>
      </el-main>
      <el-aside width="289px" class="aside">
        <div class="aside-title" @click="addTypePopup">分类管理</div>
        <div>
          <el-tree :data="typeList"
                   :props="defaultProps"
                   accordion
                   @node-click="handleNodeClick"
                   class="aside-tree"
          >
          </el-tree>
        </div>
      </el-aside>
    </el-container>

    <!--/添加商品/-->
    <ys-popup
      :width="goods.width"
      :hieght="goods.height"
      @close="closeGoods"
      v-show="goods.showModal"
    >
      <div class="popup-slide-left">
        <div class="list-title">新建服务</div>
        <div class="list-btns">
          <ul>
            <li :class="[goodsItemClass1]" @click="chooseGoodsItem(1)">
              <i class="el-icon-document "></i>
              <span class="after">服务属性</span>
              <i class="el-icon-arrow-right"></i>
            </li>
            <li :class="[goodsItemClass2]" @click="chooseGoodsItem(2)" >
              <i class="el-icon-document"></i>
              服务详情
              <i class="el-icon-arrow-right"></i>
            </li>
            <li class="list-tips">*为必填项</li>
          </ul>
        </div>
      </div>

      <div class="popup-slide-right">
        <el-scrollbar class="scroll" v-if="goodsItemClass1">
          <div class="content">
            <div class="img-list" >
              <el-upload
                v-if="aPics.length<5"
                action="http://mdimg.yilianchuang.cn/uploadimage3.ashx"
                list-type="picture-card"
                :on-success="handlePictureSuccess"
                :limit="5"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
            <div class="page-size">{{aPics.length}}/5</div>
            <div content="goods-form">
              <el-row class="base-row">
                <el-col :span="4">上传到</el-col>
                <el-col :span="19">
                  <el-select v-model="valueFirstType"  @change="chooseFirstType" placeholder="分类" size="small">
                    <el-option
                      v-for="item in typeList"
                      :key="item.GoodsTypeId"
                      :label="item.Name"
                      :value="item.GoodsTypeId">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="1" class="before"></el-col>
              </el-row>
              <el-row class="base-row">
                <el-col :span="4"></el-col>
                <el-col :span="19" :offset="4">
                  <el-select v-model="valueSecondType" placeholder="二级分类" size="small">
                    <el-option
                      v-for="item in secondType"
                      :key="item.GoodsTypeId"
                      :label="item.Name"
                      :value="item.GoodsTypeId">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="1" class="before"></el-col>
              </el-row>
              <el-row class="base-row">
                <el-col :span="4">服务名称</el-col>
                <el-col :span="19" >
                  <input type="text" class="base-input" v-model="Name" placeholder="请输入服务名称，最多20字">
                </el-col>
                <el-col :span="1" class="before"></el-col>
              </el-row>
              <el-row class="base-row">
                <el-col :span="4">服务标签</el-col>
                <el-col :span="19" >
                  <el-select v-model="valueTips" placeholder="服务标签" size="small">
                    <el-option
                      v-for="item in goodsTips"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                </el-row>
              <el-row class="base-row" v-if="valueTips==3">
                <el-col :span="4">秒杀时长</el-col>
                <el-col :span="19" >
                  <el-select v-model="hoursValue"
                             placeholder="秒杀时长" size="small">
                    <el-option
                      v-for="(item,index) in hours"
                      :key="item.value"
                      :label="item.label"
                      :value="index">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="1" class="before"></el-col>
              </el-row>
              <el-row class="base-row">
                <el-col :span="4">原价</el-col>
                <el-col :span="19" >
                  <input type="text" class="base-input" placeholder="请输入服务原价">
                </el-col>
                <el-col :span="1" class="before"></el-col>
              </el-row>
              <el-row>
                <el-col :span="4">规格</el-col>
                <el-col :span="19">
                  <el-row class="small-row" v-for="item in [3]">
                      <el-col :span="14">
                        <el-select v-model="valueGroup" @change="chooseGroup" placeholder="员工分类" size="small">
                          <el-option
                            v-for="(item,index) in groupList"
                            :key="item.GroupId"
                            :label="item.GroupName"
                            :value="index">
                          </el-option>
                        </el-select>
                      </el-col>
                    <el-col :span="8" :offset="2">
                      <input type="text"  class="base-input" placeholder="请输入商品原价" v-model="item.price">
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="14">
                      · 根据不同岗位输入不同佣金
                    </el-col>
                    <el-col :span="8" :offset="2">
                      <span class="plus">+</span>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="1" class="before"></el-col>
              </el-row>
              <el-row class="mt15">
                <el-col :span="4">服务佣金</el-col>
                <el-col :span="19">
                  <el-row class="small-row" v-for="item in [3]">
                      <el-col :span="14">
                        <el-select v-model="valuePerson" placeholder="选择人员" size="small">
                          <el-option
                            v-for="item in personList"
                            :key="item.UserId"
                            :label="item.TrueName"
                            :value="item.UserId">
                          </el-option>
                        </el-select>
                      </el-col>
                    <el-col :span="8" :offset="2">
                      <input type="text" v-model="item.price" class="base-input" placeholder="请输入价格">
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="14">
                      · 根据不同岗位输入不同佣金
                    </el-col>
                    <el-col :span="8" :offset="2">
                      <span class="plus">+</span>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="1" class="before"></el-col>
              </el-row>
              <el-row class="mt15">
                <el-col :span="4">分销佣金</el-col>
                <el-col :span="19">
                  <el-row>
                    <el-col :span="11">
                      <input type="text " class="base-input" v-model.number="CommissionCharge" placeholder="请输入分享佣金">
                    </el-col>
                    <el-col :span="11" :offset="2">
                      <input type="text" class="base-input" v-model.number="ReceiveGuestCharge" placeholder="请输入获客佣金">
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="1" class="before"></el-col>
              </el-row>
            </div>
          </div>
        </el-scrollbar>
        <div class="goods-detail" v-else>
            <el-row class="base-row">
              <el-col :span="4" :offset="1">商品详情</el-col>
              <el-col :span="16" :offset="1"><input type="text " class="base-input" placeholder="请填写文章链接"></el-col>
            </el-row>
          <el-row class="base-row">
            <el-col :span="6" :offset="6">
              <div  class="base-btn-111 block">选择现有</div>
            </el-col>
            <el-col :span="6" :offset="2">
                <div class="base-btn-111 block">
                  创建
                </div>
            </el-col>
          </el-row>
          <el-row class="goods-detail-confirm">
            <el-col :offset="10" :span="4">
              <div class="base-btn-111" @click="confirmGoodsDetail">
                确定
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="btn" @click="addGoods" v-if="goodsItemClass1" >确认</div>
        </div>
        <!--<el-button type="text" @click="open5">点击打开 Message Box</el-button>-->
      </div>
    </ys-popup>

    <!--添加分类-->
    <ys-popup :width="type.width"
              :height="type.height"
              v-show="type.showModal"
              @close="closeTypePopup"
    >
      <div class="type-box">
        <el-row>
          <el-col :span="6" class="small-title" :offset="2">
            <h3>分类管理</h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-scrollbar class="type-scroll">
              <el-row class="type-row-col" v-for="(item,index) in typeList">
                <el-col :span="10">
                  {{item.Name}}
                </el-col>
                <el-col :span="12" :offset="2">
                  <div class="base-btn-111" @click="editType(index)">修改</div>
                  <div class="base-btn-111" @click="delType(index)">删除</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-container>
                    <el-aside width="100px">
                      <div class="type-title">
                        一级分类
                      </div>

                    </el-aside>
                    <el-main>
                      <el-row>
                        <el-col class="type-input">
                          <input v-model="firstType"
                                 type="text"
                                 placeholder="请输入一级分类的名称"
                                 class="base-input">
                        </el-col>

                        <el-col class="type-input" v-for="item in secondType">
                          <input type="text"
                                 class="base-input"
                                 v-model="item.Name"
                                 placeholder="请输入二级分类的名称">
                        </el-col>
                        <el-col>
                          <div class="base-btn type-input" @click="addSecondType">增加二级分类</div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col>
                          <div class="type-btn-save" @click="saveType">保存</div>
                        </el-col>
                      </el-row>
                    </el-main>
                  </el-container>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" :offset="9">
                  <!--<div class="type-add" @click="addFirstType">添加分类</div>-->
                </el-col>
              </el-row>
            </el-scrollbar>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="type-btn-confirm">确定</div>
          </el-col>
        </el-row>
      </div>

    </ys-popup>
  </div>

</template>

<script>
  import goodsCard from '@/components/goodsCard';
  import ysSearch from '@/components/search'
  import ysPopup from '@/components/popup'
  import api from '@/assets/script/url'
  import {comfirm} from '@/assets/script/util'

  export default {
    name: "goodsList",
    components: {
      goodsCard,
      ysSearch,
      ysPopup
    },
    data() {
      return {
        goods: {
          showModal: true,
          width: 900,
          height: 800
        },
        disable:false,//是否禁用
        allChoosed:false,
        type: {//控制分类
          showModal: false,
          width: 670,
          height: 670
        },
        chosed: false,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value: '',
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',

          }, {
            label: '二级 2-2',

          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',

          }, {
            label: '二级 3-2',

          }]
        }],
        valueTips:'',//特价商品
        goodsTips:[//商品标签
          {value:1,label:'特价'},
          {value:2,label:'爆款'},
          {value:3,label:'秒杀'},
          {value:4,label:'拼团'},
        ],
        hoursValue:1,
        hours:[
          {num:6 ,value:1,label:'6小时' },
          {num:12 ,value:2,label:'12小时'},
          {num:24 ,value:4,label:'24小时'},
          {num:48 ,value:8,label:'48小时'},
          {num:72 ,value:12,label:'72小时'},
        ],
        defaultProps: {
          children: 'ChildGoodsType',
          label: 'Name'
        },
        isEditType:false,//是否是修改
        isEditTypeNum:0,
        valueFirstType:'',//
        valueSecondType:'',
        secondType: [],//二级分类
        firstType: '',//一级分类
        typeList:'',//获取分类列表
        Name:'',//名称
        Price:'',//原价
        aPics:[],//图片数组
        shopList:[],//店铺列表
        currentShopId:'',//当前店铺
        groupList:'',//分组列表
        valueGroup:'',//员工分类'
        personList:'',//员工列表
        valuePerson:'',//单个员工
        CommissionCharge:'',//分享佣金
        ReceiveGuestCharge:'',//获客佣金
        sizeList:[],//规格列表
        moneyList:[],//人员佣金列表
        goodsItemClass1:'goods-active',//分类class
        goodsItemClass2:'',//分类class
        goodsList:[],//商品列表
      }
    }, methods: {
      choose() {
        console.log(123);
      },
      //批量管理
      manage(){
          if(this.disable){
            this.disable=false;
            this.goodsList.forEach(item=>{
              item.hasChecked=false
            })
          }else{
            this.disable=true
            this.goodsList.forEach(item=>{
              item.hasChecked=true
            })
          }
      },
      //全部选中
      chooseAll(){
          if(this.allChoosed){
            this.allChoosed=false
            this.goodsList.forEach(item=>{
              item.isChecked=false
            })
          }else {
            this.allChoosed=true;
            this.goodsList.forEach(item=>{
              item.isChecked=true
            })
          }
      },
      //打开商品弹窗
      openGoods(){
          this.goods.showModal=true
      },

      //关闭商品弹窗
      closeGoods(){
          this.goods.showModal=false;
      },
      //选择分类
      chooseGoodsItem(value){
          if(value==1){
            this.goodsItemClass1='goods-active';
            this.goodsItemClass2=''
          }else {
            this.goodsItemClass1='';
            this.goodsItemClass2='goods-active'
          }
      },
      //确认文章
      confirmGoodsDetail(){

      },
      // handleAvatarSuccess(res, file){
      //   console.log(file);
      //   // this.form.Pics=URL.createObjectURL(file.raw);
      //   if(this.Pic){
      //     this.Pic=file.response.url;
      //   }
      //   this.Pics=this.Pics.push(file.response.url);
      //
      // },
      //选择一级分类
      chooseFirstType(e ){
        let index1='';
        this.typeList.forEach((item,index)=>{
          console.log(item.GoodsTypeId);
          console.log(e);
          if(item.GoodsTypeId==e){
              index1=index
          }
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


      //生成新的服务
      addGoods(){
          let obj={
            Name:'测试商品',
            Pic:this.aPics[0],
            Pics:this.aPics.join(','),
            Price:'39',
            OriginalPrice:'39',
            TuwenArticleId:23,
            Description:'描述',
            Tags:'',
            Link:'',
            CommissionCharge:this.CommissionCharge,
            ReceiveGuestCharge:this.ReceiveGuestCharge,
            FlagId:this.valueTips,
            SecKillHour:this.hours[this.hoursValue],
            Type:2,

      };
          if(this.valueSecondType!=0){
            obj.GoodsTypeId=this.valueSecondType;
            obj.GoodsTypeParentId=this.valueFirstType;
          }

        let   goodsSpecList= [
            {

              Name: "名称",
              GroupId: 1,
              Price: 2.3
            }
            ];
         let  goodsGroup=[
            {
              GroupId: 1,
              Charge: 10.2,
              Name: ''
            }
            ];
          this.$http.post(this.$api.addGoods,{goods:obj,goodsSpecList,goodsGroup}).then(json=>{
            console.log(json);
          })
          // this.$http
      },

      //获取商品列表
      getGoodsList(){
          this.$http.post(this.$api.goodsList,{ pageIndex:1, pageSize:100, goodTypeParentId:0, goodsTypeId:0}).then(json=>{
            console.log(json);
            let data=json.data;
            if(data.isSuc==true){
              data.result.Items.forEach(item=>{
                item.hasChecked=false;
                item.isChecked=false
              })
              this.goodsList=data.result.Items
              }
          })
      },
      // 删除商品
      delGoods(){
        let delArr=[]
        if(this.ischoseAll){
          this.couponList.forEach(item=>{
            delArr.push(item.CouponBookId)
          })
        }else {
          this.couponList.forEach(item=>{
            if(item.ischosed){
              delArr.push(item.CouponBookId)
            }
          })
        }
      },
      handleNodeClick(data) {
        console.log(data);
      },
      //弹起添加分类
      addTypePopup() {
        this.type.showModal = true
      },
      //关闭添加分类
      closeTypePopup() {
        this.type.showModal = false
        this.isEditType=false
      },
      //点击添加二级分类框
      addSecondType() {
        this.secondType.push({Name: ''})
      },
      //点击添加一级分类框
      addFirstType() {

      },
      //点击修改
      editType(index){
          let data=this.typeList[index];
          this.firstType=data.Name;
          this.secondType=JSON.parse(JSON.stringify(data.ChildGoodsType));
          this.isEditType=true;
          this.isEditTypeNum=index
      },
      //删除一级分类
      delType(index){
        let id=this.typeList[index].GoodsTypeId
        this.$util.confirm(this).then(()=>{
            this.$http.post(this.$api.delType,{goodsTypeId:[id]}).then(json=>{
              console.log(json.data.isSuc);
            })
        })
      },
      //添加图片
      handlePictureSuccess(res,file){
        this.aPics.push(file.response.url);
      },
      //移除图片
      handleRemove(file,fileList){
        console.log(file, fileList);
        let index=this.aPics.indexOf(file)
        this.aPics.splice(index,1)
        console.log(this.aPics);
      },
      //保存分类
      saveType() {
        if(this.isEditType){
          let goodsType = {
            GoodsTypeId:this.typeList[this.isEditTypeNum].GoodsTypeId,
            Name: this.firstType,
            Pic: '',
          };
          let goodsTypeSecond = [];
          this.secondType.forEach((item,index) => {
            let obj={};
            obj.Name=item.Name;
            let child=this.typeList[this.isEditTypeNum].ChildGoodsType
            debugger
            if(index<child.length){
              goodsTypeSecond.push(Object.assign({Pic: '12312',GoodsTypeId:child[index].GoodsTypeId}, obj))
            }else{
              goodsTypeSecond.push(Object.assign({Pic: '12312',GoodsTypeId:0}, obj))
            }

          })
          console.log(goodsTypeSecond);
          this.$http.post(api.updataType, {goodsType, goodsTypeSecond}).then(json => {
            console.log(json);
            if(json.data.isSuc==true){
              this.getTypeList()
            }
          })
        }else{
          let goodsType = {
            Name: this.firstType,
            Pic: '123213',
            ParentId: 0,
            Type: 2
          };
          let goodsTypeSecond = [];
          this.secondType.forEach((item) => {
            // let obj = Object.assign({Pic: '12312', Type: 2}, item)
            let obj={};
            obj.Name=item.Name;
            goodsTypeSecond.push(Object.assign({Pic: '12312', Type: 2}, obj))
          })
          this.$http.post('/shop/' + api.addType, {goodsType, goodsTypeSecond}).then(json => {
            console.log(json);
          })
        }

      },

      // 选择分组
      chooseGroup(e){
          this.groupList[e].price=''
          this.personList=this.groupList[e].UsersList.Items;
          this.personList.forEach(item=>{
            item.price=''
          })
      },

      //获取分类列表
       getTypeList :async function() {
        let json= await this.$http.post(this.$api.typeList, {type: 2});
        let data=json.data;
        if(data.isSuc==true){
            this.typeList=data.result
        }
       },
      // 获取店铺列表
      getShopList(){
        this.$http.post(api.shopList,{}).then(json=>{
          let data=json.data
          if(data.isSuc==true){
            this.shopList=data.result;
            let firstShopId=data.result[0].UserShopId;
            this.currentShopId=firstShopId
            this.getGroupList(this.currentShopId)
            this.$message({
              message: '恭喜你，这是一条成功消息',
              type: 'warning'
            })
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      getGroupList(shopId){
        this.$http.post(this.$api.waterGroupList,
          {pageindex:1,pagesize:10,userShopId:shopId}).then(json=>{
          console.log(json);
          if(json.data.isSuc==true){
            this.groupList=json.data.result.Items;
          }
        })
      },
    },
    created() {
      this.getTypeList();
      this.getGoodsList();
      this.getShopList();
    }
  }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
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
    margin-left: 20px;
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
    justify-content: space-between;
    /*column-count: 4;*/
  }

  .goods-main {
    min-width: 835px;
    padding-right: 17px;
    overflow-y: visible;
    overflow-x: hidden;
  }

  .aside {
    height: 800px;
    background: #f5f5f5;
    &-title {
      width: 222px;
      border-radius: 2px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-size: 12px;
      background: @bs-color;
      margin: 30px auto 20px;
    }
    &-tree {
      background: #f5f5f5;
    }
    /deep/ .el-tree-node__content {
      margin: 10px 0;
    }
    /deep/ .el-icon-caret-right {
      position: relative;
      left: 260px;
    }
  }

  //添加服务弹窗
  /*弹窗*/
  .popup-slide-left {
    width: 350px;
    height: 100%;
    border-right: 1px solid #d8d8d8;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    .list-title {
      height: 28px;
      font-size: 20px;
      color: rgba(40, 40, 40, 1);
      line-height: 28px;
      text-align: left;
      margin-top: 41px;
      margin-left: 33px;
    }
    .list-btns {
      margin-top: 68px;
      text-align: center;
      margin-left: 30px;
      li {
        text-align: left;
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        width: 276px;
        height: 48px;
        border-radius: 4px;
        align-items: center;
        font-size: 16px;
        i {
          font-weight: bold;
          display: inline-block;
          margin: 0 20px;
        }
      }


      li.goods-active{
        background: @bs-color;
      }
      .list-tips {
        color: red;
        background: #f5f5f5;
      }
    }
  }

  .popup-slide-right {
    /*.card-select{*/
    /*width: 500px;*/
    /*margin-top: 137px;*/
    /*margin-left: 100px;*/
    /*display: flex;*/
    /*div:first-child{*/
    /*width: 80px;*/
    /*height: 40px;*/
    /*font-size: 16px;*/
    /*line-height: 40px;*/
    /*}*/
    /*.select{*/
    /*width: 383px!important;*/
    /*margin-left: 30px;*/
    /*/deep/ input{*/
    /*width: 383px;*/
    /*}*/
    /*}*/
    /*}*/

    //todo  设置选择框的宽度
    /deep/ .el-select--small{
      width: 100%;
    }
    /deep/ input{
      text-align: center;
    }
    .content{
      width: 500px;
      margin-left: 30px;
      .img-list{
        margin-top: 80px;
        display: flex;
        width: 100%;
        justify-content: center;
      }
      .page-size{
        margin-top: 30px;
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
      }

    }
    .goods-detail{
      width: 500px;
      margin-top: 100px;
    }
    .block{
      background: #282828;
      color: #fff;
    }
    .goods-detail-confirm{
      margin-top: 200px;
    }

    .scroll {
      width: 100%;
      height: 700px;
    }
  }

  .btn {
    .base-btn-111;
    margin-top: 30px;
  }

  //添加分类
  .small-title {
    margin-top: 30px
  }

  .type-box {
    width: 100%;
  }

  .type-scroll {
    height: 465px;
    margin-bottom: 10px;
    padding: 0 50px;
    background: rgba(245, 245, 245, 1);
  }

  .type-row-col {
    width: 100%;
    margin-bottom: 15px;
    height: 55px;
    background: rgba(225, 225, 225, 1);
    line-height: 55px;
    /*background: rgba(2,2,0,1);*/
  }

  .type-btn-confirm {
    .base-btn(570px)
  }

  .base-btn-111 {
    display: inline-block;
  }

  .type-add {
    width: 189px;
    height: 37px;
    margin-top: 30px;
    background: rgba(253, 215, 49, 1);
    border-radius: 4px;
    line-height: 37px;
  }

  .base-btn {
    .base-btn(120px);
  }

  .type-input:first-child {
    margin-top: 15px;
  }

  .type-title {
    margin-top: 44px;
  }

  .type-input {
    margin-bottom: 15px;
  }

  .type-btn-save {
    .base-btn(445px)
  }
</style>
