<template>
  <div>
    <div v-show="show" @back="back">
      <el-container>
        <el-header>
          <div class="active-header">
            <div class="disabled"><span class="el-icon-circle-plus"></span>&nbsp;&nbsp;新建活动</div>
            <div>管理</div>
            <div class="del">删除</div>
          </div>
        </el-header>
        <el-main class="main">
          <div class="active-items-one" @click="hrefCard(1)" :data="1">
            <img src="../../../../assets/images/active.png" alt="">
            <div class="active-text"> 测试文字sfasdfasdfsfas</div>
            <div class="active-radio" @click="choose" v-show="isChecke">
              <div class="active-radio-point" v-show="chosed"></div>
            </div>
          </div>
          <div class="active-items-s" @click="hrefCard(2)" :data="2">
            <img src="../../../../assets/images/active.png" alt="">
            <div class="active-text"> 测试文字爱的范fas</div>
            <div class="active-radio" @click="choose" v-show="isChecke">
              <div class="active-radio-point" v-show="chosed"></div>
            </div>
          </div>
          <div class="active-items-l" @click="hrefCard(3)" :data="3">
            <img src="../../../../assets/images/active.png" alt="">
            <div class="active-text"> 测试文字sfas</div>
            <div class="active-radio" @click="choose" v-show="isChecke">
              <div class="active-radio-point" v-show="chosed"></div>
            </div>
          </div>
        </el-main>
      </el-container>
      <div class="coupons-items">
        <div class="coupons-item">
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>

</template>

<script>
  import  ysCoupon from "@/components/coupon"
    export default {
        name: "activity",
      components:{
        ysCoupon
      },
      data(){
        return {
          chosed:false,
          isChecke:false,
          show:true
        }
      },
      methods:{
        choose(){
          this.chosed=!this.chosed
        },
        back(e){
          console.log(e);
        },
        //去到卡券列表
        hrefCard(e){
          this.show=!this.show
          this.$router.push({
              path:'/abc'
            })
        }
      }
    }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin";

  .active-header{
    display: flex;
    width: 1200px;
    height: 100px;
    justify-content: flex-start;
    align-items: center;
    div{
      width: 111px;
      height: 37px;
      background: #FFD736;
      font-size: 14px;
      line-height: 37px;
      text-align: center;
      margin-right: 30px;
    }
    .disabled{
      background: #E5E5E5;
    }
    .del{
      /*float: right;*/
      margin-left: 750px;
    }
  }
  .main{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .active-items-one{
    width:375px;
    height: 175px;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .active-radio{
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
      .active-radio-point{
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #ffd73a;
      }
    }
    .active-text{
      width: 180px;
      height: 16px;
      text-align: center;
      line-height: 16px;
      font-size: 12px;
      color:#fff;
      position: absolute;
      top:113px;
      left: 30px;
    }
  }
  .active-items-s{
    width:375px;
    height: 175px;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .active-radio{
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
      .active-radio-point{
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #ffd73a;
      }
    }
    .active-text{
      width: 180px;
      height: 16px;
      text-align: center;
      line-height: 16px;
      font-size: 12px;
      background: #f99a28;
      color:#fafafa;
      position: absolute;
      top:140px;
      left: 109px;
    }
  }
  .active-items-l{
    width:375px;
    height: 175px;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .active-radio{
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
      .active-radio-point{
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #ffd73a;
      }
    }
    .active-text{
      width: 180px;
      height: 16px;
      text-align: center;
      line-height: 16px;
      font-size: 12px;
      position: absolute;
      top:110px;
      left: 210px;
    }
  }
</style>
