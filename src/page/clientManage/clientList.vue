/**
*   Created By  YS  on 2018/8/3
*   客户列表
*/
<template>
  <div class="box">
    <div class="open-card-btn" @click="openCard">开卡</div>
    <el-tabs v-model="activeName" @tab-click="handleClick" value="first">
      <el-tab-pane label="会员用户" name="first">
        <div class="header">
          <div class="btn">导出EXCEL</div>
          <ys-search :placeholder="placeholder"></ys-search>
          <ys-select-shop></ys-select-shop>
        </div>
        <div class="select-bar">
          <!--<el-select v-model="value123" @change="change" placeholder="满减券" class="select">-->
            <!--<el-option-->
              <!--v-for="item in options"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        </div>
        <div class="table">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="姓名"
              width="130">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="手机号"
              width="130">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="成为会员时间"
              width="130">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="已消费金额"
              width="130">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>姓名: {{ scope.row.name }}</p>
                  <p>住址: {{ scope.row.address }}</p>
                  <div slot="reference" class="name-wrapper">
                    <!--<el-tag size="medium">{{ scope.row.name }}</el-tag>-->
                    {{scope.row.name}}
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="消费次数"
              width="80">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>姓名: {{ scope.row.name }}</p>
                  <p>住址: {{ scope.row.address }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <!--<el-table-column-->
              <!--label="等级"-->
              <!--prop="tap"-->
              <!--:filters="[{ text: '待服务', value: '待服务' }, { text: '已服务', value: '已服务' }]"-->
              <!--:filter-method="filterTag"-->
              <!--width="180">-->
              <!--<template slot-scope="scope">-->
                <!--<el-popover trigger="hover" placement="top">-->
                  <!--<p>姓名: {{ scope.row.name }}</p>-->
                  <!--<p>住址: {{ scope.row.address }}</p>-->
                  <!--<div slot="reference" class="name-wrapper">-->
                    <!--<el-tag size="medium">{{ scope.row.name }}</el-tag>-->
                  <!--</div>-->
                <!--</el-popover>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column label="充值记录">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  class="base-btn"
                  @click="handleEdit(scope.$index, scope.row)">查询</el-button>
              </template>
            </el-table-column>
            <el-table-column label="消费信息">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  class="base-btn"
                  @click="handleHistory(scope.$index, scope.row)">查询</el-button>
              </template>
            </el-table-column>
            <el-table-column label="会员卡查询">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  class="base-btn"
                  @click="handleEdit(scope.$index, scope.row)">查询</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--<div class="table-btns">-->

          <!--</div>-->
        </div>
        <ys-popup
          v-show="pay.showModal"
          @close="close"
          :width='pay.pWidth'
          :height="pay.pHeight"
        >
          <div class="pay">
            <el-row class="title">
              <el-col :span="6" :offset="4">修改密码</el-col>
            </el-row>
            <el-row>
              <el-col><img src="@/assets/images/testCode.png" alt=""></el-col>
            </el-row>
            <el-row class="row">
              <el-col>
                <div class="psw-btn">确定</div>
              </el-col>
            </el-row>
          </div>
        </ys-popup>

        <!--&lt;!&ndash;//支付&ndash;&gt;-->
        <!--<ys-popup-->
          <!--:width="pay.width"-->
          <!--:height="pay.height"-->
          <!--v-show="pay.showModel"-->
          <!--@close="closePayPopup"-->
        <!--&gt;-->

        <!--</ys-popup>-->

        <!--//开卡...-->
        <ys-popup
          v-show="opc.showModal"
          @close="close"
          :width='opc.pWidth'
          :height="opc.pHeight"
        >
          <div class="table-box">
            <el-row class="row">
              <el-col :span="24">开卡</el-col>
            </el-row>
            <el-scrollbar class="scroll">
             <el-row class="row">
               <el-col :span="6">
                 <input type="text" placeholder="请输入会员姓名" class="input" v-model="GameusersName">
               </el-col>
               <el-col :span="9" :offset="1">
                 <input type="text" placeholder="请输入会员手机号" class="input" v-model="PhoneNum">
               </el-col>
               <el-col :span="5" :offset="1">
                 <!--<el-select v-model="carlType" size="small" placeholder="请选择">-->
                   <!--<el-option-->
                     <!--v-for="item in cardList"-->
                     <!--:key="item.value"-->
                     <!--:label="item.label"-->
                     <!--:value="item.value">-->
                   <!--</el-option>-->
                 <!--</el-select>-->
                 <div class="btn-moban" @click="openChooseMoban">选择模板卡</div>
               </el-col>
             </el-row>
              <div v-if="!isUserMoban">
                <el-row class="row">
                  <el-col :span="4" class="base-col">会员卡类型</el-col>
                  <el-col :span="19" >
                    <el-select v-model="carlType"  size="small" placeholder="请选择">
                      <el-option
                        v-for="item in cardList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <!--<el-row>-->
                    <!--<el-col :span="22"><div class="box">洗剪吹</div></el-col>-->
                    <!--<el-col :span="1" :offset="1">-->
                    <!--<div class="coupon-radio" >-->
                    <!--<div class="coupon-radio-point"></div>-->
                    <!--</div>-->
                    <!--</el-col>-->
                    <!--</el-row>-->
                    <!--<el-row>-->
                    <!--<el-col :span="22"><div class="box">洗剪吹</div></el-col>-->
                    <!--<el-col :span="1" :offset="1" >-->
                    <!--<div class="coupon-radio" >-->
                    <!--<div class="coupon-radio-point"></div>-->
                    <!--</div>-->
                    <!--</el-col>-->
                    <!--</el-row>-->
                    <!--<el-row>-->
                    <!--<el-col :span="22"><div class="box">洗剪吹</div></el-col>-->
                    <!--<el-col :span="1" :offset="1">-->
                    <!--<div class="coupon-radio" >-->
                    <!--<div class="coupon-radio-point"></div>-->
                    <!--</div>-->
                    <!--</el-col>-->
                    <!--</el-row>-->
                  </el-col>
                </el-row>
                <el-row class="row">
                  <el-col :span="4" class="base-col">服务范围</el-col>
                  <el-col :span="19" >
                    <el-select v-model="typeNum" multiple size="small" placeholder="请选择">
                      <el-option
                        v-for="item in typeList"
                        :key="item.value"
                        :label="item.Name"
                        :value="item.GoodsTypeId">
                      </el-option>
                    </el-select>
                    <!--<el-row>-->
                    <!--<el-col :span="22"><div class="box">洗剪吹</div></el-col>-->
                    <!--<el-col :span="1" :offset="1">-->
                    <!--<div class="coupon-radio" >-->
                    <!--<div class="coupon-radio-point"></div>-->
                    <!--</div>-->
                    <!--</el-col>-->
                    <!--</el-row>-->
                    <!--<el-row>-->
                    <!--<el-col :span="22"><div class="box">洗剪吹</div></el-col>-->
                    <!--<el-col :span="1" :offset="1" >-->
                    <!--<div class="coupon-radio" >-->
                    <!--<div class="coupon-radio-point"></div>-->
                    <!--</div>-->
                    <!--</el-col>-->
                    <!--</el-row>-->
                    <!--<el-row>-->
                    <!--<el-col :span="22"><div class="box">洗剪吹</div></el-col>-->
                    <!--<el-col :span="1" :offset="1">-->
                    <!--<div class="coupon-radio" >-->
                    <!--<div class="coupon-radio-point"></div>-->
                    <!--</div>-->
                    <!--</el-col>-->
                    <!--</el-row>-->
                  </el-col>
                </el-row>
                <el-row class="row">
                  <el-col :span="4" class="base-col">有效期限</el-col>
                  <el-col :span="19">
                    <el-select v-model="yearNum" size="small" placeholder="请选择">
                      <el-option
                        v-for="item in year"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row class="row">
                  <el-col :span="4">
                    {{tips[carlType].name1}}
                  </el-col>
                  <el-col :span="19">
                    <!--<input type="text" placeholder="请输入会员卡的折扣" class="input">-->
                    <input type="text"
                           v-model.number="Discount"
                           v-if="carlType==0"
                           class="base-input"
                           :placeholder="tips[carlType].placeholder1">
                    <input type="text"
                           v-model.number="Discount"
                           v-else-if="carlType==1"
                           class="base-input"
                           :placeholder="tips[carlType].placeholder1">
                    <input type="text"
                           v-model.number="Frequency"
                           v-else="carlType==2"
                           class="base-input"
                           :placeholder="tips[carlType].placeholder1">
                  </el-col>
                </el-row>
                <el-row class="row">
                  <el-col :span="4" class="base-col">
                    充值金额
                  </el-col>
                  <el-col :span="19">
                    <el-row>
                      <el-col>
                        <input type="text"
                               v-model="buyMoney"
                               placeholder="请输入继续充值该会员卡的金额"
                               class="input">
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col class="small-font">· 继续充值的金额大于等于购买金额</el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <div v-else class="card-box">
                <ys-vip-card
                  :detail="currentMoban"
                >

                </ys-vip-card>
              </div>
              <el-row class="row">
                <el-col>
                  <div class="opc-btn" @click="handleEdit">开通会员</div>
                </el-col>
              </el-row>
            </el-scrollbar>
          </div>
        </ys-popup>


        <!--//选择会员卡模板-->
        <ys-popup
          v-show="moBan.showModal"
          :width="moBan.width"
          :height="moBan.height"
          :zIndex="moBan.zIndex"
          @close="closeMoban"
        >
          <div  style="width: 100%;">
            <el-row class="moban-title">
              <el-col :span="5" :offset="2">
                <h4>选择模板卡</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="2" :span="22">
                  <el-scrollbar class="moban-scroll">
                      <template v-for="(item,index) in cardListType">
                        <ys-vip-card
                          :detail="item"
                          :index="index"
                          @chooseCard="chooseCard"
                        ></ys-vip-card>
                      </template>
                  </el-scrollbar>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="moban-btn" @click="confirmMoban">确定</div>
              </el-col>
            </el-row>
          </div>
        </ys-popup>

        <!--消费记录-->
        <ys-popup  :showModal="history.showModal"
                   v-show="history.showModal"
                   @close="closeHistory"
                   :width='history.pWidth'
                   :height="history.pHeight"
        >
          <div class="history">
            <el-row class="history-word">
              <el-col><h3>消费信息</h3></el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="history-title">
                  <div>Mact消费记录</div>
                  <div>
                    总消费：￥281813
                  </div>
                </div>
                <el-table class="history-table"
                          :height="500"
                          :data="vipPriceTable">
                  <el-table-column
                    label="消费项目"
                    width="200">
                    <template slot-scope="scope">
                      <!--<i class="el-icon-time"></i>-->
                      <span style="margin-left: 10px">{{ scope.row.project }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="消费金额"
                    width="203">
                    <template slot-scope="scope">
                      <!--<i class="el-icon-time"></i>-->
                      <span style="margin-left: 10px">{{ scope.row.price }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
        </ys-popup>
        <!--充值记录-->
      <ys-popup
        v-show="payHistory.showModal"
        @close="closePayHistory"
        :width='payHistory.pWidth'
        :height="payHistory.pHeight"
      >
        <div class="history">
          <el-row class="history-word">
            <el-col><h3>消费信息</h3></el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="payhistory-title">
                <div>Mact消费记录</div>
              </div>

              <el-table class="history-table"
                        :height="500"
                        :data="vipPriceTable">
                <el-table-column
                  label="消费项目"
                  width="300">
                  <template slot-scope="scope">
                    <!--<i class="el-icon-time"></i>-->
                    <span style="margin-left: 10px">{{ scope.row.project }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="消费金额"
                  width="300">
                  <template slot-scope="scope">
                    <!--<i class="el-icon-time"></i>-->
                    <span style="margin-left: 10px">{{ scope.row.price }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>


      </ys-popup>

      </el-tab-pane>
      <el-tab-pane label="普通用户" name="second">
          <div class="box">
            <div class="header">
              <div class="btn">导出EXCEL</div>
              <ys-search :placeholder="placeholder"></ys-search>
            </div>
            <div class="select-bar">
              普通用户列表
            </div>
            <div class="table">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column
                  label="姓名"
                  width="220">
                  <template slot-scope="scope">
                    <!--<i class="el-icon-time"></i>-->
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="手机号"
                  width="220">
                  <template slot-scope="scope">
                    <!--<i class="el-icon-time"></i>-->
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="累积消费金额"
                  width="220">
                  <template slot-scope="scope">
                    <!--<i class="el-icon-time"></i>-->
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="消费次数"
                  width="220">
                  <template slot-scope="scope">
                    <!--<i class="el-icon-time"></i>-->
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="消费记录">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      class="base-btn"
                      @click="handleEdit(scope.$index, scope.row)">查询</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="block">
              <!--<el-pagination-->
                <!--prev-text="上一页"-->
                <!--next-text="下一页"-->
                <!--@size-change="changeSize"-->
                <!--@prev-click="prev"-->
                <!--@current-change="current"-->
                <!--layout="prev, pager, next"-->
                <!--class="page"-->
                <!--:total="1000">-->
              <!--</el-pagination>-->
            </div>
          </div>
      </el-tab-pane>
      <ys-pay @close="closePay" :showModel="payShowModel">
      </ys-pay>
    </el-tabs>

  </div>
</template>

<script>
  import ysSearch from '@/components/search';
  import  ysPay from '@/components/pay'
  import  ysSelectShop from '@/components/selectShop'
  import  ysPopup from '@/components/popup'
  import  ysVipCard from "@/components/vipCard"
    export default {
      name: "clientList",
      components: {
        ysSearch,
        ysPopup,
        ysSelectShop,
        ysPay,
        ysVipCard
      },
      data(){
        return {
          activeName:'first',
          value123:'',
          opc:{//开发弹窗
            showModal:false,
            pWidth:760,
            pHeight:608,
          },
          history:{//消费记录
            showModal:false,
            pWidth:504,
            pHeight:708,
          },
          payHistory:{
            showModal:false,
            pWidth:700,
            pHeight:812,
          },
          pay:{//付费页面
            showModel:false,
            width:759,
            height:748,
          },
          moBan:{
            width:470,
            height:850,
            zIndex:1000,
            showModal:false
          },
          placeholder:'搜索对应标签',
          value5:'',
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }],
          payShowModel:false,
          GameusersName:'',//会员名称
          PhoneNum:'',//会员电话
          buyMoney:'',//购买金额
          Frequency:'',//次数
          Discount:'',//折扣价
          carlType:0,//充值卡类型
          cardList:[
            {
              value:0,
              label: '充值卡'
            },{
              value:1,
              label: '定制卡'
            },{
              value:2,
              label: '次卡'
            }
          ],
          typeNum:'2',
          typeList:[],
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
              name1:'使用次数',
              placeholder1:'请输入该会员卡的可用次数',
              // name2:'最低充值次数',
              // placeholder2:'继续充值的次数',
              // placeholder3:'该次数的金额'
            },
          ],
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            tag:'已服务'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            tag:'已服务'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            tag:'待服务'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            tag:'待服务'
          }],
          vipPriceTable:[],//会员消费记录
          vipList:[],//会员列表
          cardListType:[],//会员卡列表
          currentMoban:"",//当前选中的模板
          isUserMoban:false,//是否使用当前模板
        }
      },
      methods:{
        handleClick(tab, event){
          // switch (this.activeName) {
          //   case 'second':
          //     this.$router.replace({
          //       path: '/logo'
          //     });
          //     break;
          //   case 'first':
          //     this.$router.replace({
          //       path: '/diyImage'
          //     });
          //     break;
          // }
        },
        filterTag(){

        },
        change(){},

        //分页器切换

        prev(e){
          console.log(e);
        },
        current(val){
          console.log(val);
        },
        closePay(){

        },
        closePayHistory(){
          this.payHistory.showModal=false
        },

        //关闭消费记录
        closeHistory(){
            this.history.showModal=false
        },

        // 选择模板卡
        openChooseMoban(){
             this.moBan.showModal=true;
        },
        closeMoban(){
            this.moBan.showModal=false
          this.cardListType.forEach(item=>{
            item.hasBorder=false;
          })
        },
        //确定选择模板卡
        confirmMoban(index){
            this.isUserMoban=true
          this.moBan.showModal=false
        },

        //todo 开通会员卡报错
        //开卡
        handleEdit(tab,event){
            // this.opc.showModal=true;
            let obj={ model:
                { GameusersName:this.GameusersName,
                  PhoneNum :this.PhoneNum,
                  MembershipName :'',
                  MembershipType :this.carlType+1,
                  Effective :this.yearNum>0?this.yearNum*12:-1,
                  Frequency :this.Frequency?this.Frequency:0,
                  Type:2,
                  BuyAmount :this.buyMoney?this.buyMoney:0,
                  // BuyAmount :1000,
                  Minimum :2,
                  Discount :this.Discount?this.Discount:0,
                  Content:'123',
                  GoodsType:this.typeNum
                }
        }
        if(this.carlType===0){
          obj.model.MembershipName='充值卡'
        }else if(this.carlType=1){
          obj.model.MembershipName='定制卡'
        }else{
          obj.model.MembershipName='次卡'
        }
        // try{
        //   let arr=[];
        //     this.typeNum.forEach(item=>{
        //         arr.push({GoodsTypeId:item})
        //     })
        //   obj.model.GoodsType=arr;
        // }catch (err) {
        //   console.log(err);
        // }
          // console.log(obj);
          // console.log('执行到这里');
          // return
        this.$http.post(this.$api.openVipCard,obj).then(json=>{
          let data=json.data
          if(data.isSuc==true){

          }
        })
        },
        //查询消费记录
        handleHistory(){
            this.history.showModal=true;
            this.$http.post('http://rap2api.taobao.org/app/mock/84341/vipPriceList',{})
              .then(json=>{
                this.vipPriceTable=json.data.table;
              })
        },

        // pay(){
        //   this.
        // },


        //弹起开卡弹窗
        openCard(e){
          console.log(e);
          this.opc.showModal=true
        },
        chose(){
          console.log(123);
        },
        close(e){
          this.pay.showModel=e;
          // this.code.showModal=e;
          this.opc.showModal=e;
          this.history.showModal=e;
        },
        //获取分类(服务范围)
        getTypeList(){
          this.$http.post(this.$api.typeList,{type:2}).then(json=>{
            let data=json.data
            console.log(data);
            if(data.isSuc=true){
                this.typeList=data.result
            }
          })
        },
        chooseCard(e){

          this.cardListType.forEach(item=>{
            item.hasBorder=false
          })
          this.currentMoban=Object.assign({},this.cardListType[e]);
          this.cardListType[e].hasBorder=true
        },
        //获取会员列表
        getVipList(){
          this.$http.post(this.$api.getVipList,{ pageIndex:1,pageSize:10,isvip:1,key:''}).then(json=>{
            let data=json.data
            console.log(data);
            if(data.isSuc=true){
              this.vipList=data.result
            }
          })
        },
        //获取会员卡列表
        getCardList(){
          let obj={}
          obj.pageIndex=1;
          obj.pageSize=10;
          obj.isEnable=-1;
          this.$util.post(this,this.$api.memberCardList,obj,(data)=>{
            data.Items.forEach(item=>{
              item.hasChecked=false;
              item.isChecked=false;
              item.hasBorder=false
            });
            this.cardListType=data.Items;

          })
        },
      },
      mounted(){
          this.getTypeList();//获取分组列表
          this.getVipList();//获取会员列表
        this.getCardList()
      }
    }
</script>

<style lang='less' scoped>
@import "~@/assets/style/mixin";
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar{
      display: none;
  }
  /deep/ .el-input--small .el-input__inner {
    height: 36px !important;
    line-height: 36px !important;
  }
  .box{
    width:1200px;
    margin-top: 30px;
  }
.open-card-btn{
  .base-btn-111;
  position: relative;
  top:30px;
  right: -500px;
  z-index: 50;
}
  .header{
    display: flex;
    justify-content: space-between;
    .btn{
      .base-btn-111;
    }
  }
  .select-bar{
    width: 100%;
    height: 47px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background:@bs-color;
    margin-top: 30px;
    padding-right: 20px;
  }
  .table{
    /deep/ th{
      padding: 0;
      text-align: center;
    }
    /deep/ .base-btn{
      background: @bs-color;
      border: none;
    }
    /deep/ .base-btn:hover{
      color:#222;
    }
    /deep/ th > .cell{
      padding: 10px 0;
      background: #F5F5F5;
    }
    .table-btns{
      width: 100%;
      height: 90px;
      background: #fff;
      position: relative;
      top:0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      div.btn{
        .base-btn-111;
        margin-left: 30px;
      }
    }

  }
  .title{
    /*margin-top: ;*/
  }
  .block{
    margin-top: 30px;
    .page{
      height: 100px;
    }
  }

  /*开卡弹窗*/
  .table-box{
    width: 100%;
    padding: 50px 0 50px 30px;
    box-sizing: border-box;
    >.row{
      /*border: 1px solid red;*/
    }
  }

  .coupon-radio{
    margin-top: 22px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #ffd73a;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    .coupon-radio-point{
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: #ffd73a;
    }
  }
  .scroll{
    width: 100%;
    height: 700px;
     /*/deep/ .el-scrollbar__wrap::-webkit-scrollbar{*/
      /*display: none;*/
    /*}*/
    /deep/ .el-scrollbar__thumb{
      background: @bs-color;
    }
    .row{
      margin: 30px 0;
    }
    .input{
      .base-input;
    }
    .box{
      width: 100%;
      height: 36px;
      border: 1px solid #d8d8d8;
      line-height: 36px;
      text-align: center;
      margin: 15px 0;
      border-radius: 4px;
    }
    .opc-btn{
      .base-btn-111
    }
  }
  /*消费信息弹窗*/
  .history{
  width: 100%;
    padding: 50px 50px 0;
    &-word{
      margin-top: 20px;
      margin-bottom: 30px;
      text-align: left;
      font-size: 20px;
      color:#282828;

    }
    &-title{
      display: flex;
      width:403px;
      height:47px;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
      background:rgba(255,215,54,1);
      >div{
        flex: 1;
        text-align: center;
        line-height: 47px;
      }

    }
    &-table{
      /deep/ .cell{
        text-align: center;
      }
    }
  }
.payhistory-title{
  width: 600px;
  height:47px;
  background:rgba(255,215,54,1);
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  >div{
    flex: 1;
    text-align: center;
    line-height: 47px;
  }
}
    //支付页面弹窗
  .pay{
    width: 100%;
    height: 100%;

  }
//todo  修改按钮样式
/deep/ .el-select--small{
  width: 100%;
}
/deep/ input{
  text-align: center;
}

  //todo 修改分页器样式
  /deep/ .el-pager li{
    height: 31px;
    width: 31px;
    line-height: 31px;
    color:#282828;
    margin: 0 7px;
    background: #d8d8d8;
    border-radius: 2px;
}
  /deep/ .el-pager li.active{
    background: #FFD736;
  }
  /deep/.el-pagination button{
    width:72px;
    padding: 0 6px;
    height:31px !important;
    text-align: center;
    background:rgba(216,216,216,1);
    border-radius:2px;;
  }
  /deep/ .el-pagination .btn-next{
    background: #FFD736;
    color: #282828;
    margin-left: 10px;
  }
  /deep/ .el-pagination .btn-prev{
    background: #FFD736;
    color: #282828;
    margin-right: 10px;
  }
.btn-moban{
    .base-btn(180px)
}
    /*选择模板卡*/
  .moban-title{
    margin-top: 70px;
  }
.moban-scroll{
  width: 100%;
  height: 620px;
}
.moban-btn{
  .base-btn(334px);
  margin-top: 30px;
}
  .card-box{
    width: 100%;
    justify-content: center;
    display: flex;
  }
</style>
