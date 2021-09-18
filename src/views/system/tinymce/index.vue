<template>
  <div class="app-container">
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
      codeTheme: "github",
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
      },
    };
  },
  components: {
    // EditorDialog,
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
</style>
