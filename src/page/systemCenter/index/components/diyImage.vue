<!--自定义图片-->
<template>
  <div class="box">
    <div class="left">
      <img src="@/assets/images/nav-image.png"/>
      <div class="swiper">
        <div class="dotted">
          <img src="https://img.yzcdn.cn/2.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="right">
      <div class="title">自定义图片</div>
      <div class="images">
        <div v-show="toggle" class="hasImage">
          <img src="https://img.yzcdn.cn/2.jpg" alt="">
          <div>
            跟换图片
          </div>
          <div>
            删除图片
          </div>
        </div>
        <div v-show="!toggle">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        </div>

      <div>
        <h4>· 自定义图片宽度为750px，超出或不足则宽度自动对齐</h4>
        <h4>· Logo图片不能超过2M</h4>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
      name: "diyImage",
      data(){
        return{
          imageUrl: true,
          touchable:true,
          dialogImageUrl: '',
          dialogVisible: false,
          toggle:true,
          images:[
            'https://img.yzcdn.cn/2.jpg',
            'https://img.yzcdn.cn/2.jpg'
          ],

        }
      },
      methods:{
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
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
        background: #fff;
        .dotted{
          width:375px;
          height:375px;
          border:1px dotted rgba(40,40,40,1);
          img{
            width: 100%;
            height: 609px;
          }
        }

      }
    }
    .right{
      width:725px;
      height:399px;
      background:rgba(255,255,255,1);
      border: 1px solid red;
      .title{
        width:154px;
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
        .hasImage{
          display: flex;
          div{
            background: #FDD731;
            text-align: center;
            line-height: 37px;
            width:93px;
            height:37px;
            margin-left: 30px;
            margin-top: 50px;
            background:rgba(253,215,49,1);
            border-radius:4px;
          }
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
