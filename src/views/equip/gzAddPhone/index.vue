<template>
  <div class="app-container">
    <!-- <el-button type="danger" size="mini" @click="close">关闭</el-button> -->
    <el-form :model="form" ref="form" :rules="rules" label-width="80px">
       <el-form-item style="width:100%;">
        <el-button
           
          size="mini"
          type="danger"
          style="width:50%;"
          @click="close"
        >
        关闭     
        </el-button>
      </el-form-item>
      <el-form-item label="设备id" v-show="false" prop="sbid">
          <el-input v-model="form.sbid" readonly placeholder="请输入设备id" />
        </el-form-item>
        <el-form-item label="设备名称" prop="sbid">
          <el-input v-model="form.sbname" readonly placeholder="请输入设备名称" />
          <!-- <treeselect v-model="form.sbid" :options="quyuOptions" :normalizer="normalizer" placeholder="请选择设备名称" /> -->
        </el-form-item>
        
         <el-form-item label="故障内容" prop="djcontent">
          <el-input v-model="form.djcontent" type="textarea" rows="4"  placeholder="请输入内容" />
        </el-form-item>
      <el-form-item label="登记人电话" prop="djrphone">
          <el-input v-model="form.djrphone" placeholder="请输入登记人电话" maxlength="11"  />
      </el-form-item>
      <el-form-item label="责任车间" prop="djwxdept">
        <el-select v-model="form.djwxdept" placeholder="请选择责任车间" clearable size="small">
          <el-option
            v-for="dict in djwxdeptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
       
      </el-form-item>
       <el-form-item style="width:100%;">
        <el-button
           
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click="submitForm"
        >
         提 交 故 障     
        </el-button>
      </el-form-item>
    </el-form>

   

    <el-table v-loading="loading" :data="guzhangList" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="序号" align="center" width="85" prop="id" />
      <el-table-column label="登记人" align="center" width="85" prop="djr" />
      <!-- <el-table-column label="设备id" align="center" prop="sbid" />
      <el-table-column label="设备名称" align="center" prop="sbname" />
      <el-table-column label="登记车间" align="center" prop="djdept" />
      
      <el-table-column label="登记时刻" align="center" prop="djsk" width="180">
      </el-table-column> -->
      <el-table-column label="故障内容" align="center" prop="djcontent" />
      <!-- <el-table-column label="维修车间" align="center" prop="djwxdept" />
      <el-table-column label="登记人电话" align="center" prop="djrphone" />
      <el-table-column label="接收人" align="center" prop="jsr" />
      <el-table-column label="故障初步分析" align="center" prop="jscontent" />
      <el-table-column label="故障大类" align="center" prop="jsclfl"  />
      <el-table-column label="预计处理时间(天)" align="center" prop="jsclsj" />
      <el-table-column label="接收时刻" align="center" prop="jssk" />
      <el-table-column label="接收用时" align="center" prop="jsys" />
      <el-table-column label="处理人" align="center" prop="clr" />
      <el-table-column label="故障处理过程" align="center" prop="clcontent" />
      <el-table-column label="故障小类" align="center" prop="clgzfenlei" />
      <el-table-column label="处理时刻" align="center" prop="clsk" />
      <el-table-column label="处理用时" align="center" prop="clys" />
      <el-table-column label="处理人电话" align="center" prop="clrphone" />
      <el-table-column label="验证人" align="center" prop="yzr" />
      <el-table-column label="验证结果" align="center" prop="yzresult" />
      <el-table-column label="验证内容" align="center" prop="yzcontent" />
      <el-table-column label="验证时刻" align="center" prop="yzsk" />
      <el-table-column label="验证用时" align="center" prop="yzys" />
      <el-table-column label="总用时" align="center" prop="totalys" />
      <el-table-column label="是否维修标志，0 否  1是" align="center" prop="flag" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:guzhang:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:guzhang:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    
  </div>
</template>

<script>
import { listGuzhang, getGuzhang, delGuzhang, addGuzhang, updateGuzhang, exportGuzhang ,getAddInfoByPhone} from "@/api/system/guzhang";
import { listQuyu } from "@/api/system/quyu";
import Treeselect from "@riophae/vue-treeselect"
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Guzhang",
   components: {
    Treeselect
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 设备区域树选项
      quyuOptions: [],
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 故障报修表格数据
      guzhangList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 登记车间字典
      djdeptOptions: [],
      // 责任车间字典
      djwxdeptOptions: [],
      // 故障分类字典
      jsclflOptions: [],
      // 验证结果字典
      yzresultOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sbid: null,
        sbname: null,
        djdept: null,
        djr: null,
        djsk: null,
        djcontent: null,
        djwxdept: null,
        djrphone: null,
        jsr: null,
        jscontent: null,
        jsclfl: null,
        jsclsj: null,
        jssk: null,
        jsys: null,
        clr: null,
        clcontent: null,
        clgzfenlei: null,
        clsk: null,
        clys: null,
        clrphone: null,
        yzr: null,
        yzresult: null,
        yzcontent: null,
        yzsk: null,
        yzys: null,
        totalys: null,
        flag: null,
        locked:0
      },
      //路由参数
      routerId: 0,
      //故障内容
       sc:"",
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        sbid: [
          { required: true, message: "设备id不能为空", trigger: "blur" }
        ],
        sbname: [
          { required: true, message: "设备名称不能为空", trigger: "blur" }
        ],
        djdept: [
          { required: true, message: "登记车间不能为空", trigger: "change" }
        ],
        djr: [
          { required: true, message: "登记人不能为空", trigger: "blur" }
        ],
        djsk: [
          { required: true, message: "登记时刻不能为空", trigger: "blur" }
        ],
        djcontent: [
          { required: true, message: "故障内容不能为空", trigger: "blur" }
        ],
        djwxdept: [
          { required: true, message: "责任车间不能为空", trigger: "change" }
        ],
        djrphone: [
          { required: true, message: "登记人电话不能为空", trigger: "blur" }
        ],
        jsr: [
          { required: true, message: "接收人不能为空", trigger: "blur" }
        ],
        jscontent: [
          { required: true, message: "故障初步分析不能为空", trigger: "blur" }
        ],
        jsclfl: [
          { required: true, message: "故障分类不能为空", trigger: "change" }
        ],
        jsclsj: [
          { required: true, message: "预计处理时间(天)不能为空", trigger: "blur" }
        ],
        jssk: [
          { required: true, message: "接收时刻不能为空", trigger: "blur" }
        ],
        jsys: [
          { required: true, message: "接收用时不能为空", trigger: "blur" }
        ],
        clr: [
          { required: true, message: "处理人不能为空", trigger: "blur" }
        ],
        clcontent: [
          { required: true, message: "故障处理过程不能为空", trigger: "blur" }
        ],
        clgzfenlei: [
          { required: true, message: "故障分类不能为空", trigger: "blur" }
        ],
        clsk: [
          { required: true, message: "处理时刻不能为空", trigger: "blur" }
        ],
        clys: [
          { required: true, message: "处理用时不能为空", trigger: "blur" }
        ],
        clrphone: [
          { required: true, message: "处理人电话不能为空", trigger: "blur" }
        ],
        yzr: [
          { required: true, message: "验证人不能为空", trigger: "blur" }
        ],
        yzresult: [
          { required: true, message: "验证结果不能为空", trigger: "change" }
        ],
        yzcontent: [
          { required: true, message: "验证内容不能为空", trigger: "blur" }
        ],
        yzsk: [
          { required: true, message: "验证时刻不能为空", trigger: "blur" }
        ],
        yzys: [
          { required: true, message: "验证用时不能为空", trigger: "blur" }
        ],
        totalys: [
          { required: true, message: "总用时不能为空", trigger: "blur" }
        ],
        flag: [
          { required: true, message: "是否维修标志，0 否  1是不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.routerId = this.$route.params && this.$route.query.sid;
    this.sc= this.$route.params && this.$route.query.sc;
    console.log(this.sc);
    this.getPhoneInfo(this.routerId);
    
    this.queryParams.sbid=this.routerId;
    this.getList();
    // this.getDicts("lgdept").then(response => {
    //   this.djdeptOptions = response.data;
    // });
    this.getDicts("weixiudept").then(response => {
      this.djwxdeptOptions = response.data;
    });
    // this.getDicts("sbgzlx").then(response => {
    //   this.jsclflOptions = response.data;
    // });
    // this.getDicts("yzjg").then(response => {
    //   this.yzresultOptions = response.data;
    // });
    // this.getTreeselect();
  },
  methods: {
    /** 查询故障报修列表 */
    getList() {
      this.loading = true;
      listGuzhang(this.queryParams).then(response => {
        this.guzhangList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },


    getPhoneInfo(sid) {
      this.loading = true;
      getAddInfoByPhone(sid).then(response => {
        this.form = response.data;
        this.form.djcontent=this.sc;
        this.loading = false;
      });
    },

    close() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.push({ path: "/index" });
    },

    // 表单重置
    reset() {
      this.form = {
        id: null,
        sbid: null,
        sbname: null,
        djdept: null,
        djr: null,
        djsk: null,
        djcontent: null,
        djwxdept: null,
        djrphone: null,
        jsr: null,
        jscontent: null,
        jsclfl: null,
        jsclsj: null,
        jssk: null,
        jsys: null,
        clr: null,
        clcontent: null,
        clgzfenlei: null,
        clsk: null,
        clys: null,
        clrphone: null,
        yzr: null,
        yzresult: null,
        yzcontent: null,
        yzsk: null,
        yzys: null,
        totalys: null,
        flag: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
   
  
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          addGuzhang(this.form).then(response => {
              this.msgSuccess("新增故障操作成功");    
              this.getList();
              this.form.djcontent=null;
            });
        }
      });
    },
    
    
  }
};
</script>