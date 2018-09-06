/**
*   Created By  YS  on 2018/8/10
*     订单管理
*/
<template>
  <div class="box">
    <div class="order-header">
      <div class="base-btn-111"> 导出excel</div>
      <ys-search></ys-search>
    </div>
    <el-table
      :data="tableData"
      class="table"
      style="width: 100%">
      <el-table-column
        label="日期"
        width="180">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        width="180">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="order-btn">
      <el-col :span="4">
        <div class="base-btn-111" @click="openOrder">挂单</div>
      </el-col>
    </el-row>

    <el-pagination
      prev-text="上一页"
      next-text="下一页"
      @size-change="changeSize"
      @prev-click="prev"
      @current-change="current"
      layout="prev, pager, next"
      class="page"
      style="margin-top: 30px"
      :total="1000">
    </el-pagination>
    <!--//**********挂单*********-->
    <ys-popup
      :width="order.width"
      :height="order.height"
      v-show="order.showModal"
      @close="closeOrder"
    >
      <div class="open-order-box">
        <el-row>
          <el-col :span="6"><h3>挂单</h3></el-col>

        </el-row>
        <el-srcollbar class="order-scroll">
          <el-row class="row">
            <el-col :span="4">顾客姓名</el-col>
            <el-col :span="17"><input type="text" class="base-input" placeholder="请输入顾客的姓名"></el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="4">顾客姓名</el-col>
            <el-col :span="17"><input type="text" class="base-input" placeholder="请输入顾客的姓名"></el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-main style="padding-right: 50px">
                  <el-row>
                    <el-col style="background: #e1e1e1">
                      <el-row>
                        <el-col :span="4">服务</el-col>
                        <el-col :span="17">
                          <el-select v-model="value8"
                                     filterable
                                     size="small"
                                     placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-main>
              </el-container>

            </el-col>
          </el-row>
        </el-srcollbar>
      </div>
    </ys-popup>
  </div>
</template>

<script>
  import ysSearch from '@/components/search'
  import  ysPopup from '@/components/popup'
  export default {
    name: "orderManage",
    components: {
      ysSearch,
      ysPopup
    },
    data() {
      return {
        order:{
           width:670,
          height:723,
          showModal:true
        },
        value8:'',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }, methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      //打开order弹窗
      openOrder(){
          this.order.showModal=true
      },
      //关闭order弹窗
      closeOrder(){
          this.order.showModal=false;
      }
    }
  }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";

  .box {
    width: 1200px;
    .order-header {
      display: flex;
      margin: 30px 0;
      .base-btn-111 {
        margin-right: 30px;
      }
    }
    .table /deep/ thead tr th {

      background: #ffd73a;
      color: #222;
      text-align: center;
    }
  }
  .order-btn{
    padding: 30px 0;
    background: #fff;
  }

  /*挂单弹窗样式*/
  .open-order-box{
    width: 100%;
  }

</style>
