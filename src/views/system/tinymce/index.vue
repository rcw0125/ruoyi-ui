<template>
  <div class="app-container">
   
        
    <div class="continer">    
     <section class="content-box">
      <section class="item-box">
        <itemBox :title="tsccGaugeOptionalSettings.title">
          <!-- <basicGauge :chartData="headData10"></basicGauge> -->
          <TsccGaugeChart
            :chartData="tsccGaugeData"
            :requiredSettings="tsccGaugeRequiredSettings"
            :optionalSettings="tsccGaugeOptionalSettings"
          />
        </itemBox>
      </section>
       <section class="item-box">
        <itemBox :title="tsccGaugeOptionalSettings1.title">
          <!-- <basicGauge :chartData="headData10"></basicGauge> -->
          <TsccGaugeChart
            :chartData="tsccGaugeData1"
            :requiredSettings="tsccGaugeRequiredSettings1"
            :optionalSettings="tsccGaugeOptionalSettings1"
          />
        </itemBox>
      </section>
     </section>
    </div>
    <el-form
      class="editor-form"
      :rules="rules"
      :model="form"
      status-icon
      ref="form"
      label-width="100px"
      @submit.native.prevent
    >
      <el-row>
        <el-menu mode="horizontal">
          <el-menu-item style="float: right">
            <div style="height: 55px; padding-bottom: 12px">
              <el-button
                type="primary"
                @click="confirmEdit()"
                icon="el-icon-edit"
                plain
                >发布文章</el-button
              >
            </div>
          </el-menu-item>
        </el-menu>
      </el-row>

      <el-form-item
        prop="noticeTitle"
        label="文章标题"
        style="margin-bottom: 0px !important"
      >
        <el-input
          class="editor-title"
          size="medium"
          v-model="form.noticeTitle"
          placeholder="请输入文章标题"
          style="font-size: 1.4rem"
        ></el-input>
      </el-form-item>

      <tinymce
        @change="change"
        upload_url="http://dev.lin.colorful3.com/cms/file/"
      />
      <div  v-html="text" />
    </el-form>
  </div>
</template>

<script>
import itemBox from "@/components/itemBox";
import TsccGaugeChart from "@/components/charts/TsccGaugeChart";
import Tinymce from "@/components/tinymce";
import {  addNotice } from "@/api/system/notice";
// import EditorDialog from './editor-dialog';

export default {
  
  data() {
    return {
      text: "this is default content",
      isLoading: true,
      form: {
        noticeContent: "",
        noticeTitle: "",
        noticeType:1,
      },
       // 仪表盘
      tsccGaugeData: 90.5,
      tsccGaugeRequiredSettings: {
        name: "点检率"
      },
      tsccGaugeOptionalSettings: {
        title: "维修车间点检率",
        //fd666d
        //67e0e3  #E4EF0B
        //37a2da
        color: [
           [0.6, '#FF0000'],
           [0.9, '#FFFF00'],
           [1, '#00FF00']
        ]
      },
       tsccGaugeData1: 80.5,
      tsccGaugeRequiredSettings1: {
        name: "点检率"
      },
      tsccGaugeOptionalSettings1: {
        title: "运行车间点检率",
        //fd666d
        //67e0e3  #E4EF0B
        //37a2da
        color: [
            [0.6, '#FF0000'],
           [0.9, '#FFFF00'],
           [1, '#00FF00']
        ]
      },
      codeTheme: "github",
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
      },
    };
  },
  components: {
    // EditorDialog,
    itemBox,
    TsccGaugeChart,
    Tinymce,
  },
  methods: {
    change(val) {
      console.log(val)
      this.text=val;
    },
    test() {
      //this.msgSuccess("成功"+this.text);
      //获取不带HTML标记的纯文本内容：
      var activeEditor = tinyMCE.activeEditor; 
      var editBody = activeEditor.getBody(); 
      activeEditor.selection.select(editBody); 
      this.msgSuccess("成功" + activeEditor.selection.getContent({'format':'text'}));
    },
    async confirmEdit() {
      var that = this;
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          that.form.noticeContent = this.text;
          addNotice(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
              }
            });
          // that.$refs['editorDialog'].show();
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.continer {
  background:url(../../../assets/images/banner.png) no-repeat center;
  background-size: 100% 100%;
  height: 100%;
  /* padding-top: 5rem; */
  padding: 5rem 1rem;
}
.head-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20rem;
}
.content-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  height: 20rem;
}
.item-box {
  height: 100%;
  flex: 1;
  margin-right: 1.5rem;
  position: relative;
}
</style>
