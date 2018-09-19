/**
*   Created By  YS  on 2018/9/12
*/
<template>
        <div :style="[{marginLeft:marginLeft+'px'}]">
          <el-select v-model="value"
                     placeholder="请选择"
                     @change="chooseShop"
                     v-if="shopList.length">
            <el-option
              v-for="item in shopList"
              :key="item.value"
              :label="item.Name"
              :value="item.UserId">
            </el-option>
          </el-select>
        </div>
</template>

<script>
    export default {
        name: "selectShop",
      props:{
        marginLeft:{
          type:Number,
          default:300
        }
      },
      data(){
          return {
            shopList:'',
            value:''
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
                message: '恭喜你，这是一条成功消息',
                type: 'warning'
              })
            }
          }).catch(err=>{
            console.log(err);
          })}
      },
      mounted(){
            this.getShopList()
      }
    }
</script>

<style lang='less' scoped>

</style>
