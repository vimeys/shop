<template>
	<div class="input-box">
    <input class="fileInput" type="file" :multiple="multiple" @change="inputChange">
    <span class="el-icon-plus"></span>
	</div>

</template>


<script>
// 接口
import uploadimageData from "../assets/script/upload";

// 插件
// import FileUpload from "vue-upload-component";

export default {
  data() {
    return {
    };
  },
  props: {
    type: {
      default: "add"
    },
    imgIndex: {
      default: 0
    },
    multiple: {
      default: false
    }
  },
  methods: {
    inputChange(event) {
      const that = this;
      if(event.target && event.target.files){
        let files = event.target.files;
        if(files.length > 1){
          // 多图上传
          let formData = new FormData();
          for(let i=0;i<files.length;i++){
            formData.append("file", files[i]);
          }
          uploadimageData.ashxS(
            that,
            formData,
            result => {
              if (result.isSuc) {
                //  + imageMogrStr
                for (let index = 0; index < result.url.length; index++) {
                  const element = result.url[index];
                  that.$emit(
                    "imageUrl",
                    that.imgIndex,
                    element,
                    that.type
                  );
                }
              } else {
                that.$emit("imageUrl", that.imgIndex, "上传失败", that.type);
              }
            },
            message => {
              that.$emit("imageUrl", that.imgIndex, "上传失败", that.type);
            }
          );
        }else{
          // 单个上传
          let formData = new FormData();
          formData.append("file", files[0]);
          uploadimageData.ashx(
            that,
            formData,
            result => {
              if (result.isSuc) {
                //  + imageMogrStr
                console.log(result.url,'****************');
                console.log(that,'****************');
                // that.$emit(
                //   "imageUrl",
                //   that.imgIndex,
                //   result.url,
                //   that.type
                // );
                that.$emit(
                  "imageUrl",
                  // that.imgIndex,
                  result.url,
                  // that.type
                );
              } else {
                that.$emit("imageUrl", that.imgIndex, "上传失败", that.type);
              }
            },
            message => {
              that.$emit("imageUrl", that.imgIndex, "上传失败", that.type);
            }
          );
        }
      }
    }
  },
};
</script>

<style lang="less" scoped>
  .input-box{
    width: 100%;
    height: 100%;
    border: 2px dotted #ccc;
    position: relative;
    span{
      position: absolute;
      top:50%-8px;
      left: 50%-8px;
    }
  }
.fileInput {
  /*position: absolute;*/
  /*left: 0;*/
  /*top: 0;*/
  width: 100%;
  height: 100%;
  display: block;
  opacity: 0;
}
</style>

