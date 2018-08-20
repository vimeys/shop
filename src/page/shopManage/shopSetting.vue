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
        <el-scrollbar class="addshop-contentd">
          <el-row class="content">
            <el-col class="span9" :span="9">
              <el-scrollbar class="scroll">
                <shop-detail></shop-detail>
                <iframe src="http://test.csmen.cc/c/6/index.html?userId=755&v=432537"  class="iframe" frameborder="0"></iframe>
              </el-scrollbar>
            </el-col>
            <!--//from表单-->
            <el-col :span="14" class="content-right">
                <el-row>
                  <el-col :span="24"> <h3>实体店</h3></el-col>
                </el-row>
              <el-row>
                <el-col :span="16" :offset="4">
                  <div><span>123</span><span>123</span></div>
                </el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6">标题</el-col>
                <el-col :span="16" ><input type="text" placeholder="请输入标题"></el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6">标题</el-col>
                <el-col :span="16" ><input class="base-input" type="text" placeholder="请输入标题"></el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6">简介</el-col>
                <el-col :span="16" ><textarea name="" ></textarea></el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6">店名</el-col>
                <el-col :span="16" ><input  class="base-input"type="text" placeholder="请输入标题"></el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6">地址</el-col>
                <el-col :span="16" ><input  class="base-input"type="text" placeholder="请输入标题"></el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6">电话</el-col>
                <el-col :span="16" ><input  class="base-input"type="text" placeholder="请输入标题"></el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6">员工数量</el-col>
                <el-col :span="16" ><input type="text" class="base-input" placeholder="请输入标题"></el-col>
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
                  v-model="value4"
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
            showModal:false,
            pWidth:1200,
            pHeight:800,
            value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
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
    margin: 0 auto;
  }
</style>
