/**
*   Created By  YS  on 2018/8/9
*   商品卡片
*/
<template>
    <div class="box">
        <div class="box-image"><img :src="src" alt="">
          <div class="coupon-radio" @click="choose" >
            <div class="coupon-radio-point"></div>
          </div>
        </div>
      <div class="box-content">
        <div class="name"> 小户型客厅布艺沙发 可拆 洗套装组合</div>
        <div class="main">
          <div class="price">
            <div class="price-old">原价：￥1200</div>
            <div class="price-new">现价：<span>￥120</span></div>
          </div>
          <div class="active-image">
            <img src="@/assets/images/icon/activeNum.png" alt=""></div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "goodsCard",
      data(){
          return{
            src:require('../assets/images/goods.jpg')
          }
      }
    }
</script>

<style lang='less' scoped>
    @import "~@/assets/style/mixin";
    .coupon-radio{
      width: 34px;
      height: 34px;
      position: absolute;
      top:-17px;
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
    .box{
      display: flex;
      flex-direction: column;
      .box-image{
        position: relative;
        width: 175px;
        height: 175px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .box-content{
        width: 175px;
        height: 175px;
        display: flex;
        flex-direction: column;
          .name{
            /*width: 100%;*/
            max-height: 40px;
            line-height: 20px;
            text-align: left;
            font-size: 13px;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical
          }
          .main{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price{
              height: 40px;
              .price-old{
                  line-height: 20px;
                text-decoration: line-through;
                color:#B4B4B4;
                font-size: 12px;
              }

            }
            .price-new{
                font-size: 12px;
              color:#222;
              span{
                color:#D0021B;
                font-size: 15px;
              }
            }
          }
        .active-image{
            width: 54px;
          height: 54px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
</style>
