/**
*   Created By  YS  on 2018/9/20
*   目标管理
*/
<template>
  <div class="target-box">
    <div class="target-header">
      <span class="base-col">筛选时间</span>
      <el-select v-model="valueYear" placeholder="请选择年份" size="small" @change="chooseYear" >
        <el-option
          v-for="item in date"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <div class="base-btn" @click="open">管理目标/成本金额</div>
      <ys-select-shop
        :marginLeft="500"
        @getShop="getShop"
        @selectShop="selectShop"
      >
      </ys-select-shop>
    </div>
    <div v-if="hasTarget" class="target-content">
      <el-row class="target-content-title">
        <el-col :span="2" :offset="1">成本/目标</el-col>
        <el-col :span="2" :offset="18">日期</el-col>
      </el-row>
      <el-row class="target-info">
        <el-col :offset="1" :span="4">
          <span class="red"></span>
          <span>未达标</span>
          <span class="green"></span>
          <span>达标</span>
        </el-col>
      </el-row>
      <template v-for="item in targetListValue">
        <el-row class="target-progress">
          <el-col :offset="1" :span="12" style="height: 52px;line-height: 52px;padding: 20px;overflow: hidden">
            <!--<van-progress :percentage="item.newQuantity " :color="redP" v-if="item.Standard==1"/>-->
            <!--<van-progress :percentage="item.Quantity " :color="greenp" v-else />-->
            <div class="target-progress-border-ok" v-if="item.Standard==1">

            </div>
            <div class="target-progress-border" v-else>
              <div class="target-progress-content" :style="{'width':item.Quantity+'%'}">

              </div>
            </div>

          </el-col>
          <el-col :span="5" :class="{'green-font':green}" v-if="item.Standard==1">
            {{item.OrderAmount}}（达标{{item.Quantity}}%）
          </el-col>
          <el-col :span="5" :class="{'red-font':green}" v-else>
            {{item.OrderAmount}}（达标{{item.Quantity}}%）
          </el-col>
          <el-col :span="2" :offset="3">
            {{item.DateTime}}
          </el-col>
        </el-row>
      </template>

      <!--<el-row class="target-progress">-->
        <!--<el-col :offset="1" span="12" style="height: 52px;line-height: 52px;padding: 20px">-->
          <!--<van-progress :percentage="50" :color="greenp"/>-->
        <!--</el-col>-->
        <!--<el-col :span="4" :class="{'red-font':red}">-->
          <!--17000（达标20%）-->
        <!--</el-col>-->
        <!--<el-col :span="2" :offset="4">-->
          <!--2018年1月-->
        <!--</el-col>-->
      <!--</el-row>-->
    </div>
    <div v-else>
      <el-row>
        <el-col>
          暂无数据
        </el-col>
      </el-row>
    </div>
    <ys-popup
      :width="width"
      :height="height"
      v-show="showModel"
      @close="close"
    >
      <div class="target-form">
        <el-row>
          <el-col :span="10">
            <h3>管理利润/成本金额</h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="base-col">每月成本</el-col>
          <el-col :span="18">

            <el-row :gutter="20" v-for="(item,index) in cost" style="margin-top: 10px" >
              <el-col :span="12">
                <input type="text" class="base-input" placeholder="请输入该成本的名称" v-model="item.Name">
              </el-col>
              <el-col :span="9">
                <input type="text" class="base-input " placeholder="请输入该成本的金额" v-model="item.Amount">
              </el-col>
              <el-col :span="1" class="base-col" v-if="index!=0"><i class="el-icon-delete" @click="del(index)"></i></el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="margin: 30px 0">
          <el-col :offset="6" :span="6">
            <div class="base-btn-111" @click="add">添加成本项</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="base-col">每月净利润</el-col>
          <el-col :span="16">
            <input type="text" class="base-input" placeholder="请输入金额" v-model="Amount" v>
            <span>目标销售金额 = 每月净利润 + 每月成本</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="6" :span="16">
            <div class="base-btn" @click="addTarget">
              生成销售目标
            </div>
          </el-col>
        </el-row>
      </div>
    </ys-popup>
  </div>
</template>

<script>
  import ysSelectShop from '@/components/selectShop'
  import  ysPopup from '@/components/popup'
    export default {
      name: "targetManage",
      components:{
        ysSelectShop,
        ysPopup
      },
      data(){
        return {
          width:773,
          height:790,
          showModel:false,
          valueYear:'',
          date:[
          ],
          //每月成本
          cost:[
            {
              Name:'',
              Amount:''
            }
          ],
          //每月净利润
          Amount:'',
          currentShopId:'',//当前店铺的id
          red:false,
          green:true,
          hasTarget:true,
          targetListValue:[],
          greenp:"#D0021B",
          redP:'#7ED321'
        }
      },
      methods:{
        getShop(e){
            this.currentShopId=e
          this.getList(this.valueYear,e)
          this.hasTargetYear(e)
        },
        selectShop(e){
            this.currentShopId=e;
            this.getList(this.valueYear,e)
        },
        //打开弹窗
        open(){
          this.showModel=true;
          if(this.targetListValue){
              this.getTargetOld();
          }
        },

        //获取旧的目标
        getTargetOld(){
            this.$util.post(this,this.$api.targetDetail,{year:this.valueYear,shopId:this.currentShopId},(data)=>{
              console.log(data);
              try{
                let arr=[];
                data.SalesTarget_List.forEach(item=>{
                  let obj={}
                  obj.Name=item.Name;
                  obj.Amount=item.Amount;
                  obj.ProfitId=item.ProfitId
                  obj.SalesTargetId=item.SalesTargetId
                  arr.push(obj)
                })
                this.cost=arr;
              this.Amount=data.Profit_List[0].Amount;
              }catch (e) {
                console.log(e);
              }

            })
        },
        //关闭弹窗
        close(){
          this.showModel=false;
          this.Amount=''
          this.cost=[{
            Name:'',
            Amount:''
          }]
        },
        chooseYear(e){
            this.getList(e,this.currentShopId)
        },
        add(){
          if(this.targetListValue){
            this.cost.push({
              Name:'',
              Amount:'',
              ProfitId:0,
              SalesTargetId:0
            })
          }else{
            this.cost.push({
              Name:'',
              Amount:''
            })
          }

        },
        del(index){
          this.cost.splice(index,1)
        },
        //新增/修改目标设置
        //todo 接口数据错误
        addTarget(){
          if(this.targetListValue){
              let profit=[];
            profit[0]={}
            profit[0].Amount=this.Amount
            profit[0].ShopId=this.currentShopId;
            profit[0].Year=this.valueYear;
            let arr=[]
            this.cost.forEach(item=>{
              let obj={};
              obj.Year=this.valueYear;
              obj.Name=item.Name;
              obj.Amount=item.Amount;
              obj.ShopId=this.currentShopId;
              obj.ProfitId=item.ProfitId;
              obj.SalesTargetId=item.SalesTargetId
              arr.push(obj)
            })
            // profit[0].
            this.$util.post(this,this.$api.updataTarget,{profit:profit,salesTarget:arr},()=>{
                this.getList(this.valueYear,this.currentShopId)
                this.showModel=false;
            })

          }else {
            let Profit=[{
              Amount:this.Amount,
              Year:this.valueYear,
              ShopId:this.currentShopId
            }];
            let arr=[]
            this.cost.forEach(item=>{
              let obj={};
              obj.Year=this.valueYear;
              obj.Name=item.Name;
              obj.Amount=item.Amount;
              obj.ShopId=this.currentShopId;
              obj.Profit=Profit;
              arr.push(obj)
            })
            this.$util.post(this,this.$api.addTarget,{model:arr},(data)=>{
              this.showModel=false;
              this.Amount=''
              this.cost=[{
                Name:'',
                Amount:''
              }]
            })
          }

        },
        //获取目标列表
        getList(year,shopid){
            this.$util.post(this,this.$api.targetList,{year:year,shopId:shopid},(data)=>{
              this.targetListValue=data;
              this.targetListValue.forEach(item=>{
                if(item.Quantity>100){
                  item.newQuantity=200
                }
              })
            })
        },

        //判断到什么年份
        hasTargetYear(shopid){
          this.$util.post(this,this.$api.hasTargetYear,{shopId:shopid},(data)=>{
            console.log(data);
            let date=new Date();
            let year=date.getFullYear();
            if(data.Year<year){
              let cha=year-data.Year;
              let arr=[];
              for(var i=0;i<cha;i++){
                let obj={}
                obj.date=`"${data.Year+i}"`
                obj.value=data.Year+i;
                arr.push(obj)
              }
              this.date=arr
            }else{
              this.date=[{
                date:`${year}`,
                value:year
              }]
            }
          })
        }
      },
      created(){
         let date=new Date();
         let year=date.getFullYear();
         this.valueYear=year;
        this.hasTargetYear();
      }
    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";

  .target-header{
    margin-top: 20px;
    display: flex;
    width: 1200px;
  .target-year{
    margin-left: 30px;
  }
    .base-btn{
      .base-btn(161px);
      margin-left: 30px;
      margin-top: 0;
    }
  }
  .target-content{
    background: #fff;
    margin-top: 60px;
    margin-bottom: 100px;
    .target-content-title{
      height: 55px;
      background: @bs-color;
      line-height: 55px;
    }
    .target-info{
      background: #fff;
      height:31px ;
      line-height: 31px;
    }
    .red,.green{
      display: inline-block;
      width: 14px;
      height: 14px;
    }
    .red{
      background: red;
      margin-right: 10px;
    }
    .green{
      background: #7ED321;
      margin-right: 10px;
    }
    .target-progress{
      margin-top: 30px;
      background:#F9F9F9;
      height: 52px;
      line-height: 52px;
      &-border{
        width: 100%;
        height: 100%;
        border-radius: 7px;
        border: 1px solid #E1E1E1;
      }
      &-content{
        width: 0%;
        height: 100%;
        background: red;
        border-radius: 7px;
      }
      &-border-ok{
        width: 100%;
        height: 100%;
        border-radius: 7px;
        background: #7ED321;
      }
    }
    .red-font {
      color: #D0021B;
    }
    .green-font{
      color:#7ED321;
    }
  }
  //弹窗
  .target-form{
    padding: 50px;
    width: 100%;
  }
  .base-btn{
    .base-btn(460px);
    margin-top: 50px;
  }
</style>
