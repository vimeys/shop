/**
*   Created By  YS  on 2018/9/26
*  分类
*/
<template>
    <div class="">
      <div class="header">
        <div class="new" @click="openPopup" >
          <img src="@/assets/images/icon/addBtn.png" alt="">新建服务
        </div>
        <div class="del" :class="{'disable':disableSort}" @click="isSort">排序</div>
      </div>
      <div class="card-list">
        <template v-for="(item,index) in groupList">
          <div class="card">
            <div class="card-header">
              <div>{{item.ChannelName}}</div>
              <div>
                <i class="el-icon-edit" @click="edit(index)"></i>
                <i class="el-icon-delete" @click="del(index)"></i>
              </div>
            </div>
            <div class="card-items">
              <div class="card-item">
                <span class="card-item-title">文章资讯：</span>{{item.Information  }} 条
              </div>
              <div class="card-item">
                <span>画&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 报：</span>{{item.Pictorial}} 张
              </div>
              <div class="card-item">
                <span>海&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 报：</span>{{item.Poster}} 张
              </div>
            </div>
            <div class="move" v-show="disableSort">
              <img @click="up(index)" src="@/assets/images/icon/leftArrow.png" alt="">
              <img @click="down(index)" src="@/assets/images/icon/rightArrow.png" alt="">
            </div>
          </div>
        </template>
      </div>

      <!--//添加修改-->
      <ys-popup
        :width="width"
        :height="height"
        v-show="showModal"
        @close="close"
        >
        <div class="group-popup">
          <el-row class="group-title">
            <el-col  :span="6"><h3>新建分类</h3></el-col>
          </el-row>
          <el-row class="group-input">
            <el-col :span="6" class="base-col">
              分类名称
            </el-col>
            <el-col :span="18">
              <input type="text" v-model="groupName" placeholder="请输入分类名称" class="base-input">
            </el-col>
          </el-row>
          <el-row class="group-btns">
            <el-col :span="4" :offset="6">
              <div class="base-btn-111" @click="addGroup">确定</div>
            </el-col>
            <el-col :offset="2" :span="6" >
              <div class="base-btn-111"  @click="cancel">取消</div>
            </el-col>
          </el-row>
        </div>
      </ys-popup>
    </div>
</template>

<script>
  import  ysPopup from  '@/components/popup'
    export default {
        name: "type",
      components:{
        ysPopup
      },data(){
          return {
             width:670,
            height:330,
            showModal:false,
            groupList:"",
            groupName:'',
            isEdit:false,//用来判断是否hi更新
            currentIndex:'',//当前分类的下标
            disableSort:false,//是否是排序
          }
      },
      methods:{
          //打开添加分类
        openPopup(){
            this.showModal=true
        },
          //关闭
        close(){
          this.showModal=false;
          this.groupName=""
        },
        //添加分类
        addGroup(){
          let obj={}
          obj.ChannelName=this.groupName;
          obj.ParentId=0;
          obj.Description='';
          obj.ChannelIco="";
          obj.OrderNum=1;
          if(!this.isEdit){
            this.$util.post(this,this.$api.addFodderGroup,{channel:obj},(data)=>{
              console.log(data);
              this.getGroupList()
              this.groupName=""
              this.showModal=false
            })
          }else{
            obj.ChannelId=this.groupList[this.currentIndex].ChannelId;
            this.$util.post(this,this.$api.updataGroup,{channel:obj},(data)=>{
              console.log(data);
              this.getGroupList()
              this.groupName=""
              this.showModal=false;
              this.isEdit=false
            })
          }

        },
        cancel(){
          this.showModal=false;
          this.groupName=""
        },
        // 是否开始排序
        isSort(){
          this.disableSort=!this.disableSort
        },
        //编辑分类
        edit(index){
            this.showModal=true;
            this.isEdit=true
            this.currentIndex=index
            this.groupName=this.groupList[index].ChannelName;
        },
        //删除分类
        del(index){
          this.$util.confirm(this,).then(()=>{
            this.$util.post(this,this.$api.delFodderGroup,{channelId:this.groupList[index].ChannelId},()=>{
              this.getGroupList()
            })
          })
        },
        up(index){
          let obj={
            firstid:this.groupList[index-1].ChannelId,
            secondid:this.groupList[index].ChannelId
          }
          this.$util.post(this,this.$api.sortGroup,obj,(data)=>{
            let old1=this.groupList[index-1]
            let old2=this.groupList[index]
            this.groupList.splice(index-1,1,old2)
            this.groupList.splice(index,1,old1)
          })
        },
        down(index){
          let obj={
            firstid:this.groupList[index].ChannelId,
            secondid:this.groupList[index+1].ChannelId
          }
          this.$util.post(this,this.$api.sortGroup,obj,(data)=>{
            let old1=this.groupList[index]
            let old2=this.groupList[index+1]
            this.groupList.splice(index,1,old2)
            this.groupList.splice(index+1,1,old1)
          })
        },
        getGroupList(){
          this.$util.post(this, this.$api.fodderGroupList,
            {pageIndex: 1, pageSize: 100},
            (data) => {
                // console.log()
              this.groupList=data.Items;

            })
        }
      },
      created(){
          this.getGroupList()
      }
    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";
  //顶部按钮组
  .header {
    width: 100%;
    height: 38px;
    display: flex;
    justify-content: flex-start;
    /*margin-top: 60px;*/
    /*margin-bottom: 30px;*/
    .new {
      float: left;
      .base-btn-111;
      margin-right: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      /*margin-top: 30px;*/
      /*margin-bottom: 30px;*/
      img {
        width: 15px;
        height: 15px;
        margin-right: 10px;
      }
    }

    .manage {
      float: left;
      .base-btn-111;
    }
    .del {
      .base-btn-111;
    }
  }
  .disable{
    background: #ccc !important;
  }
  //卡片列表
  .card-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .card{
      width:380px;
      height:201px;
      margin-top: 30px;
      margin-right: 30px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(225,225,225,1);
      padding: 20px 20px;
      position: relative;
      .card-header{
        display: flex;
        justify-content: space-between;
        i{
          display: inline-block;
          width: 17px;
          height: 17px;
          margin-left: 8px;
          cursor: pointer;
          font-size: 16px;
        }
        padding-bottom: 20px;
        border-bottom: 1px solid #EAEAEA;

      }
      .card-items{
        display: flex;
        flex-direction: column;

        .card-item{
          height:40px;
          line-height: 40px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-right: 30px;
          span{
            display: inline-block;
            width: 80px;
            height: 30px;
            line-height: 30px;
            text-align: justify;
          }
        }

      }

    }
    .card:nth-child(3n+0){
      margin-right: 0;
    }
  }
  .group-popup{
    width: 100%;
    padding: 50px;
  }
  .group-input{
    margin-top: 30px;
  }
  .group-btns{
    margin-top: 50px;
  }
  .card:hover .move{
    display: flex;
  }
  .move{
    width:380px;
    height:201px;
    /*background:rgba(255,255,255,1);*/
    /*border:1px solid rgba(225,225,225,1);*/
    z-index: 10000;
    position: absolute;
    top:0;
    left: 0;
    /*width: 175px;*/
    /*height: 250px;*/
    background: rgba(60,60,60,0.5);
    display: none;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 10px;
  }
</style>
