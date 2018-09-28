/**
*   Created By  YS  on 2018/8/16
*  //素材中心
*/
<template>
    <div class="fodder-box">
      <el-tabs v-model="activeName" @tab-click="handleClick" value="first">
        <el-tab-pane label="分类" name="first">
          <!--<router-view></router-view>-->
        </el-tab-pane>
        <el-tab-pane label="文章" name="second">
          <!--<router-view></router-view>-->
        </el-tab-pane>
        <el-tab-pane label="转发文章" name="third">
          <!--<router-view></router-view>-->
        </el-tab-pane>
        <el-tab-pane label="画报" name="fourth">
          <!--<router-view></router-view>-->
        </el-tab-pane>
        <el-tab-pane label="海报" name="fifth">
          <!--<router-view></router-view>-->
        </el-tab-pane>
        <el-tab-pane label="已发布" name="fifth">
          <!--<router-view></router-view>-->
        </el-tab-pane>
        <router-view></router-view>
      </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "accountSetting",
      components:{

      },
      data(){
          return {
            activeName:'first'
          }
      },
      methods:{
        handleClick(){
          switch (this.activeName) {
            case  'first':
              this.$router.replace({
                path:'/fodderCenter/fodder/fodder'
              });
              break
            case 'second':
              this.$router.replace({
                path: '/centerIndex/indexPage/logo'
              });
              break;
            case 'third':
              this.$router.replace({
                path: '/centerIndex/indexPage/diyImage'
              });
              break;
            case 'fourth':
              this.$router.push({
                path: '/centerIndex/indexPage/activity'
              });
              break;
            case 'fifth':
              this.$router.replace({
                path:'/centerIndex/indexPage/cardList'
              })
          }
        }
      }
    }
</script>

<style lang='less' scoped>
  @import " ~@/assets/style/mixin";

  .fodder-box{
    width: 1200px;
  }
</style>
