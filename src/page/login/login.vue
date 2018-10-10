/**
*   Created By  YS  on 2018/8/22
*/
<template>
      <div class="login">
        <div>
            <div><input type="text" v-model="phone"></div>
            <div><input type="password" v-model="psw"></div>
          <div class="base-btn-111" @click="login">登录</div>
        </div>
      </div>
</template>

<script>
    import YsHeader from "../../components/header";
    import  api  from '../../assets/script/url'
    import {mapGetters, mapMutations} from 'vuex'
    export default {
      name: "login",
      components:{
        YsHeader,
      },
      computed:{
        ...mapGetters(['shop']),
      },
      data(){
        return {
          phone:'',
          psw:''
        }
      },
      methods:{
        ...mapMutations({saveShop:'SET_SHOP',saveRole:'SET_ROLE',saveShopRole:'SET_SHOPROLE',saveUserInfo:'SET_USER'}),
        //请求店铺信息
        getShopList(){
          console.log(api.shopList);
          this.$http.post(api.shopList,{}).then(json=>{
            let data=json.data
            return new Promise(function (resolve,reject) {
              if(data.isSuc==true){
                  resolve(data)
              }else{
                reject(data)
              }
            })

          }).then(data=>{
            this.saveShop(data.result)//设置全局变量
          }).catch(error=>{
            console.log(error);
          })
        },

        //登录
        login(){
          this.$emit('login',true)
          this.$util.post(this,this.$api.login,{username:this.phone,password:this.psw},(data)=>{
            this.saveShopRole(data.ShopRole);
            this.saveRole(data.Role)
            this.saveUserInfo(data);
            window.localStorage.setItem('token',data.Token)
            this.getShopList()
          })
        },



        log(){
          this.$http.post(api.login,{companyname:"luozhi666",password:'123456'}).then(()=>{
          })
        }
      }

    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";


</style>
