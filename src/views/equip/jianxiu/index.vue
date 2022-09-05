<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="设备ID" prop="sbid">
        <el-input
          v-model="queryParams.sbid"
          placeholder="请输入设备ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="设备名称" prop="sbname">
        <el-input
          v-model="queryParams.sbname"
          placeholder="请输入设备名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检修单位" prop="dept">
        <el-select v-model="queryParams.dept" placeholder="请选择检修单位" clearable size="small">
          <el-option
            v-for="dict in deptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="检修班组" prop="team">
        <el-input
          v-model="queryParams.team"
          placeholder="请输入检修班组"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="计划人" prop="jhr">
        <el-input
          v-model="queryParams.jhr"
          placeholder="请输入计划人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="计划日期" prop="jhrq">
        <el-date-picker clearable size="small"
          v-model="queryParams.jhrq"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择计划日期">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="登记时间" prop="djtime">
        <el-input
          v-model="queryParams.djtime"
          placeholder="请输入登记时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检修内容" prop="jxnr">
        <el-input
          v-model="queryParams.jxnr"
          placeholder="请输入检修内容"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检修描述" prop="jxms">
        <el-input
          v-model="queryParams.jxms"
          placeholder="请输入检修描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检修时间" prop="jxtime">
        <el-input
          v-model="queryParams.jxtime"
          placeholder="请输入检修时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="状态" prop="status">
         <el-select v-model="queryParams.status" placeholder="请选择状态"  size="small">
          <el-option
            v-for="dict in statusOptions"
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
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:jianxiu:add']"
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
          v-hasPermi="['system:jianxiu:edit']"
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
          v-hasPermi="['system:jianxiu:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="jianxiuList" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="设备ID" align="center" prop="sbid" />
      <el-table-column label="设备名称" align="center" prop="sbname" width="200px" />
      <el-table-column label="检修单位" align="center" prop="dept" width="120px"/>
      <el-table-column label="检修班组" align="center" prop="team" width="120px" />
      
      <el-table-column label="计划日期" align="center" prop="jhrq" width="120">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.jhrq, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="登记时间" align="center" prop="djtime" /> -->
      <el-table-column label="检修内容" align="center" prop="jxnr" width="200px" />
      <el-table-column label="检修描述" align="center" prop="jxms" width="200px" />
      <el-table-column label="检修时间" align="center" prop="jxtime" />
      <el-table-column label="状态" align="center" prop="status" />
      <el-table-column label="计划人" align="center" prop="jhr" />
      <el-table-column label="检修人" align="center" prop="jxr" />
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:jianxiu:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:jianxiu:remove']"
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

    <!-- 添加或修改计划检修对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="设备ID" prop="sbid">
          <el-input v-model="form.sbid" placeholder="请输入设备ID" />
        </el-form-item>
        <el-form-item label="设备名称" prop="sbname">
          <el-input v-model="form.sbname" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="检修单位" prop="dept">
          <el-select v-model="form.dept" placeholder="请选择检修单位">
            <el-option
              v-for="dict in deptOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检修班组" prop="team">
          <el-input v-model="form.team" placeholder="请输入检修班组" />
        </el-form-item>
        <el-form-item label="计划人" prop="jhr">
          <el-input v-model="form.jhr" placeholder="请输入计划人" />
        </el-form-item>
        <el-form-item label="计划日期" prop="jhrq">
          <el-date-picker clearable size="small"
            v-model="form.jhrq"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择计划日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="登记时间" prop="djtime">
          <el-input v-model="form.djtime" placeholder="请输入登记时间" />
        </el-form-item>
        <el-form-item label="检修内容" prop="jxnr">
          <el-input v-model="form.jxnr" placeholder="请输入检修内容" />
        </el-form-item>
        <el-form-item label="检修描述" prop="jxms">
          <el-input v-model="form.jxms" placeholder="请输入检修描述" />
        </el-form-item>
        <el-form-item label="检修时间" prop="jxtime">
          <el-input v-model="form.jxtime" placeholder="请输入检修时间" />
        </el-form-item>
        <el-form-item label="状态(等待检修、检修完成、异常结束)">
           <el-input v-model="form.status" placeholder="请输入检修时间" />
            
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listJianxiu, getJianxiu, delJianxiu, addJianxiu, updateJianxiu, exportJianxiu } from "@/api/system/jianxiu";

export default {
  name: "Jianxiu",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
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
      // 计划检修表格数据
      jianxiuList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 检修单位字典
      deptOptions: [],
      // 检修状态字典
      statusOptions:[{
          dictValue: '等待检修',
          dictLabel: '等待检修'
        },{
          dictValue: '检修完成',
          dictLabel: '检修完成'
        }, {
          dictValue: '异常结束',
          dictLabel: '异常结束'
        }],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sbid: null,
        sbname: null,
        dept: null,
        team: null,
        jhr: null,
        jhrq: null,
        djtime: null,
        jxnr: null,
        jxms: null,
        jxtime: null,
        status: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("weixiudept").then(response => {
      this.deptOptions = response.data;
    });
  },
  methods: {
    /** 查询计划检修列表 */
    getList() {
      this.loading = true;
      listJianxiu(this.queryParams).then(response => {
        this.jianxiuList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 检修单位字典翻译
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
        sbid: null,
        sbname: null,
        dept: null,
        team: null,
        jhr: null,
        jhrq: null,
        djtime: null,
        jxnr: null,
        jxms: null,
        jxtime: null,
        status: "0"
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
      this.title = "添加计划检修";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getJianxiu(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改计划检修";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateJianxiu(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addJianxiu(this.form).then(response => {
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
      this.$confirm('是否确认删除计划检修编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delJianxiu(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有计划检修数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportJianxiu(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
