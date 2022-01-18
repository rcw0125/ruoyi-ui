<template>
  <div class="app-container"> 
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-menu mode="horizontal">
          <el-menu-item style="float: left">
            <div style="height: 55px; padding-bottom: 12px">
              <el-button
                type="primary"
                @click="confirmEdit()"
                icon="el-icon-edit"
                plain
                >保存模板</el-button
              >
            </div>
          </el-menu-item>
        </el-menu>
      </el-row>
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label="编号" prop="id">
              <el-input
                disabled
                v-model="form.id"
                placeholder="编号"
              />
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="单位" prop="dept">
              <el-input
                disabled
                v-model="form.dept"
                placeholder="单位"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岗位" prop="code">
              <el-input
              disabled
                v-model="form.code"
                placeholder="岗位"
              />
            </el-form-item>
          </el-col>
          <tinymce 
          @change="change"
          :defaultContent="form.note"
          upload_url="http://dev.lin.colorful3.com/cms/file/"
          />
          <!-- <div id="preview" class="preview" ></div> 
          <span v-html="form.noticeContent"></span>   -->
          <!-- <el-col :span="24">
            <el-form-item label="内容">
              <Editor v-model="form.noticeContent" />
              
            </el-form-item>
          </el-col> -->
        </el-row>
        <!-- <div  v-html="text" /> -->
      </el-form>
      
   
  </div>
</template>

<script>
import { listDaynotecfg, getDaynotecfg, delDaynotecfg, addDaynotecfg, updateDaynotecfg, exportDaynotecfg,getPostInfo } from "@/api/system/daynotecfg";

import Tinymce from "@/components/tinymce";

export default {
  name: "data",
  components: {

    Tinymce,
  },
  data() {
    return {
      text: "this is default content",
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
     
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        note: [
          { required: true, message: "模板不能为空", trigger: "blur" },
        ],
       
      },
    };
  },
  created() {
    // this.getList();
    const daynotecfgId = this.$route.params && this.$route.params.daynotecfgId;
    this.handleUpdate(daynotecfgId); 
  },
  methods: {
    change(val) {
      console.log(val)
      this.text=val;
    },

    confirmEdit() {
     if (this.form.id != null) {
         this.form.note = this.text;
            updateDaynotecfg(this.form).then(response => {
              this.msgSuccess("修改成功");   
            });
          }
    },
   
    /** 修改按钮操作 */
    handleUpdate(daynotecfgId) {
      //const noticeId = '146';
      getDaynotecfg(daynotecfgId).then((response) => {
        this.form = response.data;
      });
    },
  },

  

  

};
</script>
