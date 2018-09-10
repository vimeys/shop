/**
*   Created By  YS  on 2018/8/11
*/
<template>
  <div class="box">
      <div class="choose-title">
        <el-row>
          <el-col :span="4">
            <el-select v-model="value" placeholder="请选择" size="small" @change="chooseShop" v-if="shopList.length">
              <el-option
                v-for="item in shopList"
                :key="item.value"
                :label="item.Name"
                :value="item.UserId">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2" class="base-col">总数：2人</el-col>
          <el-col :span="6" :offset="12"> <div><ys-search></ys-search></div></el-col>
        </el-row>
      </div>
    <div class="btns">
      <!--<div class="setting">设置权限</div>-->
      <div class="classify" @click="openGroup">新建员工分类</div>
      <!--<div class="setting" @click="openJob">职位设置</div>-->
      <!--<div class="project">管理员工服务项目</div>-->
    </div>
    <div class="tables"v-for="(item,index) in groupList" >
        <div class="title">{{item.GroupName}}({{item.UsersList.Items.length}}人)
          <i class="el-icon-delete"
             @click="delGroup(index)"
             style="position: relative; right: -500px"></i>
        </div>
        <el-row class="table-title">
          <!--<el-col></el-col>-->
          <el-col :span="3">姓名</el-col>
          <el-col :span="2">手机号</el-col>
          <el-col :span="2">权限</el-col>
          <el-col :span="2">职位</el-col>
          <el-col :span="2">状态</el-col>
          <el-col :span="2">密码</el-col>
          <el-col :span="11">管理</el-col>
        </el-row>
      <el-row class="row" v-for="(itemSon,indexSon ) in item.UsersList.Items" :key="itemSon.GroupId">
        <el-col :span="3">
          <el-row>
            <el-col :span="8">.</el-col>
            <el-col :span="16">{{itemSon.TrueName||'无'}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="2">{{itemSon.PhoneNum||'无'}}</el-col>
        <el-col :span="2">{{itemSon.UserRoleName||'无'}}</el-col>
        <el-col :span="2">{{itemSon.JobTitle||'无'}}</el-col>
        <el-col :span="2">{{激活|capitalize}}</el-col>
        <el-col :span="2">{{itemSon.AlbumPass||'无'}}</el-col>
        <el-col :span="11">
            <el-row :gutter="10">
              <el-col :span="4">
                <div class="table-btn"
                     @click="openMove(index,indexSon)">移动</div>
              </el-col>
              <el-col :span="4">
                <!--todo  冻结接口没有做-->
                <div class="table-btn"
                     :class="{'disable':!itemSon.disable}"

                     @click="freeze(index,indexSon)">{{itemSon.disable?'冻结':'取消冻结'}}</div>
              </el-col>
              <el-col :span="4">
                <div class="table-btn" @click="editInfo(index,indexSon)" >编辑</div>
              </el-col>
              <el-col :span="4">
                <div class="table-btn" @click="del(index,indexSon)">删除</div>
              </el-col>
              <el-col :span="7">
                <el-select v-model="itemSon.job" placeholder="请选择" size="small">
                  <el-option
                    v-for="(itemGrandson,indexGrandson) in itemSon.jobList"
                    :key="itemGrandson.value"

                    :label="itemGrandson.label"
                    :value="itemGrandson.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
        </el-col>
      </el-row>
      <el-row class="table-btns" :gutter="20">
        <el-col :span="3">
          <div class="base-btn-111"
               @click="addNewPeople(index)"
          >添加成员</div>
        </el-col>
        <el-col :span="3">
          <div class="base-btn-111">批量管理</div>
        </el-col>
        <el-col :offset="1" :span="8">
          <el-row >
              <el-col :span="8"><div class="base-btn-111">全选</div></el-col>
              <el-col :span="8">
                <div class="base-btn-111">移动分组</div></el-col>
              <el-col :span="8">
                <div class="base-btn-111">
                  删除
                </div>
              </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <!--*********添加分组********-->
    <ys-popup
      v-show="group.showModal"
      :width="group.width"
      @close="closeGroup"
      :height="group.height"
    >
      <div class="group-box">
          <el-row class="group-title">
            <el-col  :span="6"><h3>新建员工分类</h3></el-col>
          </el-row>
        <el-row class="group-input">
          <el-col>
            <input type="text" v-model="groupName" placeholder="请输入员工分类名称" class="base-input">
          </el-col>
        </el-row>
        <el-row class="group-input2" :gutter="30">
          <el-col :span="4">
            提成比例
          </el-col>
          <el-col :span="18">
            <input type="text" v-model="Charge" placeholder="请输入员工分类名称" class="base-input">
          </el-col>
          <el-col :span="2">%</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" :offset="10">
            <div class="base-btn-111" @click="addGroup">确定</div>
          </el-col>
        </el-row>
      </div>
    </ys-popup>
    <!--*********编辑资料********-->
    <ys-popup
      v-show="edit.showModal"
      :width="edit.width"
      @close="closeGroup"
      :height="edit.height"
    >
      <div class="group-box">
          <el-row class="group-title">
            <el-col  :span="6"><h3>新建员工分类</h3></el-col>
          </el-row>
        <el-row class="group-input">
          <el-col>
            <input type="text" v-model="editName" placeholder="请输员工名称" class="base-input">
          </el-col>
        </el-row>
        <el-row class="group-input">
          <el-col>
            <input type="text" v-model="editJob" placeholder="请输员工职位" class="base-input">
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" :offset="10">
            <div class="base-btn-111" @click="editConfirm">确定</div>
          </el-col>
        </el-row>
      </div>
    </ys-popup>


    <!--********添加新员工*******-->
    <ys-popup
      v-show="add.showModal"
      :height="add.height"
      :width="add.width"
      @close="closeAdd"
    >
      <div class="add">
        <el-row  class="header" justify="start">
          <el-col :span="4"><h3>添加成员</h3></el-col>
        </el-row>
        <el-row class="add-text">
          <el-col :span="20">我们将向您的成员手机发送有店+的邀请</el-col>
        </el-row>
        <el-row :gutter="20" class="add-form">
          <el-col :span="5">
            <input type="text"
                   v-model="TrueName"
                   class="base-input"
                   placeholder="请输入成员姓名">
          </el-col>
          <el-col :span="7">
            <input type="text"
                   v-model="JobTitle"
                   class="base-input"
                   placeholder="请输入职位（可为空）">
            <!--<el-select v-model="job" placeholder="请选择职位">-->
              <!--<el-option-->
                <!--v-for="item in jobList"-->
                <!--:key =item.value-->
                <!--:value=item.value-->
                <!--:label=item.label-->
              <!--&gt;-->
              <!--</el-option>-->
            <!--</el-select>-->
          </el-col>
          <el-col :span="8">
            <input type="text"
                   v-model.number="UserName"
                   class="base-input"
                   placeholder="请输入成员手机号">
          </el-col>
          <el-col :span="4">
            <div class="base-btn-111" @click="sendMessage">邀请</div>
          </el-col>
        </el-row>
        <el-row class="add-tips">
          <el-col>如果您需要更快速地添加多个成员，我们推荐您下载excel模板，填写完成后直接上传</el-col>
        </el-row>
        <el-row class="add-btn">
          <el-col><div class="base-btn-111">上传excel</div></el-col>
        </el-row>
      </div>
    </ys-popup>

      <!--成员分组-->
    <ys-popup
      v-show="move.showModal"
      :height="move.height"
      :width="move.width"
      @close="closeMove"
    >
      <div class="add">
        <el-row  class="header" justify="start">
          <el-col :span="4" class="header-word">移动分组</el-col>
        </el-row>
        <el-row  :gutter="20" class="add-text">
          <el-col :span="6">分组人员：</el-col>
          <el-col :span="16"> {{moveGroupPersonfn}} </el-col>
        </el-row>
        <el-row :gutter="20" class="add-form">
          <el-col :span="6">分组人员：</el-col>
          <el-col :span="16">
            <el-select v-model="value" placeholder="请选择" size="small">
              <el-option
                v-for="item in groupList"
                :key="item.GroupId"
                :label="item.GroupName"
                :value="item.GroupId">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="add-btn">
          <el-col><div class="confirm-btn" @click="moveGroup"> 确定</div></el-col>
        </el-row>
      </div>
    </ys-popup>

    <!--//添加单个人员列表-->
    <!--<ys-popup-->
      <!--v-show="staffList.showModal"-->
      <!--:width="staffList.width"-->
      <!--:height="staffList.height"-->
      <!--:zIndex="staffList.zIndex"-->
    <!--&gt;-->
      <!--<div class="choose">-->
        <!--<el-row>-->
          <!--<el-col :span="24">员工分类</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="8"></el-col>-->
        <!--</el-row>-->
      <!--</div>-->
    <!--</ys-popup>-->


    <!--职位设置-->
    <!--<ys-popup-->
      <!--:width="jobPopup.width"-->
      <!--:height="jobPopup.height"-->
      <!--v-show="jobPopup.showModal"-->
      <!--@close="closeJob"-->
    <!--&gt;-->
      <!--<div class="job-box">-->
        <!--<el-row class="base-row">-->
          <!--<el-col :span="4"><h3>职位设置</h3></el-col>-->
        <!--</el-row>-->

        <!--<el-row class="base-row" v-for="item in jobList">-->
          <!--<el-col class="" :span="12"><el-input v-model="Name" placeholder="请输入内容"  :disabled="jobIsEdit"></el-input></el-col>-->
          <!--<el-col :span="4" :offset="1">-->
            <!--<div @click="jobEdit" v-if="jobIsEdit" class="base-btn-111">修改</div>-->
            <!--<div @click="jobConfirm" v-else class="base-btn-111">确定</div>-->

          <!--</el-col>-->
          <!--<el-col :span="4" :offset="2"><div class="base-btn-111">删除</div></el-col>-->
        <!--</el-row>-->
        <!--<el-row class="base-row">-->
          <!--<el-col :span="10">-->
            <!--<div class="base-btn-111" @click="addNewJob">添加新职位</div>-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</div>-->
    <!--</ys-popup>-->
  </div>






</template>

<script>
    import ysSearch from '@/components/search';
    import  YsPopup from '@/components/popup'
    import api from "@/assets/script/url"
    export default {
        name: "staffSetting",
        components:{
          ysSearch,
          YsPopup
        },
      data(){
          return {
            Name:'店长',//职位名字
            jobIsEdit:false,//是否可以编辑职位
            value:'',//
            placeholder:'搜索姓名或手机号',
            add:{
              width:900,
              height:427,
              showModal:false
            },
            group:{//添加分组
              width:645 ,
              height:387,
              showModal:false
            },
            edit:{//编辑资料
                width:645,
              height:445,
              showModal:false,
            },
            groupName:'',
            Charge:'',//折扣比例
            move:{
              width:645,
              height:445,
              showModal:false
            },
            staffList:{
              width: 480,
              height: 800,
              showModal: false,
              zIndex: 1000
            },
            table:[1,3,4],
            currentShopId:'',//当前店铺的id
            shopList:[],//店铺列表
            groupList:[],//当前店铺分组列表
            simpleGroupList:[],
            currentGroupId:'',//当前分组id
            TrueName:'',//添加成员的真是姓名
            UserName:'',//添加成员电话
            JobTitle:'',//职位名称
            moveGroupPerson:[],//移动人员名单
            moveGroupId:[],//移动人员id
            delUserId:[],//删除人员
            editName:'',//修改人员名字
            editJob:'',//修改人员工作
            currentUserId:'',//当前用户id
            options:[
              {
                value: '1',
                label: '满减劵'
              }
            ],
            jobPopup:{
                width:645,
                height:766,
                showModal:false
            },
            job:'',
            jobList:[
              {value:0,label:'管理员'},
              {value:1,label:'店长'},
              {value:2,label:'总监'},
              {value:3,label:'高级'},
            ]
          }
      },
      computed:{
        moveGroupPersonfn(){
          if(this.moveGroupPerson.length>0){
            return this.moveGroupPerson.join('/')
          }else{
            return this.moveGroupPerson.join('')
          }

        }
      },
      filters:{
        capitalize: function (value) {
          if (value==1) {
            return '已冻结'
          }else{
            return '激活'
          }
        }
      },
      methods:{
         //选择店铺
        chooseShop(e){
          console.log(e);
          this.currentShopId=e
          this.getGroupList(this.currentShopId)
          // alert(e)
        },
      //往分组下添加新的成员
        addNewPeople(index){
          this.add.showModal=true;
          this.currentGroupId=this.groupList[index].GroupId;
        },
        //发送邀请
        sendMessage(){
          //todo 添加成员
            let  obj={
              user:{
                UserName:this.UserName,
                TrueName:this.TrueName,
                GroupId:this.currentGroupId,
                UserShopId:this.currentShopId,
                JobTitle:this.JobTitle,
                RefUserId:123
              }
            }
          this.$http.post(this.$api.addWaiter,obj).then(json=>{
            console.log(json);
            let data=json.data;
            if(data.isSuc==true){
                this.getGroupList(this.currentShopId)
                this.UserName='';
                this.TrueName='';
                this.JobTitle='';
                this.add.showModal=false
            }else{
              this.$message({
                message:'发布失败',
                icon:"error"
              })
            }
          })
        },

        // 删除
        del(i,is){
            this.delUserId.push(this.groupList[i].UsersList.Items[is].UserId)
            this.$util.confirm(this).then(()=>{
                  this.$http.post(this.$api.delPerson,{userIds:this.delUserId}).then(json=>{
                    let data=json.data;
                    if(data.isSuc=true){
                      this.groupList[i].UsersList.Items.splice(is,1)
                        this.$message({
                          message:'删除成功',
                          icon:'success'
                        })
                    }
                  })
            })
        },
        // 单个编辑
        editInfo(i,is){
            this.edit.showModal=true;
            this.editName=this.groupList[i].UsersList.Items[is].TrueName;
            this.editJob=this.groupList[i].UsersList.Items[is].JobTitle;
            this.currentUserId=this.groupList[i].UsersList.Items[is].UserId;
        },
        editConfirm(){
            let obj={
              user:{
                UserId:this.currentUserId,
                TrueName:this.editName,
                JobTitle:this.editJob
              }
            }
            this.$http.post(this.$api.updataPerson,obj).then(json=>{
              let data=json.data;
              if(data.isSuc==true){
                this.getGroupList(this.currentShopId)
                this.edit.showModal=false;
              }
            })
        },
        // 点击单个移动
        openMove(i,is){
          this.move.showModal=true;
          this.moveGroupPerson.push(this.groupList[i].UsersList.Items[is].TrueName)
          this.moveGroupId.push(this.groupList[i].UsersList.Items[is].UserId)
        },
        // 确认移动
        moveGroup(){
          let obj={userIds:this.moveGroupId,groupId:this.value};

          this.$http.post(this.$api.moveGroup,obj).then(json=>{
            let data=json.data;
            if(data.isSuc==true){
              this.getGroupList(this.currentShopId)
                this.value='';
              this.moveGroupPerson=[];
              this.moveGroupId=[];
              this.move.showModal=false;
            }
            // console.log(json);
          })
        },
        closeAdd(e){
          this.add.showModal=e
        },
        //打开分组
        openGroup(){
          this.group.showModal=true;
        },
        // 冻结账号
        freeze(index,indexSon){
          console.log(index, indexSon);



        },

        //添加分组
        addGroup(){
            let obj={
              group:{
                GroupName:this.groupName,
                UserId:this.currentShopId,
                // UserId:1547,
                Charge:this.Charge
              }
            }
          console.log(obj);
          this.$http.post(this.$api.addGroup,obj).then(json=>{
              let data=json.data;
              if(data.isSuc==true){
               this.getGroupList(this.currentShopId);
               this.group.showModal=false
              }
            })
        },
        //删除分组
        delGroup(index){
          let id=this.groupList[index].GroupId;
          this.$util.confirm(this).then(()=>{
            this.$http.post(this.$api.delGroup,{groupId:id}).then(json=>{
              let data=json.data;
              if(data.isSuc==true){
                this.groupList.splice(index,1)
                this.$message({
                  message:'删除成功',
                  type:'success'
                })
              }else{
                this.$message({
                  message:'该分组有用户,不能删除',
                  type:'error'
                })
              }
            })
          })

        },

        //关闭分组
        closeGroup(){
          this.group.showModal=false;
          this.groupName=''
        },

        // 获取当前店铺分组的列表
        getGroupList(shopId){
            this.$http.post(this.$api.waterGroupList,
              {pageindex:1,pagesize:10,userId:shopId}).then(json=>{
              console.log(json);
                  if(json.data.isSuc==true){
                    this.groupList=json.data.result.Items;
                    this.groupList.forEach((item)=>{
                      if(item.UsersList.Items.length>0){
                        item.UsersList.Items.forEach((itemSon,indexSon)=>{
                          console.log(indexSon);
                          let a=Math.floor(Math.random()*100)
                          console.log(a);
                          itemSon.jobList=[
                            {value:'管理员'+a,label:'管理员'},
                            {value:'店长'+a,label:'店长'},
                            {value:'总监'+a,label:'总监'},
                            {value:'收银'+a,label:'收银'},
                          ]
                          itemSon.job=[];
                          if(itemSon.State==1){
                            itemSon.disable=true
                          }else {
                            itemSon.disable=false
                          }

                        })
                      }
                    })
                  }
            })
        },
        // //打开弹窗
        // openJob(){
        //   this.jobPopup.showModal=true
        // },
        // //关闭添加工作弹窗
        // closeJob(e){
        //   console.log(e);
        //   this.jobPopup.showModal=e
        // },

        closeMove(e){
          this.move.showModal=e
        },
        // 获取店铺列表
        getShopList(){
          this.$http.post(api.shopList,{}).then(json=>{
            let data=json.data
            if(data.isSuc==true){
              this.shopList=data.result;
              let firstShopId=data.result[0].UserId;
              this.currentShopId=firstShopId
              this.getGroupList(this.currentShopId)
              this.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'warning'
              })
            }
          }).catch(err=>{
            console.log(err);
          })
        },
        // // 职位设置编辑
        // jobEdit(){
        //     this.jobIsEdit=false
        //
        // },
        // //职位编辑确定
        // jobConfirm(){
        //   this.jobIsEdit=true
        // },
        // addNewJob(){
        //     this.jobList.push({value:'1',label:'2'})
        // }
      },
      created(){
        this.getShopList();
        // if(this.currentShopId){
        //   this.getGroupList(this.currentShopId)
        // }

      }
    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";

  .box{
    min-width: 1200px;
    .choose-title{
      width: 100%;
      margin-top: 60px;
    }
    .btns{
      width: 100%;
      height: 40px;
      margin-top: 30px;
      margin-bottom: 30px;
      div{
        float: left;
        .base-btn-111;
        margin-right: 30px;
        margin-bottom: 30px;
      }
      .project{
        width: 154px;
      }
    }
    .tables{
        margin-top: 50px;
        .title{
          width: 100%;
          height: 48px;
          line-height: 48px;
          text-align: center;
          background: @bs-color;
          font-size: 19px;
          color: #282828;
        }
      .table-title{
        width: 100%;
          font-size: 15px;
        height: 48px;
        line-height: 48px;
        background: #F5F5F5;
      }
      .row{
        width: 100%;
        height: 48px;
        line-height: 48px;
        background: #fff;
      }
      .table-btn{
        width: 73px;
        height: 36px;
        line-height: 36px;
        background: @bs-color;
        .text-center(36px);
        margin-top: 6px;
        border-radius: 4px;
      }
      .disable{
        background:#E5E5E5!important;
      }
      .table-btns{
        padding-top: 30px;
        padding-bottom: 30px;
        box-sizing: border-box;
        margin: 0 10px;
        background: #fff;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
    }
    .tables:first-child{
      margin-top: 0;
    }
  }

  //添加成员弹窗
  .add{
    width: 100%;
      padding: 50px;
      .header{
        margin-top: 30px;
        margin-bottom: 30px;
        &-word{
          font-size: 20px;
        }
      }
    &-text{
      margin-bottom: 30px;
      font-size:14px;
      color:rgba(154,154,154,1);
    }
    &-form{
      width: 100%;
    }
    &-tips{
      margin-top: 30px;
      margin-bottom: 30px;
      font-size:14px;
      color:rgba(154,154,154,1);
    }
    &-btn{
      margin-top: 30px;
    }
    .confirm-btn{
      margin-top: 100px;
      .base-btn(200px)
    }
  }


  //添加职位弹窗
  .job-box{
    width: 100%;
    padding: 50px;
  }
  //添加分组
  .group-box{
    width: 100%;
    padding: 50px;
    .group-title{
      margin-top: 10px;
    }
    .group-input{
      margin: 40px 0 35px;
    }
    .group-input2{
      margin: 0px 0 35px;
    }
  }

</style>
