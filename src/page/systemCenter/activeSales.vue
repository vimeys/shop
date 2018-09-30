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
                      <el-col :span="20" :offset="1"><div class="btn" @click="confirm">确定</div></el-col>
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
                          v-model="valueLikes"
                          active-color="#FFD736"
                          inactive-color="#E5E5E5">
                        </el-switch>
                      </el-col>
                    </el-row>
                    <el-row v-if="valueLikes" class="base-row-36">
                      <el-col :span="7">
                        集满
                      </el-col>
                      <el-col :span="10">
                        <input type="text" v-model.number="valueLikesNum" class="base-input" placeholder="集赞个数">
                      </el-col>
                      <el-col :span="7">
                       可拆红包
                      </el-col>

                    </el-row>
                    <el-row v-if="valueLikes" class="base-row-36">
                      <el-col :span="6">
                        集赞时间
                      </el-col>
                      <el-col :span="16">
                        <input type="text" v-model.number="valueLikesTime" class="base-input" placeholder="输入集赞时限（小时）">
                      </el-col>
                    </el-row>
                    <el-row v-for="(item,index) in checkCoupon">
                      <el-col :span="18" :offset="2">
                        <div   class="base-text" >满{{item.word}} </div>
                      </el-col>
                      <el-col :span="4"> <i class="el-icon-delete" @click="delCoupon(index)"></i></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="20" :offset="1">
                        <div class="btn" @click="chooseCard">选择优惠券 </div>
                      </el-col>
                    </el-row>
                    <el-row v-if="valueLikes" class="base-row-36">
                      <el-col :span="20" :offset="1"><div class="btn" @click="confirmLike">保存</div></el-col>
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
                <el-col :span="5" class="base-col base-h3 " style="margin-left: 50px" >
                  选择优惠券
                </el-col>
              </el-row>
            <el-row style="margin-top: 10px">
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
                  <div  class="coupon-card"
                        v-for="(item,index) in couponList[typeValue]">
                    <ys-coupon
                      :detail="item"
                      :index="index"
                      :isShowEdit="true"
                      :marginBottom="0"></ys-coupon>
                    <div class="coupon-circle" @click="chooseCoupon(index)">
                      <div class="coupon-point" v-show="item.isChecked"></div>
                    </div>
                  </div>
                </el-scrollbar>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                    <div class="base-btn-111" style="margin-top: 30px"  @click="confirmCoupon">确定</div>
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
            showModel:false,
            typeValue:1,
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
            couponList:[],//优惠券列表
            value1: true,
            value2:true,
            valueLikes:true,//是否开启点赞
            valueLikesNum:'',//集赞个数
            valueLikesTime:'',//集赞时间
            checkCoupon:[],//选中的卡卷
            checkCouponList:[],//传递到后台的卡卷
            valueRedPack: true,
            moneyValue:''
          }
      },
      methods:{
        close(){
          this.showModel=false;
          this.checkCoupon=[];
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

        //选择卡片
        chooseCard(){
          this.showModel=true
        },
        confirm(){

        },

        //选中卡片
        chooseCoupon(index){
          let value=this.couponList[this.typeValue];
          value[index].isChecked=!value[index].isChecked
          this.couponList.splice(this.typeValue,1,value);
        },
        //确选中的优惠券
        confirmCoupon(){
            let arr=[];
            let arr2=[];
            for(let i=1;i<4;i++){
              this.couponList[i].forEach(item=>{
                if(item.isChecked){
                  let obj={}
                  obj.Type=i;
                  obj.CouponBookId=item.CouponBookId;
                  arr2.push(obj);
                  if(i==1){
                    obj.word=`满减券：满${item.Amount}减${item.DiscountAmount}`
                  }else if(i==2){
                    obj.word=`折扣券：满${item.Amount}打${item.DiscountAmount}折`
                  }else{
                    obj.word=`现金卷 ：${item.Amount}元现金`
                  }
                  arr.push(obj)
                }
              })
            }
          this.showModel=false;
          this.checkCouponList=arr2
          this.checkCoupon=arr
        },
        //开启集赞活动
        confirmLike(){
          let obj={
            model:{
              CollectionTime:this.valueLikesTime,
              NumberPeople:this.valueLikesNum,
              List:this.checkCouponList
            }
          }
          this.$util.post(this,this.$api.openLikes,obj,(data)=>{
                this.$message({
                  type:'success',
                  message:"开启成功"
                })
          })
        },
        //获取优惠券列表
        getCouponList(type){
            this.$util.post(this,this.$api.couponList,
              {query:{ PageIndex:1,PageSize:10,Key:'',Type:type}},
              (data)=>{
              console.log(data)
              data.Items.forEach(item=>{
                item.StartTime = this.$util.getTime(item.StartTime)//后台时间转时间撮
                item.EndTime = this.$util.getTime(item.EndTime)//后台时间转时间错
                item.isChecked=false
              })
              this.couponList[type]=data.Items;
            })
        }
      },
      watch:{
        valueLikesNum(){
           if(isNaN(this.valueLikesNum)){
             this.valueLikesNum=''
           }
        },
        valueLikesTime(){
          if(isNaN(this.valueLikesTime)){
            this.valueLikesTime=''
          }
        }
      },
      mounted(){
          this.getCouponList(1);
          this.getCouponList(2);
          this.getCouponList(3);
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
  .base-text{
    .base-input;
    background: #fff;
    border: 1px solid #E1E1E1;
    margin-bottom: 30px;
  }
  .popup-card{
    width: 100%;
    .coupon-scroll{//
      margin-top: 10px;
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
        top:62px;
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
