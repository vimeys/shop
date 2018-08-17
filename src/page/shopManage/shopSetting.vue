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
           <el-col class="detail" :span="5" :offset="1">
             <div class="detail-word">工位数量：30</div>
             <div class="detail-word">工位数量：30</div>
             <div class="detail-word">工位数量：30</div>
             <div class="detail-word">工位数量：30</div>
             <div class="detail-word">工位数量：30</div>
             <div class="change-btn">修改</div>
             <div class="change-btn">删除</div>
           </el-col>
        </el-row>
    </div>
    <ys-popup
      v-show="showModal"
      :width="pWidth"
      :heigth="pHeight"
    >
      <div class="addShop">
        <el-row class="content">
            <el-col class="span9" :span="9">
              <el-scrollbar class="scroll">
                <shop-detail></shop-detail>
                <iframe src="www.baidu.com"  class="iframe" frameborder="0"></iframe>
              </el-scrollbar>

            </el-col>
            <el-col :span="14">2</el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="addBtn">保存</div></el-col>
        </el-row>
      </div>
    </ys-popup>
  </div>
</template>

<script>
  import  shopDetail from '@/components/shopDetail';
  import  ysPopup from '@/components/popup'
  import url from "@/assets/script/url"
    export default {
        name: "shopSetting",
      components:{
          shopDetail,
        ysPopup
      },data(){
          return{
            showModal:true,
            pWidth:1200,
            pHeight:800,
          }
      },
      methods:{
          addShop(){
              this.$http.post('/shop',{userId:1007})
              this.showModal=true
          },
          close(e){
            this.showModal=e
          }

      },
      mounted(){
        console.log(url.shopList);
        this.$http.post('/shop/recgoodstype/sharelist',{userId:1007}).then(json=>{
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
    .detail-word{
      text-align: left;
        color: @bs-font-color;
      font-size: 16px;
      margin: 30px 20px;
    }
    .change-btn{
      width:239px;
      height:37px;
      line-height: 37px;

      background:@bs-color;
      font-size: 14px;
      color:@bs-font-color;
      border-radius:4px;
      margin-top: 20px;
      margin-bottom: 10px;
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
  .content{
    height: 700px;
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
    margin: 0 auto;
  }
</style>
