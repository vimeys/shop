<!--logo图片添加-->
<template>
  <div class="box">
    <div class="left">
      <img src="@/assets/images/nav-image.png"/>
      <div class="swiper" >
        <!--<div class="dotted">-->
          <!--<img src="https://img.yzcdn.cn/2.jpg" alt="">-->
        <!--</div>-->
        <van-swipe :autoplay="3000" >
          <van-swipe-item v-for="(image, index) in bannerImages" :key="index">
            <img :src="image" />
          </van-swipe-item>
        </van-swipe>
        <div class="logo-box"  v-show="upImage">
          <img :src="upImage" style="width: 120px; height: 120px" :style="{'width':width,'height':height}" />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="title">Logo</div>
      <div class="images">
        <!--<img src="https://img.yzcdn.cn/2.jpg" alt="">-->
        <!--<el-upload-->
          <!--action="https://jsonplaceholder.typicode.com/posts/"-->
          <!--list-type="picture-card"-->
          <!--:on-preview="handlePictureCardPreview"-->
          <!--:on-remove="handleRemove">-->
          <!--<i class="el-icon-plus"></i>-->
        <!--</el-upload>-->
        <!--<el-dialog :visible.sync="dialogVisible">-->
          <!--<img width="100%" :src="dialogImageUrl" alt="">-->
        <!--</el-dialog>-->
        <div v-show="toggle" class="hasImage">
          <!--<img src="https://img.yzcdn.cn/2.jpg" alt="">-->
          <p class="upload-box" v-if="!upImage">
            <ys-upload @imageUrl="upLoad"></ys-upload>
          </p>
          <!--<p style="display: inline-block; width: 120px;height: 120px;border: 1px solid #ccc">-->
          <span class="up-box" v-else >
              <img :src="upImage" alt=""  :style="{'width':width,'height':height}"  style="margin-right: 0" >
          </span>

          <!--</p>-->

          <div v-show="upImage">
            跟换图片
            <ys-upload style="position: relative;top:-36px; opacity: 0;" @imageUrl="upLoad"></ys-upload>
          </div>
          <div @click="delImage" v-show="upImage">
            删除图片
          </div>
        </div>
    </div>
      <div>
        <h4>· Logo放置区域为左图虚线框内</h4>
        <h4>· Logo图片不能超过2M</h4>
        <h4>· Logo必须为PNG</h4>
      </div>
    </div>
  </div>
</template>

<script>
  import ysUpload from  '@/components/upload'
    export default {
        name: "logo",
      components:{
        ysUpload
      },
      data(){
        return{
          imageUrl: true,
          touchable:true,
          dialogImageUrl: '',
          dialogVisible: false,
          upImage:'',
          bannerImages:[],
          toggle:true,
          width:'',//
          height:'',
          Data:'',
          images:[
            'https://img.yzcdn.cn/2.jpg',
            'https://img.yzcdn.cn/2.jpg'
          ]
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
        upLoad(url){
          let img= new Image()
          img.src=url;
          img.onload =()=>{
            // alert('width:'+img.width+',height:'+img.height);
            if(img.width>img.height){
              this.width='120px'
              let size=img.width/120;
              this.height=img.height/size+'px'
            }else{
              this.height='120px'
              let size=img.height/120;
              this.width=img.width/size+'px'
            }
          };
          this.upImage = url;
          this.up(url)
        },

        up(url){
          this.Data.Logo=url;
          this.$util.post(this,this.$api.bgDetail,{user:this.Data},(data)=>{
            console.clear()
            console.log(data);
          })
        },
        delImage(){
          this.upImage=''
          this.up('')
        },
        getDetail(){
          this.$util.post(this,this.$api.bgDetail,{},(data)=>{
            // console.log(data);
            this.Data=data;
            this.bannerImages=data.Pics.split(',')
            this.upImage=data.Logo
          })
        }
      },
      created(){
          this.getDetail()
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
        position: relative;
        .dotted{
          width:375px;
          height:375px;
          border:1px dotted rgba(40,40,40,1);
          img{
            width: 100%;
            height: 609px;
          }
        }
        .logo-box{
          width:122px;
          height:122px;
          position: absolute;
          top:54px;
          left: 135px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
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
      .upload-box{
        width: 120px!important;
        height: 120px!important;
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
          .up-box{
            display: flex;
            width: 122px;
            height: 122px;
            align-items: center;
            justify-content: center;
            border: 1px solid #ccc;
          }
          >div{
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
