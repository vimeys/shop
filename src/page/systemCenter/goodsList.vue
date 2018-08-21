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
          <div class="aside-title">分类管理</div>
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
      :pWidth="goods.width"
      :pHieght="goods.height"
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
  </div>

</template>

<script>
  import  goodsCard from '@/components/goodsCard';
  import  ysSearch from '@/components/search'
  import  ysPopup from '@/components/popup'
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
              showModal:true,
              width:900,
              height:800
            },
            chosed:false,
            options: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
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
            }
          }
      },methods:{
          choose(){
            console.log(123);
          },
        handleNodeClick(data) {
          console.log(data);
        }
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

</style>
