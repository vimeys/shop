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
    export default {
      name: "login",
      components:{
        YsHeader,
      },data(){
        return {
          phone:'',
          psw:''
        }
      },methods:{
        login(){
          this.$http.post('http://test.csmen.cc/services/user/loginbyphonenum',{username:'18981736266',password:'123456'}).then(this.log)
        },
        log(){
          this.$http.post('http://test.csmen.cc/services/user/login',{companyname:"luozhi666",password:'e10adc3949ba59abbe56e057f20f883e'}).then(()=>{
            this.$emit('login',true)
          })
        }
      }

    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";


</style>
