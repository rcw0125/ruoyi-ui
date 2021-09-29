<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
        <blockquote class="text-warning" style="font-size: 14px">
          敢于创新 追求卓越
          <br />     
          每天进步一点点
          <br />
          持续改善，务实创新，力求突破
         <br />
          <h4 class="text-danger">
            厉行节约，减少浪费
          </h4>
        </blockquote>

        <hr />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
         <!-- <button class="sweep" @click="media()">扫一扫</button>
  
    <textarea
      class="result"
      cols="76"
      rows="6"
      v-model="result"
      placeholder="二维码识别结果！"
    ></textarea>
    <canvas class="canvas" ref="canvas"></canvas> -->
      </el-col>

     
    </el-row>
    <el-divider />
    <el-row :gutter="20">
      
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>更新日志</span>
          </div>
          <el-collapse accordion>
            
            
            
           
        

        
          <el-collapse-item title="v3.7.0 - 2021-09-13">
              <ol>
                <li>添加用车管理功能</li>
                <li>添加设备管理系统报表的外部链接</li> 
              </ol>
            </el-collapse-item>
           
            <el-collapse-item title="v1.1.0 - 2021-04-29">
              <ol>
                <li>炼钢管理系统开发完成</li>
                <li>新增员工自主改善录入模块</li>
                <li>新增指标录入模块</li>
                <li>新增标准化检查模块</li>
                <li>新增绩效考评模块</li>
                
              </ol>
            </el-collapse-item>
            
          </el-collapse>
        </el-card>
      </el-col>
     
    </el-row>
  </div>
</template>

<script>
import jsQR from "jsqr";
import Jimp from "jimp";
export default {
  name: "index",
  data() {
    return {
      // timer: null,
      // result: "https://github.com/MuGuiLin",
      
      // isAnimation: true,
      // audio: Object,
      // video: Object,
      // cvsele: Object,
      // canvas: Object,
      // 版本号
      version: "3.7.0",
    };
  },
  //  mounted() {
  //   this.audio = new Audio("../assets/tone.mp3");
  //   this.video = document.createElement("video");
  //   this.cvsele = this.$refs.canvas;
  //   this.canvas = this.cvsele.getContext("2d");
  // },

  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
    // draw(begin, end) {
    //   this.canvas.beginPath();
    //   this.canvas.moveTo(begin.x, begin.y);
    //   this.canvas.lineTo(end.x, end.y);
    //   this.canvas.lineWidth = 3;
    //   this.canvas.strokeStyle = "red";
    //   this.canvas.stroke();
    // },

    // sweep() {
    //   if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
    //     const { videoWidth, videoHeight } = this.video;
    //     this.cvsele.width = videoWidth;
    //     this.cvsele.height = videoHeight;
    //     this.canvas.drawImage(this.video, 0, 0, videoWidth, videoHeight);
    //     try {
    //       const img = this.canvas.getImageData(0, 0, videoWidth, videoHeight);
    //       this.imgurl = img;
    //       const obj = jsQR(img.data, img.width, img.height, {
    //         inversionAttempts: "dontInvert",
    //       });
    //       if (obj) {
    //         const loc = obj.location;
    //         this.draw(loc.topLeftCorner, loc.topRightCorner);
    //         this.draw(loc.topRightCorner, loc.bottomRightCorner);
    //         this.draw(loc.bottomRightCorner, loc.bottomLeftCorner);
    //         this.draw(loc.bottomLeftCorner, loc.topLeftCorner);
    //         if (this.result != obj.data) {
    //           this.audio.play();
    //           this.result = obj.data;
    //           this.isAnimation = false;
    //           cancelAnimationFrame(this.timer);
    //           console.info("识别结果：", obj.data);
    //           setTimeout(() => {
    //             this.cvsele.style.display = "none";
    //           }, 1000);
    //         }
    //       } else {
    //         console.error("识别失败，请检查二维码是否正确！");
    //       }
    //     } catch (err) {
    //       console.error("识别失败，请检查二维码是否正确！", err);
    //     }
    //   }
    //   if (this.isAnimation) {
    //     this.timer = requestAnimationFrame(() => {
    //       this.sweep();
    //     });
    //   }
    // },
    //  media() {
    //   this.isAnimation = true;
    //   this.cvsele.style.display = "block";
    //   navigator.getUserMedia =
    //     navigator.getUserMedia ||
    //     navigator.webkitGetUserMedia ||
    //     navigator.mozGetUserMedia ||
    //     navigator.msGetUserMedia;
    //   if (navigator.mediaDevices) {
    //     navigator.mediaDevices
    //       .getUserMedia({
    //         video: { facingMode: "environment" },
    //       })
    //       .then((stream) => {
    //         this.video.srcObject = stream;
    //         this.video.setAttribute("playsinline", true);
    //         this.video.setAttribute("webkit-playsinline", true);
    //         this.video.addEventListener("loadedmetadata", () => {
    //           this.video.play();
    //           this.sweep();
    //         });
    //       })
    //       .catch((error) => {
    //         console.error(
    //           error.name + "：" + error.message + "，" + error.constraint
    //         );
    //       });
    //   } else if (navigator.getUserMedia) {
    //     navigator.getUserMedia(
    //       {
    //         video: { facingMode: "environment" },
    //       },
    //       (stream) => {
    //         this.video.srcObject = stream;
    //         this.video.setAttribute("playsinline", true);
    //         this.video.setAttribute("webkit-playsinline", true);
    //         this.video.addEventListener("loadedmetadata", () => {
    //           this.video.play();
    //           this.sweep();
    //         });
    //       },
    //       (error) => {
    //         console.error(
    //           error.name + "：" + error.message + "，" + error.constraint
    //         );
    //       }
    //     );
    //   } else {
    //     if (
    //       navigator.userAgent.toLowerCase().match(/chrome/) &&
    //       location.origin.indexOf("https://") < 0
    //     ) {
    //       console.error(
    //         "获取浏览器录音功能，因安全性问题，需要在localhost 或 127.0.0.1 或 https 下才能获取权限！"
    //       );
    //     } else {
    //       alert("对不起：未识别到扫描设备!");
    //     }
    //   }
    // }
  },
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

