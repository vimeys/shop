/**
*   Created By  YS  on 2018/8/8
*/
<template>
  <div class="box">
    <el-row>
      <el-col class="left" :span="9">
        <div>
          <!--<img src="../../../assets/images/silver.png" height="375" width="668"/>-->
          <span>会员权益</span>
          <img src="../../../assets/images/icon/jet.png" height="48" width="48"/></div>
      </el-col>
      <el-col  class="right " :span="14">
        <el-row>
          <el-col>会员卡</el-col>
        </el-row>
        <el-row class="row" :gutter="20" align="middle">
            <el-col class="form-name" :span="4">会员卡名称</el-col>
            <el-col :span="6"><input type="text"></el-col>
            <el-col :span="11" class="after"></el-col>
        </el-row>
        <el-row class="row" :gutter="20" align="middle">
            <el-col class="form-name" :span="4">选择样式</el-col>
            <el-col :span="6">
              <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select></el-col>
            <el-col :span="11" class="after"></el-col>
        </el-row >
        <el-row class="row" :gutter="20" align="middle">
            <el-col class="form-name" :span="4">充值</el-col>
            <el-col :span="6"><input type="text"></el-col>
            <el-col :span="11" class="after"></el-col>
        </el-row>
        <el-row class="row" :gutter="20" align="middle">
            <el-col class="form-name" :span="4">会员赠送</el-col>
            <el-col :span="6"><input type="text"></el-col>
            <el-col :span="11" class="after"></el-col>
        </el-row>
        <el-row class="row" :gutter="20" align="middle">
            <el-col class="form-name" :span="4">享受折扣</el-col>
            <el-col :span="6"><input type="text"></el-col>
            <el-col :span="11" class="after"></el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col  class="confirm">确定</el-col>
          <el-col class="del">删除</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="add" :span="14"><div class="el-icon-plus"></div></el-col>
    </el-row>
    <el-row>
      <el-col  class="service" :span="14">
        <el-row>
          <el-col>会员卡</el-col>
        </el-row>
        <el-row class="row" :gutter="20" align="middle">
          <el-col class="service-icon" :span="4">
            <img src="../../../assets/images/icon/service1.png" height="48" width="48"/>
          </el-col>
          <el-col :span="6" class="service-input"><el-row>
            <el-col><input type="text" placeholder="请输入标题"></el-col>
            <el-col><input type="text" placeholder="请输入标题"></el-col>
          </el-row></el-col>
        </el-row>
        <!--<el-row class="row" :gutter="20" align="middle">-->
          <!--<el-col class="form-name" :span="4">-->
          <!--</el-col>-->
          <!--<el-col :span="6"><input type="text"></el-col>-->
        <!--</el-row>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "vipCard",
      data(){
          return{
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
            value: ''
          }
      }
    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";
  @import "~@/assets/style/common";
    .box{
      min-width: 1200px;

      .left{
        height: 250px;
        background-image: url("../../../assets/images/silver.png");
        background-size:445px 250px;
        background-repeat: no-repeat;
        div{
          display: flex;
          margin-top: 28px;
          height:48px;
          line-height: 48px;
          span{
            min-width:184px;
            height:44px;
            font-size:31px;
            color:rgba(255,255,255,1);
            line-height:44px;
            margin-right: 20px;
          }
        }
      }
      .right{
        margin-left: 30px;
        .row{
          margin: 30px 0;
          height: 36px;
        }
        .form-name{
          text-align: right;
          height: 36px;
          line-height: 36px;
          /*padding-right:20px;*/

        }
        input{
          width:313px;
          height:36px;
          background:rgba(229,229,229,1);
          box-shadow:0px 1px 3px 0px rgba(187,187,187,0.5);
          border-radius:4px;
        }
        .confirm,.del{
          .base-btn-111;
          margin: 30px;
        }
      }
      .service,.add{
        margin-left: 475px;
      }
      .service-icon{
        width: 52px;
        height: 32px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .service-input{
        height: 84px;
        background: #BBBBBB;
        input{
          background: #BBBBBB;
        }
      }
      .add{
        margin-top: 30px;
        margin-bottom: 30px;
        div{
          color:#fff;
          width:27px;
          height:27px;
          line-height: 27px;
          background:rgba(255,215,54,1);
          border-radius:4px;
        }
      }
    }
</style>
