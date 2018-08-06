<template>
    <div class="card">
      <div class="coupon-item-left">
        <!--<img src="@/assets/images/Compons-bgimg.png" alt="">-->
        <div class="coupon-item-left-text">
          <h1>¥10</h1>
          <h4>¥10</h4>
        </div>
      </div>
      <div class="coupons-item-right">
        <div>
          <div>满减劵</div>
          <div>ATH眼镜店铺</div>
          <div>一元买券</div>
        </div>
        <div>
          库存: <span>200</span>涨
        </div>
        <div>
          2018.06.18-2018.06.20
        </div>
        <div>
          <div>
            <span>详细信息</span>
            <span class="el-icon-arrow-down"></span>
          </div>
          <div class="" style="display: none">
            相信信息相信信息相信信息相信信息相信信息相信信息相信信息相信信息相信信息相信信息相信信息
          </div>
        </div>
      </div>
      <div class="coupon-radio" @click="choose" v-show="isChecke">
        <div class="coupon-radio-point" v-show="chosed"></div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "coupon",
      data(){
          return{
            chosed:true,
        isChecke:true,
            imgUr:'Coupons-bgimg.png'
          }
      },
      methods:{
        choose(){
          this.chosed=!this.chosed
        },

      }
    }
</script>

<style lang="less" scoped>
  .card{
    position: relative;
      width: 360px;
      height: 108px;
    display: flex;
    flex-direction: row;
    .coupon-item-left{
      width: 96px;
      height: 100%;
      position: relative;
      img{
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      .coupon-item-left-text{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: absolute;
        top:0;
        left: 0;
        h1{
          margin-top: 26px;
          color:#fff;
          margin-bottom: -1px;
        }
        h4{
          color:#fff;
          text-align: center;
        }
      }

    }
    .coupons-item-right{
      display: flex;
      flex: 1;
      flex-direction: column;
      box-sizing: border-box;
      padding: 5px 20px;
      div:first-child{
        display: flex;
        div:first-child{
          width: 51px;
          height: 20px;
          border: 1px solid #F8B74E;
          text-align: center !important;
          line-height: 20px;
          font-size: 12px;
          color: #F8B74E;
        }
        div:nth-child(2){
          color: #4A4A4A;
          font-size: 13px;
          margin-left: 10px;

        }
        div:last-child{
          color:#888888;
          font-size: 12px;
          margin-left: 20px;
        }
      }
      div:nth-child(2){
        height: 25px;
        text-align: left;
        line-height: 30px;
        font-size: 12px;
        color:#888888;
        span{
          color:#F8B74E;
        }
      }
      div:nth-child(3){
        height: 25px;
        text-align: left;
        line-height: 30px;
        font-size: 12px;
        color:#888888;
      }

      >div:last-child {
        div{
          padding-top: 2px;
          border-top: 1px solid #888;
          display: flex;
          justify-content: space-between;
          span{
            display: inline-block;
            line-height: 30px;
          }
        }
        height: 30px;
        line-height: 30px;
      }
    }
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
  }
</style>
