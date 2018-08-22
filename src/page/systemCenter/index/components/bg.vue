  <!--添加背景-->
<template>
  <div class="box">
    <div class="left">
      <img src="@/assets/images/nav-image.png"/>
      <div class="swiper">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in bannerImages" :key="index">
            <img :src="image" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="right">
      <div class="title">背景图</div>
      <div class="images">
        <!--<img src="https://img.yzcdn.cn/2.jpg" alt="">-->
        <!--<img src="https://img.yzcdn.cn/2.jpg" alt="">-->
        <!--<img src="https://img.yzcdn.cn/2.jpg" alt="">-->
        <!--<img src="https://img.yzcdn.cn/2.jpg" alt="">-->
        <!--action="https://jsonplaceholder.typicode.com/posts/"-->
        <el-upload
          action="http://mdimg.yilianchuang.cn/uploadimage3.ashx"

          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-success="getFile"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <div>
        <h4>· Banner最多上传5张</h4>
        <h4>· Banner尺寸为 375 x 610 px</h4>
      </div>
    </div>

  </div>

</template>

<script>
  import { Swipe, SwipeItem } from 'vant';
  import RouterLink from "vant/es/mixins/router-link";
    export default {
        name: "bg",
      data(){
          return{
            imageUrl: true,
            touchable:true,
            dialogImageUrl: '',
            dialogVisible: false,
            bannerImages:[]
          }

      },
      methods:{
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        getFile(response, file, fileList){
          console.log(response, file.response.url, fileList);
          let url=file.response.url;
          console.log(file.response.url);
          this.bannerImages.push(url)
        }
      }

    }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin";
  .box{
    display: flex;
    margin-top: 60px;
    flex-direction: row;
    .left{
      width: 375px;
      height:667px;
      margin-right: 100px;
      display: flex;
      flex-direction: column;
      >img{
        width: 100%;
        height: 58px;
      }
      .swiper{
        width: 100%;
        height: 609px;
        img{
          width: 100%;
          height: 609px;
        }
      }
    }
    .right{
      width:725px;
      height:399px;
      background:rgba(255,255,255,1);
      border: 1px solid red;
      .title{
        width:84px;
        height:36px;
        font-size:25px;
        color:rgba(40,40,40,1);
        line-height:36px;
        margin-top: 30px;
        margin-left: 30px;
        margin-bottom: 30px;
      }
      .images{
        margin-left: 30px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        img{
          width:120px;
          height:195px;
          margin-right: 16px;
        }
      }
      h4{
        margin-left: 30px;
        .tips-font;
        text-align:left;
      }
    }
  }



  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
