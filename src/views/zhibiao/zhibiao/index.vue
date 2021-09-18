<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="所属单位" prop="dept">
        <el-select v-model="queryParams.dept" placeholder="请选择所属单位" @change="changedept" clearable size="small">
          <el-option
            v-for="dict in deptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="项目" prop="name">
        <el-select v-model="queryParams.name" placeholder="请选择项目"  clearable size="small">
          <el-option
            v-for="dict in zhibiaoOptions"
            :key="dict.name"
            :label="dict.name"
            :value="dict.name"
          />
        </el-select>
      </el-form-item>
    
      <el-form-item label="日期" prop="logtime">
        <el-date-picker clearable size="small"
          v-model="queryParams.logtime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:zhibiao:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:zhibiao:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:zhibiao:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:zhibiao:export']"
        >导出</el-button>
        
      </el-col>
      <el-col :span="1.5">
            <el-button
              type="info"
              plain
              icon="el-icon-upload2"
              size="mini"
              @click="handleImport"
              v-hasPermi="['system:zhibiao:import']"
            >导入</el-button>
          </el-col>
       
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zhibiaoList" @selection-change="handleSelectionChange" @row-dblclick="dbSelected" >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="项目" align="center" prop="name" />
      <el-table-column label="所属单位" align="center" prop="dept" />
      <el-table-column label="计划值" align="center" prop="planval" />
      <el-table-column label="完成值" align="center" prop="val" />
      <el-table-column label="影响原因" align="center" prop="reason" />
      <el-table-column label="采取措施" align="center" prop="cuoshi" />
      <el-table-column label="日期" align="center" prop="logtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.logtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:zhibiao:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:zhibiao:remove']"
          >删除</el-button>
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

    <!-- 添加或修改指标记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
       
        <el-form-item label="所属单位"   prop="dept">
          <el-select v-model="form.dept" @change="changeFormDept"  :disabled="disable" placeholder="请选择所属单位">
            <el-option
              v-for="dict in deptOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="项目"   prop="name">
          <el-select v-model="form.name" placeholder="请选择项目"   :disabled="disable"  clearable size="small">
          <el-option
            v-for="dict in zhibiaoFormOptions"
            :key="dict.name"
            :label="dict.name"
            :value="dict.name"
          />
        </el-select>
        </el-form-item>
        <el-form-item label="计划值" prop="planval">
          <el-input v-model="form.planval" oninput="value=value.replace(/[^\d.]/g,'')" maxlength="10" placeholder="请输入计划值" />
        </el-form-item>
        <el-form-item label="完成值" prop="val">
          <el-input v-model="form.val" oninput="value=value.replace(/[^\d.]/g,'')" maxlength="5" placeholder="请输入完成值" />
        </el-form-item>
        <el-form-item label="影响原因" prop="reason">
          <el-input v-model="form.reason" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="采取措施" prop="cuoshi">
          <el-input v-model="form.cuoshi" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="日期"   prop="logtime">
          <el-date-picker clearable size="small"
            :disabled="logtimedisable"
            v-model="form.logtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">  
          <el-link type="info" style="font-size:12px" @click="importTemplate">下载模板</el-link>
        </div>
        <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { listZhibiao, getZhibiao, delZhibiao, addZhibiao, updateZhibiao, exportZhibiao,getinfo,importTemplate } from "@/api/system/zhibiao";
import { getToken } from "@/utils/auth";
export default {
  name: "Zhibiao",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
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
      // 指标记录表格数据
      zhibiaoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      disable: false,
      logtimedisable: false,
      // 所属单位字典
      deptOptions: [],
      //指标选择框
      zhibiaoOptions: [],
      //增加对话框指标选择框
      zhibiaoFormOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        dept: null,
        logtime: null
      },

       // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/zhibiao/importData"
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "项目不能为空", trigger: "blur" }
        ],
        dept: [
          { required: true, message: "所属单位不能为空", trigger: "change" }
        ],
        planval: [
          { required: true, message: "计划值不能为空", trigger: "blur" }
        ],
        val: [
          { required: true, message: "完成值不能为空", trigger: "blur" }
        ],
        reason: [
          { required: true, message: "影响原因不能为空", trigger: "blur" }
        ],
        cuoshi: [
          { required: true, message: "采取措施不能为空", trigger: "blur" }
        ],
        logtime: [
          { required: true, message: "日期不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("lgdept").then(response => {
      this.deptOptions = response.data;
    });
  },
  methods: {
    /** 查询指标记录列表 */
    getList() {
      this.loading = true;
      listZhibiao(this.queryParams).then(response => {
        this.zhibiaoList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

     changedept(val){
       getinfo(val).then(response => {   
        this.zhibiaoOptions=response.dept;
      });    
      },
      changeFormDept(val){
       getinfo(val).then(response => {   
        this.zhibiaoFormOptions=response.dept;
      });     
      },
    // 所属单位字典翻译
    deptFormat(row, column) {
      return this.selectDictLabel(this.deptOptions, row.dept);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        dept: null,
        planval: null,
        val: null,
        reason: null,
        cuoshi: null,
        logtime: null
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
       var now = new Date();
       var year = now.getFullYear(); //得到年份
       var month = now.getMonth(); //得到月份
       var date = now.getDate(); //得到日期
       month = month + 1;
       month = month.toString().padStart(2, "0");
       date = date.toString().padStart(2, "0");
       var defaultDate = `${year}-${month}-${date}`;
       this.$set(this.form, "logtime", defaultDate);
       this.logtimedisable=false;
       this.disable=false;
      this.open = true;
      this.title = "添加指标记录";
    },
 
    dbSelected(row) {
      this.reset();
      this.form = {

        name: row.name,
        dept: row.dept,
        planval: row.planval,
        val: row.val,
        reason: row.reason,
        cuoshi: row.cuoshi,
        logtime: row.logtime
      };
       this.logtimedisable=false;
        this.disable=true;
        this.open = true;
        this.title = "复制指标记录新增";
     
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
       this.disable=true;
        this.logtimedisable=true;
      getZhibiao(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改指标记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateZhibiao(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZhibiao(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除指标记录编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delZhibiao(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有指标记录数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportZhibiao(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "指标数据导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      importTemplate().then(response => {
        this.download(response.msg);
      });
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    }
  }
};
</script>