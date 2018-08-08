<template>
  <div class="box">
    <!--<el-button type="text" @click="open5">点击打开 Message Box</el-button>-->
    <!--<ys-popup>-->
      <!--<div class="popup-slide-left">-->
        <!--<el-select v-model="value" @change="change" placeholder="请选择">-->
          <!--<el-option-->
            <!--v-for="item in options"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</div>-->
      <!--<div class="popup-slide-right">-->
        <!--<el-button type="text" @click="open5">点击打开 Message Box</el-button>-->
      <!--</div>-->
      <!--<el-button type="text" @click="open5">点击打开 Message Box</el-button>-->
    <!--</ys-popup>-->
    <!--<ys-steps></ys-steps>-->
    <keep-alive>
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
          <el-tab-pane label="促销活动" name="fourth">
            <router-view></router-view>
          </el-tab-pane>
          <el-tab-pane label="精选商品" name="fifth">
            <router-view></router-view>
          </el-tab-pane>
        </el-tabs>
        <div>
          <!--<router-view/>-->
        </div>
      </div>
    </keep-alive>

  </div>
</template>

<script>
  import  ysSteps from  '@/components/steps'
  import { Swipe, SwipeItem } from 'vant';
  import  ysPopup from '@/components/popup'
  import RouterLink from "vant/es/mixins/router-link";
  import  ysCoupon from "@/components/coupon"
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
            value: '',
          }
      },
      methods:{
          handleClick(tab, event){
            switch (this.activeName) {
              case 'second':
                this.$router.replace({
                  path: '/logo'
                });
                break;
              case 'third':
                this.$router.replace({
                  path: '/diyImage'
                });
                break;
              case 'fourth':
                this.$router.push({
                  path: '/activity'
                });
                break;
              case 'fifth':
                this.$router.replace({
                  path:'/cardList'
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
      created(){

        this.$router.push({
            path:'/bg'
          })
      }
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
