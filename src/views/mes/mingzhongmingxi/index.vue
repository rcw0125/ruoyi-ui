<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="日期" prop="logtime">
        <el-date-picker clearable size="small"
          v-model="queryParams.logtime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="炉号" prop="heatid">
        <el-input
          v-model="queryParams.heatid"
          placeholder="请输入炉号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="精炼" prop="lfid">
        <el-select v-model="queryParams.lfid" placeholder="请选择精炼" clearable size="small">
          <el-option
            v-for="dict in lfidOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="班组" prop="team">
        <el-select v-model="queryParams.team" placeholder="请选择班组" clearable size="small">
          <el-option
            v-for="dict in teamOptions"
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
         
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="mingzhongmingxiList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="日期" align="center" prop="logtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.logtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="炉号" align="center" prop="heatid" />
      <el-table-column label="精炼" align="center" prop="lfid" :formatter="lfidFormat" />
      <el-table-column label="班组" align="center" prop="team" :formatter="teamFormat" />
      <el-table-column label="Si" align="center" prop="si" />
      <el-table-column label="Mn" align="center" prop="mn" />
      <el-table-column label="Cr" align="center" prop="cr" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['mingzhongmingxi:mingzhongmingxi:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['mingzhongmingxi:mingzhongmingxi:remove']"
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

    <!-- 添加或修改成分命中明细对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="日期" prop="logtime">
          <el-date-picker clearable size="small"
            v-model="form.logtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="炉号" prop="heatid">
          <el-input v-model="form.heatid" placeholder="请输入炉号" />
        </el-form-item>
        <el-form-item label="精炼" prop="lfid">
          <el-select v-model="form.lfid" placeholder="请选择精炼">
            <el-option
              v-for="dict in lfidOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班组" prop="team">
          <el-select v-model="form.team" placeholder="请选择班组">
            <el-option
              v-for="dict in teamOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Si" prop="si">
          <el-input v-model="form.si" placeholder="请输入Si" />
        </el-form-item>
        <el-form-item label="Mn" prop="mn">
          <el-input v-model="form.mn" placeholder="请输入Mn" />
        </el-form-item>
        <el-form-item label="Cr" prop="cr">
          <el-input v-model="form.cr" placeholder="请输入Cr" />
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
import { listMingzhongmingxi, getMingzhongmingxi, delMingzhongmingxi, addMingzhongmingxi, updateMingzhongmingxi, exportMingzhongmingxi } from "@/api/system/mingzhongmingxi";

export default {
  name: "Mingzhongmingxi",
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
      // 成分命中明细表格数据
      mingzhongmingxiList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 精炼字典
      lfidOptions: [],
      // 班组字典
      teamOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        logtime: null,
        heatid: null,
        lfid: null,
        team: null,
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
    this.getDicts("lfid").then(response => {
      this.lfidOptions = response.data;
    });
    this.getDicts("sys_user_team").then(response => {
      this.teamOptions = response.data;
    });
  },
  methods: {
    /** 查询成分命中明细列表 */
    getList() {
      this.loading = true;
      listMingzhongmingxi(this.queryParams).then(response => {
        this.mingzhongmingxiList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 精炼字典翻译
    lfidFormat(row, column) {
      return this.selectDictLabel(this.lfidOptions, row.lfid);
    },
    // 班组字典翻译
    teamFormat(row, column) {
      return this.selectDictLabel(this.teamOptions, row.team);
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
        heatid: null,
        lfid: null,
        team: null,
        si: null,
        mn: null,
        cr: null
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
      this.title = "添加成分命中明细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMingzhongmingxi(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改成分命中明细";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMingzhongmingxi(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMingzhongmingxi(this.form).then(response => {
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
      this.$confirm('是否确认删除成分命中明细编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delMingzhongmingxi(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有成分命中明细数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportMingzhongmingxi(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
