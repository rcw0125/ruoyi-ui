<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="登记单位" prop="djdw">
        <el-select v-model="queryParams.djdw" placeholder="请选择登记单位" clearable size="small">
          <el-option
            v-for="dict in djdwOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="月份" prop="logtime">
        <el-date-picker clearable size="small"
          v-model="queryParams.logtime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择月份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="周" prop="zhou">
        <el-input
          v-model="queryParams.zhou"
          placeholder="请输入周"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['system:jianxiutongji:add']"
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
          v-hasPermi="['system:jianxiutongji:edit']"
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
          v-hasPermi="['system:jianxiutongji:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['system:jianxiutongji:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="jianxiutongjiList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="登记单位" align="center" prop="djdw" />
      <el-table-column label="月份" align="center" prop="logtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.logtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="周" align="center" prop="zhou" />
      <el-table-column label="时间段" align="center" prop="sjd" /> -->
      <el-table-column label="申报数量" align="center" prop="sbsl" />
      <el-table-column label="实际数量" align="center" prop="sjsl" />
      <el-table-column label="兑现率" align="center" prop="rate" />
      <!-- <el-table-column label="时间点" align="center" prop="ts" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:jianxiutongji:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:jianxiutongji:remove']"
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

    <!-- 添加或修改设备检修统计对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="登记单位" prop="djdw">
          <el-select v-model="form.djdw" placeholder="请选择登记单位">
            <el-option
              v-for="dict in djdwOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="月份" prop="logtime">
          <el-date-picker clearable size="small"
            v-model="form.logtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择月份">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="周" prop="zhou">
          <el-input v-model="form.zhou" placeholder="请输入周" />
        </el-form-item>
        <el-form-item label="时间段" prop="sjd">
          <el-input v-model="form.sjd" placeholder="请输入时间段" />
        </el-form-item>
        <el-form-item label="申报数量" prop="sbsl">
          <el-input v-model="form.sbsl" placeholder="请输入申报数量" />
        </el-form-item>
        <el-form-item label="实际数量" prop="sjsl">
          <el-input v-model="form.sjsl" placeholder="请输入实际数量" />
        </el-form-item>
        <el-form-item label="兑现率" prop="rate">
          <el-input v-model="form.rate" placeholder="请输入兑现率" />
        </el-form-item>
        <el-form-item label="时间点" prop="ts">
          <el-input v-model="form.ts" placeholder="请输入时间点" />
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
import { listJianxiutongji, getJianxiutongji, delJianxiutongji, addJianxiutongji, updateJianxiutongji, exportJianxiutongji } from "@/api/system/jianxiutongji";

export default {
  name: "Jianxiutongji",
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
      // 设备检修统计表格数据
      jianxiutongjiList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 登记单位字典
      djdwOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        djdw: null,
        logtime: null,
        zhou: null,
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
    this.getDicts("lgdept").then(response => {
      this.djdwOptions = response.data;
    });
  },
  methods: {
    /** 查询设备检修统计列表 */
    getList() {
      this.loading = true;
      listJianxiutongji(this.queryParams).then(response => {
        this.jianxiutongjiList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 登记单位字典翻译
    djdwFormat(row, column) {
      return this.selectDictLabel(this.djdwOptions, row.djdw);
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
        djdw: null,
        logtime: null,
        zhou: null,
        sjd: null,
        sbsl: null,
        sjsl: null,
        rate: null,
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
      this.title = "添加设备检修统计";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getJianxiutongji(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改设备检修统计";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateJianxiutongji(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addJianxiutongji(this.form).then(response => {
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
      this.$confirm('是否确认删除设备检修统计编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delJianxiutongji(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有设备检修统计数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportJianxiutongji(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
