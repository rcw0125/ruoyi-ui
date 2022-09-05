<template>
  <div>
    <editor id="tinymceEditor" :init="tinymceInit" v-model="content" :key="tinymceFlag"></editor>
  </div>
</template>
<script>
// eslint-disable-next-line
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
import "./import-all";
import "tinymce/icons/default/icons";
import request from "@/utils/request";
export default {
  name: "TinymceEditor",
  props: {
    defaultContent: {
      type: String,
      default: "",
    },
    height: {
      type: Number,
      default: 700,
    },
    width: {
      type: Number,
      default: undefined,
    },
    upload_url: {
      type: String,
      default: "",
    },
    //隐藏菜单
    showMenubar: {
      type: Boolean,
      default: false,
    },
    //将工具栏的配置项，全部去掉，达到隐藏工具栏的效果
    toolbar: {
      type: String,
      default: ``,
    },
    baseUrl: {
      type: String,
      default: "",
    },
  },
  components: {
    Editor,
  },
  data() {
    return {
      tinymceFlag: 1,
      tinymceInit: {},
      content: "",
    };
  },
  created() {
    const _this = this;
    this.tinymceInit = {
      language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`,
      skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
      content_css: `${this.baseUrl}/tinymce/skins/content/default/content.css`,
      language: "zh_CN",
      height: this.height,
      width: undefined,
      browser_spellcheck: true, // 拼写检查
      branding: false, // 去水印
      elementpath: false, // 禁用编辑器底部的状态栏
      statusbar: false, // 隐藏编辑器底部的状态栏
      paste_data_images: true, // 允许粘贴图像
      menubar: this.showMenubar, // 隐藏最上方menu
      plugins: `print fullpage searchreplace autolink directionality visualblocks 
        visualchars template codesample charmap hr pagebreak nonbreaking anchor toc insertdatetime 
        wordcount textpattern help advlist table lists paste preview fullscreen image imagetools code link media`,
      toolbar: this.toolbar,
      file_picker_callback: function (callback, value, meta) {
        //文件分类
        var filetype =
          ".pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4";
        //模拟出一个input用于添加本地文件
        var input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", filetype);
        input.click();
        input.onchange = function () {
          var file = this.files[0];
          console.log(file.name);
          const formData = new FormData();
          formData.append('file', file);
          request({
            url: "/common/upload",
            method: "post",
            data:formData,
          })
          .then((res) => {
            if (res && res.url) {
              callback(res.url, { text: file.name, title: file.name });
            }
          });
        };
      },

      async images_upload_handler(blobInfo, success, failure) {
        const file = new File([blobInfo.blob()], blobInfo.filename(), {
          type: "image/*",
        });

       const formData = new FormData();
       formData.append('file', blobInfo.blob());

        request({
          url: "/common/upload",
          method: "post",
          data: formData,
        })
          .then((res) => {
            if (res && res.url) {
              success(res.url);
            }
          })
          .catch((err) => failure(err));
      },
    };
  },
  mounted() {
    if (this.defaultContent) {
      this.content = this.defaultContent;
    }
  },
  watch: {
    content: {
      handler() {
        this.$emit("change", this.content);
      },
    },
    defaultContent: {
      handler() {
        this.content = this.defaultContent;
      },
      immediate: true,
    },
  },
  activated() {
    this.tinymceFlag++;
  },
};
</script>
