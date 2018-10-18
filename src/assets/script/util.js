
//重置空对象
export  function emptyObj(obj) {
    for(let key in obj){
        obj[key]=''
    }
    return obj
}
//时间转行
export  function parseTime(time) {
    return `/Date(${time})/`
}

//取时间
export  function getTime(parseTime) {
  if(parseTime){
    var first =parseTime.indexOf('(');
    var last =parseTime.indexOf(')');
    var time=parseTime.substring(first+1,last)
  }else {
    var time=''
  }



  // console.log(first, last);
  return time
}

//确认框
export function confirm(that,type='warning',info='您确定要删除吗?',title='删除') {
  return that.$confirm(info, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type
  })
}


//分装的ajax
// class ajax {
//   constructor(){
//
//   }
//   post(that,url,params,suc,err ){
//     that.$http.post(url,params).then((json)=>{
//       (suc&&suc(data))
//     }).catch(error=>{
//       (err&&err(error))
//     })
//   }
// }
//封装的ajax
//param isLoad  是否有加载状态
export function post(that, url, params, suc, isLoad, err) {
  var loading
  if (isLoad) {//判断是否有loading状态
    loading = that.$loading({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  }
  that.$http.post(url, params).then(json => {
    const h = that.$createElement;
    if (json.data.isSuc == true) {
      that.$notify({
        title: '成功',
        message: h('i', {style: 'color: green'}, '数据操作成功'),
        duration: 1000,
        position: 'bottom-right'
      })
      if (isLoad) {//判断是否有loading状态
        loading.close();
      }
      suc(json.data.result)
    } else {
      err(json.data)
      that.$notify({
        title: '接口报错',
        duration: 20000,
        message: h('i', {style: 'color: red'}, json.data.message)
    })
      loading.close();
      // setTimeout(()=>{
      //   that.$store.commit('SET_SHOP','')
      // },1000)

    }
  }).catch(error => {
    var loading = that.$loading({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    console.log(error)
    const h = that.$createElement;
    that.$notify({
      title: '接口报错',
      duration: 20000,
      message: h('i', {style: 'color: red'}, error.Error)
    })
    loading.close();
  })
}
