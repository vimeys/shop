import mci from "@/assets/script/mciservice";

const uploadimageData = {
  /**
   * 	上传图片
   *
   * @param {Object: FormData}
   * */
  ashx(that, param, callBack, error) {
    mci.uploadimageservice.callPost(that, ".ashx", param, (e) => {
      let result = {};
      if (e && e.data && e.data.url) {
        result.isSuc = true;
        result.message = "";
        result.url = e.data.url;
      } else {
        result.isSuc = false;
        result.message = "上传失败";
        result.url = null;
      }
      callBack(result);
    }, (message) => {
      error(null);
    });
  },
  /**
   * 	多图上传图片
   *
   * @param {Object: FormData}
   * */
  ashxS(that, param, callBack, error) {
    mci.hostUrshop4Imageservice.callPost(that, ".ashx", param, (e) => {
      let result = {};
      if (e && e.data && e.data.url.length > 0) {
        result.isSuc = true;
        result.message = "";
        result.url = e.data.url;
      } else {
        result.isSuc = false;
        result.message = "上传失败";
        result.url = null;
      }
      callBack(result);
    }, (message) => {
      error(null);
    });
  },
};

export default uploadimageData;
