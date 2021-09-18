<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="IP地址" prop="ip">
        <el-input
          v-model="queryParams.ip"
          placeholder="请输入IP"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="部门" prop="dept">
        <el-select v-model="queryParams.dept" placeholder="请选择部门" clearable size="small">
          <el-option
            v-for="dict in deptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="安装位置" prop="weizhi">
        <el-input
          v-model="queryParams.weizhi"
          placeholder="请输入安装位置"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="负责人" prop="fzr">
        <el-input
          v-model="queryParams.fzr"
          placeholder="请输入负责人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="厂家" prop="changjia">
        <el-input
          v-model="queryParams.changjia"
          placeholder="请输入厂家"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="型号" prop="xinghao">
        <el-input
          v-model="queryParams.xinghao"
          placeholder="请输入型号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备注" prop="beizhu">
        <el-input
          v-model="queryParams.beizhu"
          placeholder="请输入备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="是否在用" prop="shifouzaiyong">
        <el-input
          v-model="queryParams.shifouzaiyong"
          placeholder="请输入是否在用"
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
          v-hasPermi="['system:ipguanli:add']"
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
          v-hasPermi="['system:ipguanli:edit']"
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
          v-hasPermi="['system:ipguanli:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:ipguanli:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="ipguanliList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="IP地址" align="center" prop="ip" />
      <el-table-column label="部门" align="center" prop="dept" />
      <el-table-column label="安装位置" align="center" prop="weizhi" />
      <el-table-column label="负责人" align="center" prop="fzr" />
      <el-table-column label="厂家" align="center" prop="changjia" />
      <el-table-column label="型号" align="center" prop="xinghao" />
      <el-table-column label="备注" align="center" prop="beizhu" />
       <!-- <el-table-column label="是否在用" align="center" prop="shifouzaiyong" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:ipguanli:edit']"
          >修改</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:ipguanli:remove']"
          >删除</el-button> -->
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

    <!-- 添加或修改IP管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="IP" prop="ip">
          <el-input v-model="form.ip" placeholder="请输入IP" />
        </el-form-item>
        <el-form-item label="部门" prop="dept">
          <el-select v-model="form.dept" placeholder="请选择部门">
            <el-option
              v-for="dict in deptOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="安装位置" prop="weizhi">
          <el-input v-model="form.weizhi" placeholder="请输入安装位置" />
        </el-form-item>
        <el-form-item label="负责人" prop="fzr">
          <el-input v-model="form.fzr" placeholder="请输入负责人" />
        </el-form-item>
        <el-form-item label="厂家" prop="changjia">
          <el-input v-model="form.changjia" placeholder="请输入厂家" />
        </el-form-item>
        <el-form-item label="型号" prop="xinghao">
          <el-input v-model="form.xinghao" placeholder="请输入型号" />
        </el-form-item>
        <el-form-item label="备注" prop="beizhu">
          <el-input v-model="form.beizhu" placeholder="请输入备注" />
        </el-form-item>
        <!-- <el-form-item label="是否在用" prop="shifouzaiyong">
          <el-input v-model="form.shifouzaiyong" placeholder="请输入是否在用" />
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
import { listIpguanli, getIpguanli, delIpguanli, addIpguanli, updateIpguanli, exportIpguanli } from "@/api/system/ipguanli";

export default {
  name: "Ipguanli",
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
      // IP管理表格数据
      ipguanliList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 部门字典
      deptOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        ip: null,
        dept: null,
        weizhi: null,
        fzr: null,
        changjia: null,
        xinghao: null,
        beizhu: null,
        shifouzaiyong: null
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
      this.deptOptions = response.data;
    });
  },
  methods: {
    /** 查询IP管理列表 */
    getList() {
      this.loading = true;
      listIpguanli(this.queryParams).then(response => {
        this.ipguanliList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 部门字典翻译
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
        ip: null,
        dept: null,
        weizhi: null,
        fzr: null,
        changjia: null,
        xinghao: null,
        beizhu: null,
        shifouzaiyong: null
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
      this.title = "添加IP管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getIpguanli(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改IP管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateIpguanli(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addIpguanli(this.form).then(response => {
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
      this.$confirm('是否确认删除IP管理编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delIpguanli(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有IP管理数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportIpguanli(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
