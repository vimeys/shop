/**
*   Created By  YS  on 2018/8/9
*   商品卡片
*/
<template>
  <div class="item">
    <div class="box-image">
      <img class="box-images" :src="detail.Pic" alt="">
      <div v-show="noneBtn">
        <div class="box-btns" v-if="one">
          <div class="box-btns-edit" @click="edit">编辑服务</div>
          <div class="box-btns-del" @click="del"> 删除服务</div>
        </div>
        <div class="box-btns" v-else>
          <div class="box-btns-edit" @click="check">查看评价</div>
        </div>
      </div>

      <div class="coupon-radio" @click="choose(index)" v-show="detail.hasChecked">
        <div class="coupon-radio-point" v-show="detail.isChecked"></div>
      </div>
    </div>
    <div class="box-content">
      <div class="name"> {{detail.Name}}</div>
      <div class="main">
        <div class="price">
          <div class="price-old">原价：￥{{detail.Price}}</div>
          <div class="price-new">现价：<span>￥{{discountPrice||0}}</span></div>
        </div>
        <div class="active-image">
          <img v-if="detail.FlagId==1" src="@/assets/images/icon/activeNum.png" alt="">
          <img v-else-if="detail.FlagId==2" src="@/assets/images/icon/activePrice.png" alt="">
          <img v-else-if="detail.FlagId==3" src="@/assets/images/icon/activeTime.png" alt="">
          <img v-else src="@/assets/images/icon/activeTeam.png" alt="">
        </div>
      </div>
    </div>
    <div class="move" v-if="isSort">
      <img @click="up" src="@/assets/images/icon/leftArrow.png" alt="">
      <img @click="down" src="@/assets/images/icon/rightArrow.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "goodsCard",
    props: {
      index: Number,
      noneBtn:{
        type:Boolean,
        default(){
         return true
        }
      },
      one: {
        type: Boolean,
        default() {
          return true
        }
      },
      detail: {
        type: Object,
        default() {
          return {}
        }
      },
      isSort: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        src: require('../assets/images/goods.jpg'),
        chosed: true
      }
    },
    methods: {
      choose(index) {
        this.$emit('chooseCurrent', index, !this.detail.isChecked)
      },

      edit() {
        this.$emit('editGoods', this.detail.GoodsId, this.index)
      },
      del() {
        this.$emit('delGoods', this.detail.GoodsId, this.index)
      },
      //查看详情
      check() {
        this.$emit('check', index,)
      },
      up(index) {
        console.log(123);
        this.$emit('up', this.index)
      },
      down(index) {
        this.$emit("down", this.index)
      }
    },
    computed: {
      discountPrice() {
        try {
          let aPrice = this.detail.SpecList;
          let a = []
          aPrice.forEach(item => {
            a.push(item.Price)
          })

          function s(a, b) {
            return a - b
          }

          a.sort(s)
          return a[0]
        } catch (e) {
          console.log(e);
        }
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
    .item{
      position: relative;
      display: flex;
      flex-direction: column;
      margin-right: 20px;
      .box-image{
        position: relative;
        width: 175px;
        height: 175px;
        .box-btns{
          width: 100%;
          height: 100%;
          position: absolute;
          top:0;
          left: 0;
          background:rgba(60,60,60,0.5);
          /*display: flex;*/
          flex-direction: column;
          justify-content: center;
          align-items: center;
          /*display: none;*/
          opacity: 0;
        }
        .box-btns-edit,.box-btns-del{
          width: 82px;
          height: 26px;
          background: @bs-color;
          font-size: 12px;
          line-height: 26px;
          text-align: center;
          border-radius: 4px;
          cursor: pointer;
          margin: 15px;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
      .box-image:hover .box-btns{
          display: flex;
        opacity: 1;
        transition: all .3s ease-in;
      }
      .box-content{
        width: 175px;
        height: 105px;
        display: flex;
        margin-top: 5px;
        flex-direction: column;
          .name{
            /*width: 100%;*/
            max-height: 40px;
            line-height: 20px;
            text-align: left;
            font-size: 13px;
            font-weight: 400;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical
          }
        .main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price {
            height: 40px;
            .price-old {
              line-height: 20px;
              text-decoration: line-through;
              color: #B4B4B4;
              font-size: 12px;
              text-align: left;
            }

          }
          .price-new {
            font-size: 12px;
            color: #222;
            font-weight: 500;
            span {
              color: #D0021B;
              font-size: 15px;
              text-align: left;
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

    .move{
        z-index: 10000;
      position: absolute;
      top:0;
      left: 0;
      width: 175px;
      height: 250px;
      background: rgba(60,60,60,0.5);
      display: none;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 10px;
      opacity: 0;
    }
    .item:hover .move{
      display: flex;
      opacity: 1;
      transition: all 1.3s ease-in;
    }
</style>
