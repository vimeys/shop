/**
*   Created By  YS  on 2018/8/13
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
                  @click="handleEdit(scope.$index, scope.row)">查询</el-button>
              </template>
            </el-table-column>
            <el-table-column label="修改密码">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  class="base-btn"
                  @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
            <div class="btn">添加会员</div>
            <div class="btn">删除会员</div>
          </div>
        </div>
        <ys-popup
          :showModal="psw.showModal"
          v-show="psw.showModal"
          @close="close"
          :width='psw.pWidth'
          :height="psw.pHeight"
        >
          <div class="changePsw">
            <el-row class="title">
              <el-col :span="6" :offset="4">修改密码</el-col>
            </el-row>
            <el-row class="row">
              <el-col>账号归属</el-col>
              <el-col>Mact</el-col>
            </el-row>
            <el-row class="row">
              <el-col>修改密码</el-col>
              <el-col>
                <input type="password" placeholder="请输入密码">
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col>
                <div class="psw-btn">确定</div>
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
              <div class="table-btns">
                <div class="btn">添加会员</div>
                <div class="btn">删除会员</div>
              </div>
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
          psw:{//修改密码弹窗
            showModal:false,
            pWidth:504,
            pHeight:323,
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
            this.psw.showModal=true
        },
        chose(){
          console.log(123);
        },
        close(e){
          this.psw.showModal=e;
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

</style>
