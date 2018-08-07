<template>
  <div class="card">
    <div class="coupon-item-left">
      <img src="@/assets/images/Coupons-bgimg.png" alt="">
      <div class="coupon-item-left-text">
        <h1>¥{{card.price}}</h1>
        <h4>¥{{card.mPrice}}</h4>
      </div>
    </div>
    <div class="coupons-item-right">
      <div>
        <div>{{card.cardName}}</div>
        <div>{{card.shopName}}</div>
        <div>{{card.useName}}</div>
      </div>
      <div>
        库存: <span>{{card.storeName}}</span>涨
      </div>
      <div>
        {{card.start_time}}-{{card.end_time}}
      </div>
      <div class="reBtn" @click="reMake(card.id)">修改</div>
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
    props:{
      // 内容
      detail: {
        type: Object,
        default() {
          return {
            id: 1,
            price: 100,
            mPrice: 10,
            cardName: '满减劵',
            shopName: 'ATH眼镜店铺',
            useName: '一元买券',
            storeName: 200,
            start_time: '2018.06.18',
            end_time: '2018.06.20'
          }
        }
      },
      // 是否有选择框
      isChecke:{
        type:Boolean,
        default(){
            return false
        }
      }
    },
    data(){
      return{
        chosed:true,
        imgUr:'Coupons-bgimg.png',
        card:this.detail
      }
    },
    methods:{
      choose(){
        this.chosed=!this.chosed
        console.log(this.card);
      },
      //修改当前卡片
      reMake(id){
            this.$emit('reMake',id)
      }
    }
  }
</script>

<style lang="less" scoped>
  .card{
    margin-right: 30px;
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
      position: relative;
      .reBtn{
        position: absolute;
        top:48px;
        right: 24px;
        width:55px;
        height:28px;
        line-height: 28px;
        background:linear-gradient(180deg,rgba(252,220,131,1),rgba(248,182,76,1));
        border-radius:4px;
        color:#fff;
        font-size: 10px;
      }
      div:first-child{
        /*display: flex;*/
        display: -webkit-box;
        height: 28px;
        div:first-child{
          width: 51px;
          height: 24px;
          display: table;
          border: 1px solid #F8B74E;
          /*text-align: center !important;*/
          line-height: 24px;
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
