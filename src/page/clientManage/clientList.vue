/**
*   Created By  YS  on 2018/8/3
*客户列表
*/
<template>
  <div class="box">
    <el-tabs v-model="activeName" @tab-click="handleClick" value="first">
      <el-tab-pane label="会员用户" name="first">
        <div class="header">
          <div class="btn">导出EXCEL</div>
          <ys-search :placeholder="placeholder"></ys-search>
        </div>
        <div class="select-bar">
          <el-select v-model="value" @change="change" placeholder="满减券" class="select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
              label="账户余额"
              width="130">
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
            <el-table-column
              label="等级"
              prop="tap"
              :filters="[{ text: '待服务', value: '待服务' }, { text: '已服务', value: '已服务' }]"
              :filter-method="filterTag"
              width="180">
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
          <div class="table-btns">
            <div class="btn" @click="openCard">开卡</div>
          </div>
        </div>
        <ys-popup
          :showModal="code.showModal"
          v-show="code.showModal"
          @close="close"
          :width='code.pWidth'
          :height="code.pHeight"
        >
          <div class="changePsw">
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
        <ys-popup
          ::showModal="opc.showModal"
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
                 <input type="text" placeholder="请输入会员姓名" class="input">
               </el-col>
               <el-col :span="8" :offset="2">
                 <input type="text" placeholder="请输入会员手机号" class="input">
               </el-col>
               <el-col :span="6" :offset="2">
                 <el-select v-model="value" size="small" placeholder="请选择">
                   <el-option
                     v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                   </el-option>
                 </el-select>
               </el-col>
             </el-row>
              <el-row class="row">
                <el-col :span="4">服务范围</el-col>
                <el-col :span="20" >
                    <el-row>
                      <el-col :span="22"><div class="box">洗剪吹</div></el-col>
                      <el-col :span="1" :offset="1">
                        <div class="coupon-radio" >
                          <div class="coupon-radio-point"></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="22"><div class="box">洗剪吹</div></el-col>
                      <el-col :span="1" :offset="1" >
                        <div class="coupon-radio" >
                          <div class="coupon-radio-point"></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="22"><div class="box">洗剪吹</div></el-col>
                      <el-col :span="1" :offset="1">
                        <div class="coupon-radio" >
                          <div class="coupon-radio-point"></div>
                        </div>
                      </el-col>
                    </el-row>
                </el-col>
              </el-row>
              <el-row class="row">
                <el-col :span="4">有效期限</el-col>
                <el-col :span="18">
                  <el-select v-model="value" size="small" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row class="row">
                <el-col :span="4">享受折扣</el-col>
                <el-col :span="20">
                  <input type="text" placeholder="请输入会员卡的折扣" class="input">
                </el-col>
              </el-row>
              <el-row class="row">
                <el-col :span="4">
                  购买金额
                </el-col>
                <el-col :span="20">
                  <el-row>
                    <el-col>
                      <input type="text" placeholder="请输入购买该会员卡的金额" class="input">
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>· 购买金额会直接算到会员卡余额当中</el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="row">
                <el-col :span="4">
                  充值金额
                </el-col>
                <el-col :span="20">
                  <el-row>
                    <el-col>
                      <input type="text" placeholder="请输入继续充值该会员卡的金额" class="input">
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>· 继续充值的金额大于等于购买金额</el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="row">
                <el-col>
                  <div class="opc-btn">开通会员</div>
                </el-col>
              </el-row>
            </el-scrollbar>
          </div>
        </ys-popup>

        <!--消费记录-->
        <ys-popup  :showModal="history.showModal"
                   v-show="history.showModal"
                   @close="close"
                   :width='history.pWidth'
                   :height="history.pHeight"
        >
          <div class="history">
            <el-row class="history-word">
              <el-col>消费信息</el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="history-title">
                  <div>Mact消费记录</div>
                  <div>
                    总消费：￥281813
                  </div>
                </div>
                <el-table class="history-table" :data="tableData">
                  <el-table-column
                    label="姓名"
                    width="200">
                    <template slot-scope="scope">
                      <!--<i class="el-icon-time"></i>-->
                      <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="姓名"
                    width="203">
                    <template slot-scope="scope">
                      <!--<i class="el-icon-time"></i>-->
                      <span style="margin-left: 10px">{{ scope.row.date }}</span>
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
                  width="130">
                  <template slot-scope="scope">
                    <!--<i class="el-icon-time"></i>-->
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="姓名"
                  width="130">
                  <template slot-scope="scope">
                    <!--<i class="el-icon-time"></i>-->
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="姓名"
                  width="130">
                  <template slot-scope="scope">
                    <!--<i class="el-icon-time"></i>-->
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="姓名"
                  width="130">
                  <template slot-scope="scope">
                    <!--<i class="el-icon-time"></i>-->
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="消费信息">
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
              <el-pagination
                prev-text="上一页"
                next-text="下一页"
                layout="prev, pager, next"
                class="page"
                :total="1000">
              </el-pagination>
            </div>
          </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ysSearch from '@/components/search';
  import  ysPopup from '@/components/popup'
    export default {
      name: "clientList",
      components:{
          ysSearch,
          ysPopup
      },
      data(){
        return {
          code:{//支付二维码弹窗
            showModal:false,
            pWidth:759,
            pHeight:748,
          },
          opc:{//开发弹窗
            showModal:false,
            pWidth:760,
            pHeight:808,
          },
          history:{
            showModal:false,
            pWidth:504,
            pHeight:708,
          },
          placeholder:'搜索对应标签',
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }],
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
        handleEdit(tab,event){
            this.code.showModal=true
        },
        //查询消费记录
        handleHistory(){
            this.history.showModal=true
        },
        //弹起开卡弹窗
        openCard(e){
          this.opc.showModal=true
        },
        chose(){
          console.log(123);
        },
        close(e){
          this.code.showModal=e;
          this.opc.showModal=e;
          this.history.showModal=e;
        }
      }
    }
</script>

<style lang='less' scoped>
@import "~@/assets/style/mixin";
  .box{
    width:1200px;
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
    .table-btns{
      width: 100%;
      height: 90px;
      background: #fff;
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
    padding: 50px;
    box-sizing: border-box;
    >.row{
      border: 1px solid red;
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

</style>
