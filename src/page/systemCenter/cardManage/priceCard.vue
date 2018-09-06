/**
*   Created By  YS  on 2018/8/8
*   会员卡管理页面
*/
<template>
  <div class="box">
    <el-container>
      <el-header height="100px">
        <div class="active-header">
          <div :class="{'disabled':manageState}" @click="addCard" style="width: 111px">
            <span class="el-icon-circle-plus" ></span>&nbsp;&nbsp;新建活动</div>
          <div @click="manage">管理</div>
          <ys-search class="del"></ys-search>
          <!--<div class="del">删除</div>-->
        </div>
        <div class="select-side" v-show="manageState">
          <el-row class="select-side-row">
            <el-col :span="1">
                <ys-choose-all @chooseAll="chooseAll"></ys-choose-all>
            </el-col>
            <el-col :span="1">全选</el-col>
            <el-col :span="2" :offset="20">
              <div class="select-del" @click="del">删除</div>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main class="card-list">
        <div class="cards">
          <template v-for="(item,index) in couponList">
            <ys-coupon :detail="item"
                       :hasChecke="item.hasChecke"
                       :ischosed="item.ischosed"
                       :index="index"
                       @reMake="reMake"
                       @choose="choose"
            >
            </ys-coupon>
          </template>


          <!--<ys-coupon></ys-coupon>-->

        </div>

      </el-main>
    </el-container>
    <!--<ys-goods-card></ys-goods-card>-->

    <!--弹窗-->
    <ys-popup
      :width="pWidth"
      :height="pHeight"
      v-show="showModal"
      @close="close"
    >
      <div class="form">
        <el-row>
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
                :key='item.value'
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1" class="before"></el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="6">
            下放渠道
          </el-col>
          <el-col :span="17">
            <el-select v-model="type2" placeholder="请选择" size="small">
              <el-option
                v-for="item in options2"
                :key='item.value'
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
              v-model="value5"
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
            <input type="text" v-model.number="Amount" placeholder="输入金额" class="base-input">
          </el-col>
          <el-col :span="17" v-else>
            满 <input type="text" v-model.number="Amount" placeholder="输入金额" class="small-input">
            减 <input type="text" v-model.number="DiscountAmount" placeholder="输入金额" class="small-input" v-if="type==1">
            <input type="text" v-model.number="DiscountAmount" placeholder="输入1-10折" class="small-input"
                   v-else-if="type==2">
          </el-col>
          <el-col :span="1" class="before">
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="6">
            详细信息
          </el-col>
          <el-col :span="17">
            <textarea name="" v-model="Details" id="" class="textarea" placeholder="请输入优惠券的详细信息"></textarea>
          </el-col>
          <el-col :span="1" class="before">
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col>
            <div class="form-btn" @click="postForm">
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
  import ysPopup from '@/components/popup'
  import api from '@/assets/script/url'
  import * as util from '@/assets/script/util'
  import YsSearch from '@/components/search'
  import YsChooseAll from '@/components/chooseAll'
  export default {
    name: "priceCard",
    components: {
      ysCoupon,
      ysGoodsCard,
      ysPopup,
      YsSearch,
      YsChooseAll
    },
    data() {
      return {
        pWidth: 550,
        pHeight: 680,
        showModal: false,
        manageState:false,//管理状态
        type: '1',//优惠券类型
        value5: [new Date(2018, 9, 10, 8, 40), new Date(2018, 9, 10, 9, 40)],
        StartTime: '',
        EndTime: '',
        newTime: '2018-8-12',
        newTime1: '2018-8-20',
        loading:true,//loading组件
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
        type2: '3',//下放渠道
        options2: [
          {
            value: '3',
            label: '一元买券'
          }, {
            value: '4',
            label: '刮卡'
          }, {
            value: '6',
            label: '集赞'
          },
          {
            value: '7',
            label: '幸运大抽奖'
          }
        ],
        Amount: '',//总金额
        DiscountAmount: '',//打折或满减金额
        Details: '',//详细介绍
        couponList: [{}, {}],//店铺列表
        isEdit: false,//是否修改
        ischoseAll:false,//是否全选
      }
    },
    methods: {
      addCard() {
        this.showModal = true
      },
      //管理卡片
      manage(){
        this.manageState=!this.manageState;
        this.couponList.forEach( (item)=>{
          item.hasChecke=this.manageState
        })
      },
      close() {
        this.showModal = false
      },
      //上传表单
      postForm() {
        let obj = {}
        // obj.StartTime=this.StartTime;
        obj.StartTime = this.StartTime;
        obj.EndTime = this.EndTime;
        obj.Type = this.type;
        obj.Amount = this.Amount;
        obj.DiscountAmount = this.DiscountAmount?this.DiscountAmount:0;
        obj.Details = this.Details;
        obj.SourceType = 2;
        obj.ServiceType = 2;
        obj.ActivityType = this.type2;
        obj.Name = 'ATH眼镜店铺';
        // console.log(StartTime);
        // return
        this.$http.post(api.addCoupon, {couponBook: obj}).then(json => {
          let data = json.data;
          if (data.isSuc == true) {
            // this
            this.$message({
              message: '店铺添加成功',
              type: 'success'
            })
          }
        })
      },

      //获取优惠券列表
      getCouponList() {
        this.$http.post( api.couponList, {query: {PageIndex: 1, PageSize: 10, Key: ''}}).then(json => {
          // console.log(json);
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          let data = json.data
          if (data.isSuc == true) {
            let res = data.result.Items
            res.forEach((item, index) => {
              item.StartTime = util.getTime(item.StartTime)
              item.EndTime = util.getTime(item.EndTime)
              item.hasChecke = false;
              item.ischosed=true
            })
            console.log(res);
            this.couponList = res
            loading.close();
            console.log("执行");
          }
        })
      },

      // 点击修改
      reMake(index) {
        // console.log(index);
        this.showModal = true;
        let data = this.couponList[index]
        // this.StartTime;
        // obj.EndTime=this.EndTime;
        this.type = data.Type;
        this.Amount = data.Amount;
        this.DiscountAmount = data.DiscountAmount;
        this.Details = data.Details;
        // obj.SourceType=2;
        // obj.ServiceType=2;
        this.type2 = data.ActivityType;
        // obj.Name='ATH眼镜店铺';
      },
      // 单个选择
      choose(e) {
        console.log(e);
        this.couponList[e[0]].ischosed=e[1]
      },
      // 全选
      chooseAll(e){
        console.log(e);
        this.ischoseAll=e;
        this.couponList.forEach(function (item,index) {
            item.ischosed=e
        })
      },
      // 删除卡片
      del(){
        let delArr=[]
          if(this.ischoseAll){
              this.couponList.forEach(item=>{
                delArr.push(item.CouponBookId)
              })
          }else {
            this.couponList.forEach(item=>{
              if(item.ischosed){
                delArr.push(item.CouponBookId)
              }
            })
          }
        this.$http.post(api.delCoupon,{couponBookId:delArr}).then(json=>{
              let data=json.data;
            if(data.isSuc==true){
              this.$message({
                message:'删除成功',
                icon:'success'
              })
            }
          })
      }
    },
    mounted() {
      console.log('执行created');

      this.getCouponList()
    },
    watch: {
      value5(val) {
        let date = new Date(val[0]);
        let date1 = new Date(val[1]);
        let time = Date.parse(date);
        let time1 = Date.parse(date1);
        this.StartTime = `/Date(${time})/`;
        this.EndTime = `/Date(${time1})/`;
      }
    }
  }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";

  .box {
    width: 1200px;
  }

  .active-header {
    display: flex;
    width: 1200px;
    height: 50px;
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
      margin-left: 670px;
    }
  }
  .select-side{
    width: 100%;
    height: 50px;
    .select-side-row{
      height: 50px;
      line-height: 50px;
      display: flex;
      align-items: center;
    }
    .select-del{
      .base-btn-111;
    }
  }

  .cards {
    display: flex;
    width: 1200px;
    flex-wrap: wrap;
  }

  .card-list {
    height: 1000px;
  }

  .form {
    width: 100%;
    padding: 50px;
    .row {
      margin: 30px 0;
    }
    .small-input {
      width: 125px;
      height: 36px;
      background: rgba(229, 229, 229, 1);
      box-shadow: 0px 1px 3px 0px rgba(187, 187, 187, 0.5);
      border-radius: 4px;
      border: none;
    }
    .textarea {
      width: 313px;
      height: 143px;
      background: rgba(229, 229, 229, 1);
      box-shadow: 0px 1px 3px 0px rgba(187, 187, 187, 0.5);
      border-radius: 4px;
      border: none;
    }
    .form-btn {
      .base-btn(111px);
    }
  }
</style>
