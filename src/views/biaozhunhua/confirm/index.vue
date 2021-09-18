<template>
  <div class="app-container">
    <!-- <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="检查人" prop="checkperson">
        <el-input
          v-model="queryParams.checkperson"
          placeholder="请输入检查人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检查单位" prop="checkdept">
        <el-select
          v-model="queryParams.checkdept"
          placeholder="请输入检查单位"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in moddeptidOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="检查时间" >
         <el-date-picker
              v-model="dateRange"
              size="small"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
      </el-form-item>
      <el-form-item label="验证结果" prop="confirmresult">
        <el-select
          v-model="queryParams.confirmresult"
          placeholder="请选择验证结果"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in confirmresultOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="检查属性" prop="checkprop">
        <el-select
          v-model="queryParams.checkprop"
          placeholder="请选择检查属性"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in checkpropOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="整改单位" prop="moddept">
        <el-select
          v-model="queryParams.moddept"
          placeholder="请选择整改单位"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in moddeptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="status">
      
        <el-select v-model="queryParams.status" placeholder="状态">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                > </el-option> 
              </el-select> 

      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form> -->

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:bzhjc:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:bzhjc:edit']"
          >修改</el-button
        >
      </el-col> -->

      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="multiple"
          @click="handleConfirm"
          
          >效果验证</el-button
        >
      </el-col>

       <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-camera"
          size="mini"
          :disabled="multiple"
          @click="handleConfirm"
          v-hasPermi="['system:bzhjc:confirm']"
          >验证结果</el-button
        >
      </el-col>


      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:bzhjc:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:bzhjc:export']"
          >导出</el-button
        >
      </el-col> -->
      <!-- <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar> -->
    </el-row>

    <el-table
      v-loading="loading"
      :data="bzhjcList"
      :row-class-name="tableRowClassName"
      @row-dblclick="handleConfirm"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="检查人" align="center" prop="checkperson" />
      <el-table-column
        label="检查时间"
        align="center"
        prop="checkdate"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.checkdate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="检查内容" align="center" prop="checkcontent"  width="255" />

      <el-table-column label="检查属性" align="center" prop="checkprop" />
      <el-table-column
        label="整改时间"
        align="center"
        prop="checkmoddate"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.checkmoddate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="整改单位" align="center" prop="moddept" />
      <el-table-column label="完成时间" align="center" prop="moddonedate" />
      <el-table-column label="整改结果" align="center" prop="modresult" />
      <el-table-column label="验证结果" align="center" prop="confirmresult" />
      <el-table-column label="状态" align="center" prop="status" />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改标准化检查对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="检查时间" prop="checkdate">
          <el-date-picker
            clearable
            size="small"
            v-model="form.checkdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择检查时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="检查内容" prop="checkcontent">
          <el-input
            v-model="form.checkcontent"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="检查属性" prop="checkprop">
          <el-select v-model="form.checkprop" placeholder="请选择检查属性">
            <el-option
              v-for="dict in checkpropOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="整改单位" prop="moddept">
          <el-select v-model="form.moddept" placeholder="请选择整改单位">
            <el-option
              v-for="dict in moddeptidOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="整改时间" prop="checkmoddate">
          <el-date-picker
            clearable
            size="small"
            v-model="form.checkmoddate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择整改时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="检查图片">
          <imageUpload  v-model="form.checkpicture" />
           <h4 class="text-danger">
            *非必要，不上传图片
          </h4>
        </el-form-item>
       
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 整改回复标准化检查对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="replyopen"
      width="600px"
      append-to-body
    >
      <el-form
        ref="replyform"
        :model="replyform"
        :rules="rules"
        label-width="80px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="检查人" prop="checkperson">
              {{ replyform.checkperson }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="检查单位" prop="checkdept">
              {{ replyform.checkdept }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="检查时间" prop="checkdate">
              {{ replyform.checkdate }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="检查属性" prop="checkprop">
              {{ replyform.checkprop }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
             <el-form-item label="整改时间" prop="checkmoddate">
             {{ replyform.checkmoddate }}
             </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="整改单位" prop="moddept">
          {{ replyform.moddept }}
        </el-form-item>
          </el-col>
        </el-row>
         <el-row>
          <el-form-item label="检查内容" prop="checkcontent">
          {{ replyform.checkcontent }}
          </el-form-item>
          <el-form-item label="检查图片" v-show="replyform.checkpicture != null">
          <el-image
            style="width: 300px; height: 300px"
            :src="replyform.checkpicture"
            :preview-src-list="[replyform.checkpicture]"
          >
          </el-image>
        </el-form-item>
        </el-row>
        
        <el-form-item label="整改结果" prop="modresult">
          <el-input
            v-model="replyform.modresult"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="原因分析" prop="modreason">
          <el-input
            v-model="replyform.modreason"
            type="textarea"
            placeholder="请输入原因分析"
          />
        </el-form-item>
        <el-form-item label="整改图片">
          <imageUpload v-model="replyform.modpicture" />
           <h4 class="text-danger">
            *非必要，不上传图片
          </h4>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitReplyForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


   <!-- 检查人验证标准化检查对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="confirmopen"
      width="600px"
      append-to-body
    >
      <el-form
        ref="confirmform"
        :model="confirmform"
        :rules="rules"
        label-width="80px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="检查人" prop="checkperson">
              {{ confirmform.checkperson }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="检查单位" prop="checkdept">
              {{ confirmform.checkdept }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="检查时间" prop="checkdate">
              {{ confirmform.checkdate }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="检查属性" prop="checkprop">
              {{ confirmform.checkprop }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
             <el-form-item label="整改时间" prop="checkmoddate">
             {{ confirmform.checkmoddate }}
             </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="整改单位" prop="moddeptid">
          {{ confirmform.moddept }}
        </el-form-item>
          </el-col>
        </el-row>
         <el-row>
          <el-form-item label="检查内容" prop="checkcontent">
          {{ confirmform.checkcontent }}
          </el-form-item>
          <el-form-item label="检查图片" v-show="confirmform.checkpicture != null">
          <el-image
            style="width: 300px; height: 300px"
            :src="confirmform.checkpicture"
            :preview-src-list="[confirmform.checkpicture]"
          >
          </el-image>
        </el-form-item>
        </el-row>
        
        <el-form-item label="整改结果" prop="modresult">
          {{confirmform.modresult}}
        </el-form-item>
        <el-form-item label="原因分析" prop="modreason">
          {{confirmform.modreason}}
        </el-form-item>
        <el-form-item label="整改图片" v-show="confirmform.modpicture != null">
           <el-image
            style="width: 300px; height: 300px"
            :src="confirmform.modpicture"
            :preview-src-list="[confirmform.modpicture]"
          >
          </el-image>
        </el-form-item>
        
          <el-form-item label="验证结果" prop="confirmresult">
          <el-select v-model="confirmform.confirmresult" placeholder="请选择验证结果">
            <el-option
              v-for="dict in confirmresultOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>  
        <el-form-item label="验证详情" prop="confirmcontent">
          <el-input v-model="confirmform.confirmcontent" type="textarea" placeholder="请输入内容" />
          </el-form-item>  
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitConfirmForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  listBzhjc,
  listReplyBzhjc,
  listConfirmBzhjc,
  getBzhjc,
  replyBzhjc,
  delBzhjc,
  addBzhjc,
  updateBzhjc,
  exportBzhjc,
  replyBzhjcForm,
  confirmBzhjcForm,
  confirmBzhjc,
} from "@/api/system/bzhjc";
import ImageUpload from "@/components/ImageUpload";

export default {
  name: "Bzhjc",
  components: {
    ImageUpload,
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
      // 标准化检查表格数据
      bzhjcList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      replyopen: false,
      confirmopen: false,
      // 验证结果字典
      confirmresultOptions: [],
      // 检查属性字典
      checkpropOptions: [],
      // 整改单位id字典
      moddeptidOptions: [],
      // 整改单位字典
      moddeptOptions: [],
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        checkperson: null,
        checkdept: null,
        checkdate: null,
        confirmresult: null,
        checkprop: null,
        checkmoddate: null,
        moddeptid: null,
        moddept: null,
        modperson: null,
        status: null,
      },
       statusOptions: [{
          value: '等待处理',
          label: '等待处理'
        }, {
          value: '等待验证',
          label: '等待验证'
        }, {
          value: '验证完成',
          label: '验证完成'
        }],
      // 表单参数
      form: {},
      // 表单参数
      replyform: {},
      confirmform: {},
      // 表单校验
      rules: {

        checkdate: [
          { required: true, message: "检查时间不能为空", trigger: "blur" }
        ],
        checkcontent: [
          { required: true, message: "检查内容不能为空", trigger: "blur" }
        ],
        confirmresult: [
          { required: true, message: "验证结果不能为空", trigger: "blur" }
        ],
        checkprop: [
          { required: true, message: "检查属性不能为空", trigger: "blur" }
        ],
        checkmoddate: [
          { required: true, message: "整改时间不能为空", trigger: "blur" }
        ],
        moddept: [
          { required: true, message: "整改单位不能为空", trigger: "blur" }
        ],
        modreason: [
          { required: true, message: "原因分析不能为空", trigger: "blur" }
        ],
        modresult: [
          { required: true, message: "整改结果不能为空", trigger: "blur" }
        ],
      },
    };
  },
  created() {
    this.getList();
     this.getDicts("bzhjcyzjg").then((response) => {
       this.confirmresultOptions = response.data;
     });
    // this.getDicts("bzhjcshx").then((response) => {
    //   this.checkpropOptions = response.data;
    // });
    // this.getDicts("bzhjcdept").then((response) => {
    //   this.moddeptidOptions = response.data;
    // });
    // this.getDicts("bzhjcdept").then((response) => {
    //   this.moddeptOptions = response.data;
    // });
  },
  methods: {

    tableRowClassName({row, rowIndex}) {
        if (row.status=="等待处理") {
          return 'warning-row';
        } else if (row.status=="验证完成") {
          return 'success-row';
        }
        return '';
      },
    /** 查询标准化检查列表 */
    getList() {
      this.loading = true;
      listConfirmBzhjc(this.addDateRange(this.queryParams, this.dateRange)).then((response) => {
        this.bzhjcList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 验证结果字典翻译
    confirmresultFormat(row, column) {
      return this.selectDictLabel(this.confirmresultOptions, row.confirmresult);
    },
    // 检查属性字典翻译
    checkpropFormat(row, column) {
      return this.selectDictLabel(this.checkpropOptions, row.checkprop);
    },
    // 整改单位id字典翻译
    moddeptidFormat(row, column) {
      return this.selectDictLabel(this.moddeptidOptions, row.moddeptid);
    },
    // 整改单位字典翻译
    moddeptFormat(row, column) {
      return this.selectDictLabel(this.moddeptOptions, row.moddept);
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
        checkperson: null,
        checkdeptid: null,
        checkdept: null,
        checkdate: null,
        checkcontent: null,
        confirmresult: null,
        confirmdate: null,
        confirmcontent: null,
        checkprop: null,
        checkmoddate: null,
        checkpicture: null,
        moddeptid: null,
        moddept: null,
        moddonedate: null,
        modresult: null,
        modreason: null,
        modcontent: null,
        modperson: null,
        modpicture: null,
        status: null,
      };
      this.resetForm("form");
    },
    // 整改回复表单重置
    resetReply() {
      this.replyform = {
        id: null,
        checkperson: null,
        checkdeptid: null,
        checkdept: null,
        checkdate: null,
        checkcontent: null,
        confirmresult: null,
        confirmdate: null,
        confirmcontent: null,
        checkprop: null,
        checkmoddate: null,
        checkpicture: null,
        moddeptid: null,
        moddept: null,
        moddonedate: null,
        modresult: null,
        modreason: null,
        modcontent: null,
        modperson: null,
        modpicture: null,
        status: null,
      };
      this.resetForm("replyform");
    },

     // 验证表单重置
    resetConfirm() {
      this.confirmform = {
        id: null,
        checkperson: null,
        checkdeptid: null,
        checkdept: null,
        checkdate: null,
        checkcontent: null,
        confirmresult: null,
        confirmdate: null,
        confirmcontent: null,
        checkprop: null,
        checkmoddate: null,
        checkpicture: null,
        moddeptid: null,
        moddept: null,
        moddonedate: null,
        modresult: null,
        modreason: null,
        modcontent: null,
        modperson: null,
        modpicture: null,
        status: null,
      };
      this.resetForm("confirmform");
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
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
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
      this.form = {
        checkdate: defaultDate,
        checkmoddate: defaultDate,
      };
      this.open = true;
      this.title = "添加标准化检查";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
     
      this.reset();
      const id = row.id || this.ids;
      getBzhjc(id).then((response) => {
        if(response.data.status!="等待处理"){
        this.$message.error('已处理，不能修改！');
        return;
        }
        this.form = response.data;
        this.open = true;
        this.title = "修改标准化检查";
      });
    },

    /** 整改回复按钮操作 */
    handleReply(row) {
      this.resetReply();
      const id = row.id || this.ids;
      replyBzhjc(id).then((response) => {
        this.replyform = response.data;
        this.replyopen = true;
        this.title = "整改回复标准化检查";
      });
    },

     /** 验证按钮操作 */
    handleConfirm(row) {
      this.resetConfirm();
      const id = row.id || this.ids;
      confirmBzhjc(id).then((response) => {
        this.confirmform = response.data;
        this.confirmopen = true;
        this.title = "验证标准化检查";
      });
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateBzhjc(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBzhjc(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },

    /** 提交按钮 */
    submitReplyForm() {
      this.$refs["replyform"].validate((valid) => {
        if (valid) {
          if (this.replyform.id != null) {
            replyBzhjcForm(this.replyform).then((response) => {
              this.msgSuccess("整改回复成功");
              this.replyopen = false;
              this.getList();
            });
          }
        }
      });
    },

     /** 提交按钮 */
    submitConfirmForm() {
      this.$refs["confirmform"].validate((valid) => {
        if (valid) {
          if (this.confirmform.id != null) {
            confirmBzhjcForm(this.confirmform).then((response) => {
              this.msgSuccess("验证成功");
              this.confirmopen = false;
              this.getList();
            });
          }
        }
      });
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm(
        '是否确认删除标准化检查编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delBzhjc(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有标准化检查数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportBzhjc(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
        });
    },
  },
};
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }
  
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>