  <!--卡券列表-->
<template>
  <div>
    <div class="header">
      <div class="return" @click="goback" >返回</div>
      <div class="new">新建优惠券</div>
      <div class="manage">管理</div>
      <div class="del">删除</div>
    </div>
    <div class="card">
      <!--<template v-for="item in list">-->
        <!--<ys-card-->
          <!--:detail="item"-->
          <!--@reMake="reMake"-->
          <!--:marginBottom="60"-->
        <!--&gt;-->
        <!--</ys-card>-->
      <!--</template>-->
    </div>
    <ys-goods-card></ys-goods-card>
    <ys-popup :showModal="showModal"
              v-show="showModal"
              @close="close"
    >
      <div class="popup-slide-left">
        <div class="list-title">新建优惠券</div>
        <div class="list-btns">
          <ul>
            <li><i class="el-icon-document"></i>活动详情<i class="el-icon-arrow-right"></i> </li>
          </ul>
        </div>

      </div>
      <div class="popup-slide-right">
        <div class="content">
            <div class="card-select">
              <div>优惠券分类</div>
              <div>
                <el-select v-model="value" @change="change" placeholder="满减券" class="select">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
                </el-select>
              </div>
            </div>
          <div class="cards">

            <div>
              <el-scrollbar class="scroll">
                <div class="card-border">
                  <ys-card ></ys-card>
                  <div class="coupon-radio"  >
                    <div class="coupon-radio-point" ></div>
                  </div>
                </div>
                <div class="card-border">
                  <ys-card ></ys-card>
                  <div class="coupon-radio"  >
                    <div class="coupon-radio-point" ></div>
                  </div>
                </div>
                <div class="card-border">
                  <ys-card ></ys-card>
                  <div class="coupon-radio"  >
                    <div class="coupon-radio-point" ></div>
                  </div>
                </div>
                <div class="card-border">
                  <ys-card ></ys-card>
                  <div class="coupon-radio"  >
                    <div class="coupon-radio-point" ></div>
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </div>
          <div>
            <div class="btn">确认</div>
          </div>
        </div>

      <!--<el-button type="text" @click="open5">点击打开 Message Box</el-button>-->
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
          show:false,
          showModal:false,//显示弹窗
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
          list:[
            {
              id:1,
              price:100,
              mPrice:10,
              cardName:'满减劵',
              shopName:'ATH眼镜店铺',
              useName:'一元买券',
              storeName:200,
              start_time:'2018.06.18',
              end_time:'2018.06.20'
            },
            {
              id:2,
              price:1020,
              mPrice:103,
              cardName:'满减劵',
              shopName:'ATH眼镜店铺',
              useName:'一元买券',
              storeName:200,
              start_time:'2018.06.18',
              end_time:'2018.06.20'
            },
            {
              id:3,
              price:1020,
              mPrice:103,
              cardName:'满减劵',
              shopName:'ATH眼镜店铺',
              useName:'一元买券',
              storeName:200,
              start_time:'2018.06.18',
              end_time:'2018.06.20'
            },
            {
              id:3,
              price:1020,
              mPrice:103,
              cardName:'满减劵',
              shopName:'ATH眼镜店铺',
              useName:'一元买券',
              storeName:200,
              start_time:'2018.06.18',
              end_time:'2018.06.20'
            },
          ]
        }
    },
    methods:{
      goback(){
        this.$router.go(-1)
          this.$emit('back',this.show)
      },
      reMake(e){
        console.log(e);
        this.showModal=!this.showModal
        console.log(this.showModal);
      },
      close(e){
        console.log(e);
        this.showModal=e
      },
      open5() {
        this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
          dangerouslyUseHTMLString: true
        });
      },
      change(e){
        console.log(e);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin";

  .header{
    width: 1200px;
    height: 38px;
    margin-top: 60px;
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

</style>
