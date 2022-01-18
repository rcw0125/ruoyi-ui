<template>
  <div class="app-container"> 
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    
       <el-row>
          <el-col :span="24">
             <el-form-item>
         <el-button
          type="danger"
          icon="el-icon-edit"
          round
          :disabled="disable"
          @click="submitForm"
        >{{getCode}}</el-button>
       </el-form-item>
          </el-col>
        </el-row>

        <el-row>
         <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="部门" prop="code">
              <el-input
                readonly
                v-model="form.dept"
                placeholder="部门"
              />
            </el-form-item>
          </el-col>
         
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="岗位" prop="code">
              <el-input
              readonly
                v-model="form.post"
                placeholder="岗位"
              />
            </el-form-item>
          </el-col>
           <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
             <el-form-item label="班组" prop="team">
              <el-select v-model="form.team" placeholder="选择班组">
                <el-option
                  v-for="dict in teamOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictLabel"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="日期" prop="logtime">
               <el-date-picker
                   v-model="form.logtime"
                   type="date"      
                   value-format="yyyy-MM-dd"     
                   placeholder="选择日期">
              </el-date-picker>       
            </el-form-item>
          </el-col>
          <!-- <div id="preview" class="preview" ></div> 
          <span v-html="form.noticeContent"></span>   -->
          <!-- <el-col :span="24">
            <el-form-item label="内容">
              <Editor v-model="form.noticeContent" />
              
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
           <el-button
          type="success"
          icon="el-icon-edit"
          round
          @click="getLastDaynotecfg"
        >获取我的最后一个交班记录，作为模板</el-button>
        </el-row>
        <br>
         <tinymce 
          @change="change"
          :defaultContent="form.note"
          upload_url="http://dev.lin.colorful3.com/cms/file/"
          />
          <!-- 去除html实时效果显示 -->
        <!-- <div  v-html="text" /> -->
      </el-form>
      
   
  </div>
</template>

<script>
import { listDaynote, getDaynote, delDaynote, addDaynote, updateDaynote, exportDaynote,getCfg,getLastCfg } from "@/api/system/daynote";

import Tinymce from "@/components/tinymceview";

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
      getCode: '创建日志',
      count: 4,
      disable: false,
      // 非单个禁用
      // 班组字典
      teamOptions: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        note: [
          { required: true, message: "模板不能为空", trigger: "blur" },
        ],
        logtime: [
          { required: true, message: "日期不能为空", trigger: "blur" },
        ],
        team: [
          { required: true, message: "班组不能为空", trigger: "blur" },
        ],
        // code: [
        //   { required: true, message: "岗位不能为空", trigger: "blur" },
        // ],
        //  dept: [
        //   { required: true, message: "部门不能为空", trigger: "blur" },
        // ],
       
      },
    };
  },
  created() {
  
    this.getDicts("sys_user_team").then(response => {
      this.teamOptions = response.data;
    });
    this.getDaynotecfg();
  },
  methods: {
    change(val) {
      console.log(val)
      this.text=val;
    },

    submitForm() {
     //提交表单之前，要先对表单进行验证
       this.$refs["form"].validate(valid => {
        if (valid) {
          if(this.form.dept==null){
            this.$message.error('部门为空，不能创建日志！');
            return;
          };
          if(this.form.team==null){
            this.$message.error('班组为空，不能创建日志！');
            return;
          };
          //先禁止再次点击
           this.zuZhiDianJi();   
           this.form.note=this.text;
           addDaynote(this.form).then(response => {
              //console.log(response);
              if (response.code=== 200) {
                 this.msgSuccess("创建日志成功");
               
              }
            });
        }
      });
    },

     //点击后禁用6秒
     zuZhiDianJi () {
      var countDown = setInterval(() => {
        if (this.count < 1) {       
          this.disable = false
          this.getCode =  '创建日志'
          this.count = 4
          clearInterval(countDown)
          this.$store.dispatch("tagsView/delView", this.$route);
          this.$router.push({ path: "/work/modifynote" });
        } else {
         
          this.disable = true
          this.getCode = this.count-- + 's后跳转到修改日志'
        }
      }, 1000)
    },
   
    /** 修改按钮操作 */
    getDaynotecfg() {
      //const noticeId = '146';
      getCfg().then((response) => {
        this.form = response.data;
      });
    },
     getLastDaynotecfg() {
      //const noticeId = '146';
      getLastCfg().then((response) => {
        this.form.note = response.data.note;
      });
    },
  },

  

  

};
</script>
