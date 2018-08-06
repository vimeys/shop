<template>
  <div class="box">

    <ys-popup></ys-popup>
    <ys-steps></ys-steps>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" value="first">
        <el-tab-pane label="背景图" name="first"></el-tab-pane>
        <el-tab-pane label="Logo" name="second">Logo</el-tab-pane>
        <el-tab-pane label="自定义图片" name="third">自定义图片</el-tab-pane>
        <el-tab-pane label="促销活动" name="fourth">促销活动</el-tab-pane>
        <el-tab-pane label="精选商品" name="fifth">精选商品</el-tab-pane>
      </el-tabs>
      <div>
        <img src="../../../assets/images/nav-image.png"/>
        <van-swipe :autoplay="3000" :touchable="true">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img :src="image" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div>
      <!--<router-link to="active">123</router-link>-->
    </div>
    <ys-coupon></ys-coupon>
  </div>
</template>

<script>
  import  ysSteps from  '@/components/steps'
  import { Swipe, SwipeItem } from 'vant';
  import  ysPopup from '@/components/popup'
  import RouterLink from "vant/es/mixins/router-link";
  import  ysCoupon from "@/page/systemCenter/active/components/coupon"
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
            activeName:'activeName',
            images: [
              'https://img.yzcdn.cn/2.jpg',
              'https://img.yzcdn.cn/2.jpg'
            ]
          }
      },
      methods:{
          handleClick(e){
            console.log(e);
          }
      }
    }
</script>

<style lang="less" scoped>
  .box{
    display: flex;
    flex-direction: row;
  }
</style>
