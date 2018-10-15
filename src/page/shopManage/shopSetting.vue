/**
*   Created By  YS  on 2018/8/15
*   门店管理
*/
<template>
  <div class="box">
      <div class="btn" @click="addShop"><img src="@/assets/images/icon/addBtn.png" alt="">新建门店</div>
      <!--<div class="btn" @click="addShop"><img src="@/assets/images/icon/addBtn.png" alt="">-->
        <!--<i class="iconfont">&#xe62c;</i></div>-->
    <div>
      <!--<i class="iconfont">&#xe62c;</i>-->
      <!--<i class="iconfont  icon-weibiaoti-1"></i>-->
      <!--<svg class="icon" aria-hidden="true">-->
        <!--<use xlink:href="#icon-weibiaoti-1"></use>-->
        <!--<use xlink:href="#icon-weibiaoti-"></use>-->
      <!--</svg>-->

    </div>
    <div class="shop" v-for="(item,index) in shopList" :key="item.UserShopId">
        <el-row>
           <el-col class="col" :span="7" :offset="5">
              <shop-detail :shop="item"></shop-detail>
           </el-col>
           <el-col class="detail" :span="9" :offset="1">
             <img  class="detail-logo" :src="item.Logo" alt="">
             <div v-if="shopRole!=4" class="change-btn" @click="modify(item,index)">修改</div>
             <div v-if="shopRole!=4" class="change-btn" @click="delShop(item,index)">删除</div>
           </el-col>
        </el-row>
    </div>

    <!--//添加店铺-->
    <ys-popup
      v-if="showModal"
      :width="pWidth"
      :height="pHeight"
      @close="closePop"
    >
      <div class="addShop">
        <el-scrollbar class="addshop-contentd" >
          <el-row class="content">
            <el-col class="span9" :span="9">
              <el-scrollbar class="scroll">
                <!--员工卡片-->
                <shop-detail :shop="form"></shop-detail>
                <iframe :src="TuwenUrl"  class="iframe" frameborder="0"></iframe>
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
                          <img v-if="form.Pics" :src="form.Pics" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon logo"></i>
                        </el-upload>
                        <span class="image-tips">店铺封面设置（比例：750 x 316）</span>
                      </el-col>
                      <el-col :span="10">
                        <!--<img :src="imageUrl" alt="">-->
                        <el-upload
                          class="avatar-uploader"
                          action="http://mdimg.yilianchuang.cn/uploadimage3.ashx"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess2"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="form.Logo" :src="form.Logo" class="avatar-logo">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span class="image-tips">
                          店铺头像设置
                        </span>
                      </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6" class="base-col">标题</el-col>
                <el-col :span="16" ><input type="text"
                                           class="base-input"
                                           placeholder="请输入标题"
                                           v-model="form.Title"></el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <!--<el-row class="row-margin">-->
                <!--<el-col :span="6">标题</el-col>-->
                <!--<el-col :span="16" ><input class="base-input" type="text" placeholder="请输入标题"></el-col>-->
                <!--<el-col :span="2" class="after"></el-col>-->
              <!--</el-row>-->
              <el-row class="row-margin">
                <el-col :span="6" class="base-col">简介</el-col>
                <el-col :span="16" >
                  <textarea name=""
                            placeholder="请输入简介"
                            class="textarea"
                            v-model="form.Content">

                  </textarea>
                </el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6" class="base-col">店名</el-col>
                <el-col :span="16" ><input  class="base-input"
                                            type="text"
                                            v-model="form.Name"
                                            placeholder="请输入店名"></el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6" class="base-col">地址</el-col>
                <el-col :span="16" ><input  class="base-input"
                                            type="text"
                                            v-model="form.Address"
                                            placeholder="请输入地址"></el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6" class="base-col">电话</el-col>
                <el-col :span="16" ><input  class="base-input"
                                            type="text"
                                            v-model="form.Tel"
                                            placeholder="请输入电话"></el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6" class="base-col">员工数量</el-col>
                <el-col :span="16" ><input type="text"
                                           v-model.number="form.EmployeesNumber"
                                           class="base-input"
                                           placeholder="请输入员工数量"></el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6" class="base-col">营业时间</el-col>
                <el-col :span="16" >
                  <el-time-picker
                    is-range
                    v-model="value4"
                    editable
                    range-separator="-"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                  </el-time-picker>
                </el-col>
                <el-col :span="2" class="after"></el-col>
              </el-row>
              <el-row class="row-margin">
                <el-col :span="6" class="base-col">午休时间</el-col>
                <el-col :span="16" ><el-time-picker
                  is-range
                  v-model="value5"
                  range-separator="-"
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
                <el-col :span="6" class="base-col">门店详情</el-col>
                <el-col :span="16" class="content-btns">
                  <el-row>
                    <el-col :span="12">
                      <div  class="base-btn-111"
                            @click="hrefPower">
                        闪电编辑
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="base-btn-111"
                           @click="openArticle">
                        选择文章
                      </div>
                    </el-col>
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

    <!--选择文章-->
    <ys-popup
      v-show="aShowModal"
      :width="aWidth"
      :height="aHeight"
      :zIndex="zIndex"
      @close="closeArticle"
    >
      <div class="article-box">
        <div class="article-items">
          <div class="article-item"
               :class="{chosed:item.isChosed}"
               @click="chooseArticle(index)"
               v-for="(item,index) in articleList">
            <div class="article-left"><img :src="item.CoverImg" alt="" class="head-img"></div>
            <div class="article-right">
              <div class="article-right-title">{{item.Title}}</div>
              <div class="article-right-content">{{item.content}}</div>
              <div class="article-right-time">
                {{item.CreateDate|dateChange}}
              </div>
            </div>
          </div>
        </div>
       <div>
         <!--<div class="page-size-box">-->
           <!--<el-pagination-->
             <!--prev-text="上一页"-->
             <!--next-text="下一页"-->
             <!--:page-size="pageSize"-->
             <!--@size-change="changeSize"-->
             <!--@prev-click="prev"-->
             <!--@next-click="next"-->
             <!--@current-change="current"-->
             <!--layout="prev, pager, next"-->
             <!--class="page"-->
             <!--:total="total">-->
           <!--</el-pagination>-->
         <!--</div>-->
       </div>
        <div class="btns">
          <el-row>
            <el-col :span="12"><div class="base-btn-111" @click="closeArticle">取消</div></el-col>
            <el-col :span="12"><div class="base-btn-111" @click="confirm">确定</div></el-col>
          </el-row>
        </div>
      </div>

    </ys-popup>
  </div>
</template>


<script>
  import  shopDetail from '@/components/shopDetail';
  import  ysPopup from '@/components/popup'
  import upload from '@/components/upload'
  import {emptyObj} from "../../assets/script/util";
  import api from "@/assets/script/url"
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name: "shopSetting",
    components:{
      shopDetail,
      ysPopup,
      upload
    },

    data(){
      return{

        showModal:false,
        pWidth:1200,
        pHeight:850,
        aWidth:550,
        aHeight:880,
        aShowModal:false,//文章弹窗
        zIndex:1000,
        value4: [new Date(2018, 9, 10, 8, 40), new Date(2018, 9, 10, 9, 40)],
        value5: [new Date(2018, 9, 10, 8, 40), new Date(2018, 9, 10, 9, 40)],
        isEdit:false,
        form:{
          Pics:'',
          Logo:'',
          Title:'',
          Content:'',
          Name:'',
          Address:'',
          Tel:'',
          ShopStartDate:'',
          ShopEndDate:'',
          LunchStartDate:'',
          LunchEndDate:'',
          EmployeesNumber:''
        },
        shopList:[],
        articleList:[],//文章列表
        articleIndex:'',
        TuwenUrl:''//图文链接
      }
    },
    filters:{
      dateChange(val){
        try{
          var first =val.indexOf('(');
          var last =val.indexOf(')');
          var time=val.substring(first+1,last)
        }catch(err){
          console.debug(err);
        }

        time=new Date(parseInt(time-8*60*60*1000));
        const year = time.getFullYear()
        const month = time.getMonth() + 1
        const day = time.getDate()
        const hour = time.getHours()
        const minute = time.getMinutes()
        const second = time.getSeconds()
        const formatNumber = n => {
          n = n.toString()
          return n[1] ? n : '0' + n
        }
        return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')

      }
    },
    methods:{
      ...mapMutations({saveShop:'SET_SHOP'}),
      addShop(){
        // this.$http.post('/shop',{userId:1007})
        this.showModal=true
      },

      closePop(e){
        this.showModal=false;
        this.reset()
      },
      closeArticle(){
        this.aShowModal=false;
        this.articleList.forEach(item=>{
          item.isChosed=false
        })
      },

      handleAvatarSuccess1(res, file){
        console.log(file);
        // this.form.Pics=URL.createObjectURL(file.raw);
        this.form.Pics=file.response.url;
        console.log(this.form.Pics);
      },

      // 头像上传
      handleAvatarSuccess2(res, file) {
        this.form.Logo=file.response.url;

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
      addshop(isEdit){
        if(this.isEdit){//是否是编辑
          this.isEdit=false
          let form = this.form;
          let obj = {
            model: {
              UserShopId:form.UserShopId,
              Pics: form.Pics,
              Logo: form.Logo,
              Name: form.Name,
              Content: form.Content,
              Address: form.Address,
              Tel: form.Tel,
              Title:form.Title,
              ShopStartDate: this.value4[0].toString().substr(16, 5),
              ShopEndDate: this.value4[1].toString().substr(16, 5),
              LunchStartDate: this.value5[0].toString().substr(16, 5),
              LunchEndDate: this.value5[1].toString().substr(16, 5),
              //todo死数据
              Position: '116.381847,39.98109',
              TuwenUrl: this.TuwenUrl,
              EmployeesNumber: form.EmployeesNumber
            }
          }
          // this.$http.post(api.updataShop, obj).then(json => {
          //   let data = json.data;
          //   if (data.isSuc == true) {
          //     this.showModal = false;
          //     this.getShopList()
          //     this.form = emptyObj(this.form);
          //     this.$message({
          //       message: '店铺修改成功',
          //       type: 'success'
          //     });
          //   }
          // }).catch(err => {
          //   console.log(err);
          // })

          this.$util.post(this,this.$api.updataShop,obj,(data)=>{
            this.showModal=false;
            this.reset()
            this.getShopList()
            this.form = emptyObj(this.form);
                this.$message({
                  message: '店铺修改成功',
                  type: 'success'
                });
          })
        }else{
          let form = this.form;
          let obj = {
            model: {
              Pics: form.Pics,
              Logo: form.Logo,
              Name: form.Name,
              Content: form.Content,
              Address: form.Address,
              Tel: form.Tel,
              Title:form.Title,
              ShopStartDate: this.value4[0].toString().substr(16, 5),
              ShopEndDate: this.value4[1].toString().substr(16, 5),
              LunchStartDate: this.value5[0].toString().substr(16, 5),
              LunchEndDate: this.value5[1].toString().substr(16, 5),
              //todo死数据
              Position: '116.381847,39.98109',
              TuwenUrl: 'http://mdimg.yilianchuang.cn/uploadimage3.ashx',
              EmployeesNumber: form.EmployeesNumber
            }
          }
          // this.$http.post('/shop/usershop/addUserShop', obj).then(json => {
          //   let data = json.data;
          //   if (data.isSuc == true) {
          //     this.showModal = false;
          //     this.getShopList()
          //     this.form = emptyObj(this.form);
          //     this.$message({
          //       message: '店铺添加成功',
          //       type: 'success'
          //     });
          //   }
          // }).catch(err => {
          //   console.log(err);
          // })
          this.$util.post(this,this.$api.addUserShop,obj,(data)=>{
                this.showModal = false;
            this.reset()
                this.getShopList()
                this.form = emptyObj(this.form);
                this.$message({
                  message: '店铺添加成功',
                  type: 'success'
                });
          })
        }
      },
      //清空表单
      reset(){
          this.form={
          Pics:'',
            Logo:'',
            Title:'',
            Content:'',
            Name:'',
            Address:'',
            Tel:'',
            ShopStartDate:'',
            ShopEndDate:'',
            LunchStartDate:'',
            LunchEndDate:'',
            EmployeesNumber:''
        }
        this.TuwenUrl=''
        this.value4= [new Date(2018, 9, 10, 8, 40), new Date(2018, 9, 10, 9, 40)];
          this.value5= [new Date(2018, 9, 10, 8, 40), new Date(2018, 9, 10, 9, 40)];
      },

      //跳转闪电编辑
      hrefPower(){
        window.open("http://www.tuwen.la/mdtokenlogin.aspx?token="+this.userInfo.EditorToken,'_blank')
      },
      //选择文章
      openArticle(){
        console.log(this.$util);
        this.$util.post(this,'http://www.tuwen.la/api/article/list4md',{PageIndex: 1,
          PageSize: 10,
          token:this.userInfo.EditorToken},(data)=>{
          data.Items.forEach(item=>{
            item.isChosed=false
          })
          this.articleList=data.Items;
          this.aShowModal=true
        })
      },
      chooseArticle(index){
        this.articleList.forEach(item=>{
          item.isChosed=false
        })
          this.articleList[index].isChosed=true;
        this.articleIndex=index
      },
      confirm(){
          this.TuwenUrl=this.articleList[this.articleIndex].PublishUrl
        this.articleList.isChosed=false
        this.aShowModal=false
      },
      // 删除店铺
      delShop(id,index){
        console.log(id);
        this.$util.confirm(this,'error','删除该店铺会清空该店铺下所有数据',).then(()=>{
          this.$http.post(api.delShop,{userShopId:id.UserShopId}).then(json=>{
            let data=json.data
            if(data.isSuc==true){
              this.shopList.splice(index,1);
              this.$message({
                message:'成功'
              })
            }
          })
        })

      },
      // 修改
      modify(item,index){
        let shopData=this.shopList[index];
        this.form=shopData;
        this.showModal=true;
        this.isEdit=true
        this.TuwenUrl=this.shopList[index].TuwenUrl
        //回显时间

        let le=this.shopList[index].LunchEndDate.split(':')
        let ls=this.shopList[index].LunchStartDate.split(':')
        let os=this.shopList[index].ShopStartDate.split(':')
        let oe=this.shopList[index].ShopEndDate.split(':')
        this.value4=[new Date(2018, 9, 10, ls[0],ls[1]),new Date(2018, 9, 10, le[0],le[1])]
        this.value5=[new Date(2018, 9, 10, os[0],os[1]),new Date(2018, 9, 10, oe[0],oe[1])]
      },
      // 获取列表
      getShopList(){
        this.$util.post(this,this.$api.shopList,{},(data)=>{
          this.shopList=data;
          this.saveShop(data)
        },true)
      }


    },
    computed:{
        Role(){
            return this.$store.state.Role
        },
      ...mapGetters(['shop','userInfo','shopRole']),
    },
    mounted(){
      this.getShopList()
      console.log(this.shopRole);
    }
  }
</script>
<style lang='less' scoped>

  @import "~@/assets/style/mixin";
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
  }
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
    margin-bottom: 50px;
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
      cursor: pointer;
      width:239px;
      height:37px;
      line-height: 37px;
      /*margin: 0 auto;*/
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
    height: 900px;
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
    width: 216px;
    height: 94px;
    display: block;
  }
  .avatar-logo{
    width: 94px;
    height: 94px;
    display: block;
  }
  .logo{
    width: 216px;
  }

  //选择文章弹窗
  .article-box{
    padding: 70px 50px 0;
    background:#F9F9F9;
  }
  .article-items{
    height: 640px;
  }

  .article-item{
    display: flex;
    padding: 18px;
    background: #fff;
    margin-bottom: 20px;
    border: 2px solid #fff;
    .head-img{
      width: 108px;
      height: 108px;
    }
    .article-right{
      width: 303px;
      margin-left: 30px;
      &-title{
        width:303px;
        height:22px;
        font-size:16px;
        font-weight:600;
        color:rgba(40,40,40,1);
        line-height:22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &-content{
        width:303px;
        max-height:44px;
        height: 44px;
        font-size:12px;
        color:rgba(40,40,40,1);
        line-height:22px;
        overflow: hidden;
        color: #8C8C8C;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        margin-bottom: 13px;
        margin-top: 14px;
      }
      &-time{
        font-size: 16px;
        text-align: left;
      }

    }
  }
  .chosed{
    border: 2px solid @bs-color;
  }
  .btns{
    margin-top: 50px;
  }
.image-tips{
  font-size: 11px;
}
</style>
