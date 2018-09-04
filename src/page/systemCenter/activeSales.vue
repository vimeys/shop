/**
*   Created By  YS  on 2018/8/22
*/
<template>
      <div class="box-sale">

              <el-row :gutter="50"  class="base-row-36">
                <el-col :span="8"  class="">
                  <div class="sale-card">
                    <el-row>
                      <el-col :span="6">拆红包</el-col>
                      <el-col :span="4" :offset="14">
                        <el-switch
                          v-model="valueRedPack"
                          active-color="#FFD736"
                          @change="closeRedPack"
                          inactive-color="#E5E5E5">
                        </el-switch>
                      </el-col>
                    </el-row>
                    <el-row v-if="valueRedPack" class="base-row-36">
                      <el-col :span="6">
                        红包金额
                      </el-col>
                      <el-col :span="16">
                        <input type="text" v-model.number="moneyValue" class="base-input" placeholder="">
                      </el-col>
                    </el-row>
                    <el-row v-if="valueRedPack" class="base-row-36">
                      <el-col :span="20" :offset="1"><div class="btn" @click="comfirmRedPack">确定</div></el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="8"  class="">
                  <div class="sale-card">
                    <el-row>
                      <el-col :span="6">刮卡</el-col>
                      <el-col :span="4" :offset="14">
                        <el-switch
                          v-model="value2"
                          active-color="#FFD736"
                          inactive-color="#E5E5E5">
                        </el-switch>
                      </el-col>
                    </el-row>
                    <el-row v-if="value2" class="base-row-36">
                      <el-col :span="6">
                        红包金额
                      </el-col>
                      <el-col :span="16">
                        <input type="text" v-model.number="moneyValue" class="base-input" placeholder="">
                      </el-col>
                    </el-row>
                    <el-row v-if="value2" class="base-row-36">
                      <el-col :span="20" :offset="1"><div class="btn" @click="comfirm">确定</div></el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="8"  class="">
                  <div class="sale-card">
                    <el-row>
                      <el-col :span="6">支付立减</el-col>
                      <el-col :span="4" :offset="14">
                        <el-switch
                          v-model="value2"
                          active-color="#FFD736"
                          inactive-color="#E5E5E5">
                        </el-switch>
                      </el-col>
                    </el-row>
                    <el-row v-if="value2" class="base-row-36">
                      <el-col :span="6">
                        红包金额
                      </el-col>
                      <el-col :span="16">
                        <input type="text" v-model.number="moneyValue" class="base-input" placeholder="">
                      </el-col>
                    </el-row>
                    <el-row v-if="value2" class="base-row-36">
                      <el-col :span="20" :offset="1"><div class="btn" @click="comfirmRedPack1">确定</div></el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="50"  class="base-row-36">
                <el-col :span="8"  class="">
                  <div class="sale-card">
                    <el-row>
                      <el-col :span="6">集赞</el-col>
                      <el-col :span="4" :offset="14">
                        <el-switch
                          v-model="value2"
                          active-color="#FFD736"
                          inactive-color="#E5E5E5">
                        </el-switch>
                      </el-col>
                    </el-row>
                    <el-row v-if="value2" class="base-row-36">
                      <el-col :span="6">
                        红包金额
                      </el-col>
                      <el-col :span="16">
                        <input type="text" v-model.number="moneyValue" class="base-input" placeholder="">
                      </el-col>
                    </el-row>
                    <el-row v-if="value2" class="base-row-36">
                      <el-col :span="20" :offset="1"><div class="btn" @click="comfirm">确定</div></el-col>
                    </el-row>
                  </div>
                </el-col>

              </el-row>

      </div>
</template>

<script>
    export default {
        name: "activeSales",
      data(){
          return{
            value1: true,
            value2:true,
            valueRedPack: true,
            moneyValue:''
          }
      },
      methods:{
        comfirmRedPack(){
          this.$http.post(this.$api.openRedPack,{money:this.moneyValue}).then(json=>{
            console.log(json);
          })
        },
        closeRedPack(e){
          console.log(e);
          if(!e){
            this.$http.post(this.$api.closeRedPack,{}).then(json=>{
              console.log(json);
            })
          }

        }


      },
      mounted(){
          this.$http.post(this.$api.isRedPack,{}).then(json=>{
            console.log(json);
          })
      }
    }
</script>

<style lang='less' scoped>
  @import '~style/mixin';
  .box-sale{
    min-width: 1200px;
    .btn{
      .base-btn(327px)
    }
    .sale-card{
      background: #fff;
      padding: 15px 0;
      /*padding: 20px 0;*/
    }
    .base-row-36{
      margin-top: 30px;
    }
  }
</style>
