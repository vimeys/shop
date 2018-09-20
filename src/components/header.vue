/**
*   Created By  YS  on 2018/8/9
*/
<template>
    <div class="box">
      <ul class="header">
        <!--<li v-for="(item,index) in nav" @click="href(index)">{{item.name}}</li>-->
        <router-link tag="li" :to="item.path" v-for="(item,index) in nav"  :key="index" > {{item.name}}</router-link>
      </ul>
      <div>{{Role}}</div>
    </div>
</template>

<script>
    // import RouterLink from "vant/es/mixins/router-link";
    import  {mapGetters, mapMutations, mapActions} from 'vuex'
    export default {
      name: "ysHeader",
      components: {},
      computed:{
        ...mapGetters(['userId','Role','shop']),
        Role(){
          // console.log(this.shop);
          this.nav.splice(4,0)
        }
      },
      data(){
          return {
            nav:[
              {name:'门店/员工管理',path:'/shop',active:true},
              {name:'运营管理',path:'/centerIndex',active:false},
              {name:'客户管理',path:'/clientIndex',active:false},
              {name:'素材中心',path:'/fodderCenter/fodder',active:false},
              {name:'财务管理',path:'/moneyManage',active:false},
              {name:'运营数据',path:'/dataView',active:false},
              {name:'个人中心',path:'/cardManage',active:false},
            ]
          }
      },
      methods:{
          href(index){
              // let path=this.nav[index].path;
              // this.$router.push({path:path})
              this.$emit('chooseNav',index)
          },

      },
      watch:{
        Role(){
          // this.nav.splice(4,1)
        }
      },
      mounted(){
      }
    }
</script>

<style lang='less' scoped>
  .header{
      width: 100%;
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #1a1a1a;
    li{
      flex: 1;
      color: #fff;
    }
    .active{
      font-size: 20px;
      color:#FFD736;
    }

  }

</style>
