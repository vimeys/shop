/**
*   店铺编辑展示页面
*/
<template>
    <div class="box">
      <img :src="shop.Pics" alt="">
      <div class="content">
         <h4>
            {{shop.Title||'成都旗舰店  丨 成都国际金融中心'}}
         </h4>
        <p class="light-font">{{shop.Content||'成都国际金融中心'}}</p>
        <div class="border"></div>
        <h4>{{shop.Name||'瑞驰成都旗舰店'}}</h4>
        <p class="light-font">地址：{{shop.Address||'瑞驰成都旗舰店地址'}}</p>
        <p class="light-font">电话：{{shop.Tel||'11234513'}}</p>
        <p class="light-font">营业时间：{{`${shop.ShopStartDate}-${shop.ShopEndDate}`||`10:00-22:00`}}</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "shopDetail",
      props:{
          shop:{
            type:Object,
            default(){
               return {
                 shopPhoto:'',
                 name:'成都旗舰店  丨 成都国际金融中心',
                 intro:'成都市锦江区春熙路国际金融中心',
                 shopName:'瑞驰成都旗舰店',
                 address:'成都市锦江区春熙路国际金融中心',
                 phone:'028-11234513',
                 workTime:'10:00 - 22:00'
               }
            }
          }
      },
      data(){
          return{

          }
      }
    }
</script>

<style lang='less' scoped>
   .box{
     width: 100%;
     img{
       width: 100%;
       height: 170px;
     }
     h4{
       margin: 15px 0 10px;
     }
     .content{
       .border{
         width: 100%+5px;
         margin-left: -20px;
         border-top: 1px  solid #ddd;
       }
       box-sizing: border-box;
       padding-left: 20px;
       text-align: left;

     }
     .light-font{
       font-size: 11px;
       color:#808080;
     }
     }

</style>
