<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">

     <el-form-item label="选择日期" >
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

      <!-- <el-form-item label="日期" prop="logtime">
        <el-date-picker clearable size="small"
          v-model="queryParams.logtime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label="单位" prop="dept">
        <el-select v-model="queryParams.dept" placeholder="请选择单位" @change="handleQuery" clearable size="small">
          <el-option
            v-for="dict in deptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="电量" prop="dianliang">
        <el-input
          v-model="queryParams.dianliang"
          placeholder="请输入电量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产量" prop="chanliang">
        <el-input
          v-model="queryParams.chanliang"
          placeholder="请输入产量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电耗" prop="dianhao">
        <el-input
          v-model="queryParams.dianhao"
          placeholder="请输入电耗"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标准电耗" prop="biaozhun">
        <el-input
          v-model="queryParams.biaozhun"
          placeholder="请输入标准电耗"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="差值" prop="chazhi">
        <el-input
          v-model="queryParams.chazhi"
          placeholder="请输入差值"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
         
        >导出</el-button>
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
          v-hasPermi="['system:dianliangday:add']"
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
          v-hasPermi="['system:dianliangday:edit']"
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
          v-hasPermi="['system:dianliangday:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="dianliangdayList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="日期" align="center" prop="logtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.logtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位" align="center" prop="dept" />
      <el-table-column label="电量" align="center" prop="dianliang" />
      <el-table-column label="产量" align="center" prop="chanliang" />
      <el-table-column label="电耗" align="center" prop="dianhao" />
      <el-table-column label="标准电耗" align="center" prop="biaozhun" />
      <el-table-column label="差值" align="center" prop="chazhi" >
      <template slot-scope="scope">
         
          <el-tag :type="scope.row.chazhi <0 ? 'success' : 'danger'">{{scope.row.chazhi}}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:dianliangday:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dianliangday:remove']"
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

    <!-- 添加或修改每日电量对话框 -->
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
        <el-form-item label="单位" prop="dept">
          <el-select v-model="form.dept" placeholder="请选择单位">
            <el-option
              v-for="dict in deptOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电量" prop="dianliang">
          <el-input v-model="form.dianliang" placeholder="请输入电量" />
        </el-form-item>
        <el-form-item label="产量" prop="chanliang">
          <el-input v-model="form.chanliang" placeholder="请输入产量" />
        </el-form-item>
        <el-form-item label="电耗" prop="dianhao">
          <el-input v-model="form.dianhao" placeholder="请输入电耗" />
        </el-form-item>
        <el-form-item label="标准电耗" prop="biaozhun">
          <el-input v-model="form.biaozhun" placeholder="请输入标准电耗" />
        </el-form-item>
        <el-form-item label="差值" prop="chazhi">
          <el-input v-model="form.chazhi" placeholder="请输入差值" />
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
import { listDianliangday, getDianliangday, delDianliangday, addDianliangday, updateDianliangday, exportDianliangday } from "@/api/system/dianliangday";

export default {
  name: "Dianliangday",
  data() {
    return {
      // 日期范围
      dateRange: [],
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
      // 每日电量表格数据
      dianliangdayList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 单位字典
      deptOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        logtime: null,
        dept: null,
        dianliang: null,
        chanliang: null,
        dianhao: null,
        biaozhun: null,
        chazhi: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    var curday = new Date();
      var lastday = new Date(curday.getTime()-1*24*60*60*1000) ;//得到昨天日期
      //Date.now-24*60*60*1000
       var year = lastday.getFullYear(); //得到年份
       var month = lastday.getMonth(); //得到月份
       var date = lastday.getDate(); //得到日期
       month = month + 1;
       month = month.toString().padStart(2, "0");
       date = date.toString().padStart(2, "0");
       var defaultDate = `${year}-${month}-${date}`;
       //this.$set(this.queryParams, "logtime", defaultDate);
       this.dateRange.push(defaultDate);
       this.dateRange.push(defaultDate);
    this.getList();
    this.getDicts("dianliangdept").then(response => {
      this.deptOptions = response.data;
    });
     


  },
  methods: {
    /** 查询每日电量列表 */
    getList() {
      this.loading = true;
      // console.log(this.dateRange);
      listDianliangday(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.dianliangdayList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 单位字典翻译
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
        logtime: null,
        dept: null,
        dianliang: null,
        chanliang: null,
        dianhao: null,
        biaozhun: null,
        chazhi: null
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
      this.title = "添加每日电量";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDianliangday(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改每日电量";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDianliangday(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDianliangday(this.form).then(response => {
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
      this.$confirm('是否确认删除每日电量编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDianliangday(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有每日电量数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportDianliangday(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
