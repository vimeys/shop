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
            <div class="new"><img src="@/assets/images/icon/addBtn.png" alt="">新建服务</div>
            <div class="manage">批量管理</div>
            <div class="del">排序</div>
          </div>
          <ys-search></ys-search>
        </div>
        <el-row class="edit-btns">
          <el-col :span="6">
            <el-row>
              <el-col :span="4" :offset="8"><div class="coupon-radio" @click="choose" >
                <div class="coupon-radio-point" v-show="chosed"></div>
              </div></el-col>
              <el-col :span="4" class="choose-word">
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
          <el-col :span="4"  class="edit-move" ><div>移动</div></el-col>
          <el-col :span="4" class="edit-del" ><div>删除</div></el-col>
        </el-row>
        <div class="goods-list">
          <goods-card></goods-card>
          <goods-card></goods-card>
          <goods-card></goods-card>
          <goods-card></goods-card>
          <goods-card></goods-card>
        </div>
      </el-main>
      <el-aside width="288px" class="aside">
          <div class="aside-title" @click="addTypePopup">分类管理</div>
        <div>
          <el-tree :data="data"
                   :props="defaultProps"
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
      v-show="goods.showModal"
    >
      <div class="popup-slide-left">
        <div class="list-title">新建优惠券</div>
        <div class="list-btns">
          <ul>
            <li><i class="el-icon-document "></i><span class="after">服务属性</span><i class="el-icon-arrow-right"></i> </li>
            <li><i class="el-icon-document"></i>服务详情<i class="el-icon-arrow-right"></i> </li>
            <li class="list-tips">*为必填项</li>
          </ul>
        </div>
      </div>

      <div class="popup-slide-right">
        <el-scrollbar class="scroll">
          <div class="content">
            <div v-if="">

            </div>
          </div>
        </el-scrollbar>
        <div>
          <div class="btn">确认</div>
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
          <el-col :span="6" class="small-title" :offset="2"><h2>分类管理</h2></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-scrollbar class="type-scroll">
                <el-row class="type-row-col">
                  <el-col :span="10">
                    一级分类1
                  </el-col>
                  <el-col :span="12" :offset="2">
                    <div class="base-btn-111">修改</div>
                    <div class="base-btn-111">删除</div>
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
                          <el-col class="type-input"><input v-model="firstType" type="text" placeholder="请输入一级分类的名称" class="base-input"></el-col>

                          <el-col class="type-input" v-for="item in secondType"><input type="text" class="base-input" v-model="item.val" placeholder="请输入二级分类的名称"></el-col>
                          <el-col  >
                            <div class="base-btn type-input"  @click="addSecondType">增加二级分类</div>
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
                  <div class="type-add" @click="addFirstType">添加分类</div>
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
  import  goodsCard from '@/components/goodsCard';
  import  ysSearch from '@/components/search'
  import  ysPopup from '@/components/popup'
  import api from '@/assets/script/url'
  import {comfirm} from '@/assets/script/util'
    export default {
        name: "goodsList",
      components:{
          goodsCard,
        ysSearch,
        ysPopup
      },
      data(){
          return{
            goods:{
              showModal:false,
              width:900,
              height:800
            },
            type:{//控制分类
              showModal:false,
              width:670,
              height:670
            },
            chosed:false,
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

            defaultProps: {
              children: 'children',
              label: 'label'
            },
            secondType:[],//二级分类
            firstType:''//一级分类

          }
      },methods:{
          choose(){
            console.log(123);
          },

        handleNodeClick(data) {
          console.log(data);
        },
        //弹起添加分类
        addTypePopup(){
            this.type.showModal=true
        },
        //关闭添加分类
        closeTypePopup(){
          this.type.showModal=false
        },
        addSecondType(){
            this.secondType.push({Name:''})
        },
        addFirstType(){

        },
        //保存分类
        saveType(){
            let goodsType={
              name:this.firstType,
              Pic:'123213',
              ParentId:0,
              Type:1
            };
            let goodsTypeSecond=[];
            this.secondType.forEach((item)=>{
              let obj=Object.assign({Pic:'12312',Type:1},item)
                goodsTypeSecond.push({obj})
            })
            this.$http.post('/shop/'+api.addType,{goodsType,goodsTypeSecond}).then(json=>{
              console.log(json);
            })
        },
        getTypeList(){
            this.$http.post('/shop/'+api.typeList,{type:2}).then(json=>{
              console.log(json);
            })
        }

      },
      created(){
          this.getTypeList();
      }
    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";
  .box{
    width: 1200px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
  }

  .coupon-radio{
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
    .coupon-radio-point{
      width: 17px;
      height: 17px;
      border-radius: 50%;
      background: #ffd73a;
    }
  }

  .header{
    width: 100%;
    height: 38px;
    /*margin-top: 60px;*/
    /*margin-bottom: 30px;*/
    .new{
      float: left;
      .base-btn-111;
      margin-right: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      /*margin-top: 30px;*/
      /*margin-bottom: 30px;*/
      img{
        width: 15px;
        height: 15px;
        margin-right: 10px;
      }
    }

    .manage{
      float: left;
      .base-btn-111;
    }
    .del{
      .base-btn-111;
    }
  }
  .choose-word{
    height: 21px;
    line-height: 21px;
  }
  .edit-btns{
    margin-bottom: 20px;
  }
  .edit-move ,.edit-del{
    .base-btn-111;
    background: #e5e5e5;
    margin-left: 20px;
  }
  .goods-btns{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /*column-count: 4;*/
  }
  .goods-main{
      min-width:835px;
    padding-right: 17px;
    overflow-y: visible;
    overflow-x: hidden;
  }
  .aside{
    height: 800px;
    background: #f5f5f5;
    &-title{
      width: 222px;
      border-radius: 2px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-size: 12px;
      background: @bs-color;
      margin: 30px auto 20px;
    }
    &-tree{
      background: #f5f5f5;
    }
    /deep/ .el-tree-node__content{
      margin:  10px 0;
    }
    /deep/ .el-icon-caret-right{
      position: relative;
      left: 260px;
    }
  }
  //添加服务弹窗
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
        margin-top: 30px;
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
      .list-tips{
        color:red;
        background: #f5f5f5;
      }
    }
  }
  .popup-slide-right{
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
    .scroll{
      width: 100%;
      height: 700px;
    }
  }
  .btn{
    .base-btn-111;
    margin-top: 30px;
  }
//添加分类
  .small-title{
    margin-top: 30px
  }
  .type-box{
    width: 100%;
  }
  .type-scroll{
    height: 465px;
    margin-bottom: 10px;
    padding: 0 50px;
    background: rgba(245,245,245,1);
  }
  .type-row-col{
    width: 100%;
    height: 55px;
    background: rgba(225,225,225,1);
    line-height: 55px;
    /*background: rgba(2,2,0,1);*/
  }
  .type-btn-confirm{
    .base-btn(570px)
  }
  .base-btn-111{
    display: inline-block;
  }
  .type-add{
    width:189px;
    height:37px;
    background:rgba(253,215,49,1);
    border-radius:4px;
    line-height: 37px;
  }
  .base-btn{
    .base-btn(120px);
  }
  .type-input:first-child{
    margin-top: 15px;
  }
  .type-title{
    margin-top: 44px;
  }
  .type-input{
    margin-bottom: 15px;
  }
  .type-btn-save{
    .base-btn(445px)
  }
</style>
