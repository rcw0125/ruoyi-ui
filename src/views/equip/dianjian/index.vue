<template>
  <div class="app-container">
   

      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="设备id" prop="sbid" v-show="false">
          <el-input v-model="form.sbid" placeholder="请输入设备id" />
        </el-form-item>
        <el-form-item label="设备名称" prop="sbname"  v-show="false">
          <el-input v-model="form.sbname" readonly placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="设备名称" >
           {{form.sbname}}--<b style="color: #f56c6c">{{ form.fenji }}</b>
        </el-form-item>
        <el-form-item label="标准id" v-show="false" prop="bzhid">
          <el-input v-model="form.bzhid" placeholder="请输入标准id" />
        </el-form-item>
         <el-form-item label="提示" >
          
         {{form.team}}-{{form.leibie}}-{{form.zhouqi}}- <b style="color: #f56c6c">{{ form.note }}</b>
        </el-form-item>
        
        <el-form-item label="点检单位"  v-show="false" prop="dept">
          <el-input v-model="form.dept" placeholder="请选择点检单位" />
        </el-form-item>
        <el-form-item label="点检班组"  v-show="false" prop="team">
          <el-input v-model="form.team"   readonly placeholder="请选择点检班组" />
        </el-form-item>
        <el-form-item label="点检类别"  v-show="false" prop="leibie">
          <el-input v-model="form.leibie"   readonly placeholder="请选择点检类别" />
        </el-form-item>
        <el-form-item label="点检周期" v-show="false" prop="zhouqi">
           <el-input v-model="form.zhouqi" readonly placeholder="请选择点检周期" />
        </el-form-item>
        <el-form-item label="标准备注" v-show="false" prop="bzhnote">
          <el-input v-model="form.bzhnote" placeholder="请输入标准备注" />
        </el-form-item>
        <el-form-item label="周应点检次数" v-show="false" prop="zhoucishu">
          <el-input v-model="form.zhoucishu" placeholder="请输入周应点检次数" />
        </el-form-item>
        <el-form-item label="点检人" v-show="false" prop="djr">
          <el-input v-model="form.djr" placeholder="请输入点检人" />
        </el-form-item>
        <!-- <el-form-item label="点检结果" prop="djresult">
          <el-select v-model="form.djresult" placeholder="请选择点检结果">
            <el-option
              v-for="dict in djresultOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item> -->
       
       <el-form-item label="提示" v-show="false" prop="note">
          <el-input v-model="form.note"  readonly placeholder="" />
        </el-form-item>
        <el-form-item label="关注参数" v-show="form.yxcs!= null &&form.yxcs!=''" prop="yxcs">
          <el-input v-model="form.yxcs" type="textarea" readonly rows="3" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="点检等级" v-show="false" prop="fenji">
          <el-input v-model="form.fenji"  readonly placeholder="分级" />
        </el-form-item>
       <el-form-item label="点检内容">
          <el-input v-model="form.djcontent" type="textarea" :rows=3 placeholder="请输入内容;异常时必须输入内容，至少5字以上" />     
        </el-form-item>
      <el-form-item label="点检图片" v-show="form.fenji=='S级'||form.fenji=='A级'">
          <imageUpload v-model="form.pic" />
           <!-- <h4 class="text-danger">
            *非必要，不上传图片
          </h4> -->
       </el-form-item>  

       <!-- <el-form-item label="点检结果">
           <el-switch
          style="display: block"
          v-model="djstatus"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="设备正常"
          inactive-text="设备异常">
        </el-switch>
       </el-form-item> -->
       <el-form-item label="点检结果" v-show="form.flag==0" prop="djresult">
        <el-select v-model="form.djresult" placeholder="状态">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                > </el-option> 
              </el-select> 
      </el-form-item> 
      <el-form-item style="width:100%;">
        <el-button
           v-show="form.flag==0"
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click="submitzhengchang"
        >
        认真点检，确认提交    
        </el-button>
      </el-form-item>
        <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          v-show="form.flag!=0"
          size="medium"
          type="danger"
          style="width:100%;"
          @click="submityichang"
        >
         二次点检，再次提交
        </el-button>
      </el-form-item>
      <el-form-item label="点检标准" prop="biaozhun">
          <!-- <el-input v-model="form.biaozhun" type="textarea" placeholder="请输入内容" /> -->
           <EditorReadOnly  v-model="form.biaozhun"  :min-height="192"/>
        </el-form-item>
        <!-- <el-form-item label="点检时刻" prop="djtime">
          <el-date-picker clearable size="small"
            v-model="form.djtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择点检时刻">
          </el-date-picker>
        </el-form-item> -->
        
        <!-- <el-form-item label="是否可以点检" prop="flag">
          <el-input v-model="form.flag" placeholder="请输入是否可以点检" />
        </el-form-item> -->
        <!-- <el-form-item label="点检日期" prop="djrq">
          <el-date-picker clearable size="small"
            v-model="form.djrq"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择点检日期">
          </el-date-picker>
        </el-form-item> -->
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div> -->
    
  </div>
</template>

<script>
import { listDianjianlist,getDianjianBiaoZhun, getDianjianlist, delDianjianlist, addDianjianlist, updateDianjianlist, exportDianjianlist } from "@/api/system/dianjianlist";
import ImageUpload from "@/components/ImageUpload";
// 富文本组件
import EditorReadOnly from "@/components/EditorReadOnly"
export default {
  name: "Dianjian",
  components: {
    ImageUpload,
    EditorReadOnly
  },
  data() {
    return {
      // 遮罩层
      loading: false,
     
      // djstatus:true,
      
      //路由参数
      routerId: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sbid: null,
        sbname: null,
        bzhid: null,
        biaozhun: null,
        dept: null,
        team: null,
        leibie: null,
        zhouqi: null,
        bzhnote: null,
        zhoucishu: null,
        djr: null,
        djresult: null,
        djcontent: null,
        djtime: null,
        note: null,
        flag: null,
        djrq: null
      },
       
       statusOptions: [{
          value: '正常',
          label: '正常'
        }, {
          value: '异常',
          label: '异常'
        }],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
         sbname: [
          { required: true, message: "设备名称不能为空", trigger: "blur" }
        ],
        team: [
          { required: true, message: "点检班组不能为空", trigger: "change" }
        ],
        leibie: [
          { required: true, message: "点检类别不能为空", trigger: "change" }
        ],
        zhouqi: [
          { required: true, message: "点检周期不能为空", trigger: "change" }
        ],
      }
    };
  },
  created() {
    this.routerId = this.$route.params && this.$route.query.sid;
    console.log(this.routerId);
    getDianjianBiaoZhun(this.routerId).then(response => {
        this.form = response.data;  
      });
    
  },
  methods: {
    /** 查询点检记录列表 */
  
    // 表单重置
    reset() {
      this.form = {
        id: null,
        sbid: null,
        sbname: null,
        bzhid: null,
        biaozhun: null,
        dept: null,
        team: null,
        leibie: null,
        zhouqi: null,
        bzhnote: null,
        zhoucishu: null,
        djr: null,
        djresult: null,
        djcontent: null,
        djtime: null,
        note: null,
        flag: null,
        djrq: null
      };
      this.resetForm("form");
    },
     
      /** 提交按钮 */
    submitzhengchang() {
      // if(this.form.leibie=="专业点检" && this.form.djcontent.length<15){
      //   this.$message.error('专业点检内容至少15字以上，请认真填写！');
      //   return;
      // }
     
      if((this.form.fenji=="S级" ||this.form.fenji=="A级")&&(this.form.pic==null||this.form.pic=='')){
        this.$message.error('点检等级为S级或A级必须上传图片！');
        return;
      }
      //this.form.djresult="正常";
      addDianjianlist(this.form).then(response => {
              this.msgSuccess("新增点检记录成功");    
               this.handleClose();       
            });
     
    },
    
    // 返回按钮，返回到欢迎界面
    handleClose() {
      this.$store.dispatch("tagsView/delView", this.$route);
       this.$router.push({ path: "/equip/mydianjian" });
    },

    // 点检成功后，跳转到操作成功界面
    handleResult() {
      this.$store.dispatch("tagsView/delView", this.$route);
       this.$router.push({ path: "/djresult?sid="+this.form.sbid+"&sc="+this.form.djcontent });
    },
     /** 提交按钮 */
    submityichang() {
       if(this.form.sbname==null){
          this.$message.error('设备名称不能为空');
        return;
      };

      if(this.form.djcontent==null){
          this.$message.error('请填写点检内容！');
        return;
      };
      if(this.form.djcontent.length<5){
        this.$message.error('点检异常内容至少5字以上，请认真填写！');
        return;
      }
       if((this.form.fenji=="S级" ||this.form.fenji=="A级")&&(this.form.pic==null||this.form.pic=='')){
        this.$message.error('点检等级为S级或A级必须上传图片！');
        return;
      }
      this.form.djresult="异常";
      addDianjianlist(this.form).then(response => {
              this.msgSuccess("新增点检记录成功");   
              this.handleResult();    
            });
    },
   
  }
};
</script>