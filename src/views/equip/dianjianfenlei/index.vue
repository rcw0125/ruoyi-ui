<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="月份" prop="logtime">
        <el-date-picker clearable size="small"
          v-model="queryParams.logtime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择月份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="点检类别" prop="djfl">
        <el-select v-model="queryParams.djfl" placeholder="请选择点检类别" clearable size="small">
          <el-option
            v-for="dict in djflOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
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
          v-hasPermi="['system:dianjianfenlei:add']"
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
          v-hasPermi="['system:dianjianfenlei:edit']"
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
          v-hasPermi="['system:dianjianfenlei:remove']"
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
          v-hasPermi="['system:dianjianfenlei:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="dianjianfenleiList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="月份" align="center" prop="logtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.logtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="点检类别" align="center" prop="djfl"  />
      <el-table-column label="点检数量" align="center" prop="djsl" />
      <el-table-column label="问题数量" align="center" prop="wtsl" />
      <el-table-column label="周" align="center" prop="zhou" />
      <el-table-column label="时间段" align="center" prop="sjd" />
      <el-table-column label="时间点" align="center" prop="ts" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:dianjianfenlei:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dianjianfenlei:remove']"
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

    <!-- 添加或修改点检分类统计对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="月份" prop="logtime">
          <el-date-picker clearable size="small"
            v-model="form.logtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择月份">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="点检类别" prop="djfl">
          <el-select v-model="form.djfl" placeholder="请选择点检类别">
            <el-option
              v-for="dict in djflOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="点检数量" prop="djsl">
          <el-input v-model="form.djsl" placeholder="请输入点检数量" />
        </el-form-item>
        <el-form-item label="问题数量" prop="wtsl">
          <el-input v-model="form.wtsl" placeholder="请输入问题数量" />
        </el-form-item>
        <el-form-item label="周" prop="zhou">
          <el-input v-model="form.zhou" placeholder="请输入周" />
        </el-form-item>
        <el-form-item label="时间段" prop="sjd">
          <el-input v-model="form.sjd" placeholder="请输入时间段" />
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
import { listDianjianfenlei, getDianjianfenlei, delDianjianfenlei, addDianjianfenlei, updateDianjianfenlei, exportDianjianfenlei } from "@/api/system/dianjianfenlei";

export default {
  name: "Dianjianfenlei",
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
      // 点检分类统计表格数据
      dianjianfenleiList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 点检类别字典
      djflOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        logtime: null,
        djfl: null,
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
    this.getDicts("dianjianleibie").then(response => {
      this.djflOptions = response.data;
    });
  },
  methods: {
    /** 查询点检分类统计列表 */
    getList() {
      this.loading = true;
      listDianjianfenlei(this.queryParams).then(response => {
        this.dianjianfenleiList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 点检类别字典翻译
    djflFormat(row, column) {
      return this.selectDictLabel(this.djflOptions, row.djfl);
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
        logtime: null,
        djfl: null,
        djsl: null,
        wtsl: null,
        zhou: null,
        sjd: null,
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
      this.title = "添加点检分类统计";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDianjianfenlei(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改点检分类统计";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDianjianfenlei(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDianjianfenlei(this.form).then(response => {
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
      this.$confirm('是否确认删除点检分类统计编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDianjianfenlei(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有点检分类统计数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportDianjianfenlei(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
