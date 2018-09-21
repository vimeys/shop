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
      <el-row class="target-progress">
        <el-col :offset="1" span="12" style="height: 52px;line-height: 52px;padding: 20px">
          <van-progress :percentage="50" :color="redP"/>
        </el-col>
        <el-col :span="4" :class="{'green-font':green}">
          17000（达标20%）
        </el-col>
        <el-col :span="2" :offset="4">
          2018年1月
        </el-col>
      </el-row>
      <el-row class="target-progress">
        <el-col :offset="1" span="12" style="height: 52px;line-height: 52px;padding: 20px">
          <van-progress :percentage="50" :color="greenp"/>
        </el-col>
        <el-col :span="4" :class="{'red-font':red}">
          17000（达标20%）
        </el-col>
        <el-col :span="2" :offset="4">
          2018年1月
        </el-col>
      </el-row>
    </div>
    <div v-else>

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
            {
              date:'2016',
              value:2016
            },{
              date:'2017',
              value:2017
            },{
              date:'2018',
              value:2018
            },
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
          red:true,
          green:true,
          hasTarget:true,
          greenp:"#D0021B",
          redP:'#7ED321'
        }
      },
      methods:{
        getShop(e){
            this.currentShopId=e
          this.getList(this.valueYear,e)
        },
        selectShop(e){
            this.currentShopId=e;
            this.getList(this.valueYear,e)
        },
        //打开弹窗
        open(){
          this.showModel=true;

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
            this.cost.push({
              Name:'',
              Amount:''
            })
        },
        del(index){
          this.cost.splice(index,1)
        },
        addTarget(){
          let Profit=[{
            Amount:this.Amount,
            Year:this.valueYear,
            shopId:this.currentShopId
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
        },
        getList(year,shopid){
            this.$util.post(this,this.$api.targetList,{year:year,shopId:shopid},(data)=>{
              console.log(data);
            })
        }
      },
      created(){
         let date=new Date();
         let year=date.getFullYear();
         this.valueYear=year;

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
