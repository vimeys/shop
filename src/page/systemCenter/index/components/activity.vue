<template>
  <div>
    <div v-show="show" >
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
                 v-if="item.Type==3"
                 @click="checkCoupon"
                 :data="0">
              <img src="../../../../assets/images/oneBg.png" alt="" v-if="item.Name">
              <img :src="item.BannerIco" alt="" v-else>
              <div class="active-text" v-show="item.Name"> {{item.Name}}</div>
              <div class="active-radio"  @click.stop="choose(index)" v-show="item.hasChoose">
                <div class="active-radio-point" v-show="item.isChoose"></div>
              </div>
            </div>
            <!--拼团-->
            <div class="active-items-team"
                 v-else-if="item.Type==4"
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
                 v-else-if="item.Type==2"
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
                 v-else="item.Type==1"
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
        <div class="coupons-header">
          <div class="block-btn" @click="goBack"> 返回</div>
          <div class="base-btn-111" @click="openPopup" > 新建优惠券</div>
          <div class="base-btn-111"> 管理</div>
        </div>
        <div class="coupons-item" style="display: flex;">
          <div  class="coupon-card" v-for="(item,index) in oneCouponList">
            <ys-coupon
              :detail="item"
              :index="index"
              :isShowEdit="true"
              :marginBottom="0"></ys-coupon>
          </div>
        </div>
      </div>
    </div>

  <!--一元买卷-->
    <ys-popup v-show="activeValue==1"
              @close="closeOne"
    >
      <div class="popup-slide-left">
        <div class="list-title">活动</div>
        <el-row>
          <el-col>
            <el-select v-model="activeValue" >
              <el-option
                v-for="item in options"
                :kye=item.value
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div class="list-btns">
          <ul>
            <li><i class="el-icon-document"></i>活动详情<i class="el-icon-arrow-right"></i> </li>
          </ul>
        </div>
      </div>
      <div class="popup-slide-right">
        <div class="content">
          <!--<div class="card-select">-->
            <!--<div>优惠券分类</div>-->
            <!--<div>-->
              <!--<el-select v-model="value" @change="change" placeholder="满减券" class="select">-->
                <!--<el-option-->
                  <!--v-for="item in options"-->
                  <!--:key="item.value"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</div>-->
          <!--</div>-->
          <div class="form">
              <div class="modal">
                <div class="modal-btn" :class="{'disabled':one.isDiy}" @click="toggleDiy">填写模板Banner信息</div>
                <div class="diy-btn" :class="{'disabled':!one.isDiy}" @click="toggleDiy">上传自定义Banner</div>
              </div>
              <div>
                <div class="content" v-if="!one.isDiy">
                  <div class="active-items-one">
                    <img src="../../../../assets/images/oneBg.png" alt="">
                    <div class="active-text"> {{one.bannerWord}}</div>
                    <div class="active-radio" @click="choose">
                      <div class="active-radio-point" v-show="chosed"></div>
                    </div>
                  </div>
                </div>
                <div v-else style="margin-bottom: 30px">
                  <el-upload
                    class="avatar-uploader"
                    action="http://mdimg.yilianchuang.cn/uploadimage3.ashx"
                    :show-file-list="false"
                    :on-success="upLoadDiy"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <img v-if="one.Pic" :src="one.Pic" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <!--<el-dialog :visible.sync="dialogVisible">-->
                    <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                  <!--</el-dialog>-->
                </div>
              </div>
            <div class="time">
              <div class="name">活动时间</div>
              <div class="select"><el-date-picker
                v-model="Timevalue"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker></div>
            </div>
            <div class="word" v-if="!one.isDiy">
              <el-row>
                <el-col :span="6">文案</el-col>
                <el-col :span="16">
                  <input type="text"
                         v-model="one.bannerWord"
                         class="base-input"
                         placeholder="请输入Banner文案" >
                  <span>*限20个字以内
                  </span>
                </el-col>
              </el-row>
            </div>
          </div>
          <div>
            <div class="btn" @click="confirmOne">确认</div>
          </div>
        </div>
        <!--<el-button type="text" @click="open5">点击打开 Message Box</el-button>-->
      </div>
    </ys-popup>

    <!--//团购-->
    <ys-popup
        v-show="!activeValue==2"
        @close="closeTeam"
    >
      <div class="popup-slide-left">
        <div class="list-title">活动</div>
        <el-row>
          <el-col>
            <el-select v-model="activeValue" >
              <el-option
                v-for="item in options"
                :kye=item.value
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div class="list-btns">
          <ul>
            <li :class="[goodsItemClass1]" @click="chooseGoodsItem(1)">
              <i class="el-icon-document "></i>
              <span class="after">服务属性</span>
              <i class="el-icon-arrow-right"></i>
            </li>
            <li :class="[goodsItemClass2]" @click="chooseGoodsItem(2)" >
              <i class="el-icon-document"></i>
              服务详情
              <i class="el-icon-arrow-right"></i>
            </li>
          </ul>
          <el-row class="team-detail-li">
            <el-col :span="12">
              <span class="choose-point" :class="[choose1]"></span>
              <span>基础设置</span>
            </el-col>
          </el-row>
          <el-row class="team-detail-li">
            <el-col :span="18">
              <span class="choose-point" :class="[choose2]"></span>
              <span>商品设置</span>
            </el-col>
          </el-row>


        </div>
      </div>
      <div class="popup-slide-right">
        <div class="content">
          <!--<div class="card-select">-->
            <!--<div>优惠券分类</div>-->
            <!--<div>-->
              <!--<el-select v-model="value" @change="change" placeholder="满减券" class="select">-->
                <!--<el-option-->
                  <!--v-for="item in options"-->
                  <!--:key="item.value"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</div>-->
          <!--</div>-->
          <div class="form">
            <div class="modal">
              <div class="modal-btn" :class="{'disabled':one.isDiy}" @click="toggleDiy">填写模板Banner信息</div>
              <div class="diy-btn" :class="{'disabled':!one.isDiy}" @click="toggleDiy">上传自定义Banner</div>
            </div>
            <div>
              <div class="content" v-if="!one.isDiy">
                <div class="active-items-one">
                  <img src="../../../../assets/images/oneBg.png" alt="">
                  <div class="active-text"> {{one.bannerWord}}</div>
                  <div class="active-radio" @click="choose" v-show="isChecke">
                    <div class="active-radio-point" v-show="chosed"></div>
                  </div>
                </div>
              </div>
              <div v-else style="margin-bottom: 30px">
                <el-upload
                  class="avatar-uploader"
                  action="http://mdimg.yilianchuang.cn/uploadimage3.ashx"
                  :show-file-list="false"
                  :on-success="upLoadDiy"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <img v-if="one.Pic" :src="one.Pic" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <!--<el-dialog :visible.sync="dialogVisible">-->
                <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                <!--</el-dialog>-->
              </div>
            </div>
            <div class="time">
              <div class="name">活动时间</div>
              <div class="select"><el-date-picker
                v-model="Timevalue"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker></div>
            </div>
            <div class="word">
              <el-row>
                <el-col :span="6">文案</el-col>
                <el-col :span="16">
                  <input type="text"
                         v-model="one.bannerWord"
                         class="base-input"
                         placeholder="请输入Banner文案" >
                  <span>*限20个字以内
                  </span>
                </el-col>
              </el-row>
            </div>
          </div>
          <div>
            <div class="btn" @click="confirmOne">确认</div>
          </div>
        </div>
        <!--<el-button type="text" @click="open5">点击打开 Message Box</el-button>-->
      </div>
    </ys-popup>


    <!--添加优惠券-->
    <ys-popup
      :width="popup.width"
      :height="popup.height"
      v-show="popup.showModal"
      @close="closeCoupon"
    >
      <div class="popup-slide-left">
        <div class="list-title">活动</div>
        <div class="list-btns">
          <ul>
            <li><i class="el-icon-document"></i>活动详情<i class="el-icon-arrow-right"></i> </li>
            <!--<li :class="[goodsItemClass1]" @click="chooseGoodsItem(1)">-->
              <!--<i class="el-icon-document "></i>-->
              <!--<span class="after">服务属性</span>-->
              <!--<i class="el-icon-arrow-right"></i>-->
            <!--</li>-->
            <!--<li :class="[goodsItemClass2]" @click="chooseGoodsItem(2)" >-->
              <!--<i class="el-icon-document"></i>-->
              <!--服务详情-->
              <!--<i class="el-icon-arrow-right"></i>-->
            <!--</li>-->
          </ul>
        </div>
      </div>
      <div class="popup-slide-right">
        <div class="content">
          <div class="card-select">
            <div>优惠券分类</div>
            <div>
              <el-select v-model="typeValue" @change="change" placeholder="满减券" class="select">
                <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <el-scrollbar class="coupon-scroll">
            <div  class="coupon-card" v-for="(item,index) in couponList[typeValue]">
              <ys-coupon
                :detail="item"
                :index="index"
                :isShowEdit="true"
                :marginBottom="0"></ys-coupon>
              <div class="coupon-circle" @click="chooseCoupon(index)">
                <div class="coupon-point" v-show="item.isChecked"></div>
              </div>
            </div>
          </el-scrollbar>
          <div>
            <div class="btn" @click="confirmCoupon">确认</div>
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
          showModal:true,
          chosed:false,
          isChecke:false,
          value:'',
          // 一元买卷
          marginBottom:0,
          popup:{
            width:1024,
            height:796,
            showModal:false
          },
          one:{//一元买卷弹窗
            bannerWord:'',//文案
            Pic:'',
            isDiy:false
          },
          isCardList:true,//是否显示卡片信息
          activeCardList:[],
          isEdit:false,//是否可以添加
          showDel:false,//是否有删除
          activeValue:'',
          options: [{
            value: 1,
            label: '一元买卷'
          }, {
            value:2,
            label: '拼团'
          }, {
            value: 3,
            label: '秒杀'
          }, {
            value: 4,
            label: '幸运大抽奖'
          }],
          typeValue:1,
          type:[
            {
              name:'满减劵',
              value:1
            },
            {
              name:'折扣卷',
              value:2
            }, {
              name:'现金卷',
              value:3
            }
          ],
          couponList:[],//优惠券列表
          checkCouponList:[],//选中的卡卷
          oneCouponList:[],//一元买卷下的卡卷列表
          show:true,
          // 上传组件的按钮
          dialogImageUrl: '',
          goodsItemClass1:'goods-active',//分类class
          goodsItemClass2:'',
          choose1:'chosed',
          choose2:'',
          dialogVisible: false,
          // 显示第一个按钮还是第二个
          showBtn1:true,
          Timevalue:''//时间选择的值
        }
      },
      methods:{

        back(e){
          console.log(e);
        },
        goBack(){
            this.isCardList=true
        },
        openPopup(){
            this.popup.showModal=true
        },
        change(){
          console.log(123);
        },
        //删除活动
        // todo 等待删除
        delActive(){
          let arr=[]
          this.activeCardList.forEach(item=>{
            if(item.isChoose==true){
              arr.push(item)
            }
          })

        },
        //查看详情
        checkCoupon(e){
            this.isCardList=false;
        },
        //选择分类
        chooseGoodsItem(value){
          if(value==1){
            this.goodsItemClass1='goods-active';
            this.goodsItemClass2=''
          }else {
            this.goodsItemClass1='';
            this.goodsItemClass2='goods-active'
          }
        },
        //关闭一元买卷模态框
        closeOne(e){
          this.activeValue=""
        },
        //关闭团购模态框
        closeTeam(e){
            this.activeValue=""
        },

        //选择是否是用diy
        toggleDiy(){
          this.one.isDiy=!this.one.isDiy;
        },
        upLoadDiy(res,file){
            this.one.Pic=file.response.url;
        },
        //一元买卷发布
        confirmOne(){
            let obj={}
            obj.StartDate=this.$util.parseTime(new Date(this.Timevalue[0]).getTime());
            obj.EndDate=this.$util.parseTime(new Date(this.Timevalue[0]).getTime());

            obj.Type=3;
            // obj.BannerIco='';
            if(this.one.isDiy){
              obj.BannerIco=this.one.Pic;
            }else{
              obj.Name=this.one.bannerWord;
            }
            this.$http.post(this.$api.addOne,{model:obj}).then(json=>{
              console.log(json);
              let data=json.data;
              if(json.isSuc==true){
                this.$message({
                  message:'添加成功',
                  icon:'success'
                })
              }
            })
        },

        closeCoupon(){
            this.popup.showModal=false
        },
        //添加文档
        addCard(){
          this.activeValue=1
        },
        //编辑卡片
        editCards(){
          if(!this.showDel){
            this.isEdit=true;
            this.showDel=true;
            this.activeCardList.forEach(item=>{
              item.hasChoose=true
            })
            // this.isChecke=true;
          }else {
            this.isEdit=true;
            this.showDel=false;
            this.activeCardList.forEach(item=>{
              item.hasChoose=false
              item.isChoose=false
            })
            // this.isChecke=false;
          }
        },
        //选中活动卡片
        choose(index){
            this.activeCardList[index].isChoose=!this.activeCardList[index].isChoose
        },
        //选中卡片
        chooseCoupon(index){
          let value=this.couponList[this.typeValue];
          value[index].isChecked=!value[index].isChecked
          this.couponList.splice(this.typeValue,1,value);
        },
        //确选中的优惠券
        confirmCoupon(){
          let arr2=[];
          for(let i=1;i<4;i++){
            this.couponList[i].forEach(item=>{
              if(item.isChecked){
                // let obj={}
                // obj.Type=i;
                // obj.CouponBookId=item.CouponBookId;
                arr2.push(item.CouponBookId);

              }
            })
          }
          // this.showModel=false;
          this.$util.post(this,this.$api.addOneCoupon,
            {userGameId:909,couponBookList:arr2},
            (data)=>{
              console.log(data);
            })
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
          this.$http.post(this.$api.activeList,{query:{PageIndex:1, PageSize:10}}).then(json=>{
            console.log(json);
            let data=json.data;
            if(data.isSuc==true){
              let data2=data.result.Items
              data2.forEach(item=>{
                item.hasChoose=false;
                item.isChoose=false;
              })
              this.activeCardList=data2;
            }
          })
          return
          let data=[{item:123,type:3},{item:1235,type:2},{item:1234,type:1},{item:12346,type:4},];
          data.forEach(item=>{
            item.hasChoose=false;
            item.isChoose=false;
          })
          this.activeCardList=data;
        },
        //获取优惠券列表
        getCouponList(type){
          this.$util.post(this,this.$api.couponList,
            {query:{ PageIndex:1,PageSize:10,Key:'',Type:type}},
            (data)=>{
              data.Items.forEach(item=>{
                item.StartTime = this.$util.getTime(item.StartTime)//后台时间转时间撮
                item.EndTime = this.$util.getTime(item.EndTime)//后台时间转时间错
                item.hasChecked=false
                item.isChecked=false
              })
              this.couponList[type]=data.Items;
            })
        },
        //获取一元买卷下面的优惠券列表
        getOneCouponList(){
          //TODO  写死一个userGameId
            this.$util.post(this,this.$api.oneCouponList,
              {pageIndex:1,pageSize:10,userGameId:909},
              (data)=>{
              data.Items.forEach(item=>{
                item.StartTime = this.$util.getTime(item.StartDate)//后台时间转时间撮
                item.EndTime = this.$util.getTime(item.EndDate)//后台时间转时间错
                item.hasChecked=false;
                item.isChecked=false;
              })
              this.oneCouponList=data.Items;
            })
        }
      },
      mounted(){
        this.getCouponList(1);
        this.getCouponList(2);
        this.getCouponList(3);
        this.getOneCouponList();
        this.getActiveCardList()
      }

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
      line-height: 37px;
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
    width: 375px;
    height: 174px;
    display: block;
  }
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
        align-items: center;
        font-size: 16px;
        i{
          font-weight: bold;
          display: inline-block;
          margin: 0 20px;
        }
      }
      li.goods-active{
        background: @bs-color;
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
          background: @bs-color;
          margin-left: 30px;
        }
        .disabled{
          background: #E5E5E5;
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
      .word{
        margin-top: 30px;
      }
    }
  }



  .btn{
    .base-btn-111;
    margin-top: 30px;
  }

  //优惠券弹窗页面
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
  }
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
  .coupon-scroll{//
    margin-top: 30px;
    height: 500px;
    width: 670px;
    .coupon-card{
      margin: 15px auto;
      width: 498px;
      height: 144px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border: 2px solid #E1E1E1;
      border-radius: 8px;
    }
    .coupon-circle{
      position: absolute;
      top:72px;
      right: -17px;
      border-radius: 50%;
      width: 34px;
      height: 34px;
      border: 2px solid @bs-color;
      display: flex;
      align-items: center;
      justify-content: center;
      .coupon-point{
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: @bs-color;
      }
    }
  }
  /*.base-btn-111{*/
    /*margin-top: 30px;*/
  /*}*/
  .team-detail-li{
      height: 48px;
    line-height: 48px;
    display: flex;
    justify-content: center;
    margin-left: -60px;
    .choose-point{
      width: 10px;
      height: 10px;
      display: inline-block;
      border-radius: 50%;
      margin-right: 10px;
    }
    .chosed{
      background-color:#FFD736;
    }
  }
</style>
