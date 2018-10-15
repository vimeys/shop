/**
*   Created By  YS  on 2018/8/8
*   会员卡管理页面
*/
<template>
  <div class="box">
    <el-container>
      <el-header height="100px" >
        <div class="active-header">
          <div :class="{'disabled':manageState}" @click="addCard" style="width: 111px">
            <span class="el-icon-circle-plus"></span>&nbsp;&nbsp;新建活动
          </div>
          <div @click="manage">管理</div>
          <ys-search class="del" @search="search"  :placeholder="placeholder"></ys-search>
          <!--<div class="del">删除</div>-->
        </div>
        <div class="select-side" v-show="manageState">
          <el-row class="select-side-row">
            <el-col :span="1">
              <ys-choose-all @chooseAll="chooseAll"
                              :isAllChoose="isAllChoose"
              >
              </ys-choose-all>
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
                       :marginTop="20"
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
          <el-col :span="6"><h3 class="base-h3">新建优惠券</h3></el-col>
        </el-row>
        <el-row>
          <el-col :span="5" class="base-font base-col">
            优惠券类型
          </el-col>
          <el-col :span="17" :offset="1">
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
          <el-col :span="5" class="base-col">
            下放渠道
          </el-col>
          <el-col :span="17" :offset="1">
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
          <el-col :span="5" class="base-col">
            下放数量
          </el-col>
          <el-col :span="17" :offset="1">
            <input type="text"
                   class="base-input"
                   v-model.number="Num"
                   placeholder="请输入该优惠券下放的数量">
          </el-col>
          <el-col :span="1" class="before">
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="5" class="base-col">
            有效期限
          </el-col>
          <el-col :span="16" :offset="1">
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
              size="small"
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
          <el-col :span="5" class="base-col">
            优惠券设置
          </el-col>
          <el-col :span="17" :offset="1" v-if="type==3">
            <input type="text" v-model.number="Amount" placeholder="输入金额" class="base-input">
          </el-col>
          <el-col :span="17" :offset="1" v-else-if="type==1">
            满 <input type="text" v-model.number="Amount" placeholder="输入金额" class="small-input">
            减 <input type="text"
                     v-model.number="DiscountAmount"
                     placeholder="输入金额"
                     class="small-input" >
            <!--<input type="text"-->
                   <!--v-model.number="DiscountAmount"-->
                   <!--placeholder="输入1-10折"-->
                   <!--class="small-input">-->
                   <!--v-else-if="type==2">-->
          </el-col>
          <el-col :span="17" :offset="1" v-else="type==2">
            满 <input type="text" v-model.number="Amount" placeholder="输入金额" class="small-input">
            折<input type="text"
                    v-model.number="DiscountAmount"
                    placeholder="输入1-10折"
                    class="small-input"
                   >
          </el-col>
          <el-col :span="1" class="before">
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="5">
            详细信息
          </el-col>
          <el-col :span="17" :offset="1">
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
  import ysPay from '@/components/pay'

  export default {
    name: "priceCard",
    components: {
      ysCoupon,
      ysGoodsCard,
      ysPopup,
      YsSearch,
      YsChooseAll,
      ysPay
    },
    data() {
      return {
        pWidth: 550,
        pHeight: 680,
        showModal: false,
        placeholder:'搜索优惠券类型、金额',
        manageState: false,//管理状态
        type: 1,//优惠券类型
        value5: [new Date(2018, 9, 10), new Date(2018, 9, 11)],
        StartTime: '',
        EndTime: '',
        newTime: '2018-8-12',
        newTime1: '2018-8-20',
        loading: true,//loading组件
        options: [{
          value: 1,
          label: '满减劵'
        }, {
          value: 2,
          label: '折扣券'
        }, {
          value: 3,
          label: '现金券'
        }
        ],
        type2: 3,//下放渠道
        options2: [
          {
            value: 3,
            label: '一元买券'
          }, {
            value: 4,
            label: '刮卡'
          }, {
            value: 6,
            label: '集赞'
          },
          {
            value: 7,
            label: '幸运大抽奖'
          }
        ],
        Num:'',//下放数量
        Amount: '',//总金额
        DiscountAmount: '',//打折或满减金额
        Details: '',//详细介绍
        couponList: [],//店铺列表
        isEdit: false,//是否修改
        ischoseAll: false,//是否全选
        currentIndex:'',//当前修改的index
        isAllChoose:false,//是否全选
      }
    },
    methods: {

      search(val){
          this.$util.post(this,this.$api.couponList,
            {query: {PageIndex: 1, PageSize: 20, Key:val}},
            (data)=> {
              // console.log(data);
              let res = data.Items
              res.forEach((item, index) => {
                item.StartTime = util.getTime(item.StartTime)
                item.EndTime = util.getTime(item.EndTime)
                item.hasChecke = false;
                item.ischosed = false
              })
              this.couponList = res
            }
          )
      },
      //添加优惠券
      addCard() {
        if(!this.manageState){
          this.showModal = true
        }
      },
      //管理卡片
      manage() {
        this.manageState = !this.manageState;
        this.couponList.forEach((item) => {
          item.hasChecke = this.manageState
        })
      },
      close() {
        this.showModal = false;
        this.isEdit=false;
        this.type=1;
        this.Amount=''
        this.Num=''
        this.DiscountAmount=''
        this.Details=''
        this.type2=3
      },
      //上传表单
      postForm() {
        let obj = {}
        // obj.StartTime=this.StartTime;
        obj.StartTime = this.StartTime;
        obj.EndTime = this.EndTime;
        obj.Type = this.type;
        obj.Amount = this.Amount;
        obj.DiscountAmount = this.DiscountAmount ? this.DiscountAmount : 0;
        obj.Details = this.Details;
        obj.SourceType = this.type2;
        obj.ServiceType = 2;
        obj.Number=this.Num;
        obj.ActivityType = this.type2;
        obj.Name = 'ATH眼镜店铺';
        // console.log(StartTime);
        // return
        if(this.isEdit){//是否是修改
          obj.CouponBookId=this.couponList[this.currentIndex].CouponBookId;
          obj.Guid=this.couponList[this.currentIndex].Guid;
          this.$util.post(this,this.$api.updataCoupon,{couponBook:obj}, (that)=> {
            this.showModal=false;
            this.isEdit=false;
            this.getCouponList()
            this.$notify({
              title:'修改成功',
              message:""
            });
            this.type=1;
            this.Amount=''
            this.DiscountAmount=''
            this.Details=''
            this.type2=3
          })
        }else{
          this.$http.post(api.addCoupon, {couponBook: obj}).then(json => {
            let data = json.data;
            if (data.isSuc == true) {
              // this
              this.showModal=false;
              this.isEdit=false
              this.getCouponList()
              this.$message({
                message: '优惠券添加成功',
                type: 'success'
              })
              this.type=1;
              this.Amount=''
              this.Num=''
              this.DiscountAmount=''
              this.Details=''
              this.type2=3
            }
          })
        }

      },

      //获取优惠券列表
      getCouponList() {
        // this.$http.post(api.couponList, {query: {PageIndex: 1, PageSize: 20, Key: ''}}).then(json => {
        //   // console.log(json);
        //   // const loading = this.$loading({
        //   //   lock: true,
        //   //   text: 'Loading',
        //   //   spinner: 'el-icon-loading',
        //   //   background: 'rgba(0, 0, 0, 0.7)'
        //   // });
        //   let data = json.data
        //   if (data.isSuc == true) {
        //     let res = data.result.Items
        //     res.forEach((item, index) => {
        //       item.StartTime = util.getTime(item.StartTime)
        //       item.EndTime = util.getTime(item.EndTime)
        //       item.hasChecke = false;
        //       item.ischosed = false
        //     })
        //     this.couponList = res
        //   }
        // })
        this.$util.post(this,this.$api.couponList,{query: {PageIndex: 1, PageSize: 20, Key: ''}},
          data=>{
            let res = data.Items
            res.forEach((item, index) => {
              item.StartTime = util.getTime(item.StartTime)
              item.EndTime = util.getTime(item.EndTime)
              item.hasChecke = false;
              item.ischosed = false
            })
            this.couponList = res
          }, true)
      },

      // 点击修改
      reMake(index) {
        // console.log(index);
        this.showModal = true;
        let data = this.couponList[index];
        this.isEdit=true;
        this.currentIndex=index;
        // this.StartTime;
        // obj.EndTime=this.EndTime;
        this.type = data.Type;
        this.Amount = data.Amount;
        this.Num=data.Number
        this.DiscountAmount = data.DiscountAmount;
        this.Details = data.Details;
        // obj.SourceType=2;
        // obj.ServiceType=2;
        this.type2 = data.ActivityType;
        // 回显时间
        function f(val) {
          let time=new Date(parseInt(val));
          const year = time.getFullYear();
          const month = time.getMonth() ;
          const day = time.getDate();
          return new Date(year,month,day)
        }
        this.value5=[f(data.StartTime),f(data.EndTime)]
      },


      // 单个选择
      choose(e) {
        console.log(e);
        this.couponList[e[0]].ischosed = e[1]
      },
      // 全选
      chooseAll(e) {
        console.log(e);
        this.isAllChoose = e;
        this.couponList.forEach(function (item, index) {
          item.ischosed = e
        })
      },
      // 删除卡片
      del() {
        let delArr = []
        if (this.ischoseAll) {
          this.couponList.forEach(item => {
            delArr.push(item.CouponBookId)
          })
        } else {
          this.couponList.forEach(item => {
            if (item.ischosed) {
              delArr.push(item.CouponBookId)
            }
          })
        }
        this.$util.confirm(this).then(json=>{
          // this.$http.post(api.delCoupon, {goodsId: delArr}).then(json => {
          //   let data = json.data;
          //   if (data.isSuc == true) {
          //     this.$message({
          //       message: '删除成功',
          //       icon: 'success'
          //     })
          //   }
          // })
          this.$util.post(this,this.$api.delCoupon,{couponBookId:delArr},()=>{
            this.getCouponList()
            this.manageState=false
            this.$message({
              message: '删除成功',
              icon: 'success'
            })
          })
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

  /deep/ .el-col-5 {
    text-align: right;
  }

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
      cursor: pointer;
      background: #FFD736;
      font-size: 14px;
      line-height: 37px;
      text-align: center;
      margin-right: 30px;
    }
    .disabled {
      background: #E5E5E5;
      cursor: auto;
    }
    .del {
      /*float: right;*/
      margin-left: 670px;
    }
  }

  .select-side {
    width: 100%;
    height: 50px;
    .select-side-row {
      height: 50px;
      line-height: 50px;
      display: flex;
      align-items: center;
    }
    .select-del {
      .base-btn-111;
    }
  }

  .cards {
    display: flex;
    width: 1200px;
    flex-wrap: wrap;
  }

  .card-list {
    min-height: 500px;
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
      box-shadow:0px 0px 3px rgba(187,187,187,0.5) inset;
      border-radius: 4px;
      border: none;
    }
    .textarea {
      width: 313px;
      height: 123px;
      background: rgba(229, 229, 229, 1);
      box-shadow:0px 0px 3px rgba(187,187,187,0.5) inset;
      border-radius: 4px;
      border: none;
    }
    .form-btn {
      .base-btn(111px);
    }
  }

  /deep/ .el-select--small {
    width: 100%;
  }

  /*/deep/ .el-select--small{*/
  /*width: 100%;*/
  /*}*/

  /deep/ .el-select {
    width: 100%;
  }

  /deep/ input {
    text-align: center;
  }
</style>
