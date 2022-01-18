<template>
  <div class="app-container">

    <el-row :gutter="10" class="mb8">
     
     <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          
        >刷新</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          
        >接收</el-button>
      </el-col>
     
    </el-row>

    <el-table v-loading="loading" :data="guzhangList"  @row-dblclick="handleUpdate"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <!-- <el-table-column label="设备id" align="center" prop="sbid" /> -->
      <el-table-column label="设备名称" align="center" prop="sbname" />
      <el-table-column label="登记车间" align="center" prop="djdept" />
      <el-table-column label="登记人" align="center" prop="djr" />
      <el-table-column label="登记时刻" align="center" prop="djsk" width="180">
      </el-table-column>
      <el-table-column label="故障内容" align="center" prop="djcontent" />
      <!-- <el-table-column label="维修车间" align="center" prop="djwxdept" /> -->
      <el-table-column label="登记人电话" align="center" prop="djrphone" />
      <!-- <el-table-column label="接收人" align="center" prop="jsr" />
      <el-table-column label="故障初步分析" align="center" prop="jscontent" />
      <el-table-column label="故障分类" align="center" prop="jsclfl"  />
      <el-table-column label="预计处理时间(天)" align="center" prop="jsclsj" />
      <el-table-column label="接收时刻" align="center" prop="jssk" />
      <el-table-column label="接收用时" align="center" prop="jsys" />
      <el-table-column label="处理人" align="center" prop="clr" />
      <el-table-column label="故障处理过程" align="center" prop="clcontent" />
      <el-table-column label="故障分类" align="center" prop="clgzfenlei" />
      <el-table-column label="处理时刻" align="center" prop="clsk" />
      <el-table-column label="处理用时" align="center" prop="clys" />
      <el-table-column label="处理人电话" align="center" prop="clrphone" />
      <el-table-column label="验证人" align="center" prop="yzr" />
      <el-table-column label="验证结果" align="center" prop="yzresult" />
      <el-table-column label="验证内容" align="center" prop="yzcontent" />
      <el-table-column label="验证时刻" align="center" prop="yzsk" />
      <el-table-column label="验证用时" align="center" prop="yzys" />
      <el-table-column label="总用时" align="center" prop="totalys" />
      <el-table-column label="是否维修标志，0 否  1是" align="center" prop="flag" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handlegzUpdate(scope.row)"
          >更正维修车间</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:guzhang:remove']"
          >删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改故障报修对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
       
        <el-form-item label="设备名称" prop="sbid">
          <el-input v-model="form.sbname" readonly placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="登记车间" prop="djdept">
           <el-input v-model="form.djdept" readonly placeholder="请输入登记车间" />
        </el-form-item>
        <el-form-item label="登记人" prop="djr">
          <el-input v-model="form.djr" readonly placeholder="请输入登记人" />
        </el-form-item>
       
        <el-form-item label="故障内容" prop="djcontent">
          <el-input v-model="form.djcontent" type="textarea" rows="4" readonly placeholder="请输入内容" />
        </el-form-item>
        <!-- <el-form-item label="维修车间" prop="djwxdept">
          <el-select v-model="form.djwxdept" placeholder="请选择维修车间">
            <el-option
              v-for="dict in djwxdeptOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="登记人电话" prop="djrphone">
          <el-input v-model="form.djrphone"  readonly placeholder="请输入登记人电话" />
        </el-form-item>

         <el-form-item label="故障初步分析" prop="jscontent">
          <el-input v-model="form.jscontent" type="textarea" rows="3" placeholder="请输入内容，字数10字以上" />
        </el-form-item>
        <el-form-item label="故障分类" prop="jsclfl">
          <el-select v-model="form.jsclfl" placeholder="请选择故障分类">
            <el-option
              v-for="dict in jsclflOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预计处理时间(天)" prop="jsclsj">
          <!-- <el-input v-model="form.jsclsj"  oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入预计处理时间(天)" /> -->
           <el-input-number v-model="form.jsclsj" :min="1" :max="30" label="描述文字"></el-input-number>
        </el-form-item>
        <!-- <el-form-item label="接收人" prop="jsr">
          <el-input v-model="form.jsr" placeholder="请输入接收人" />
        </el-form-item>
       
        <el-form-item label="接收时刻" prop="jssk">
          <el-input v-model="form.jssk" placeholder="请输入接收时刻" />
        </el-form-item>
        <el-form-item label="接收用时" prop="jsys">
          <el-input v-model="form.jsys" placeholder="请输入接收用时" />
        </el-form-item>
        <el-form-item label="处理人" prop="clr">
          <el-input v-model="form.clr" placeholder="请输入处理人" />
        </el-form-item>
        <el-form-item label="故障处理过程" prop="clcontent">
          <el-input v-model="form.clcontent" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="故障分类" prop="clgzfenlei">
          <el-input v-model="form.clgzfenlei" placeholder="请输入故障分类" />
        </el-form-item>
        <el-form-item label="处理时刻" prop="clsk">
          <el-input v-model="form.clsk" placeholder="请输入处理时刻" />
        </el-form-item>
        <el-form-item label="处理用时" prop="clys">
          <el-input v-model="form.clys" placeholder="请输入处理用时" />
        </el-form-item>
        <el-form-item label="处理人电话" prop="clrphone">
          <el-input v-model="form.clrphone" placeholder="请输入处理人电话" />
        </el-form-item>
        <el-form-item label="验证人" prop="yzr">
          <el-input v-model="form.yzr" placeholder="请输入验证人" />
        </el-form-item>
        <el-form-item label="验证结果" prop="yzresult">
          <el-select v-model="form.yzresult" placeholder="请选择验证结果">
            <el-option
              v-for="dict in yzresultOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="验证内容" prop="yzcontent">
          <el-input v-model="form.yzcontent" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="验证时刻" prop="yzsk">
          <el-input v-model="form.yzsk" placeholder="请输入验证时刻" />
        </el-form-item>
        <el-form-item label="验证用时" prop="yzys">
          <el-input v-model="form.yzys" placeholder="请输入验证用时" />
        </el-form-item>
        <el-form-item label="总用时" prop="totalys">
          <el-input v-model="form.totalys" placeholder="请输入总用时" />
        </el-form-item>
        <el-form-item label="是否维修标志，0 否  1是" prop="flag">
          <el-input v-model="form.flag" placeholder="请输入是否维修标志，0 否  1是" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

 <!-- 更正维修车间故障报修对话框 -->
    <el-dialog :title="title" :visible.sync="gzopen" width="500px" append-to-body>
      <el-form ref="gzform" :model="gzform" :rules="rules" label-width="80px">
        <!-- <el-form-item label="设备id" prop="sbid">
          <el-input v-model="form.sbid" placeholder="请输入设备id" />
        </el-form-item> -->
        <el-form-item label="设备名称" prop="sbid">
          <el-input v-model="gzform.sbname" readonly placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="登记车间" prop="djdept">
           <el-input v-model="gzform.djdept" readonly placeholder="请输入登记车间" />
         
        </el-form-item>
        <el-form-item label="登记人" prop="djr">
          <el-input v-model="gzform.djr" readonly placeholder="请输入登记人" />
        </el-form-item>
       
        <el-form-item label="故障内容" prop="djcontent">
          <el-input v-model="gzform.djcontent" type="textarea" rows="4" readonly placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="维修车间" prop="djwxdept">
          <el-select v-model="gzform.djwxdept" placeholder="请选择维修车间">
            <el-option
              v-for="dict in djwxdeptOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登记人电话" prop="djrphone">
          <el-input v-model="gzform.djrphone"  readonly placeholder="请输入登记人电话" />
        </el-form-item>
       
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitgzForm">确 定</el-button>
        <el-button @click="gzcancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { listGuzhang, getGuzhang, delGuzhang, addGuzhang, updateGuzhang, exportGuzhang ,getAddInfo,listJsGuzhang,acceptGuzhang,gzDeptGuzhang} from "@/api/system/guzhang";
import { listQuyu } from "@/api/system/quyu";
import Treeselect from "@riophae/vue-treeselect";
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
      // 是否显示弹出层
      gzopen: false,
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
        flag: null
      },
      // 表单参数
      form: {},
      // 表单参数
      gzform: {},
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
          { required: true, message: "故障初步分析请输入内容，字数10字以上", trigger: "blur" }
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
    this.getList();
    
    this.getDicts("weixiudept").then(response => {
      this.djwxdeptOptions = response.data;
    });
    this.getDicts("sbgzlx").then(response => {
      this.jsclflOptions = response.data;
    });
    this.getDicts("yzjg").then(response => {
      this.yzresultOptions = response.data;
    });
   
  },
  methods: {
    /** 查询故障报修列表 */
    getList() {
      this.loading = true;
      listJsGuzhang(this.queryParams).then(response => {
        this.guzhangList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    /** 查询部门下拉树结构 */
    getTreeselect() {
      listQuyu().then(response => {
        this.quyuOptions = this.handleTree(response.data, "id");
        // console.log(this.quyuOptions);
      });
    },
      /** 转换设备区域数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children
      };
    },
    
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 取消按钮
    gzcancel() {
      this.gzopen = false;
      this.gzreset();
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
     // 表单重置
    gzreset() {
      this.gzform = {
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
    

     /** 修改按钮操作 */
    handlegzUpdate(row) {
      this.gzreset();
      const id = row.id || this.ids
      getGuzhang(id).then(response => {
        this.gzform = response.data;
        this.gzopen = true;
        this.title = "更正维修车间";
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getGuzhang(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "接收故障报修";
      });
    },

    /** 提交按钮 */
    submitgzForm() {
      this.$refs["gzform"].validate(valid => {
        if (valid) {
          
          gzDeptGuzhang(this.gzform).then(response => {
              this.msgSuccess("更正维修车间成功");
              this.gzopen = false;
              this.getList();
            });
        }
      });
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if(this.form.jscontent.length<10){
            this.$message.error("故障初步分析字数只有"+this.form.jscontent.length+"个，应至少10个以上！");
            return;
          }
           acceptGuzhang(this.form).then(response => {
              this.msgSuccess("接收操作成功");
              this.open = false;
              this.getList();
            });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除故障报修编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delGuzhang(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有故障报修数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportGuzhang(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>