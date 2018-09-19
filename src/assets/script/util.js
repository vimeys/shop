
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
//分装的ajax
export  function post(that,url,params,suc,err) {
    that.$http.post(url,params).then(json=>{
      const h = that.$createElement;
      if(json.data.isSuc==true){
        that.$notify({
          title:'成功',
          message: h('i', { style: 'color: green'},'数据操作成功'),
          duration:1000,
          position: 'bottom-right'
        })
        suc(json.data.result)
      }else{
        that.$notify({
            title:'接口报错',
          duration:20000,
            message: h('i', { style: 'color: red'},json.data.message)
        })
      }
    }).catch(error=>{
        console.log(error)
    })
}
