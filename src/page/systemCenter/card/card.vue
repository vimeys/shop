<template>
  <div>
    <ys-search></ys-search>
    <ys-card></ys-card>
  </div>

</template>

<script>
  import  ysSearch from '@/components/search'
  import  ysCard from "../active/components/coupon"
    export default {
      name: "card",
      components:{
          ysSearch,
          ysCard
      },
    }
</script>

<style scoped>

</style>
