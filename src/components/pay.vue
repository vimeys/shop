/**
*   Created By  YS  on 2018/9/12
*/
<template>
        <ys-popup
            :width="width"
            :height="height"
            v-show="showModel"
            @close="close"
        >
          <div class="pay-box">
            <el-row class="title">
              <el-col :span="2"> <h3>付款</h3></el-col>
            </el-row>
            <el-row class="pay-title">
              <el-col>
                <el-select v-model="payWayValue" placeholder="选择支付方式">
                  <el-option
                    v-for="item in payWayList"
                    :key ="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row class="fix-height" style="margin-top: 50px" v-if="payWayValue==1" >
              <el-col>
                <el-row>
                  <el-col><img :src="image" alt="" style="width: 200px;height: 200px;"></el-col>
                </el-row>
                <el-row>
                  <el-col>扫描二维码进行付款</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="fix-height" v-if="payWayValue==2" style="margin-top: 50px">
              <el-col>请确认顾客使用银行卡支付成功后点击支付完成</el-col>
            </el-row>
            <el-row class="fix-height" v-if="payWayValue==3" style="margin-top: 50px">
              <el-col>请确认顾客使用现金支付成功后点击支付完成</el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="pay-btn" @click="payOk">支付完成</div>
              </el-col>
            </el-row>
          </div>
        </ys-popup>
</template>


<script>
  import  ysPopup from "@/components/popup"
    export default {
        name: "pay",
      components:{
          ysPopup
      },
      props:{
        showModel:{
          type:Boolean,
          default: true
        },
        image:{
          type:String,
        }
      },
      data(){
          return {
            width:760,
            height:750,
            payWayValue:1,
            payWayList:[
              {
                value:1,
                label:'微信支付'
              },
              {
                value:2,
                label:'银联支付'
              },
              {
                value:3,
                label:'现金支付'
              }
            ]
          }
      },
      methods:{
        close(){
          this.showModel=false
          this.$emit('close')
        },
        payOk(){
          if(this.payWayValue!==1){//是否选择二维码支付
            //@param 当前支付方式
            this.$emit('payOk',this.payWayValue)
          }else{
            this.showModel=false
          }
        }
      }
    }
</script>

<style lang='less' scoped>
@import "~@/assets/style/mixin";

//todo  设置选择框的宽度
/deep/ .el-select{
  width: 100%;
}
/deep/ input{
  text-align: center;
}
.pay-box{
  width: 100%;
  padding: 50px;
  position: relative;
}
  .title{
    margin-top: 10px;
  }
  .pay-select{
    margin-top: 30px;
  }
  .fix-height{
    height: 300px;
  }
.pay-btn{
  .base-btn(271px);
  /*margin-top: 300px;*/
  position:absolute;
  top:10px;
  left: 200px;
}

</style>
