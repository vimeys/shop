<template>
  <div>
    <div v-show="show" @back="back">
      <el-container v-if="isCardList">
        <el-header>
          <div class="active-header">
            <div :class="{disabled:isEdit}" @click="addCard">
              <span class="el-icon-circle-plus"></span>&nbsp;&nbsp;新建活动
            </div>
            <div @click="editCards">管理</div>
            <div class="del" v-show="showDel" @click="delActive">删除</div>
          </div>
        </el-header>
        <el-main class="main" >
          <template v-for="(item,index) in activeCardList" >
            <!--一元买券-->
            <div class="active-items-one"
                 v-if="item.type==1"
                 @click="hrefCard(1)"
                 :data="0">
              <img src="../../../../assets/images/oneBg.png" alt="">
              <div class="active-text"> 12:00-13:00 限／时／抢／购</div>
              <div class="active-radio" @click.stop="choose(1)" v-show="item.hasChoose">
                <div class="active-radio-point" v-show="item.isChoose"></div>
              </div>
            </div>
            <!--拼团-->
            <div class="active-items-team"
                 v-else-if="item.type==2"
                 @click="hrefCard(2)"
                 :data="1">
              <img src="../../../../assets/images/teamBg.png" alt="">
              <div class="active-text">3人即享拼团价</div>
              <div class="active-radio" @click.stop="choose(2)" v-show="item.hasChoose">
                <div class="active-radio-point" v-show="item.isChoose"></div>
              </div>
            </div>
            <!--秒杀-->
            <div class="active-items-s"
                 v-else-if="item.type==3"
                 @click="hrefCard(3)"
                 :data="2">
              <img src="../../../../assets/images/secondBg.png" alt="">
              <div class="active-text"> 测试文字爱的范fas</div>
              <div class="active-radio" @click.stop="choose(3)" v-show="item.hasChoose">
                <div class="active-radio-point" v-show="item.isChoose"></div>
              </div>
            </div>
            <!--抽奖-->
            <div class="active-items-l"
                 v-else="item.type==4"
                 @click="hrefCard(4)"
                 :data="3">
              <img src="../../../../assets/images/luckBg.png" alt="">
              <div class="active-text"> 测试文字sfas</div>
              <div class="active-radio" @click.stop="choose(4)" v-show="item.hasChoose">
                <div class="active-radio-point" v-show="item.isChoose"></div>
              </div>
            </div>
          </template>

        </el-main>

      </el-container>
      <div class="coupons-items" v-else>
        <div
                class="coupons-header"
        >
          <div class="block-btn" @click="goBack"> 返回</div>
          <div class="base-btn-111" > 新建优惠券</div>
          <div class="base-btn-111"> 管理</div>
        </div>
        <div class="coupons-item">
            <ys-coupon></ys-coupon>
        </div>
      </div>
    </div>
    <ys-popup :showModal="showModal"
              v-show="showModal"
              @close="close"
    >
      <div class="popup-slide-left">
        <div class="list-title">活动</div>
        <div class="list-btns">
          <ul>
            <li><i class="el-icon-document"></i>活动详情<i class="el-icon-arrow-right"></i> </li>
          </ul>
        </div>
      </div>
      <div class="popup-slide-right">
        <div class="content">
          <div class="card-select">
            <div>优惠券分类</div>
            <div>
              <el-select v-model="value" @change="change" placeholder="满减券" class="select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="form">
              <div class="modal">
                <div class="modal-btn">填写模板Banner信息</div>
                <div class="diy-btn">上传自定义Banner</div>
              </div>
              <div>
                <div class="content" v-if="showBtn1">
                  <div class="active-items-one" @click="hrefCard(1)" :data="1">
                    <img src="../../../../assets/images/active.png" alt="">
                    <div class="active-text"> 测试文字sfasdfasdfsfas</div>
                    <div class="active-radio" @click="choose" v-show="isChecke">
                      <div class="active-radio-point" v-show="chosed"></div>
                    </div>
                  </div>
                </div>
                <div v-else>
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
            <div class="time">
              <div class="name">活动时间</div>
              <div class="select"><el-date-picker
                v-model="Timevalue"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker></div>
            </div>
            <div class="word">
              <div>文案</div>
              <div><input type="text"></div>
            </div>
          </div>
          <div>
            <div class="btn">确认</div>
          </div>
        </div>
        <!--<el-button type="text" @click="open5">点击打开 Message Box</el-button>-->
      </div>
    </ys-popup>
    <ys-popup
      :width="popup.width"
      :height="popup.height"
      v-show="popup.showModal"
    >
      <div class="popup-slide-left">
        <div class="list-title">活动</div>
        <div class="list-btns">
          <ul>
            <li><i class="el-icon-document"></i>活动详情<i class="el-icon-arrow-right"></i> </li>
          </ul>
        </div>
      </div>
      <div class="popup-slide-right">
        <div class="content">
          <div class="card-select">
            <div>优惠券分类</div>
            <div>
              <el-select v-model="value" @change="change" placeholder="满减券" class="select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <el-srcollbar>
            <div v-for="item in [1,2,3,3,4]">
              <ys-coupon></ys-coupon>
            </div>
          </el-srcollbar>
          <div>
            <div class="btn">确认</div>
          </div>
        </div>
        <!--<el-button type="text" @click="open5">点击打开 Message Box</el-button>-->
      </div>
    </ys-popup>
    <!--<ys-vip-card></ys-vip-card>-->
    <!--<router-view></router-view>-->
  </div>

</template>

<script>
  import  ysCoupon from "@/components/coupon"
  import ysPopup from '@/components/popup'
  import  ysVipCard from '@/components/vipCard'
    export default {
        name: "activity",
      components:{
        ysCoupon,
        ysPopup,
        ysVipCard
      },
      data(){
        return {
          cardNum:2,
          showModal:false,
          chosed:false,
          isChecke:false,
          value:'',
          popup:{
            width:1024,
            height:796,
            showModal:true
          },
          isCardList:false,//是否显示卡片信息
          activeCardList:[],
          isEdit:false,//是否可以添加
          showDel:false,//是否有删除
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
          show:true,
          // 上传组件的按钮
          dialogImageUrl: '',
          dialogVisible: false,
          // 显示第一个按钮还是第二个
          showBtn1:true,
          Timevalue:''//时间选择的值
        }
      },
      methods:{
        choose(index){
          this.chosed=!this.chosed
        },
        back(e){
          console.log(e);
        },
        goBack(){
            this.isCardList=true
        },
        change(){
          console.log(123);
        },
        //删除活动
        delActive(){

        },
        //去到卡券列表
        hrefCard(e){
          this.show=!this.show
          this.$router.push({
              path:'/abc'
            })
        },

        //关闭模态框
        close(e){
          console.log(e);
          this.showModal=e
        },
        //添加文档
        addCard(){
          this.showModal=true
        },
        //编辑卡片
        editCards(){
          if(!this.showDel){
            this.isEdit=true;
            this.showDel=true;
            this.isChecke=true;
          }else {
            this.isEdit=true;
            this.showDel=false;
            this.isChecke=false;
          }

        },

        // 上传组件的事件
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        //获取活动列表
        getActiveCardList(){
            // this.$http.post(this.$api)
          let data=[{item:123,type:3},{item:1235,type:2},{item:1234,type:1},{item:12346,type:4},];
          data.forEach(item=>{
            item.hasChoose=false;
            item.isChoose=false;
          })
          this.activeCardList=data;
        }
      },

    }
</script>

<style lang="less"  scoped>
  @import "~@/assets/style/mixin";

  .active-header{
    display: flex;
    width: 1200px;
    height: 100px;
    justify-content: flex-start;
    align-items: center;
    div{
      width: 111px;
      height: 37px;
      background: #FFD736;
      font-size: 14px;
      line-height: 44px;
      text-align: center;
      margin-right: 30px;
    }
    .disabled{
      background: #E5E5E5;
    }
    .del{
      /*float: right;*/
      margin-left: 750px;
    }
  }
  .main{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    >div{
      margin-bottom: 30px;
      margin-top: 30px;
    }
  }
  .active-items-one{
    width:375px;
    height: 175px;
    position: relative;
    margin-right: 25px;
    img{
      width: 100%;
      height: 100%;
    }
    .active-radio{
      width: 34px;
      height: 34px;

      position: absolute;
      top:-17px;
      right: -17px;
      border-radius: 50%;
      border: 2px solid #ffd73a;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      .active-radio-point{
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #ffd73a;
      }
    }
    .active-text{
      width: 180px;
      height: 16px;
      text-align: center;
      line-height: 16px;
      font-size: 12px;
      color:#fff;
      position: absolute;
      top:113px;
      left: 30px;
    }
  }
  .active-items-team{
    width:375px;
    height: 175px;
    position: relative;
    margin-right: 25px;
    img{
      width: 100%;
      height: 100%;
    }
    .active-radio{
      width: 34px;
      height: 34px;

      position: absolute;
      top:-17px;
      right: -17px;
      border-radius: 50%;
      border: 2px solid #ffd73a;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      .active-radio-point{
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #ffd73a;
      }
    }
    .active-text{
      width: 180px;
      height: 16px;
      text-align: center;
      line-height: 16px;
      font-size: 12px;
      color:#fff;
      position: absolute;
      top:113px;
      left: 30px;
    }
  }

  .active-items-s{
    width:375px;
    height: 175px;
    position: relative;
    margin-right: 25px;
    img{
      width: 100%;
      height: 100%;
    }
    .active-radio{
      width: 34px;
      height: 34px;

      position: absolute;
      top:-17px;
      right: -17px;
      border-radius: 50%;
      border: 2px solid #ffd73a;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      .active-radio-point{
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #ffd73a;
      }
    }
    .active-text{
      width: 180px;
      height: 16px;
      text-align: center;
      line-height: 16px;
      font-size: 12px;
      background: #f99a28;
      color:#fafafa;
      position: absolute;
      top:140px;
      left: 109px;
    }
  }
  .active-items-l{
    width:375px;
    height: 175px;
    position: relative;
    margin-right: 25px;
    img{
      width: 100%;
      height: 100%;
    }
    .active-radio{
      width: 34px;
      height: 34px;

      position: absolute;
      top:-17px;
      right: -17px;
      border-radius: 50%;
      border: 2px solid #ffd73a;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      .active-radio-point{
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #ffd73a;
      }
    }
    .active-text{
      width: 180px;
      height: 16px;
      text-align: center;
      line-height: 16px;
      font-size: 12px;
      position: absolute;
      top:110px;
      left: 210px;
    }
  }
  /*弹窗*/
  .popup-slide-left{
    width: 350px;
    height: 100%;
    border-right: 1px solid #d8d8d8;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    .list-title{
      height:28px;
      font-size:20px;
      color:rgba(40,40,40,1);
      line-height:28px;
      text-align: left;
      margin-top: 41px;
      margin-left: 33px;
    }
    .list-btns{
      margin-top: 68px;
      text-align: center;
      margin-left: 30px;
      li{
        text-align: left;
        display: flex;
        justify-content: space-between;
        width: 276px;
        height: 48px;
        border-radius: 4px;
        background: @bs-color;
        align-items: center;
        font-size: 16px;
        i{
          font-weight: bold;
          display: inline-block;
          margin: 0 20px;
        }
      }
    }
  }
  .popup-slide-right{
    .card-select{
      width: 500px;
      margin-top: 137px;
      margin-left: 100px;
      display: flex;
      div:first-child{
        width: 80px;
        height: 40px;
        font-size: 16px;
        line-height: 40px;
      }
      .select{
        width: 383px!important;
        margin-left: 30px;
        /deep/ input{
          width: 383px;
        }
      }
    }
    .form{
      .modal{
        display: flex;
        margin: 30px 0;
        div{
          width: 226px;
          height: 37px;
          border-radius: 4px;
          font-size: 14px;
          text-align: center;
          line-height: 37px;
        }
        .modal-btn{

          background: @bs-color;
          margin-left: 74px;
        }
        .diy-btn{
          background: #E5E5E5;
          margin-left: 30px;
        }

      }
      .content{
        margin-left: 136px;
        margin-bottom: 30px;
      }
      .time{
        display: flex;
        .name{
          width: 136px;
          height: 36px;
          line-height: 36px;
        }
        .select{
          width: 375px;
        }
      }
    }
  }



  .btn{
    .base-btn-111;
    margin-top: 30px;
  }

  //优惠券页面
  .coupons-header{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .block-btn{
      width: 111px;
      height: 38px;
      border-radius: 4px;
      line-height: 38px;
      font-size:14px;
      text-align: center;
      display: inline-block;
      background: #282828;
      color:#FFFFFF;
      margin-right: 100px;
    }
    .base-btn-111{
      margin-right: 30px;
    }
  }



</style>
