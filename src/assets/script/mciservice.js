// import {
//   clearTimeout
// } from "timers";

//封装一个ajax

//与之前的项目多了传入一个 Vue 实例

class jsonProxy {
  constructor(Host, Sprit) {
    if (Sprit == "without")
      this.Host = Host;
    else
      this.Host = Host + "/";
  }

  callPost($this, url, params, suc, err) {
    // $this.$store.commit("loader", true);
    $this.vload = true;
    // window.thisVue = $this;
    // clearTimeout($this.loadTime);
    $this.$http.post(this.Host + url, params)
      .then((data) => {
        (suc && suc(data));
        console.log(data);
        // $this.loadTime = setTimeout(() => {
        //   $this.$store.commit("loader", false);
        //   $this.vload = false;
        // }, 400);
      })
      .catch((error) => {
        console.log("报错:" + error);
        // 没必要提示报错，用户看不懂，用于调试使用
        // (err && err(error));
        // $this.loadTime = setTimeout(() => {
        //   $this.$store.commit("loader", false);
        //   $this.vload = false;
        // }, 400);
      });
  }

  callGet($this, url, params, suc, err) {
    $this.$store.commit("loader", true);
    $this.vload = true;
    // clearTimeout($this.loadTime);
    $this.$http.get(this.Host + url, params)
      .then((data) => {
        (suc && suc(data));
        $this.loadTime = setTimeout(() => {
          $this.$store.commit("loader", false);
          $this.vload = false;
        }, 400);
      })
      .catch((error) => {
        console.log("报错:" + error);
        // 没必要提示报错，用户看不懂，用于调试使用
        // (err && err(error));
        $this.loadTime = setTimeout(() => {
          $this.$store.commit("loader", false);
          $this.vload = false;
        }, 400);
      });
  }
}

const mci = {};
const host = "http://" + window.location.host + "/services/";
mci.gameservice = new jsonProxy(host + "game");
mci.usergameservice = new jsonProxy(host + "usergame");
mci.gameawardbatchservice = new jsonProxy(host + "gameawardbatch");
mci.gameawardrecordservice = new jsonProxy(host + "gameawardrecord");
mci.orderformservice = new jsonProxy(host + "orderform");
mci.qiniuservice = new jsonProxy(host + "qiniu");
mci.gameshareservice = new jsonProxy(host + "gameshare");
mci.suserservice = new jsonProxy(host + "suser");
mci.gamestatservice = new jsonProxy(host + "gamestat");
mci.gamegoodsservice = new jsonProxy(host + "gamegoods");
mci.gamegroupjoinservice = new jsonProxy(host + "gamegroupjoin");

// const hostYilianchuang = "http://md.yilianchuang.cn/services/";
mci.adservice = new jsonProxy(host + "ad");


// 两个上传图片都在同一个文件  model/uploadImage/index.js
const hostYilianchuang4Image = "http://mdimg.yilianchuang.cn/";
mci.uploadimageservice = new jsonProxy(hostYilianchuang4Image + "uploadimage3", 'without');
const hostUrshop4Image = "http://img.urshop.cc/";
mci.hostUrshop4Imageservice = new jsonProxy(hostUrshop4Image + "multupload", 'without');

mci.Number = (String) => {
  if (String)
    String = parseFloat(String);
  if (isNaN(String)) {
    String = 0;
    console.warn("传的参数可能有问题！！！");
  }
  return String;
};

mci.dataCallBack = (Json) => {
  let result = Json.data,
    callBack = Json.callBack,
    error = Json.error;

  if (result.isSuc)
    return callBack === undefined ? false : callBack(result);
  else
    error === undefined ? console.log(result.message) : error(result.message);
};


export default mci;
