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
          <el-col :span="2" class="base-col">总数：{{allPeople}}人</el-col>
          <el-col :span="6" :offset="12"> <div><ys-search @search="search" :placeholder="placeholder"></ys-search></div></el-col>
        </el-row>
      </div>
    <div class="btns">
      <!--<div class="setting">设置权限</div>-->
      <div class="classify" @click="openGroup">新建员工分类</div>
      <!--<div class="setting" @click="openJob">职位设置</div>-->
      <!--<div class="project">管理员工服务项目</div>-->
    </div>
    <div class="tables" v-for="(item,index) in groupList" >
        <div class="title">{{item.GroupName}}({{item.UsersList.Items.length}}人  提成比例：{{item.Charge}}%)
          <i class="el-icon-delete"
             @click="delGroup(index)"
             style="position: relative; right: -440px;cursor: pointer"></i>
        </div>
        <el-row class="table-title">
          <!--<el-col></el-col>-->
          <el-col :span="4">姓名</el-col>
          <el-col :span="3">手机号</el-col>
          <!--<el-col :span="2">权限</el-col>-->
          <el-col :span="2">职位</el-col>
          <el-col :span="2">状态</el-col>
          <el-col :span="2">密码</el-col>
          <el-col :span="11">管理</el-col>
        </el-row>
      <el-row v-if="item.UsersList.Items.length" class="row" v-for="(itemSon,indexSon ) in item.UsersList.Items" :key="itemSon.GroupId">
        <el-col :span="4">
          <el-row>
            <el-col :span="6" class="row-radio">
              <div class="circle" v-show="itemSon.hasChecked" @click="chooseItem(index,indexSon)">
                <div class="point" v-show="itemSon.isChecked" ></div>
              </div>
            </el-col>
            <el-col :span="14">{{itemSon.TrueName||'无'}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="3">{{itemSon.PhoneNum||'无'}}</el-col>
        <!--<el-col :span="2">{{itemSon.UserRoleName||'无'}}</el-col>-->
        <el-col :span="2">{{itemSon.JobTitle||'无'}}</el-col>
        <el-col :span="2">{{itemSon.State|capitalize}}</el-col>
        <el-col :span="2">{{itemSon.Remark||'无'}}</el-col>
        <el-col :span="11">
            <el-row :gutter="10">
              <el-col :span="4">
                <div class="table-btn"
                     @click="openMove(index,indexSon)">移动</div>
              </el-col>
              <el-col :span="4">
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
                <el-select v-model="itemSon.job"
                           @change="changeLimit(itemSon.job,index,indexSon)"
                           placeholder="请选择"
                           size="small">
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
      <el-row v-else>
        <el-col class="table-none">暂无人员</el-col>
      </el-row>
      <el-row class="table-btns" :gutter="20" >
        <el-col :span="3">
          <div class="base-btn-111"
               :class="{'disable':item.isEdit}"
               @click="addNewPeople(index)"
          >添加成员</div>
        </el-col>
        <el-col :span="3">
          <div class="base-btn-111" @click="Manage(index)" >批量管理</div>
        </el-col>
        <el-col :span="4"></el-col>
        <el-col :offset="1" :span="8">
          <el-row v-if="item.isManage">
              <el-col :span="8"><div class="base-btn-111" @click=chooseAll(index) >全选</div></el-col>
              <el-col :span="8">
                <div class="base-btn-111" @click="openMoveAll(index)" >移动分组</div></el-col>
              <el-col :span="8">
                <div class="base-btn-111" @click="delAll(index)" >
                  删除
                </div>
              </el-col>
          </el-row>
          <el-row v-else>
            <el-col style="color: #fff">.</el-col>
          </el-row>
        </el-col>
        <el-col :span="3" :offset="5">
          <div class="base-btn-111" @click="editGroup(index)">修改分类</div>
        </el-col>
      </el-row>

    </div>

    <!--*********添加分组********-->
    <ys-popup
      v-show="group.showModal"
      :width="group.width"
      @close="closeGroupList"
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
            <el-col  :span="6"><h3>编辑</h3></el-col>
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
        <!--<el-row>-->
          <!--<el-col>-->
            <!--<div id="demo"></div>-->
          <!--</el-col>-->
        <!--</el-row>-->
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
          <el-col style="position: relative"><div class="base-btn-111" >上传excel</div>
            <input type="file" class="importFile" @change="importf">
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <a class="download" download=""  style=""  href="./static/excel.xls">下载excel模板</a>
          </el-col>
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
          <el-col :span="6">移动至：&nbsp; &nbsp;</el-col>
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
    import XLSX from 'xlsx'
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
            isEditGroup:false,
            editCurrentGroup:'',//当前编辑的分组
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
            allPeople:'',//总人数
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
            isManage:false,//是否批量管理
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
            ],
            wb:"",
            rABS:false,
          }
      },
      computed:{
        moveGroupPersonfn(){
          if(this.moveGroupPerson.length>0){
            return this.moveGroupPerson.join('/')
          }else{
            return this.moveGroupPerson.join('')
          }
        },
      },
      filters:{
        capitalize: function (value) {
          if (value==0) {
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
        download(){
          location.href = require('../../assets/images/card02.png');
        },
      //往分组下添加新的成员
        addNewPeople(index){
          this.add.showModal=true;
          this.currentGroupId=this.groupList[index].GroupId;
        },
        //搜索
        search(val){
          console.log(val);
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
                RefUserId:this.currentShopId
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
        //点击选择人员
        chooseItem(index,indexSon){
          console.log(index, indexSon);
          let old=this.groupList[index]
          old.UsersList.Items[indexSon].isChecked=!old.UsersList.Items[indexSon].isChecked
          this.groupList.splice(index,1,old)
        },
        //全选人员
        chooseAll(index){
          console.log(index);
          function check(age){
            console.log(age);
            console.log(age.isChecked);
            return age.isChecked===false
          }
          let abc=this.groupList[index].UsersList.Items.every(check)
          let old=this.groupList[index]
          if(abc){
            old.UsersList.Items.forEach(item=>{
              item.isChecked=true
            })
            this.groupList.splice(index,1,old)
          }
        },
        // 删除
        del(i,is){
            let arr=[]
            arr.push(this.groupList[i].UsersList.Items[is].UserId)
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
        delAll(index){
          let arr=[]
          debugger
          this.groupList[index].UsersList.Items.forEach(item=>{
            if(item.isChecked){
              arr.push(item.UserId)
            }
          })
          console.log(arr);
          this.$util.confirm(this).then(()=>{
            this.$http.post(this.$api.delPerson,{userIds:arr}).then(json=>{
              let data=json.data;
              if(data.isSuc=true){
                this.groupList[index].UsersList.Items.splice(is,1)
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
        //批量移动
        openMoveAll(index){
          this.move.showModal=true;
          let arr=[];
          let arr2=[]
          this.groupList[index].UsersList.Items.forEach(item=>{
            if(item.isChecked){
              this.moveGroupPerson.push(item.TrueName)
              this.moveGroupId.push(item.UserId)
            }
          })


        },
        // 点击是否开始批量编辑
        Manage(index){
          console.log(index);
          let old=this.groupList[index]
          old.isManage=!old.isManage
          old.UsersList.Items.forEach(item=>{
            item.hasChecked=old.isManage
          })
          this.groupList.splice(index,1,old)
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
          this.add.showModal=false
        },
        //打开分组
        openGroup(){
          this.group.showModal=true;
        },
        // 冻结账号
        freeze(index,indexSon){
          let item=JSON.parse(JSON.stringify(this.groupList[index].UsersList.Items[indexSon]));
          if(item.disable){
            this.$http.post(this.$api.freeze,{userId:item.UserId})
              .then(json=>{
                console.log(json.data);
                if(json.data.isSuc==true){
                  item.State=0

                  item.disable=!item.disable;
                  this.groupList[index].UsersList.Items.splice(indexSon,1,item)
                }
              })
          }else {
            this.$http.post(this.$api.active,{userId:item.UserId})
              .then(json=>{
                if(json.data.isSuc==true){
                  item.State=1
                  item.disable=!item.disable;
                  this.groupList[index].UsersList.Items.splice(indexSon,1,item)
                }
              })
          }

        },
        //导入excel
        importf(event) {
          let that=this
          let obj=event.target;
          if(!obj.files) {
            return;
          }
          var f = obj.files[0];
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            if(this.rABS) {
              this.wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                type: 'base64'
              });
            } else {
              this.wb = XLSX.read(data, {
                type: 'binary'
              });
            }
            //this.wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
            //this.wb.Sheets[Sheet名]获取第一个Sheet的数据
            // document.getElementById("demo").innerHTML= JSON.stringify( XLSX.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]]) );
            let execlData=XLSX.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]]);
            let obj2={
              GroupId:that.currentGroupId,
              UserShopId:that.currentShopId,
              RefUserId:that.currentShopId
            }
            let list=[]
            execlData.forEach(item=>{
              console.log(item['职位']);
              obj2.UserName=item['成员手机号'];
              obj2.TrueName=item['成员姓名']
              obj2.JobTitle=item['职位']
              // Object.assign({},obj2)
              list.push(Object.assign({},obj2))
            })
            console.log(list);
            that.$util.post(that,that.$api.addWaiterList,{list:list},(data)=>{
              that.getGroupList(that.currentShopId)
              that.UserName='';
              that.TrueName='';
              that.JobTitle='';
              that.add.showModal=false
            })

          };
          if(this.rABS) {
            reader.readAsArrayBuffer(f);
          } else {
            reader.readAsBinaryString(f);
          }
        },
        fixdata(data) { //文件流转BinaryString
          var o = "",
            l = 0,
            w = 10240;
          for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
          o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
          return o;
        },
        //添加分组
        addGroup(){
          debugger
          if(!this.isEditGroup){
            let obj={
              group:{
                GroupName:this.groupName,
                UserId:this.currentShopId,
                // UserId:1547,
                Charge:this.Charge
              }
            }
            // console.log(obj);
            this.$http.post(this.$api.addGroup,obj).then(json=>{
              let data=json.data;
              if(data.isSuc==true){
                this.getGroupList(this.currentShopId);
                this.group.showModal=false
                this.groupName="";
                this.Charge=""
              }
            })
          }else{
            let obj={
              group:{
                GroupName:this.groupName,
                GroupId:this.editCurrentGroup.GroupId,
                Charge:this.Charge
              }
            }
            // console.log(obj);
            this.$http.post(this.$api.updateGroup,obj).then(json=>{
              let data=json.data;
              if(data.isSuc==true){
                this.getGroupList(this.currentShopId);
                this.groupName="";
                this.Charge=""
                this.isEditGroup=false
                this.group.showModal=false
              }
            })
          }
        },
        // 修改分类
        editGroup(index){
          this.group.showModal=true;
          let obj={}
          obj.group=this.groupList[index].GroupName;
          obj.GroupId=this.groupList[index].GroupId;
          // this.$util.post(this,this.$api.updateGroup,{})
          this.editCurrentGroup=obj;
          this.groupName=obj.group;
          this.isEditGroup=true;
          this.Charge=this.groupList[index].Charge
        },
        //删除分组
        delGroup(index){
          let id=this.groupList[index].GroupId;
          this.$util.confirm(this).then(()=>{
            this.$http.post(this.$api.delGroup,{groupId:id,shopId:this.currentShopId}).then(json=>{
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
          this.edit.showModal=false;
          this.groupName=''
        },
        closeGroupList(){
          this.group.showModal=false;
          this.groupName=''
        },
        //改变权限
        changeLimit(e,i,is){
          let item=this.groupList[i].UsersList.Items[is];
          this.$http.post(this.$api.updataPerson,
            {user:{ShopRole:e,
              UserId:item.UserId,
              TrueName:item.TrueName,
              JobTitle:item.JobTitle}})
            .then(json=>{
              if(json.data.isSuc==true){
                this.groupList[i].UsersList.Items.splice(is,1,item)
              }
            })
        },
        // 获取当前店铺分组的列表
        getGroupList(shopId){
          let obj1=Object.assign({},{value:1,label:'管理员'})
          let obj2=Object.assign({},{value:2,label:'店长'})
          let obj3=Object.assign({},{value:3,label:'店员'})
          let obj4=Object.assign({},{value:4,label:'收银'})
          let arr=[];
          arr.push(obj1)
          arr.push(obj2)
          arr.push(obj3)
          arr.push(obj4)
            this.$http.post(this.$api.waterGroupList,
              {pageindex:1,pagesize:10,userId:shopId}).then(json=>{
              console.log(json);
                  if(json.data.isSuc==true){
                    this.groupList=json.data.result.Items;
                    let i=0
                    this.groupList.forEach((item)=>{
                      if(item.UsersList.Items.length>0){
                        item.isManage=false
                        item.UsersList.Items.forEach((itemSon,indexSon)=>{
                          //循环添加选中按钮以及职位
                          itemSon.jobList=arr;
                          itemSon.job=itemSon.ShopRole;
                          itemSon.hasChecked=false;
                          itemSon.isChecked=false
                          i++
                          if(itemSon.State==1){
                            itemSon.disable=true
                          }else {
                            itemSon.disable=false
                          }
                        })
                      }
                    })
                    this.allPeople=i//计算总人数
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
          this.moveGroupPerson=[]
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
              // this.value=firstShopId;
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
      watch:{
        groupList(v,ov){
          console.log(v);
          console.log(ov);
          console.log(123)
        }
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
      .row-radio{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 47.5px;
        .circle{
          width: 21px;
          height: 21px;
          border-radius: 50%;
          border: 2px solid @bs-color;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          .point{
            width: 15px;
            height: 15px;
            background: @bs-color;
            border-radius: 50%;
          }
        }
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
        cursor: pointer;
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
        margin-top: 20px;
        margin-bottom: 20px;
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
      margin-top: 20px;
      margin-bottom: 10px;
      font-size:14px;
      color:rgba(154,154,154,1);
    }
    &-btn{
      margin-top: 30px;
      margin-bottom: 20px;
    }
    .confirm-btn{
      margin-top: 100px;
      .base-btn(200px);

    }
    .download{
      margin-top: 30px;
      width:90px;
      height:20px;
      font-size:14px;
      font-weight:400;
      color:rgba(72,155,247,1);
      line-height:20px;
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
.importFile{
  background: #fff;
  opacity:0;
  width: 111px;
  height: 38px;
  z-index: 100;
  position: absolute;
  top:0;
  left: 350px;
}
.disable{
    background: #E5E5E5;
}
  .table-none{
      height:50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    width: 100%;
    background: #fff;
  }
</style>
