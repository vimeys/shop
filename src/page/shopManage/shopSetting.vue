/**
*   Created By  YS  on 2018/8/15
*   门店管理
*/
<template>
  <div class="box">
      <div class="btn" @click="addShop"><img src="@/assets/images/icon/addBtn.png" alt="">新建门店</div>
    <div class="shop">
        <el-row>
           <el-col class="col" :span="7" :offset="5">
              <shop-detail></shop-detail>
           </el-col>
           <el-col class="detail" :span="9" :offset="1">
             <!--<div class="detail-word">工位数量：30</div>-->
             <!--<div class="detail-word">员工数量：30</div>-->
             <!--<div class="detail-word">店铺面积：30</div>-->
             <!--<div class="detail-word">经营状态：正常营业</div>-->
             <!--<div class="detail-word">午休时间：12:30 - 1:30</div>-->
             <img  class="detail-logo" :src="logo" alt="">
             <div class="change-btn">修改</div>
             <div class="change-btn">删除</div>
           </el-col>
        </el-row>
    </div>
    <ys-popup
      v-if="showModal"
      :width="pWidth"
      :heigth="pHeight"
      @close="closePop"
    >
      <div class="addShop">
        <el-scrollbar class="addshop-contentd" >
          <el-row class="content">
            <el-col class="span9" :span="9">
              <el-scrollbar class="scroll">
                <!--员工卡片-->
                <shop-detail :shop="form"></shop-detail>
                <iframe src="http://test.csmen.cc/c/6/index.html?userId=755&v=432537"  class="iframe" frameborder="0"></iframe>
              </el-scrollbar>
            </el-col>
            <!--//from表单-->
            <el-col :span="14" class="content-right">
                <el-row>
                  <el-col :span="4" :offset="2"> <h3>实体店</h3></el-col>
                </el-row>
              <el-row>
                <el-col :span="16" :offset="4">
                  <el-row>
                      <el-col :span="10" :offset="2">
                        <el-upload
                          class="avatar-uploader"
                          action="http://mdimg.yilianchuang.cn/uploadimage3.ashx"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess1"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="form.shopPhoto" :src="form.shopPhoto" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon logo"></i>
                        </el-upload>
                      </el-col>
                      <el-col :span="10">
                        <!--<img :src="imageUrl" alt="">-->
                        <el-upload
                          class="avatar-uploader"
                          action="http://mdimg.yilianchuang.cn/uploadimage3.ashx"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess2"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="imageUrl" :src="imageUrl" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6">标题</el-col>
                <el-col :span="16" ><input type="text"
                                           class="base-input"
                                           placeholder="请输入标题"
                                           v-model="form.name"></el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <!--<el-row class="row-margin">-->
                <!--<el-col :span="6">标题</el-col>-->
                <!--<el-col :span="16" ><input class="base-input" type="text" placeholder="请输入标题"></el-col>-->
                <!--<el-col :span="2" class="after"></el-col>-->
              <!--</el-row>-->
              <el-row class="row-margin">
                <el-col :span="6">简介</el-col>
                <el-col :span="16" >
                  <textarea name=""
                            placeholder="请输入简介"
                            class="textarea"
                            v-model="form.intro">

                  </textarea>
                </el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6">店名</el-col>
                <el-col :span="16" ><input  class="base-input"
                                            type="text"
                                            v-model="form.shopName"
                                            placeholder="请输入店名"></el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6">地址</el-col>
                <el-col :span="16" ><input  class="base-input"
                                            type="text"
                                            v-model="form.address"
                                            placeholder="请输入地址"></el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6">电话</el-col>
                <el-col :span="16" ><input  class="base-input"
                                            type="text"
                                            v-model="form.phone"
                                            placeholder="请输入电话"></el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6">员工数量</el-col>
                <el-col :span="16" ><input type="text"
                                           v-model.number="form.staffNum"
                                           class="base-input"
                                           placeholder="请输入员工数量"></el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6">营业时间</el-col>
                <el-col :span="16" >
                  <el-time-picker
                    is-range
                    v-model="value4"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                  </el-time-picker>
                </el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6">午休时间</el-col>
                <el-col :span="16" ><el-time-picker
                  is-range
                  v-model="value5"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围">
                </el-time-picker></el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6" class="title">定位</el-col>
                <el-col  :span="16"><div class="siteBtn">点击定位</div></el-col>
                <el-col :span="2"></el-col>
              </el-row>
              <el-row>
                  <el-col :span="24" :offset="0">成都市高新区天府五街MCI公司</el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6">门店详情</el-col>
                <el-col :span="16" class="content-btns">
                  <el-row>
                    <el-col :span="12"> <div  class="base-btn-111">闪电编辑</div></el-col>
                    <el-col :span="12"> <div class="base-btn-111">选择文章</div> </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-scrollbar>
        <el-row>
          <el-col :span="24"><div class="addBtn" @click="addshop">保存</div></el-col>
        </el-row>
      </div>
    </ys-popup>
    <!--<div style="width: 100px;height: 100px;border: 1px solid red;">-->
      <!--<upload></upload>-->
    <!--</div>-->
  </div>
</template>

<script>
  import  shopDetail from '@/components/shopDetail';
  import  ysPopup from '@/components/popup'
  import api from "@/assets/script/url"
  import upload from '@/components/upload'
    export default {
        name: "shopSetting",
      components:{
          shopDetail,
          ysPopup,
          upload
      },
      data(){
          return{
            logo:require('../../assets/images/goods.jpg'),
            showModal:false,
            pWidth:1200,
            pHeight:830,
            value4: [new Date(2018, 9, 10, 8, 40), new Date(2018, 9, 10, 9, 40)],
            value5: [new Date(2018, 9, 10, 8, 40), new Date(2018, 9, 10, 9, 40)],
            imageUrl:'',
            form:{
            shopPhoto:'',
            name:'',
            intro:'',
            shopName:'',
            address:'',
            phone:'',
            workTime:'',
            staffNum:0
            }
          }
      },
      methods:{
          addShop(){
              // this.$http.post('/shop',{userId:1007})
              this.showModal=true
          },
        closePop(e){
            this.showModal=false
          },
        handleAvatarSuccess1(res, file){
            this.form.shopPhoto=URL.createObjectURL(file.raw);
        },
        // 头像上传
        handleAvatarSuccess2(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        //点击上传店铺信息
        addshop(){
            let form=this.form;
            let obj={
              model:{
                Pics:form.shopPhoto,
                Name:form.name,
                Address:form.shopName,
                Tel:form.phone,
                Logo:this.imageUrl,
                ShopStartDate:'08:40',
                ShopEndDate:'08:40',
                LunchStartDate:'08:40',
                LunchEndDate:'08:40',
                //todo死数据
                Position:'12312313',
                TuwenUrl:'http://mdimg.yilianchuang.cn/uploadimage3.ashx',
                EmployeesNumber:form.staffNum
              }
            }
            this.$http.post('/shop/usershop/addUserShop',obj).then(json=>{
              console.log(json);
            }).catch(err=>{
              console.log(err);
            })

        }
      },
      mounted(){
        // this.$http.post('/shop/gameusersmoneylog/version3/list ',{ pageIndex:1,pageSize:10,state:0, key:''}).then(json=>{
        //   console.log(json);
        // })
        this.$http.post('/shop/usershop/list4web',{}).then(json=>{
          console.log(json);
        })
      }
    }
</script>

<style lang='less' scoped>

  @import "~@/assets/style/mixin";
    .box{
      width: 1200px;
      .btn{
        .base-btn-111;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
        margin-bottom: 30px;
        img{
          width: 15px;
          height: 15px;
          margin-right: 10px;
        }
      }
    }
  .shop{
    width: 100%;
    background: #fff;
    padding: 15px ;
    /*.detail-word{
      text-align: left;
        color: @bs-font-color;
      font-size: 16px;
      margin: 30px 20px;
    }*/
    .detail-logo{
      width: 187px;
      height: 187px;
      margin: 0 auto;
    }

    .change-btn{
      width:239px;
      height:37px;
      line-height: 37px;
      margin: 0 auto;
      background:@bs-color;
      font-size: 14px;
      color:@bs-font-color;
      border-radius:4px;
      margin-top: 40px;
      margin-bottom: 10px;
      margin-left: 100px;
    }

  }
  .addShop{
    width: 100%;
  }
  .span9{
    padding: 30px;
  }
  /*弹窗内容*/
  .scroll{
    height: 700px;
    width: 100%;
    overflow: hidden;
  }
  .addshop-contentd{
    width: 100%;
    height: 700px;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .content{
    height: 700px;
    &-right{
      .row-margin{
        margin-top: 30px;
      }
      .title{
        height: 36px;
        line-height: 36px;
      }
      .siteBtn{
        width: 100%;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: @bs-color;
      }

    }
  }
  .iframe{
    width: 100%;
    height: 1000px;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }


  .addBtn{
    width:594px;
    height:36px;
    background:rgba(255,215,54,1);
    border-radius:4px;
    line-height: 36px;
    margin: 20px auto;
  }
  .textarea{
    width:466px;
    height: 106px;
    max-height: 106px;
    max-width: 466px;
    padding-top: 10px;
    padding-left: 10px;
    background: #e5e5e5;
    border: none;
    border-radius: 4px;
  }


  /*上传输入框*/
  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #282828;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/ .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 94px;
    height: 94px;
    line-height: 94px;
    text-align: center;
  }

  .avatar {
    width: 94px;
    height: 94px;
    display: block;
  }
  .logo{
    width: 188px;
  }
</style>
