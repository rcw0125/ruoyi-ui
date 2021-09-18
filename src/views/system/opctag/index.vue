<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否使用" prop="used">
        <el-select v-model="queryParams.used" placeholder="请选择是否使用" clearable size="small">
          <el-option
            v-for="dict in usedOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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
          v-hasPermi="['system:opctag:add']"
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
          v-hasPermi="['system:opctag:edit']"
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
          v-hasPermi="['system:opctag:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:opctag:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="opctagList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="序号" align="center" prop="xuhao" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="变量名称" align="center" prop="l1name" />
      <el-table-column label="读取频率 " align="center" prop="scanrate" :formatter="scanrateFormat" />
      <el-table-column label="数据类型 " align="center" prop="datatype" :formatter="datatypeFormat" />
      <el-table-column label="动作 " align="center" prop="action" :formatter="actionFormat" />
      <el-table-column label="是否使用" align="center" prop="used" :formatter="usedFormat" />
      <el-table-column label="类型" align="center" prop="type" />
      <el-table-column label="添加时间" align="center" prop="ts" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ts, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:opctag:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:opctag:remove']"
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

    <!-- 添加或修改opctag对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="序号" prop="xuhao">
          <el-input v-model="form.xuhao" placeholder="请输入序号" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="变量名称" prop="l1name">
          <el-input v-model="form.l1name" placeholder="请输入变量名称" />
        </el-form-item>
        <el-form-item label="读取频率 " prop="scanrate">
          <el-select v-model="form.scanrate" placeholder="请选择读取频率 ">
            <el-option
              v-for="dict in scanrateOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据类型 " prop="datatype">
          <el-select v-model="form.datatype" placeholder="请选择数据类型 ">
            <el-option
              v-for="dict in datatypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="动作 " prop="action">
          <el-select v-model="form.action" placeholder="请选择动作 ">
            <el-option
              v-for="dict in actionOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否使用" prop="used">
          <el-select v-model="form.used" placeholder="请选择是否使用">
            <el-option
              v-for="dict in usedOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="form.type" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <!-- <el-form-item label="类型" prop="ts">
          <el-date-picker clearable size="small"
            v-model="form.ts"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择类型">
          </el-date-picker>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listOpctag, getOpctag, delOpctag, addOpctag, updateOpctag, exportOpctag } from "@/api/system/opctag";

export default {
  name: "Opctag",
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
      // opctag表格数据
      opctagList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 读取频率 字典
      scanrateOptions: [],
      // 数据类型 字典
      datatypeOptions: [],
      // 动作 字典
      actionOptions: [],
      // 是否使用字典
      usedOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        used: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        xuhao: [
          { required: true, message: "序号不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        l1name: [
          { required: true, message: "变量名称不能为空", trigger: "blur" }
        ],
        scanrate: [
          { required: true, message: "读取频率 不能为空", trigger: "change" }
        ],
        datatype: [
          { required: true, message: "数据类型 不能为空", trigger: "change" }
        ],
        action: [
          { required: true, message: "动作 不能为空", trigger: "change" }
        ],
        used: [
          { required: true, message: "是否使用不能为空", trigger: "change" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("opcdatascan").then(response => {
      this.scanrateOptions = response.data;
    });
    this.getDicts("opcdatatype").then(response => {
      this.datatypeOptions = response.data;
    });
    this.getDicts("OPCaction").then(response => {
      this.actionOptions = response.data;
    });
    this.getDicts("OPCused").then(response => {
      this.usedOptions = response.data;
    });
  },
  methods: {
    /** 查询opctag列表 */
    getList() {
      this.loading = true;
      listOpctag(this.queryParams).then(response => {
        this.opctagList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 读取频率 字典翻译
    scanrateFormat(row, column) {
      return this.selectDictLabel(this.scanrateOptions, row.scanrate);
    },
    // 数据类型 字典翻译
    datatypeFormat(row, column) {
      return this.selectDictLabel(this.datatypeOptions, row.datatype);
    },
    // 动作 字典翻译
    actionFormat(row, column) {
      return this.selectDictLabel(this.actionOptions, row.action);
    },
    // 是否使用字典翻译
    usedFormat(row, column) {
      return this.selectDictLabel(this.usedOptions, row.used);
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
        xuhao: null,
        name: null,
        l1name: null,
        scanrate: null,
        datatype: null,
        action: null,
        used: null,
        type: null,
        ts: null
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
      this.open = true;
      this.title = "添加opctag";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getOpctag(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改opctag";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateOpctag(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOpctag(this.form).then(response => {
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
      this.$confirm('是否确认删除opctag编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delOpctag(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有opctag数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportOpctag(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
