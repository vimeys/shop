<template>
  <div class="card" :style="[{marginBottom: marginBottom+'px'},{marginTop:marginTop+'px'}]">
    <div class="coupon-item-left">
      <img v-if="card.Type==1" src="@/assets/images/Coupons-bgimg.png" alt="">
      <img v-else-if="card.Type==2" src="@/assets/images/card02.png" alt="">
      <img  v-else src="@/assets/images/card03.png" alt="">
      <div v-if="card.Type==1" class="coupon-item-left-text">
        <h1>¥{{card.DiscountAmount}}</h1>
        <h5>满{{card.Amount||'无'}}可用</h5>
      </div>
      <div v-else-if="card.Type==2" class="coupon-item-left-text">
        <h1>{{card.DiscountAmount||'无'}}折</h1>
        <h5>满{{card.Amount||'无'}}可用</h5>
      </div>
      <div v-else class="coupon-item-left-text">
        <h1>¥{{card.Amount}}</h1>
        <h5>任意金额可用</h5>
      </div>

    </div>
    <div class="coupons-item-right" :class="{'hasBorder':hasBorder}">
      <div>
        <div v-if="card.Type==1">{{Type}}</div>
        <div class="card02" v-else-if="card.Type==2">{{Type}}</div>
        <div class="card03" v-else="card.Type==3">{{Type}}</div>
        <!--<div>{{card.Name}}</div>-->
        <div style="margin-left: 120px">{{useName}}</div>
      </div>
      <div>
        库存:
        <span v-if="card.Type==1">{{card.Number}}</span>
        <span class="card02" v-else-if="card.Type==2">{{card.Number}}</span>
        <span class="card03" v-else="card.Type==3">{{card.Number}}</span>
        张
      </div>
      <div>
        {{StartTime}}
      </div>
        <div v-show="isShowEdit" class="reBtn" v-if="card.Type==1"  @click="reMake(index)">修改</div>
        <div v-show="isShowEdit" class="reBtn reBtn02" v-else-if="card.Type==2"  @click="reMake(index)">修改</div>
        <div v-show="isShowEdit" class="reBtn reBtn03" v-else="card.Type==3"  @click="reMake(index)">修改</div>

      <div>
        <div>
          <span>详细信息</span>
          <!--<span class="el-icon-arrow-down"-->
                <!--:class="{'el-icon-arrow-up':toggleData}"-->
                <!--@click="toggle">-->
          <!--</span>-->
          <el-popover
            placement="top"
            width="200"
            trigger="click"
            :content="card.Details">
            <span class="el-icon-arrow-down"
                 slot="reference"
                  @click="toggle"
                  :class="{'el-icon-arrow-up':toggleData}">
          </span>
          </el-popover>


        </div>
        <!--<div class="coupon-detail"-->
             <!--style="border-top: none;padding-right: 20px;background: #fff"-->
             <!--v-show="toggleData">-->
            <!--{{card.Details}}-->
        <!--</div>-->
      </div>
    </div>
    <div class="coupon-radio" @click="choose(index)" v-show="card.hasChecke">
      <div class="coupon-radio-point" v-show="card.ischosed"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "coupon",
    props: {
      // 内容
      detail: {
        type: Object,
        default() {
          return {
            Type: 2,
            id: 1,
            reBtn03: {
              reBtn03: true
            },
            price: 100,
            mPrice: 10,
            cardName: '满减劵',
            Name: 'ATH眼镜店铺',
            useName: '一元买券',
            storeName: 200,
            StartTime1: '2018.06.18',
            EndTime: '2018.06.20'
          }
        }
      },
      //是否有边框
      hasBorder:{
        type:Boolean,
        default(){
          return false
        }
    },
      index: Number,
      //是否显示修改按钮
      isShowEdit:{
        type:Boolean,
        default(){
          return true
        }
      },
      // 是否有选择框
      hasChecke: {
        type: Boolean,
        default() {
          return false
        }
      },
      marginBottom: {
        type: Number,
        default() {
          return 0
        }
      },
      marginTop: {
        type: Number,
        default() {
          return 0
        }
      },
      ischosed: {
        type: Boolean,
        default() {
          return false
        }
      }
    },

    data() {
      return {
        imgUr: 'Coupons-bgimg.png',
        selfischosed:this.detail.ischosed,
        card: this.detail,
        CardType:this.detail.Type,
        abb:true,
        toggleData:false
      }
    },
    methods:{
      choose(index){
        this.selfischosed=!this.selfischosed
        console.log(this.card);
          this.$emit('choose',index)
      },
      //修改当前卡片
      reMake(index){
        console.log(this.card);
        console.log(this.detail);
        this.$emit('reMake',index)
      },
      toggle(){
          this.toggleData=!this.toggleData
      }
    },
    computed:{
      useName(){
        let Name='';
        switch (this.detail.SourceType) {
          case 3:
            Name='一元买卷';
            break;
          case 4:
            Name='刮卡';
            break;
          case 6 :
            Name='集赞';
            break;
          case  7:
            Name='幸运大抽奖';
            break;
        }
        return Name
      },
      Type(){
        let Name='';
        switch (this.detail.Type) {
          case 1:
            Name='满减卷';
            break;
          case 2:
            Name='折扣券';
            break;
          case 3 :
            Name='现金券';
            break;
        }
        return Name
      },
      StartTime(){
        let date=new Date(parseInt(this.detail.StartTime))
        var Y = date.getFullYear() + '.';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
        var D = date.getDate();
        let date1=new Date(parseInt(this.detail.EndTime));
    var Y2 = date1.getFullYear() + '.';
        var M2 = (date1.getMonth()+1 < 10 ? '0'+(date1.getMonth()+1) : date1.getMonth()+1) + '.';
        var D2 = date1.getDate();
        return Y+M+D+'-'+Y2+M2+D2;
      }
    },
    watch:{
      detail(){
        this.card=this.detail
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
    margin-bottom: 60px;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    background: #fff;
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
        h5{
          color:#fff;
          text-align: center;
        }
      }
    }
    .coupons-item-right{
      border: 1px #fff solid;
      display: flex;
      flex: 1;
      flex-direction: column;
      box-sizing: border-box;
      padding: 5px 20px;
      position: relative;
      .reBtn{
        position: absolute;
        text-align: center;
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
      .reBtn02{
        background:#ED3269;
      }
      .reBtn03{
        background: #343C44;
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
        div.card02{
          border: 1px solid #ED3269;
          color:#ED3269;
        }
        div.card03{
          border: 1px solid #343C44;
          color:#343C44;
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
        span.card02{
          color:#ED3269;
        }
        span.card03{
          color:#343C44;
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
    .hasBorder{
      border: 1px solid #d8d8d8;
      border-left: 1px solid #fff;
    }
    .coupon-detail{
      width: 360px;
      min-height: 30px;
      max-height: 90px;
      position:absolute;
      top:108px;
      left: -94px;
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
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #ffd73a;
      }
    }
  }
</style>
