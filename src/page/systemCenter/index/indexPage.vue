<template>
  <div class="box">
    <!--<ysSteps :navList="client"></ysSteps>-->
      <div class="right">
        <el-tabs v-model="activeName" @tab-click="handleClick" value="first">
          <el-tab-pane label="背景图" name="first">
            <router-view></router-view>
          </el-tab-pane>
          <el-tab-pane label="Logo" name="second">
            <router-view></router-view>
          </el-tab-pane>
          <el-tab-pane label="自定义图片" name="third">
            <router-view></router-view>
          </el-tab-pane>
          <el-tab-pane label="拓客营销" name="fourth">
            <router-view></router-view>
          </el-tab-pane>
          <el-tab-pane label="精选商品" name="fifth">
            <router-view></router-view>
          </el-tab-pane>
        </el-tabs>
        <div>
        </div>
      </div>
  </div>
</template>

<script>
  import  ysSteps from  '@/components/steps'
  import { Swipe, SwipeItem } from 'vant';
  import  ysPopup from '@/components/popup'
  import RouterLink from "vant/es/mixins/router-link";
  import  ysCoupon from "@/components/coupon"
  import {client} from '../../../assets/script/stepsData'
  // Vue.use(Swipe).use(SwipeItem);
    export default {
        name: "index",
      components: {
        RouterLink,
        ysSteps,
        ysPopup,
        ysCoupon
      },
      data(){
          return {
            activeName:'first',
            images: [
              'https://img.yzcdn.cn/2.jpg',
              'https://img.yzcdn.cn/2.jpg'
            ],options: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }],
            value: '',
            client:client
          }
      },
      methods:{
          handleClick(tab, event){
            switch (this.activeName) {
              case  'first':
                this.$router.replace({
                  path:'/centerIndex/indexPage/bg'
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
          },
        open5() {
          this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
            dangerouslyUseHTMLString: true
          });
        },
        //select选择
        change(e){
          console.log(e);
        },
        href(e){
          console.log(this.$router);
            this.$router.push({
              path:'/logo'
            })
        }
      },

    }
</script>

<style lang="less" scoped>
  .box{
    display: flex;
    flex-direction: row;
    .right{
      width: 1200px;
    }
  }
</style>
