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
        ...mapMutations(['saveShop']),
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
            this.saveShop(data.result)
          }).catch(error=>{
            console.log(error);
          })
        },
        login(){
          // debugger
          this.getShopList()

          this.$emit('login',true)
          this.$http.post(api.logincom,{username:'18981736266',password:'123456'}).then(this.log)
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
