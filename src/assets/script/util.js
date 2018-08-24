export  function emptyObj(obj) {
    for(let key in obj){
        obj[key]=''
    }
    return obj
}
