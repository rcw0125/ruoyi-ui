<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="断路器编号" prop="bianhao">
        <el-input
          v-model="queryParams.bianhao"
          placeholder="请输入断路器编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="倍率" prop="beilv">
        <el-input
          v-model="queryParams.beilv"
          placeholder="请输入倍率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类别" prop="leibie">
        <el-select v-model="queryParams.leibie" placeholder="请选择类别" clearable size="small">
          <el-option
            v-for="dict in leibieOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="车间" prop="dept">
        <el-select v-model="queryParams.dept" placeholder="请选择车间"  @change="handleQuery" clearable size="small">
          <el-option
            v-for="dict in deptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="值" prop="val">
        <el-input
          v-model="queryParams.val"
          placeholder="请输入值"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="数据来源" prop="laiyuan">
        <el-select v-model="queryParams.laiyuan" placeholder="请选择数据来源" clearable size="small">
          <el-option
            v-for="dict in laiyuanOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="排序" prop="ordernum">
        <el-input
          v-model="queryParams.ordernum"
          placeholder="请输入排序"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input
          v-model="queryParams.note"
          placeholder="请输入备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
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
          v-hasPermi="['system:dianliangcfg:add']"
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
          v-hasPermi="['system:dianliangcfg:edit']"
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
          v-hasPermi="['system:dianliangcfg:remove']"
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
          v-hasPermi="['system:dianliangcfg:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="dianliangcfgList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="断路器编号" align="center" prop="bianhao" />
      <el-table-column label="倍率" align="center" prop="beilv" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="类别" align="center" prop="leibie"  />
      <el-table-column label="车间" align="center" prop="dept"  />
      <el-table-column label="值" align="center" prop="val" />
      <el-table-column label="数据来源" align="center" prop="laiyuan"  />
      <el-table-column label="排序" align="center" prop="ordernum" />
      <el-table-column label="备注" align="center" prop="note" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:dianliangcfg:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dianliangcfg:remove']"
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

    <!-- 添加或修改电量配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="断路器编号" prop="bianhao">
          <el-input v-model="form.bianhao" placeholder="请输入断路器编号" />
        </el-form-item>
        <el-form-item label="倍率" prop="beilv">
          <el-input v-model="form.beilv" placeholder="请输入倍率" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="类别" prop="leibie">
          <el-select v-model="form.leibie" placeholder="请选择类别">
            <el-option
              v-for="dict in leibieOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车间" prop="dept">
          <el-select v-model="form.dept" placeholder="请选择车间">
            <el-option
              v-for="dict in deptOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="值" prop="val">
          <el-input v-model="form.val" placeholder="请输入值" />
        </el-form-item>
        <el-form-item label="数据来源" prop="laiyuan">
          <el-select v-model="form.laiyuan" placeholder="请选择数据来源">
            <el-option
              v-for="dict in laiyuanOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="ordernum">
          <el-input v-model="form.ordernum" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="form.note" placeholder="请输入备注" />
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
import { listDianliangcfg, getDianliangcfg, delDianliangcfg, addDianliangcfg, updateDianliangcfg, exportDianliangcfg } from "@/api/system/dianliangcfg";

export default {
  name: "Dianliangcfg",
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
      // 电量配置表格数据
      dianliangcfgList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 类别字典
      leibieOptions: [],
      // 车间字典
      deptOptions: [],
      // 数据来源字典
      laiyuanOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        bianhao: null,
        beilv: null,
        name: null,
        leibie: null,
        dept: null,
        val: null,
        laiyuan: null,
        ordernum: null,
        note: null
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
    this.getDicts("jiezhileixing").then(response => {
      this.leibieOptions = response.data;
    });
    this.getDicts("dianliangdept").then(response => {
      this.deptOptions = response.data;
    });
    this.getDicts("datafrom").then(response => {
      this.laiyuanOptions = response.data;
    });
  },
  methods: {
    /** 查询电量配置列表 */
    getList() {
      this.loading = true;
      listDianliangcfg(this.queryParams).then(response => {
        this.dianliangcfgList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 类别字典翻译
    leibieFormat(row, column) {
      return this.selectDictLabel(this.leibieOptions, row.leibie);
    },
    // 车间字典翻译
    deptFormat(row, column) {
      return this.selectDictLabel(this.deptOptions, row.dept);
    },
    // 数据来源字典翻译
    laiyuanFormat(row, column) {
      return this.selectDictLabel(this.laiyuanOptions, row.laiyuan);
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
        bianhao: null,
        beilv: null,
        name: null,
        leibie: null,
        dept: null,
        val: null,
        laiyuan: null,
        ordernum: null,
        note: null
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
      this.title = "添加电量配置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDianliangcfg(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改电量配置";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDianliangcfg(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDianliangcfg(this.form).then(response => {
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
      this.$confirm('是否确认删除电量配置编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDianliangcfg(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有电量配置数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportDianliangcfg(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>