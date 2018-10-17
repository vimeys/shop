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
          <ys-search :placeholder="placeholder" @search="searchVIp"></ys-search>
          <ys-select-shop @getShop="getShop"
                          @selectShop="selectShop"></ys-select-shop>
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
            :data="vipList"
            style="width: 100%">
            <el-table-column
              label="姓名"
              width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.NickName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="手机号"
              width="180">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.PhoneNum }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="成为会员时间"
              width="180">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.CreateDate|dateChange }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="已消费金额"
              width="180">
              <template slot-scope="scope">
                <!--<el-popover trigger="hover" placement="top">-->
                  <!--<p>姓名: {{ scope.row.name }}</p>-->
                  <!--<p>住址: {{ scope.row.address }}</p>-->
                  <!--<div slot="reference" class="name-wrapper">-->
                    <!--&lt;!&ndash;<el-tag size="medium">{{ scope.row.name }}</el-tag>&ndash;&gt;-->
                    <!--{{scope.row.name}}-->
                  <!--</div>-->
                <!--</el-popover>-->
                <span style="margin-left: 10px">{{ scope.row.Money }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="消费次数"
              width="180">
              <template slot-scope="scope">
                <!--<el-popover trigger="hover" placement="top">-->
                  <!--<p>姓名: {{ scope.row.name }}</p>-->
                  <!--<p>住址: {{ scope.row.address }}</p>-->
                  <!--<div slot="reference" class="name-wrapper">-->
                    <!--<el-tag size="medium">{{ scope.row.name }}</el-tag>-->
                  <!--</div>-->
                <!--</el-popover>-->
                <span style="margin-left: 10px">{{ scope.row.ConsumeCount||0 }}</span>
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
                  @click="checkPayList(scope.$index, scope.row)">查询</el-button>
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
                  @click="checkVipCard(scope.$index, scope.row)">查询</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--<div class="table-btns">-->

          <!--</div>-->
          <div class="page-size-box">
            <el-pagination
              prev-text="上一页"
              next-text="下一页"
              :page-size="pageSize"
              @prev-click="prev"
              @next-click="next"
              @current-change="current"
              layout="prev, pager, next"
              class="page"
              :total="total">
            </el-pagination>
          </div>
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


        <!--充值记录-->
      <ys-popup
        v-show="payHistory.showModal"
        @close="closePayHistory"
        :width='payHistory.pWidth'
        :height="payHistory.pHeight"
      >
        <div class="history">
          <el-row class="history-word">
            <el-col><div class="base-h3">消费信息</div></el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="payhistory-title">
                <div>{{currentName}}消费记录</div>
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
        <!--会员持有会员卡-->
       <ys-popup
        :width="vipCard.width"
        :height="vipCard.height"
        v-show="vipCard.showModal"
        @close="closeVipCard"
       >
         <div class="vip-card-list">
           <el-row class="history-word">
             <el-col><h3>会员卡查询</h3></el-col>
           </el-row>
           <el-row>
             <el-col :span="8" style="margin-bottom:30px;margin-left: 25px">持卡用户：{{currentName}}</el-col>
           </el-row>
           <el-row>
             <el-col>
               <el-scrollbar class="vip-card-scroll">
                <template v-for="item in vipHasList">
                  <ys-vip-card
                    :detail="item"
                    :hasSold="hasSold"
                  ></ys-vip-card>
                </template>
               </el-scrollbar>
             </el-col>
           </el-row>
           <el-row>
             <el-col>
               <div class="vip-btn">
                 确定
               </div>
             </el-col>
           </el-row>
         </div>
       </ys-popup>

      </el-tab-pane>


      <el-tab-pane label="普通用户" name="second">
          <div class="box">
            <div class="header">
              <div class="btn">导出EXCEL</div>
              <ys-search :placeholder="placeholder" @search="search"></ys-search>
              <ys-select-shop @getShop="getShop"
                              @selectShop="selectShop">
              </ys-select-shop>
            </div>
            <div class="select-bar">
              普通用户列表
            </div>
            <div class="table">
              <el-table :data="defaultList" style="width: 100%">
                <el-table-column
                  label="姓名"
                  width="220">
                  <template slot-scope="scope">
                    <!--<i class="el-icon-time"></i>-->
                    <span style="margin-left: 10px">{{ scope.row.NickName }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="手机号"
                  width="220">
                  <template slot-scope="scope">
                    <!--<i class="el-icon-time"></i>-->
                    <span style="margin-left: 10px">{{ scope.row.PhoneNum }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="累积消费金额"
                  width="220">
                  <template slot-scope="scope">
                    <!--<i class="el-icon-time"></i>-->
                    <span style="margin-left: 10px">{{ scope.row.Money }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="消费次数"
                  width="220">
                  <template slot-scope="scope">
                    <!--<i class="el-icon-time"></i>-->
                    <span style="margin-left: 10px">{{ scope.row.ConsumeCount||0 }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="消费记录">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      class="base-btn"
                      @click="handledefault(scope.$index, scope.row)">查询</el-button>
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
            <div class="page-size-box">
              <el-pagination
                prev-text="上一页"
                next-text="下一页"
                :page-size="pageSize2"
                @prev-click="prev2"
                @next-click="next2"
                @current-change="current2"
                layout="prev, pager, next"
                class="page"
                :total="total2">
              </el-pagination>
            </div>
          </div>
      </el-tab-pane>




      <ys-pay @close="closePay"
              :showModel="payShowModel"
              @payOk="payOk"
              :image="codeImage"
      >

      </ys-pay>
      <!--消费记录-->
      <ys-popup  :showModal="history.showModal"
                 v-show="history.showModal"
                 @close="closeHistory"
                 :width='history.pWidth'
                 :height="history.pHeight"
      >
        <div class="history">
          <el-row class="history-word">
            <el-col><div class="base-h3">消费信息</div></el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="history-title">
                <div>{{currentName}}消费记录</div>
                <div>
                  总消费：￥{{}}
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
      <!--//开卡-->
      <ys-popup
        v-show="opc.showModal"
        @close="close"
        :width='opc.pWidth'
        :height="opc.pHeight"
      >
        <div class="table-box">
          <el-row class="row">
            <el-col :span="24"><div class="base-h3">开卡</div></el-col>
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
                :hasSold="hasSold"
              >
              </ys-vip-card>
            </div>
            <el-row class="row">
              <el-col>
                <div class="opc-btn" @click="confirm">开通会员</div>
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
              <div class="base-h3">选择模板卡</div>
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
    </el-tabs>

  </div>
</template>

<script>
  import ysSearch from '@/components/search';
  import ysPay from '@/components/pay'
  import ysSelectShop from '@/components/selectShop'
  import ysPopup from '@/components/popup'
  import ysVipCard from "@/components/vipCard"

  export default {
      name: "clientList",
      components: {
        ysSearch,
        ysPopup,
        ysSelectShop,
        ysPay,
        ysVipCard
      },
      filters:{
        dateChange(val){
          try{
            var first =val.indexOf('(');
            var last =val.indexOf(')');
            var time=val.substring(first+1,last)
          }catch(err){
            console.log(err);
          }

          time=new Date(parseInt(time-8*60*60*1000));
          // return
          const year = time.getFullYear()
          const month = time.getMonth() + 1
          const day = time.getDate()
          const hour = time.getHours()
          const minute = time.getMinutes()
          const second = time.getSeconds()
          const formatNumber = n => {
            n = n.toString()
            return n[1] ? n : '0' + n
          }
          return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')

        }
      },
      data(){
        return {
          activeName:'first',
          value123:'',
          opc:{//开卡弹窗
            showModal:false,
            pWidth:760,
            pHeight:608,
          },
          history:{//消费记录
            showModal:false,
            pWidth:504,
            pHeight:708,
          },
          payHistory:{//充值记录
            showModal:false,
            pWidth:700,
            pHeight:812,
          },
          vipCard:{
            width:470,
            height:850,
            showModal:false
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
          codeImage:'',//二维码图片
          placeholder:'搜索对应标签',
          value5:'',
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }],
          resultData:'',
          payShowModel:false,
          currentShopId:'',//当前店铺名称
          GameusersName:'',//会员名称
          PhoneNum:'',//会员电话
          buyMoney:'',//购买金额
          Frequency:'',//次数
          Discount:'',//折扣价
          carlType:0,//充值卡类型
          pageSize:10,//分页条数
          pageSize2:10,//分页条数
          total:1,//分页总数
          total2:1,//分页总数
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
          typeNum:'',
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
          tableData: [],
          vipPriceTable:[],//会员消费记录
          vipList:[],//会员列表
          defaultList:[],//普通会员
          cardListType:[],//会员卡列表
          currentMoban:"",//当前选中的模板
          isUserMoban:false,//是否使用当前模板
          currentName:'',//当前查看人员的名字
          vipHasList:[],//会员持有的会员卡
          hasSold:false,//是否已售
          vipSearchValue:'',
          searchValue:'',
        }
      },
      methods:{
        getShop(e){
          this.currentShopId=e
          this.getCardList(e)
          this.getVipList(e)
          this.getDefaultList(e)
        },
        selectShop(e){
          this.currentShopId=e
          this.getCardList(e)
          this.getVipList(e);
          this.getDefaultList(e)
        },
        //搜索会员
        searchVIp(val){
          this.vipSearchValue=val
          this.getVipList(this.currentShopId,val);
        },
        //搜索普通用户
        search(val){
          this.searchValue=val
            this.getDefaultList(this.currentShopId,val)
        },

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

        //关闭支付页面
        closePay(){
            this.payShowModel=false
        },
        //关闭充值记录
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
        confirm(tab, event) {
          // this.opc.showModal=true;
          if(this.currentMoban){//是否使用模板卡
              var obj={
                model:{
                  MembershipCardId:this.currentMoban.MembershipCardId,
                  GameusersName: this.GameusersName,
                  PhoneNum: this.PhoneNum,
                },
                shopId:this.currentShopId
              }
          }else {//不使用模板卡
            var obj = {
              model:
                {
                  MembershipCardId:0,
                  GameusersName: this.GameusersName,
                  PhoneNum: this.PhoneNum,
                  MembershipName: '',
                  MembershipType: this.carlType + 1,
                  Effective: this.yearNum > 0 ? this.yearNum * 12 : -1,
                  Frequency: this.Frequency ? this.Frequency : 0,
                  Type: 2,
                  BuyAmount: this.buyMoney ? this.buyMoney : 0,
                  // BuyAmount :1000,
                  Minimum: 2,
                  Discount: this.Discount ? this.Discount : 0,
                  Content: '123',
                  GoodsType: this.typeNum
                },
              shopId:this.currentShopId
            }
            if (this.carlType === 0) {
              obj.model.MembershipName = '充值卡'
            } else if (this.carlType = 1) {
              obj.model.MembershipName = '定制卡'
            } else {
              obj.model.MembershipName = '次卡'
            }
          }

          this.$util.post(this,this.$api.openVipCard,obj,(data)=>{
            this.opc.showModal=false;
            this.resize()
            this.resultData=data;
            this.getVipList(this.currentShopId)
            this.getDefaultList(this.currentShopId)
            this.$util.post(this,this.$api.payCode,
              data,
              (data2)=>{
                this.codeImage=data2
              this.payShowModel=true
            },true)
          })
        },
        //充值填写的内容
        resize(){
          this.GameusersName='';
          this.PhoneNum='';
          this.carlType=0;
          this.yearNum=1;
          this.Frequency='';
          this.buyMoney="";
          this.Discount="";
          this.typeNum=''
        },
        // 其他支付方式
        payOk(val){
          let newObj=this.resultData;
          newObj=Object.assign({},newObj,{payType:0})
          newObj.GameUsersCardId=0
          this.$util.post(this, this.$api.payMoney,
            newObj,
            (data) => {
                this.payShowModel=false
            }
          )
        },
        //查看会员充值记录
        checkPayList(index,row){
          this.payHistory.showModal=true;
          console.log(123);
          this.$util.post(this,
            this.$api.getVipPriceList,
            {pageIndex:1, pageSize:100,gameUserId:row.GameUserId, type:2},
            (data)=>{
            this.vipPriceTable=data.Items;
              console.log(row);
              this.currentName=row.NickName
          })
        },
        //查询会员消费记录
        handleHistory(index,row){
            this.history.showModal=true;
          console.log(row);
          this.$util.post(this, this.$api.getVipPriceList,
            {pageIndex: 1, pageSize: 100, gameUserId: row.GameUserId, type: 1},
            (data) => {
              this.vipPriceTable = data.Items;
              this.currentName = row.NickName;
            })
        },
        //普通会员消费记录
        handledefault(index,row){
          this.history.showModal=true;
          this.$util.post(this,this.$api.getVipPriceList,{pageIndex:1, pageSize:100,gameUserId:row.GameUserId, type:2},(data)=>{
            this.vipPriceTable=data.Items;
            this.currentName=row.NickName
          })
        },
        //查询会员的会员卡
        checkVipCard(index,row){
          this.vipCard.showModal=true
          this.$util.post(this,this.$api.getVipCardList,{gameusersId:row.GameUserId,shopId:this.currentShopId},(data)=>{
            this.vipCard.showModal=true
            this.vipHasList=data
            this.currentName=row.NickName
          })
        },
        closeVipCard(){
            this.vipCard.showModal=false;

        },


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
          this.isUserMoban=false
          this.resize()
        },
        //获取分类(服务范围)
        getTypeList(){
          this.$http.post(this.$api.typeList,{type:2}).then(json=>{
            let data=json.data;
            if(data.isSuc=true){
                this.typeList=data.result
            }
          })
        },
        // 上一页
        prev(e){
          this.getVipList(this.currentShopId,this.vipSearchValue,e,10)
        },
        // 下一页
        next(e){
          this.getVipList(this.currentShopId,this.vipSearchValue,e,10)
        },
        // 当前页点击
        current(e){
          this.getVipList(this.currentShopId,this.vipSearchValue,e,10)
        },
        // 普通会员上一页
        prev2(e){
          this.getDefaultList(this.currentShopId,this.searchValue,e,10)
        },
        // 普通会员下一页
        next2(e){
          this.getDefaultList(this.currentShopId,this.searchValue,e,10)
        },
        // 普通会员当前页点击
        current2(e){
          this.getDefaultList(this.currentShopId,this.searchValue,e,10)
        },
        //选择模板卡
        chooseCard(e){
          this.cardListType.forEach(item=>{
            item.hasBorder=false
          })
          this.currentMoban=Object.assign({},this.cardListType[e]);
          this.cardListType[e].hasBorder=true
        },
        //获取会员列表
        getVipList(shopId,key='',pageIndex=1,pageSize=10,isvip=1,){
          this.$http.post(this.$api.getVipList,
            {shopId:shopId,
              pageIndex:pageIndex,
              pageSize:pageSize,
              isvip:isvip,
              key:key})
            .then(json=>{
            let data=json.data
            if(data.isSuc=true){
              this.vipList=data.result.Items
              this.total=parseInt(data.result.TotalItems)
            }
          })
        },
        //获取普通会员
        getDefaultList(shopId,key='',pageIndex=1,pageSize=10,isvip=0,){
          this.$http.post(this.$api.getVipList,
            {shopId:shopId,
              pageIndex:pageIndex,
              pageSize:pageSize,
              isvip:isvip,
              key:key}).then(json=>{
            let data=json.data
            if(data.isSuc=true){
              this.defaultList=data.result.Items
              this.total2=parseInt(data.result.TotalItems)
            }
          })
        },
        //获取会员卡列表
        getCardList(shipId){
          let obj={}
          obj.pageIndex=1;
          obj.pageSize=10;
          obj.isEnable=-1;
          obj.shopId=shipId;
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
          // this.getVipList();//获取会员列表
        // this.getCardList()
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
/deep/.el-button:hover, .el-button:focus {
  color: #282828;
}
/deep/ .el-table th > .cell.highlight{
  color:#282828;
}
  .box{
    width:1200px;
    /*margin-top: 30px;*/
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
    justify-content: center;
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
    .table /deep/ thead tr th:first-child{

      border-top-left-radius: 4px;
    }
    .table /deep/ thead tr th:last-child{
      border-top-right-radius: 4px;
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
    padding: 0px 0 50px 30px;
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
    padding: 0 50px 0;
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
//会员卡查询接口
.vip-card-list{
  width: 100%;
  .history-word{
    margin-top: 0px;
    margin-bottom: 0px;
    text-align: left;
    font-size: 20px;
    margin-left: 50px;
    color:#282828;
  }
  .vip-card-scroll{
    height: 560px;
    width: 100%;
    text-align: center;
    display: table;
    padding-left: 50px;
  }
  .vip-btn{
    .base-btn(334px);
    margin-top: 50px;
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
    margin-top: 20px;
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
.page-size-box{
  margin-top: 50px;
}
</style>
