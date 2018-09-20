/**
*   Created By  YS  on 2018/9/12
*/
<template>
        <div :style="[{marginLeft:marginLeft+'px'}]">
          <el-select v-model="value"
                     placeholder="请选择"
                     @change="chooseShop"
                     v-if="shop.length">
            <el-option
              v-for="item in shop"
              :key="item.value"
              :label="item.Name"
              :value="item.UserId">
            </el-option>
          </el-select>
        </div>
</template>

<script>
  import {mapState,mapGetters} from 'vuex'
    export default {
        name: "selectShop",
      props:{
        marginLeft:{
          type:Number,
          default:300
        }
      },
      computed:{
        ...mapState(['shop'])
      },
      data(){
          return {
            shopList:'',
            value:""
          }
      },
      methods:{
        chooseShop(e){
          this.$emit('selectShop',e)
        },
        // 获取店铺列表
        getShopList(){
          this.$http.post(this.$api.shopList,{}).then(json=>{
            let data=json.data
            if(data.isSuc==true){
              this.shopList=data.result;
              // let firstShopId=data.result[0].UserId;
              // this.currentShopId=firstShopId
              // this.getGroupList(this.currentShopId)
              this.$emit('getShop',this.shopList[0].UserId)
              this.$message({
                message: '请求成功',
                type: 'warning'
              })
            }
          }).catch(err=>{
            console.log(err);
          })}
      },
      mounted(){
            // this.getShopList()
        this.$emit('getShop',this.shop[0].UserId);
        this.value=this.shop[0].UserId;
      }
    }
</script>

<style lang='less' scoped>

</style>
