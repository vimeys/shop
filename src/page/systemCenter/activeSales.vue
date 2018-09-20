/**
*   Created By  YS  on 2018/8/22
*/
<template>
      <div class="box-sale">

              <el-row :gutter="50"  class="base-row-36">
                <el-col :span="8"  class="">
                  <div class="sale-card">
                    <el-row>
                      <el-col :span="6">拆红包</el-col>
                      <el-col :span="4" :offset="14">
                        <el-switch
                          v-model="valueRedPack"
                          active-color="#FFD736"
                          @change="closeRedPack"
                          inactive-color="#E5E5E5">
                        </el-switch>
                      </el-col>
                    </el-row>
                    <el-row v-if="valueRedPack" class="base-row-36">
                      <el-col :span="6">
                        红包金额
                      </el-col>
                      <el-col :span="16">
                        <input type="text" v-model.number="moneyValue" class="base-input" placeholder="">
                      </el-col>
                    </el-row>
                    <el-row v-if="valueRedPack" class="base-row-36">
                      <el-col :span="20" :offset="1"><div class="btn" @click="comfirmRedPack">确定</div></el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="8"  class="">
                  <div class="sale-card">
                    <el-row>
                      <el-col :span="6">刮卡</el-col>
                      <el-col :span="4" :offset="14">
                        <el-switch
                          v-model="value2"
                          active-color="#FFD736"
                          inactive-color="#E5E5E5">
                        </el-switch>
                      </el-col>
                    </el-row>
                    <el-row v-if="value2" class="base-row-36">
                      <el-col :span="6">
                        红包金额
                      </el-col>
                      <el-col :span="16">
                        <input type="text" v-model.number="moneyValue" class="base-input" placeholder="">
                      </el-col>
                    </el-row>
                    <el-row v-if="value2" class="base-row-36">
                      <el-col :span="20" :offset="1"><div class="btn" @click="comfirm">确定</div></el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="8"  class="">
                  <div class="sale-card">
                    <el-row>
                      <el-col :span="6">支付立减</el-col>
                      <el-col :span="4" :offset="14">
                        <el-switch
                          v-model="value2"
                          active-color="#FFD736"
                          inactive-color="#E5E5E5">
                        </el-switch>
                      </el-col>
                    </el-row>
                    <el-row v-if="value2" class="base-row-36">
                      <el-col :span="6">
                        红包金额
                      </el-col>
                      <el-col :span="16">
                        <input type="text" v-model.number="moneyValue" class="base-input" placeholder="">
                      </el-col>
                    </el-row>
                    <el-row v-if="value2" class="base-row-36">
                      <el-col :span="20" :offset="1"><div class="btn" @click="comfirmRedPack">确定</div></el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="50"  class="base-row-36">
                <el-col :span="8"  class="">
                  <div class="sale-card">
                    <el-row>
                      <el-col :span="6">集赞</el-col>
                      <el-col :span="4" :offset="14">
                        <el-switch
                          v-model="value2"
                          active-color="#FFD736"
                          inactive-color="#E5E5E5">
                        </el-switch>
                      </el-col>
                    </el-row>
                    <el-row v-if="value2" class="base-row-36">
                      <el-col :span="6">
                        红包金额
                      </el-col>
                      <el-col :span="16">
                        <input type="text" v-model.number="moneyValue" class="base-input" placeholder="">
                      </el-col>
                    </el-row>
                    <el-row v-if="value2" class="base-row-36">
                      <el-col :span="20" :offset="1"><div class="btn" @click="comfirm">确定</div></el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
          <ys-popup
            :width="width"
            :height="height"
            v-show="showModel"
            @close="close"
          >
          <div class="popup-card">
              <el-row style="margin-top: 30px">
                <el-col :span="6" class="base-col" style="font-size: 18px;font-weight: bold">
                  选择优惠券
                </el-col>
              </el-row>
            <el-row>
              <el-col :span="4" :offset="2" class="base-col">优惠券类型</el-col>
              <el-col :span="18">
                <el-select v-model="typeValue"
                           size="small"
                           placeholder="选择优惠券">
                  <el-option
                    v-for="item in type"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-scrollbar class="coupon-scroll">
                  <div  class="coupon-card" v-for="item in [1,2,3,3,4]">
                    <ys-coupon :marginBottom="0"></ys-coupon>
                    <div class="coupon-circle">
                      <div class="coupon-point"></div>
                    </div>
                  </div>
                </el-scrollbar>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                    <div class="base-btn-111">确定</div>
              </el-col>
            </el-row>
          </div>
          </ys-popup>
      </div>

</template>

<script>
  import ysPopup from '@/components/popup'
  import ysCoupon from "@/components/coupon"
    export default {
        name: "activeSales",
      components:{
        ysCoupon,
        ysPopup
      },
      data(){
          return{
            width:550,
            height:750,
            showModel:true,
            typeValue:'',
            type:[
              {
                name:'满减劵',
                value:1
              },
              {
                name:'折扣卷',
                value:2
              }, {
                name:'现金卷',
                value:3
              }
            ],
            value1: true,
            value2:true,
            valueRedPack: true,
            moneyValue:''
          }
      },
      methods:{
        close(){
          this.showModel=false
        },
        comfirmRedPack(){
          this.$http.post(this.$api.openRedPack,{money:this.moneyValue}).then(json=>{
            console.log(json);
          })
        },
        closeRedPack(e){
          console.log(e);
          if(!e){
            this.$http.post(this.$api.closeRedPack,{}).then(json=>{
              console.log(json);
            })
          }

        },
        comfirm(){

        }
      },
      mounted(){
          this.$http.post(this.$api.isRedPack,{}).then(json=>{
            console.log(json);
          })
      }
    }
</script>

<style lang='less' scoped>
  @import '~style/mixin';
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .box-sale{
    min-width: 1200px;
    .btn{
      .base-btn(327px)
    }
    .sale-card{
      background: #fff;
      padding: 15px 0;
      /*padding: 20px 0;*/
    }
    .base-row-36{
      margin-top: 30px;
    }
  }
  .popup-card{
    width: 100%;
    .coupon-scroll{//
      margin-top: 30px;
      height: 500px;
      width: 545px;
      .coupon-card{
        margin: 15px auto;
        width: 498px;
        height: 144px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        border: 2px solid #E1E1E1;
        border-radius: 8px;
      }
      .coupon-circle{
        position: absolute;
        top:72px;
        right: -17px;
        border-radius: 50%;
        width: 34px;
        height: 34px;
        border: 2px solid @bs-color;
        display: flex;
        align-items: center;
        justify-content: center;
        .coupon-point{
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: @bs-color;
        }
      }
    }
  }

</style>
