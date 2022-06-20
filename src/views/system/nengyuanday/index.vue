<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="日期" prop="logtime">
        <el-input
          v-model="queryParams.logtime"
          placeholder="请输入日期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产量" prop="tg">
        <el-input
          v-model="queryParams.tg"
          placeholder="请输入产量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="水耗" prop="shuihao">
        <el-input
          v-model="queryParams.shuihao"
          placeholder="请输入水耗"
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
      <el-form-item label="焦炉煤气" prop="jiaolumeiqi">
        <el-input
          v-model="queryParams.jiaolumeiqi"
          placeholder="请输入焦炉煤气"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="转炉煤气" prop="zhuanlumeiqi">
        <el-input
          v-model="queryParams.zhuanlumeiqi"
          placeholder="请输入转炉煤气"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="氮气" prop="danqi">
        <el-input
          v-model="queryParams.danqi"
          placeholder="请输入氮气"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="氧气" prop="yangqi">
        <el-input
          v-model="queryParams.yangqi"
          placeholder="请输入氧气"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="氩气" prop="yaqi">
        <el-input
          v-model="queryParams.yaqi"
          placeholder="请输入氩气"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="蒸汽外供" prop="zhengqiwaigong">
        <el-input
          v-model="queryParams.zhengqiwaigong"
          placeholder="请输入蒸汽外供"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="煤气回收" prop="meiqihuishou">
        <el-input
          v-model="queryParams.meiqihuishou"
          placeholder="请输入煤气回收"
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
          v-hasPermi="['system:nengyuanday:add']"
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
          v-hasPermi="['system:nengyuanday:edit']"
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
          v-hasPermi="['system:nengyuanday:remove']"
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
          v-hasPermi="['system:nengyuanday:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="nengyuandayList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="日期" align="center" prop="logtime" />
      <el-table-column label="产量" align="center" prop="tg" />
      <el-table-column label="水耗" align="center" prop="shuihao" />
      <el-table-column label="电耗" align="center" prop="dianhao" />
      <el-table-column label="焦炉煤气" align="center" prop="jiaolumeiqi" />
      <el-table-column label="转炉煤气" align="center" prop="zhuanlumeiqi" />
      <el-table-column label="氮气" align="center" prop="danqi" />
      <el-table-column label="氧气" align="center" prop="yangqi" />
      <el-table-column label="氩气" align="center" prop="yaqi" />
      <el-table-column label="蒸汽外供" align="center" prop="zhengqiwaigong" />
      <el-table-column label="煤气回收" align="center" prop="meiqihuishou" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:nengyuanday:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:nengyuanday:remove']"
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

    <!-- 添加或修改能源数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="日期" prop="logtime">
          <el-input v-model="form.logtime" placeholder="请输入日期" />
        </el-form-item>
        <el-form-item label="产量" prop="tg">
          <el-input v-model="form.tg" placeholder="请输入产量" />
        </el-form-item>
        <el-form-item label="水耗" prop="shuihao">
          <el-input v-model="form.shuihao" placeholder="请输入水耗" />
        </el-form-item>
        <el-form-item label="电耗" prop="dianhao">
          <el-input v-model="form.dianhao" placeholder="请输入电耗" />
        </el-form-item>
        <el-form-item label="焦炉煤气" prop="jiaolumeiqi">
          <el-input v-model="form.jiaolumeiqi" placeholder="请输入焦炉煤气" />
        </el-form-item>
        <el-form-item label="转炉煤气" prop="zhuanlumeiqi">
          <el-input v-model="form.zhuanlumeiqi" placeholder="请输入转炉煤气" />
        </el-form-item>
        <el-form-item label="氮气" prop="danqi">
          <el-input v-model="form.danqi" placeholder="请输入氮气" />
        </el-form-item>
        <el-form-item label="氧气" prop="yangqi">
          <el-input v-model="form.yangqi" placeholder="请输入氧气" />
        </el-form-item>
        <el-form-item label="氩气" prop="yaqi">
          <el-input v-model="form.yaqi" placeholder="请输入氩气" />
        </el-form-item>
        <el-form-item label="蒸汽外供" prop="zhengqiwaigong">
          <el-input v-model="form.zhengqiwaigong" placeholder="请输入蒸汽外供" />
        </el-form-item>
        <el-form-item label="煤气回收" prop="meiqihuishou">
          <el-input v-model="form.meiqihuishou" placeholder="请输入煤气回收" />
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
import { listNengyuanday, getNengyuanday, delNengyuanday, addNengyuanday, updateNengyuanday, exportNengyuanday } from "@/api/system/nengyuanday";

export default {
  name: "Nengyuanday",
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
      // 能源数据表格数据
      nengyuandayList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        logtime: null,
        tg: null,
        shuihao: null,
        dianhao: null,
        jiaolumeiqi: null,
        zhuanlumeiqi: null,
        danqi: null,
        yangqi: null,
        yaqi: null,
        zhengqiwaigong: null,
        meiqihuishou: null
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
  },
  methods: {
    /** 查询能源数据列表 */
    getList() {
      this.loading = true;
      listNengyuanday(this.queryParams).then(response => {
        this.nengyuandayList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        logtime: null,
        tg: null,
        shuihao: null,
        dianhao: null,
        jiaolumeiqi: null,
        zhuanlumeiqi: null,
        danqi: null,
        yangqi: null,
        yaqi: null,
        zhengqiwaigong: null,
        meiqihuishou: null
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
      this.ids = selection.map(item => item.logtime)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加能源数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const logtime = row.logtime || this.ids
      getNengyuanday(logtime).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改能源数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.logtime != null) {
            updateNengyuanday(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addNengyuanday(this.form).then(response => {
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
      const logtimes = row.logtime || this.ids;
      this.$confirm('是否确认删除能源数据编号为"' + logtimes + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delNengyuanday(logtimes);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有能源数据数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportNengyuanday(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
