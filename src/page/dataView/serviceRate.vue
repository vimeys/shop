/**
*   Created By  YS  on 2018/8/22
*/
<template>
      <div  class="rate-box">
          <el-tabs v-model="activeName" @tab-click="toggle" class="rate-table">
            <el-tab-pane label="服务" name="first">
                <!--服务-->
                <!--<div class="rate-goods-btn">-->
                  <!--<div class="base-btn-111 {'noActive':isActive}" @click="getRated">已审核</div>-->
                  <!--<div class="base-btn-111 {'noActive':isActive2}" @click="getRate">未审核</div>-->
                <!--</div>-->
                <div class="goods-list">
                  <template v-for="(item,index) in goodsList">
                    <ys-goods-rate :detail="item"
                                :index="index"
                                @check="check"
                                @checked="checked"></ys-goods-rate>
                  </template>
                  <!--<ys-goods-rate></ys-goods-rate>-->
                </div>
                <!--//评价窗口-->
                <ys-popup
                  :width="Rate.width"
                  :height="Rate.height"
                  v-show="Rate.showModal"
                  @close="closeRate"
                >
                  <div class="rate-popup-box">
                    <el-row class="base-row">
                      <el-col :span="6"><h3>用户评价</h3></el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-scrollbar class="rate-popup-scroll">
                          <el-row v-for="item in rateList">
                            <el-col class="rate-popup-li">
                              <div><img  class="user-logo" src="../../assets/images/goods.jpg" alt=""></div>
                              <div class="rate-popup-info">
                                <div>愤怒的猫哆哩</div>
                                <div>这是我见过技术最好的理发师了！</div>

                              </div>
                              <div >
                                <span class="el-icon-delete"></span>
                              </div>
                              <div v-if="false">
                                <span class="el-icon-circle-check"></span>
                              </div>
                            </el-col>
                          </el-row>
                        </el-scrollbar>
                        <el-row class="base-row">
                          <el-col>
                            <div class="block">
                              <!--<span class="demonstration">页数较少时的效果</span>-->
                              <el-pagination
                                prev-text="上一页"
                                next-text="下一页"
                                layout="prev, pager, next"
                                :total="50">
                              </el-pagination>
                            </div>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                </ys-popup>

              </el-tab-pane>
            <el-tab-pane label="店员" name="second">
              <!--<div class="rate-goods-btn">-->
                <!--<div class="base-btn-111 {'noActive':isActive}" @click="getRated">已审核</div>-->
                <!--<div class="base-btn-111 {'noActive':isActive2}" @click="getRate">未审核</div>-->
              <!--</div>-->
              <div class="water-items">
                <div class="water-item" v-for="item in waterList">
                  <div class="box-image">
                    <img :src="src" alt="">

                    <div class="box-btns">
                      <div class="box-btns-edit" @click="check">查看评价</div>
                    </div>
                    <!--<div class="coupon-radio" @click="choose" >-->
                    <!--<div class="coupon-radio-point" v-show="chosed"></div>-->
                    <!--</div>-->
                  </div>
                  <div class="water-name">
                    <div>Tony老师 #135</div>
                    <div>
                      <el-rate
                        v-model="rateValue"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                      </el-rate>
                    </div>
                  </div>
                </div>
              </div>


            </el-tab-pane>
          </el-tabs>
        <ys-popup
          :width="water.width"
          :height="water.height"
          v-show="water.showModal"
          @close="closeWater"
        >
          <div class="rate-popup-box">
            <el-row class="base-row">
              <el-col :span="6"><h3>用户评价</h3></el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-scrollbar class="rate-popup-scroll">
                  <el-row v-for="item in rateList">
                    <el-col class="rate-popup-li">
                      <div><img  class="user-logo" src="../../assets/images/goods.jpg" alt=""></div>
                      <div class="rate-popup-info">
                        <div>愤怒的猫哆哩</div>
                        <div>这是我见过技术最好的理发师了！</div>

                      </div>
                      <div class="water-item-rate">
                        <el-rate
                          v-model="rateValue"
                          disabled
                          text-color="#ff9900"
                          score-template="{value}">
                        </el-rate>
                      </div>
                      <div >
                        <span class="el-icon-delete"></span>
                      </div>
                      <div v-if="true">
                        <span class="el-icon-circle-check"></span>
                      </div>
                    </el-col>
                  </el-row>
                </el-scrollbar>
                <el-row class="base-row">
                  <el-col>
                    <div class="block">
                      <!--<span class="demonstration">页数较少时的效果</span>-->
                      <el-pagination
                        prev-text="上一页"
                        next-text="下一页"
                        layout="prev, pager, next"
                        :total="50">
                      </el-pagination>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </ys-popup>
        <div class="position-box">
          <ys-search></ys-search>
        </div>
      </div>
</template>

<script>
  import ysGoodsRate from '@/components/goodsRate';
  import  ysSearch from '@/components/search'
  import  ysPopup from "@/components/popup"

  export default {
    name: "rate",
    components: {
      ysGoodsRate,
      ysPopup,
      ysSearch
    },
    data() {
      return {
        activeName: 'first',
        isActive: false,
        isActive2: true,
        rateList: [1, 3, 4, 3, 2, 3,],
        waterList: [1, 2, 3, 4, 4, 5],
        goodsList: [],//商品列表
        Rate: {
          width: 542,
          height: 600,
          showModal: false
        },
        water: {
          width: 670,
          height: 600,
          showModal: true
        },
        rateValue: 3.2,
        src: require('../../assets/images/goods.jpg'),
      }
    }, methods: {
      //获取审核服务
      getRated() {

      },
      //获取还未审核的服务
      getRate() {

      },
      //查看未评价
      check(index) {
        this.$util.post(this,this.$api.getGoodsChecked,{},(data)=>{
            // this.
        })
      },
      toggle(tab, event) {
        console.log(tab, event);
      },
      //弹起服务评价
      openRate() {
        this.Rate.showModal = true
      },
      //关闭弹窗
      closeRate(e) {
        this.Rate.showModal = false
      },
      closeWater() {
        this.water.showModal = false
      },
      //获取商品列表
      // @param
      getGoodsList(p = 0, c = 0) {
        this.$http.post(this.$api.goodsList, {
          pageIndex: 1,
          pageSize: 100,
          goodTypeParentId: p,
          goodsTypeId: c
        }).then(json => {
          console.log(json);
          let data = json.data;

          if (data.isSuc == true) {
            let arr = [];
            data.result.Items.forEach(item => {
              item.hasChecked = false;
              item.isChecked = false
            })
            this.goodsList = data.result.Items
          }
        })
      },
    },
    created(){
      this.getGoodsList();
    }
  }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";
  .rate-box{
    width: 100%;
  }
  .rate-table{
    width: 1200px;
  }
  .goods-list{
    width: 1200px;
    display: flex;
    flex-wrap: wrap;
  }

  //商品评论
  .rate-goods-btn{
    width: 1200px;
    height: 50px;
    /*line-height: 50px;*/
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    div{
      margin-left: 30px;
    }
  }
  .noActive{
    background: #E5E5E5;
  }
  //商品评价弹窗
  .rate-popup-box{
    padding: 50px;
    width: 100%;
    .rate-popup-scroll{
      height: 350px;
    }
    .rate-popup-info{
      flex: 1;
    }
    .rate-popup-li{
      width: 100%;
      margin-top: 10px;
      border-bottom: 1px solid #ccc;
      padding-bottom:10px;
      height: 83px;
      display: flex;
      .el-icon-delete,.el-icon-circle-check{
        width: 50px;
        height: 50px;
        line-height: 50px;
      }
    }

    .user-logo{
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 20px;
    }

  }
  //固定搜索位置
  .position-box{
    position: relative;
    top:-50px;
    right: -1020px;
  }

  //店员评价
  .water-items{
    width: 1200px;
    display: flex;
    flex-wrap: wrap;
  }
  .water-item{
    display: flex;
    margin-right: 45px;
    flex-direction: column;
    width: 175px;
  }
  .water-item:nth-child(5n+0){
    margin-right: 0;
  }
  .box-image{
    position: relative;
    width: 175px;
    height: 175px;
    .box-btns{
      width: 100%;
      height: 100%;
      position: absolute;
      top:0;
      left: 0;
      background:rgba(60,60,60,0.5);
      /*display: flex;*/
      flex-direction: column;
      justify-content: center;
      align-items: center;
      /*display: none;*/
      opacity: 0;
    }
    .box-btns-edit,.box-btns-del{
      width: 82px;
      height: 26px;
      background: @bs-color;
      font-size: 12px;
      line-height: 26px;
      text-align: center;
      border-radius: 4px;
      cursor: pointer;
      margin: 15px;
    }
    img{
      width: 100%;
      height: 100%;
    }
  }
  .box-image:hover .box-btns{
    display: flex;
    opacity: 1;
    transition: all .3s ease-in;

  }
  .water-item-rate{
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    padding: 15px 0;
  }
</style>
