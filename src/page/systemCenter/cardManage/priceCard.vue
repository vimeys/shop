/**
*   Created By  YS  on 2018/8/8
*/
<template>
        <div class="box">
            <el-container>
              <el-header>
                <div class="active-header">
                  <div class="disabled"><span class="el-icon-circle-plus"></span>&nbsp;&nbsp;新建活动</div>
                  <div @click="addCard">管理</div>
                  <div class="del">删除</div>
                </div>
              </el-header>
              <el-main class="card-list">
                <div class="cards">
                  <ys-coupon></ys-coupon>
                  <ys-coupon></ys-coupon>
                  <!--<ys-coupon></ys-coupon>-->
                  <!--<ys-coupon></ys-coupon>-->
                  <!--<ys-coupon></ys-coupon>-->
                  <!--<ys-coupon></ys-coupon>-->
                  <!--<ys-coupon></ys-coupon>-->
                </div>

              </el-main>
            </el-container>
          <!--<ys-goods-card></ys-goods-card>-->
          <ys-popup
            :width="pWidth"
            :height="pHeight"
            v-show="showModal"
            @close="close"
          >
                <div class="form">
                  <el-row >
                    <el-col :span="6"><h3>修改优惠券</h3></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6" class="base-font">
                      优惠券类型
                    </el-col>
                    <el-col :span="17">
                        <el-select v-model="type" placeholder="请选择" size="small">
                          <el-option
                            v-for="item in options"
                            :key ='item'
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1" class="before" ></el-col>
                  </el-row>
                  <el-row class="row">
                    <el-col :span="6">
                      下放渠道
                    </el-col>
                    <el-col :span="17">
                      <el-select v-model="type" placeholder="请选择" size="small">
                        <el-option
                          v-for="item in options"
                          :key ='item'
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="1" class="before">

                    </el-col>
                  </el-row>
                  <el-row class="row">
                    <el-col :span="6">
                      下放数量
                    </el-col>
                    <el-col :span="17">
                      <input type="text" class="base-input">
                    </el-col>
                    <el-col :span="1" class="before">
                    </el-col>
                  </el-row>
                  <el-row class="row">
                    <el-col :span="6">
                      有效期限
                    </el-col>
                    <el-col :span="17">
                      <!--<el-time-picker-->
                        <!--is-range-->
                        <!--v-model="value4"-->
                        <!--editable-->
                        <!--range-separator="-"-->
                        <!--start-placeholder="开始时间"-->
                        <!--end-placeholder="结束时间"-->
                        <!--placeholder="选择时间范围">-->
                      <!--</el-time-picker>-->
                      <el-date-picker
                        v-model="value6"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </el-col>
                    <el-col :span="1" class="before">
                    </el-col>
                  </el-row>
                  <el-row class="row">
                    <el-col :span="6">
                      优惠券设置
                    </el-col>
                    <el-col :span="17" v-if="type==3">
                      <input type="text" placeholder="输入金额" class="base-input">
                    </el-col>
                    <el-col :span="17" v-else>
                      满 <input type="text" placeholder="输入金额" class="small-input">
                      减 <input type="text" placeholder="输入金额" class="small-input" v-if="type==1">
                      <input type="text" placeholder="输入1-10折" class="small-input" v-else-if="type==2">
                    </el-col>
                    <el-col :span="1" class="before">
                    </el-col>
                  </el-row>
                  <el-row class="row">
                    <el-col :span="6">
                      详细信息
                    </el-col>
                    <el-col :span="17">
                      <textarea name="" id="" class="textarea" placeholder="请输入优惠券的详细信息"></textarea>
                    </el-col>
                    <el-col :span="1" class="before">
                    </el-col>
                  </el-row>
                  <el-row class="row">
                    <el-col>
                      <div class="form-btn">
                          确定
                      </div>
                    </el-col>
                  </el-row>

                </div>
          </ys-popup>
        </div>
</template>

<script>
  import ysCoupon from '@/components/coupon'
  import ysGoodsCard from "@/components/goodsCard"
  import  ysPopup from '@/components/popup'
    export default {
        name: "priceCard",
      components:{
          ysCoupon,
        ysGoodsCard,
        ysPopup
      },
      data(){
          return{
            pWidth:550,
            pHeight:680,
            showModal:true,
            type:'1',//优惠券类型
            value5: [new Date(2018, 9, 10, 8, 40), new Date(2018, 9, 10, 9, 40)],
            options: [{
              value: '1',
              label: '满减劵'
            }, {
              value: '2',
              label: '折扣券'
            }, {
              value: '3',
              label: '现金券'
            }
            ],
          }
      },methods:{
        addCard(){
          this.showModal=true
        },
        close(){
          this.showModal=false
        }
      }
    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";
  .box{
    width: 1200px;
  }
  .active-header {
    display: flex;
    width: 1200px;
    height: 100px;
    justify-content: flex-start;
    align-items: center;
    div {
      width: 111px;
      height: 37px;
      background: #FFD736;
      font-size: 14px;
      line-height: 37px;
      text-align: center;
      margin-right: 30px;
    }
    .disabled {
      background: #E5E5E5;
    }
    .del {
      /*float: right;*/
      margin-left: 750px;
    }
  }
  .cards{
    display: flex;
    width: 1200px;
    flex-wrap: wrap;
  }
  .card-list{
    height: 1000px;
  }
  .form{
    width: 100%;
    padding: 50px;
    .row{
      margin: 30px 0;
    }
    .small-input{
      width:125px;
      height:36px;
      background:rgba(229,229,229,1);
      box-shadow:0px 1px 3px 0px rgba(187,187,187,0.5);
      border-radius:4px;
      border: none;
    }
    .textarea{
      width:313px;
      height:143px;
      background:rgba(229,229,229,1);
      box-shadow:0px 1px 3px 0px rgba(187,187,187,0.5);
      border-radius:4px;
      border: none;
    }
    .form-btn{
      .base-btn(111px);
    }
  }
</style>
