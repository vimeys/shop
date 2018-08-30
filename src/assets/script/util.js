
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
export function confirm(that) {
  return that.$confirm('您确定要删除吗?', '删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
}
