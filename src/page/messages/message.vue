/**
*   Created By  YS  on 2018/8/12
*/
<template>
    <div class="box">
      <div class="header" v-if="isOld">
        <div  class="base-btn-111" @click="addNew">新建推送</div>
        <div  class="base-btn-111" @click="checkOld">历史推送</div>
      </div>
      <div class="header" v-else @click="back" >
        <div class="base-btn-111"> 返回</div>
      </div>
      <div class="main">
        <div class="item">
          <div class="item-left">新服务商家</div>
          <div class="item-right">
            <div class="item-right-word">新品上新啦新品上新啦新品上新啦新品上新啦新品上新啦新品上新啦新品上新啦新品上新啦新品上新品上新啦新品上新啦新品上新啦新品上新啦新品上新啦新品上新啦新品上新啦新品上新啦新品上...</div>
            <div class="item-right-up" v-show="isOld"><i class="el-icon-upload"></i></div>
            <div class="item-right-del" :class="{'ml':!isOld}"><i class="el-icon-delete"></i></div>
          </div>
        </div>
      </div>





      <ys-popup
        :width="width"
        :height="height"
        v-show="showModel"
        @close="close"
      >
          <div class="message-box">
            <el-row>
              <el-col class="base-h3" :span="8">
                新建推送
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" class="base-col">
                提醒类别
              </el-col>
              <el-col :span="14" :offset="2">
                <el-select v-model="value"
                           placeholder="请选择"
                           size="small" >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <i class="before"></i>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" class="base-col">
                内容
              </el-col>
              <el-col :span="16">
                <textarea  class="textarea" name="" id=""></textarea>
              </el-col>
              <el-col :span="2">
                <i class="before"></i>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="base-btn-111"> 确定</div>
              </el-col>
            </el-row>
          </div>
      </ys-popup>
    </div>
</template>

<script>
  import ysPopup from '@/components/popup'
    export default {
        name: "message",
      components:{
        ysPopup
      },
      data(){
          return {
            width:665,
            height:475,
            showModel:false,
            isOld:true,//时候查看久推送
            options:[
              {
                value:1,
                label:'新服务上架'
              }
            ]
          }
      },
      methods:{
        close(){
          this.showModel=false
        },
        addNew(){
          this.showModel=true
        },
        checkOld(){
          this.isOld=false
        },
        back(){
          this.isOld=true
        }
      }
    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";
  .box{
    width: 1200px;
    margin: 0 auto;
    .header{
      width: 100%;
      display: flex;
      justify-content: flex-start;
      margin-bottom: 30px;
      div{
        margin-right: 30px;
      }
    }
    .main{
        .item{
          background: #fff;
          width: 100%;
          height: 137px;
          padding: 15px;
          display: flex;
          &-left{
            width: 167px;
            border-right: 1px solid #919191;
            text-align: center;
            line-height: 107px;
            font-size: 16px;
            font-weight: 400;
          }
          &-right{
            flex: 1;
            display: flex;
            align-items: center;
            &-word{
              margin-left: 30px;
              width: 600px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            &-up{
              margin-left: 230px;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: @bs-color;
              text-align: center;
              line-height: 32px;
            }
            &-del{
              margin-left: 30px;
              width: 32px;
              height: 32px;
              line-height: 32px;
              text-align: center;
              background: @bs-color;
              border-radius: 50%;
            }
            .ml{
              margin-left: 292px;
            }
          }
        }
    }
    //弹窗
    .message-box{
      width: 100%;
      padding: 50px;
    }
    .textarea{
      width: 313px;
      height: 123px;
      background: rgba(229, 229, 229, 1);
      box-shadow:0px 0px 3px rgba(187,187,187,0.5) inset;
      border-radius: 4px;
      border: none;
    }
    .base-col{
      margin-bottom: 30px;
      text-align: left;
      padding-left: 15px;
    }
    /deep/ .el-select--small {
      width: 100%;
    }


    /deep/ .el-select {
      width: 100%;
    }

    /deep/ input {
      text-align: center;
    }
    .base-btn-111{
      margin-top: 30px;
    }
  }
</style>
