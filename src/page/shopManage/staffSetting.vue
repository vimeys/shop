/**
*   Created By  YS  on 2018/8/11
*/
<template>
  <div class="box">
      <div class="choose-title">
        <el-row>
          <el-col :span="4">
            <el-select v-model="value" placeholder="请选择" size="small">
              <el-option
                v-for="item in shopList"
                :key="item.value"
                :label="item.Name"
                :value="item.UserShopId">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">总数：2人</el-col>
          <el-col :span="6" :offset="12"> <div><ys-search></ys-search></div></el-col>
        </el-row>
      </div>
    <div class="btns">
      <!--<div class="setting">设置权限</div>-->
      <div class="classify">员工分类</div>
      <!--<div class="project">管理员工服务项目</div>-->
    </div>
    <div class="tables">
        <div class="title">星巴克一号店(2人)</div>
        <el-row class="table-title">
          <!--<el-col></el-col>-->
          <el-col :span="4">姓名</el-col>
          <el-col :span="3">手机号</el-col>
          <el-col :span="2">权限</el-col>
          <el-col :span="2">权限</el-col>
          <el-col :span="2">权限</el-col>
          <el-col :span="2">权限</el-col>
          <el-col :span="8">管理</el-col>
        </el-row>
      <el-row class="row" v-for="item in table" :key="item">
        <el-col :span="4">
          <el-row>
            <el-col :span="8">.</el-col>
            <el-col :span="8">张三</el-col>
          </el-row>
        </el-col>
        <el-col :span="3">13350900722</el-col>
        <el-col :span="2">管理员</el-col>
        <el-col :span="2">理发师</el-col>
        <el-col :span="2">激活</el-col>
        <el-col :span="2">123</el-col>
        <el-col :span="9">
            <el-row :gutter="10">
              <el-col :span="4"><div class="table-btn" @click="openMove">移动</div></el-col>
              <el-col :span="4"><div class="table-btn">编辑</div></el-col>
              <el-col :span="4"><div class="table-btn">删除</div></el-col>
              <el-col :span="11">
                <el-select v-model="value" placeholder="请选择" size="small">
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
      <el-row class="table-btns" :gutter="20">
        <el-col :span="3">
          <div class="base-btn-111"
               @click="addNewPeople"
          >添加成员</div>
        </el-col>
        <el-col :span="3">
          <div class="base-btn-111">批量管理</div>
        </el-col>
        <el-col :offset="1" :span="8">
          <el-row >
              <el-col :span="8"><div class="base-btn-111">全选</div></el-col>
              <el-col :span="8">
                <div class="base-btn-111">移动分组</div></el-col>
              <el-col :span="8">
                <div class="base-btn-111">
                  删除
                </div>
              </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>


    <!--********添加新员工*******-->
    <ys-popup
      v-show="add.showModal"
      :height="add.height"
      :width="add.width"
      @close="closeAdd"
    >
      <div class="add">
        <el-row  class="header" justify="start">
          <el-col :span="4">123</el-col>
        </el-row>
        <el-row class="add-text">
          <el-col :span="20">我们将向您的成员手机发送有店+的邀请</el-col>
        </el-row>
        <el-row :gutter="20" class="add-form">
          <el-col :span="5">
            <input type="text" class="base-input" placeholder="请输入成员姓名">
          </el-col>
          <el-col :span="7">
            <input type="text" class="base-input" placeholder="请输入职位（可为空）">
          </el-col>
          <el-col :span="8">
            <input type="text" class="base-input" placeholder="请输入职位（可为空）">
          </el-col>
          <el-col :span="4">
            <div class="base-btn-111">邀请</div>
          </el-col>
        </el-row>
        <el-row class="add-tips">
          <el-col>如果您需要更快速地添加多个成员，我们推荐您下载excel模板，填写完成后直接上传</el-col>
        </el-row>
        <el-row class="add-btn">
          <el-col><div class="base-btn-111">上传excel</div></el-col>
        </el-row>
      </div>
    </ys-popup>

      <!--成员分组-->
    <ys-popup
      v-show="move.showModal"
      :height="move.height"
      :width="move.width"
      @close="closeMove"
    >
      <div class="add">
        <el-row  class="header" justify="start">
          <el-col :span="4" class="header-word">移动分组</el-col>
        </el-row>
        <el-row  :gutter="20" class="add-text">
          <el-col :span="6">分组人员：</el-col>
          <el-col :span="16"> Mact / 李四光 / Mact / 李四光 / Mact </el-col>
        </el-row>
        <el-row :gutter="20" class="add-form">
          <el-col :span="6">分组人员：</el-col>
          <el-col :span="16">
            <el-select v-model="value" placeholder="请选择" size="small">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="add-btn">
          <el-col><div class="confirm-btn">确定</div></el-col>
        </el-row>
      </div>
    </ys-popup>

    <!--//添加单个人员列表-->
    <ys-popup
      v-show="staffList.showModal"
      :width="staffList.width"
      :height="staffList.height"
      :zIndex="staffList.zIndex"
    >
      <div class="choose">
        <el-row>
          <el-col :span="24">员工分类</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"></el-col>
        </el-row>
      </div>
    </ys-popup>

  </div>



</template>

<script>
    import ysSearch from '@/components/search';
    import  YsPopup from '@/components/popup'
    import api from "@/assets/script/url"
    export default {
        name: "staffSetting",
        components:{
          ysSearch,
          YsPopup
        },
      data(){
          return {

            placeholder:'搜索姓名或手机号',
            add:{
              width:900,
              height:427,
              showModal:false
            },
            move:{
              width:645,
              height:445,
              showModal:false
            },
            staffList:{
              width: 480,
              height: 800,
              showModal: false,
              zIndex: 1000
            },
            table:[1,3,4],
            shopList:[]
          }
      },
      methods:{
        addNewPeople(){
          console.log(123);
          this.add.showModal=true
        },
        openMove(){
          this.move.showModal=true
        },
        closeAdd(e){
          this.add.showModal=e
        },
        closeMove(e){
          this.move.showModal=e
        },
        // 获取列表
        getShopList(){
          this.$http.post('/shop/'+api.shopList,{}).then(json=>{
            let data=json.data
            if(data.isSuc==true){
              this.shopList=data.result;
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
        this.getShopList();
      }
    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";

  .box{
    min-width: 1200px;
    .choose-title{
      width: 100%;
      margin-top: 60px;
    }
    .btns{
      width: 100%;
      height: 40px;
      margin-top: 30px;
      margin-bottom: 30px;
      div{
        float: left;
        .base-btn-111;
        margin-right: 30px;
        margin-bottom: 30px;
      }
      .project{
        width: 154px;
      }
    }
    .tables{
        .title{
          width: 100%;
          height: 48px;
          line-height: 48px;
          text-align: center;
          background: @bs-color;
          font-size: 19px;
          color: #282828;
        }
      .table-title{
        width: 100%;
          font-size: 15px;
        height: 48px;
        line-height: 48px;
        background: #F5F5F5;
      }
      .row{
        width: 100%;
        height: 48px;
        line-height: 48px;
        background: #fff;
      }
      .table-btn{
        width: 73px;
        height: 36px;
        background: #E5E5E5;
        .text-center(36px);
        margin-top: 6px;
        border-radius: 4px;
      }
      .table-btns{
        padding-top: 30px;
        padding-bottom: 30px;
        box-sizing: border-box;
        margin: 0 10px;
      }
    }
  }

  //添加成员弹窗
  .add{
    width: 100%;
      padding: 50px;
      .header{
        margin-top: 30px;
        margin-bottom: 30px;
        &-word{
          font-size: 20px;
        }
      }
    &-text{
      margin-bottom: 30px;
      font-size:14px;
      color:rgba(154,154,154,1);
    }
    &-form{
      width: 100%;
    }
    &-tips{
      margin-top: 30px;
      margin-bottom: 30px;
      font-size:14px;
      color:rgba(154,154,154,1);
    }
    &-btn{
      margin-top: 30px;
    }
    .confirm-btn{
      margin-top: 100px;
      .base-btn(200px)
    }
  }




</style>
