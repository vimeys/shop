/**
*   Created By  YS  on 2018/8/9
*/
<template>
    <div class="box">
      <ul class="header">
        <!--<li v-for="(item,index) in nav" @click="href(index)">{{item.name}}</li>-->
        <router-link tag="li" :to="item.path" v-for="(item,index) in nav"  :key="index" > {{item.name}}
        <span class="el-icon-caret-top"></span>
        </router-link>
        <li @click="loginOut">退出</li>
      </ul>
      <!--<div>{{Role}}</div>-->
    </div>
</template>

<script>
    // import RouterLink from "vant/es/mixins/router-link";
    import  {mapGetters, mapMutations, mapActions} from 'vuex'
    export default {
      name: "ysHeader",
      components: {},
      computed:{
        ...mapGetters(['Role','shopRole']),
        // Role(){
        //   // console.log(this.shop);
        //   console.log(123);
        //   this.nav.splice(4,0)
        // }
      },
      data(){
          return {
            nav:[
              {name:'门店/员工管理',path:'/shop',active:true},
              {name:'运营管理',path:'/centerIndex',active:false},
              {name:'客户管理',path:'/clientIndex',active:false},
              {name:'素材中心',path:'/fodderCenter/fodders',active:false},
              {name:'财务管理',path:'/moneyManage',active:false},
              {name:'运营数据',path:'/dataView',active:false},
              {name:'个人中心',path:'/cardManage',active:false},
            ]
          }
      },
      methods:{
        ...mapMutations({saveShop:'SET_SHOP',}),
          href(index){
              this.$emit('chooseNav',index)
          },
          //退出
          loginOut(){
            // localStorage.removeItem('');
            this.saveShop('')
          }
      },
      watch:{
      },
      mounted(){
        //4是财务管理
        if(this.shopRole==4){//判断登录权限
          this.nav.splice(4,1)//如果是收银隐藏财务管理
        }
      }
    }
</script>

<style lang='less' scoped>
  .header{
      width: 100%;
    min-width: 1600px;
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #1a1a1a;
    li{
      flex: 1;
      color: #fff;
      cursor: pointer;
      span{
        display: none;
      }
    }

    .active{
      font-size: 20px;
      color:#FFD736;
      position: relative;
      span{
        font-size: 40px;
        color:#fff;
        display: inline-block;
        position: absolute;
        top:20px;
        left: calc(50% - 20px);
      }
    }

  }

</style>
