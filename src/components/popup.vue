<template>
    <div class="popup" v-show="selfShow">
        <div class="popup-content">
            <span class="el-icon-close popup-close"
                  @click="close"
                  ></span>
          <div class="popup-slide-left">
            <el-select v-model="value" @change="change" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="popup-slide-right">
            <el-button type="text" @click="open5">点击打开 Message Box</el-button>
          </div>

        </div>

    </div>
</template>

<script>
  export default {
    name: "popup",
    props: {
      show: {
        type: Boolean,
        default() {
          return true
        }
      }
    },
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        selfShow:this.show
      }
    },
    methods: {
      close() {
        this.selfShow = false
      },
      open5() {
        this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
          dangerouslyUseHTMLString: true
        });
      },
      //select选择
      change(e){
        console.log(e);
      }
    }
  }
</script>

<style  lang="less" scoped>
  @import "../assets/style/common";
  .popup{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    z-index: 100;
    .popup-content{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background: #F6F6F6;
      width: 1024px;
      height: 796px;
      border-radius: 20px;
      display: flex;
      flex-direction: row;
      .popup-slide-left{
        width: 350px;
        height: 100%;
        border-right: 1px solid #d8d8d8;
        display: flex;
        justify-content: center;

      }
      .popup-close{
        position: absolute;
        top:40px;
        font-size: 18px;
        font-weight: bold;
        right: 30px;
      }
      .popup-close:hover{
          animation:rotate .4s linear;
      }
      /*.popup-close:*/
    }
  }
  @keyframes rotate {
     from {
       transform:rotate(0deg);
     }
    to{
      transform:rotate(270deg);
    }
  }
</style>
