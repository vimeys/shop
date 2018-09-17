/**
*   Created By  YS  on 2018/8/8
*
*/
<template>
  <div class="box">
    <div class="active-header">
      <div :class="{'disabled':isDel}" @click="addCard">
        <span class="el-icon-circle-plus"></span>&nbsp;&nbsp;新建会员卡
      </div>
      <div v-if="isDel" @click="endClick">结束删除</div>
      <div v-else @click="beginClick">删除会员卡</div>

      <div v-if="isDel" class="del" @click="delCard">删除</div>
    </div>
    <div class="card-list" >
      <template v-for="(item,index) in cardListType">
        <ys-vip-card
          :detail="item"
          :index="index"
          @choose="choose"
        >

        </ys-vip-card>
      </template>
    </div>

    <ys-popup
      :width="pWidth"
      :height="pHeight"
      :showModal="showModal"
      @close="closePop"
      v-show="showModal"
    >
      <div class="popup-box">
        <el-row >
          <el-col :span="6">
            <h2>会员卡</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" :offset="1">
            会员类别
          </el-col>
          <el-col :offset="1" :span="16">
            <el-select v-model="carlType" size="small" placeholder="请选择">
              <el-option
                v-for="item in cardList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1" class="before">
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="4" :offset="1">
            服务范围
          </el-col>
          <el-col :offset="1" :span="16">
            <el-select
              v-model="value11"
              multiple
              size="small"
              collapse-tags
              style="margin-left: 1px;"
              placeholder="请选择">
              <el-option
                v-for="item in typeList"
                :key="item.GoodsTypeId"
                :label="item.Name"
                :value="item.GoodsTypeId">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1" class="before">
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="4" :offset="1">
            店铺范围
          </el-col>
          <el-col :offset="1" :span="16">
            <el-select
              v-model="valueShop"
              multiple
              size="small"
              collapse-tags
              style="margin-left: 1px;"
              placeholder="请选择">
              <el-option
                v-for="item in shopList"
                :key="item.UserId"
                :label="item.Name"
                :value="item.UserId">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1" class="before">
          </el-col>
        </el-row>
        <el-row class='row'>
          <el-col :span="4" :offset="1">
            有效期限
          </el-col>
          <el-col :offset="1" :span="16">
            <el-select
              v-model="yearNum"
              size="small"
              placeholder="请选择">
              <el-option
                v-for="item in year"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1" class="before">
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="4" :offset="1" class="base-col">
            {{tips[carlType-1].name1}}
          </el-col>
          <el-col :offset="1" :span="16" v-if="carlType==3">
            <el-row :gutter="30">
              <el-col :span="14"><input type="text"
                                        v-model.number="Frequency"
                                        class="base-input"
                                        :placeholder="tips[carlType-1].placeholder1"
              ></el-col>
              <el-col :span="10">
                <div  class="numBtn" :class="{'disable':isWuxian}" @click="wuxian">无限次</div>
              </el-col>
            </el-row>
          </el-col>
          <el-col v-else :offset="1" :span="16">

            <input type="text"
                   v-model.number="Discount"
                   v-if="carlType==1"
                   class="base-input"
                   :placeholder="tips[carlType-1].placeholder1">
            <input type="text"
                   v-model.number="Discount"
                   v-else-if="carlType==2"
                   class="base-input"
                   :placeholder="tips[carlType-1].placeholder1">
            <!--<input type="text"-->
                   <!--v-model.number="Frequency"-->
                   <!--v-else="carlType==3"-->
                   <!--class="base-input"-->
                   <!--:placeholder="tips[carlType].placeholder1">-->
          </el-col>

          <el-col :span="1" class="before">
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" :offset="1">
            充值金额
          </el-col>
          <el-col :offset="1" :span="16">
            <input type="text" v-model.number="buyMoney" class="base-input" placeholder="请输入购买该会员卡的金额">
          </el-col>
          <el-col :span="1" class="before">
          </el-col>
        </el-row>
        <!--<el-row  class="row" v-show="carlType===2">-->
          <!--<el-col :span="5" class="font-small">最低充值次数</el-col>-->
          <!--<el-col :span="16" :offset="1" >-->
            <!--<el-row :gutter="10">-->
              <!--<el-col :span="12"><input type="text" class="base-input" placeholder="继续充值的次数"></el-col>-->
              <!--<el-col :span="12"><input type="text" class="base-input" placeholder="该次数的金额"></el-col>-->
            <!--</el-row>-->
          <!--</el-col>-->
          <!--<el-col :span="1" class="before"></el-col>-->
        <!--</el-row>-->
        <el-row class="row">
          <el-col>
            <div @click="addCardPost" class="base-btn-111"> 确定</div>
          </el-col>
        </el-row>
      </div>
    </ys-popup>
  </div>
</template>

<script>
  import  ysVipCard from '@/components/vipCard';
  import  ysPopup from '@/components/popup'
  import  api from '@/assets/script/url'
  import  {confirm} from '@/assets/script/util'
    export default {
        name: "vipCard",
      components:{
        ysVipCard,
        ysPopup
      },
      data(){
          return{
            value: '',
            pWidth:530,
            pHeight:580,
            showModal:false,
            isDisabled:false,
            value11:[],
            buyMoney:'',//充值金额
            Discount:'',//折扣
            Frequency:'',//次数
            tips:[//提示文字
              {
                name1:'享受折扣',
                placeholder1:'请输入会员卡的折扣',

              },
              {
                name1:'享受折扣',
                placeholder1:'请输入会员卡的具体折扣',

              },
              {
                name1:'可用次数',
                placeholder1:'请输入会员卡可用次数',
                name2:'最低充值次数',
                placeholder2:'继续充值的次数',
                placeholder3:'该次数的金额'
              },
            ],
            carlType:1,//充值卡类型
            cardList:[
              {
                value:1,
                label: '充值卡'
              },{
                value:2,
                label: '定值卡'
              },{
                value:3,
                label: '次卡'
              }
            ],
            yearNum:1,
            year:[
              {
                value: 1,
                label: '一年'
              },
              {
                value: 2,
                label: '两年'
              },
              {
                value: 3,
                label: '三年'
              },
              {
                value: -1,
                label: '永久'
              },

            ],
            options:[
              {
                value: '选项1',
                label: '黄金糕'
              }, {
                value: '选项2',
                label: '双皮奶'
              }, {
                value: '选项3',
                label: '蚵仔煎'
              }
            ],
            cardListType:[],
            typeList:'',
            valueShop:[],
            shopList:'',
            isWuxian:true,//是否是无线
            isDel:false
          }
      },
      methods:{
          // 添加卡片
        addCard(){
          if(!this.isDel){
            this.showModal=true
          }

        },
        // 关闭
        closePop(){
          this.showModal=false
          this.carlType=1;
          this.yearNum=1;
          this.Frequency='';
          this.buyMoney='';
          this.Discount='';
        },
        // 单个会员卡选中
        choose(e){
          console.log(e);
          this.cardListType[e[0]].isChecked=e[1]
        },

        wuxian(){
            this.isWuxian=false
        },
        // 开卡
        addCardPost(){
          let obj={};
          if(this.carlType==1){
            obj.MembershipName='充值卡';
          }else if(this.carlType==2){
            obj.MembershipName='定值卡'
          }else{
            obj.MembershipName='次卡'
          }
          // obj.MembershipName='定制卡';
          obj.MembershipType=this.carlType;
          obj.EffectiveTime= this.yearNum>0?this.yearNum*12:-1;
          obj.Frequency=this.Frequency?this.Frequency:0;
          obj.BuyAmount=this.buyMoney?this.buyMoney:0;
          obj.Discount=this.Discount?this.Discount:0;
          if(!this.isWuxian){
              this.Frequency=-1
          }
            // this.$http.post(api.addMemberCard,{goodsTypeIds:this.value11,model:obj,shopIds:this.valueShop}).then(json=>{
            //   console.log(json);
            //   let data=json.data;
            //   if(data.isSuc==true){
            //       this.showModal=false;
            //       this.carlType=1;
            //       this.yearNum=1;
            //       this.Frequency='';
            //       this.buyMoney='';
            //       this.Discount='';
            //   }
            // })
          this.$util.post(this,this.$api.addMemberCard,{goodsTypeIds:this.value11,model:obj,shopIds:this.valueShop},()=>{
            this.getCardList();
                  this.showModal=false;
                  this.carlType=1;
                  this.yearNum=1;
                  this.Frequency='';
                  this.buyMoney='';
                  this.Discount='';
          })
        },
        beginClick(){
            this.isDel=true;
            this.cardListType.forEach(item=>{
              item.hasChecked=true
            })
        },
        endClick(){
          this.isDel=false;
          this.cardListType.forEach(item=>{
            item.hasChecked=false
            item.isChecked=false
          })
        },
        // 删除卡片
        delCard(){
            let delArr=[];
            this.cardListType.forEach(item=>{
              if(item.isChecked){
                delArr.push(item.MembershipCardId)
              }
            })
          confirm(this).then(() => {
            this.$http.post(api.delMemberCard,{membershipCardId:delArr}).then(json=>{
              let data=json.data;
              if(data.isSuc==true){
                this.getCardList()
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
          // this.$http.post('/shop/'+api.delMemberCard,{membershipCardId:delArr}).then(json=>{
          //   let data=json.data;
          //   // if(json)
          // })
        },
        //获取会员卡列表
        getCardList(){
            let obj={}
            obj.pageIndex=1;
            obj.pageSize=10;
            obj.isEnable=-1;
            // this.$http.post(api.memberCardList,obj).then(json=>{
            //   console.log(json);
            //   let data=json.data;
            //   if(data.isSuc==true){
            //     data.result.Items.forEach(item=>{
            //       item.hasChecked=true;
            //       item.isChecked=false;
            //     });
            //         this.cardListType=data.result.Items
            //   }
            // })
          this.$util.post(this,this.$api.memberCardList,obj,(data)=>{
            data.Items.forEach(item=>{
                  item.hasChecked=false;
                  item.isChecked=false;
                });
            this.cardListType=data.Items;

          })
        },
        //获取分类列表
        getTypeList :async function() {
          let json= await this.$http.post(this.$api.typeList, {type: 2});
          let data=json.data;
          if(data.isSuc==true){
            this.typeList=data.result
          }
        },
        // 获取店铺列表
        getShopList(){
          this.$http.post(this.$api.shopList,{}).then(json=>{
            let data=json.data
            if(data.isSuc==true){
              this.shopList=data.result;
              // let firstShopId=data.result[0].UserId;
              // this.currentShopId=firstShopId
              // this.getGroupList(this.currentShopId)
              this.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'warning'
              })
            }
          }).catch(err=>{
            console.log(err);
          })
        }
      },
      created(){
        this.getCardList();
        this.getTypeList();
        this.getShopList();
      }
    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";
  /*@import "~@/assets/style/common";*/
    .box{
      min-width: 1200px;
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
      .card-list{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      }
    }
  //弹窗
  .popup-box{
    width: 100%;
    padding: 50px;
    .row{
      margin-top: 30px;
      margin-bottom: 30px;
    }
    .font-small{
      font-size: 14px;
    }
  }
  .numBtn{
    .base-btn(94px)
  }
  .disable{
    width:94px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    color:#8C8C8C;
    border:1px solid rgba(255,215,54,1);
  }
  /deep/ .el-select--small{
    width: 100%;
  }
</style>
