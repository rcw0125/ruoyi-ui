<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="设备id" prop="sbid">
        <el-input
          v-model="queryParams.sbid"
          placeholder="请输入设备id"
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
      <!-- <el-form-item label="标准id" prop="bzhid">
        <el-input
          v-model="queryParams.bzhid"
          placeholder="请输入标准id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="点检单位" prop="dept">
        <el-select v-model="queryParams.dept" placeholder="请选择点检单位" clearable size="small">
          <el-option
            v-for="dict in deptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="点检班组" prop="team">
        <el-select v-model="queryParams.team" placeholder="请选择点检班组" clearable size="small">
          <el-option
            v-for="dict in teamOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="点检类别" prop="leibie">
        <el-select v-model="queryParams.leibie" placeholder="请选择点检类别" clearable size="small">
          <el-option
            v-for="dict in leibieOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="点检周期" prop="zhouqi">
        <el-select v-model="queryParams.zhouqi" placeholder="请选择点检周期" clearable size="small">
          <el-option
            v-for="dict in zhouqiOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="标准备注" prop="bzhnote">
        <el-input
          v-model="queryParams.bzhnote"
          placeholder="请输入标准备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="周应点检次数" prop="zhoucishu">
        <el-input
          v-model="queryParams.zhoucishu"
          placeholder="请输入周应点检次数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="点检人" prop="djr">
        <el-input
          v-model="queryParams.djr"
          placeholder="请输入点检人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="点检结果" prop="djresult">
        <el-select v-model="queryParams.djresult" placeholder="请选择点检结果" clearable size="small">
          <el-option
            v-for="dict in djresultOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="点检时刻" prop="djtime">
        <el-date-picker clearable size="small"
          v-model="queryParams.djtime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择点检时刻">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input
          v-model="queryParams.note"
          placeholder="请输入备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否可以点检" prop="flag">
        <el-input
          v-model="queryParams.flag"
          placeholder="请输入是否可以点检"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="点检日期" prop="djrq">
        <el-date-picker clearable size="small"
          v-model="queryParams.djrq"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择点检日期">
        </el-date-picker>
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
          v-hasPermi="['system:dianjianlist:add']"
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
          v-hasPermi="['system:dianjianlist:edit']"
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
          v-hasPermi="['system:dianjianlist:remove']"
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
          v-hasPermi="['system:dianjianlist:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="dianjianlistList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="设备id" align="center" prop="sbid" />
      <el-table-column label="设备名称" align="center" prop="sbname" width="200px" />
      <!-- <el-table-column label="标准id" align="center" prop="bzhid" /> -->
      <!-- <el-table-column label="标准内容" align="center" prop="biaozhun" /> -->
      <el-table-column label="点检单位" align="center" prop="dept" />
      <el-table-column label="点检班组" align="center" prop="team"  />
      
      <!-- <el-table-column label="标准备注" align="center" prop="bzhnote" /> -->
      <!-- <el-table-column label="周应点检次数" align="center" prop="zhoucishu" /> -->
      <el-table-column label="点检人" align="center" prop="djr" />
      <el-table-column label="点检结果" align="center" prop="djresult" >
       <template slot-scope="scope">
         <el-tag
          v-show="scope.row.djresult=='异常'"
          type='danger'
          >{{ scope.row.djresult }}</el-tag>
          <el-tag
          v-show="scope.row.djresult=='正常'"
          type='primary'
          >{{ scope.row.djresult }}</el-tag>
      </template> 
      </el-table-column>
      <el-table-column label="点检内容" align="center" prop="djcontent" />
      <el-table-column label="点检时刻" align="center" prop="djtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.djtime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="点检类别" align="center" prop="leibie"  />
      <el-table-column label="点检周期" align="center" prop="zhouqi"  />
      <!-- <el-table-column label="备注" align="center" prop="note" />
      <el-table-column label="是否可以点检" align="center" prop="flag" />
      <el-table-column label="点检日期" align="center" prop="djrq" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.djrq, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:dianjianlist:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dianjianlist:remove']"
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

    <!-- 添加或修改点检记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="设备id" prop="sbid">
          <el-input v-model="form.sbid" placeholder="请输入设备id" />
        </el-form-item>
        <el-form-item label="设备名称" prop="sbname">
          <el-input v-model="form.sbname" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="标准id" prop="bzhid">
          <el-input v-model="form.bzhid" placeholder="请输入标准id" />
        </el-form-item>
        <el-form-item label="标准内容" prop="biaozhun">
          <el-input v-model="form.biaozhun" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="点检单位" prop="dept">
          <el-select v-model="form.dept" placeholder="请选择点检单位">
            <el-option
              v-for="dict in deptOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="点检班组" prop="team">
          <el-select v-model="form.team" placeholder="请选择点检班组">
            <el-option
              v-for="dict in teamOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="点检类别" prop="leibie">
          <el-select v-model="form.leibie" placeholder="请选择点检类别">
            <el-option
              v-for="dict in leibieOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="点检周期" prop="zhouqi">
          <el-select v-model="form.zhouqi" placeholder="请选择点检周期">
            <el-option
              v-for="dict in zhouqiOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标准备注" prop="bzhnote">
          <el-input v-model="form.bzhnote" placeholder="请输入标准备注" />
        </el-form-item>
        <el-form-item label="周应点检次数" prop="zhoucishu">
          <el-input v-model="form.zhoucishu" placeholder="请输入周应点检次数" />
        </el-form-item>
        <el-form-item label="点检人" prop="djr">
          <el-input v-model="form.djr" placeholder="请输入点检人" />
        </el-form-item>
        <el-form-item label="点检结果" prop="djresult">
          <el-select v-model="form.djresult" placeholder="请选择点检结果">
            <el-option
              v-for="dict in djresultOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="点检内容">
          <editor v-model="form.djcontent" :min-height="192"/>
        </el-form-item>
        <el-form-item label="点检时刻" prop="djtime">
          <el-date-picker clearable size="small"
            v-model="form.djtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择点检时刻">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="form.note" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="是否可以点检" prop="flag">
          <el-input v-model="form.flag" placeholder="请输入是否可以点检" />
        </el-form-item>
        <el-form-item label="点检日期" prop="djrq">
          <el-date-picker clearable size="small"
            v-model="form.djrq"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择点检日期">
          </el-date-picker>
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
import { listDianjianlist, getDianjianlist, delDianjianlist, addDianjianlist, updateDianjianlist, exportDianjianlist } from "@/api/system/dianjianlist";

export default {
  name: "Dianjianlist",
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
      // 点检记录表格数据
      dianjianlistList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 点检单位字典
      deptOptions: [],
      // 点检班组字典
      teamOptions: [],
      // 点检类别字典
      leibieOptions: [],
      // 点检周期字典
      zhouqiOptions: [],
      // 点检结果字典
      djresultOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sbid: null,
        sbname: null,
        bzhid: null,
        biaozhun: null,
        dept: null,
        team: null,
        leibie: null,
        zhouqi: null,
        bzhnote: null,
        zhoucishu: null,
        djr: null,
        djresult: null,
        djcontent: null,
        djtime: null,
        note: null,
        flag: null,
        djrq: null
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
    this.getDicts("sys_user_team").then(response => {
      this.teamOptions = response.data;
    });
    this.getDicts("dianjianleibie").then(response => {
      this.leibieOptions = response.data;
    });
    this.getDicts("dianjianzhouqi").then(response => {
      this.zhouqiOptions = response.data;
    });
    this.getDicts("dianjianjieguo").then(response => {
      this.djresultOptions = response.data;
    });
  },
  methods: {
    /** 查询点检记录列表 */
    getList() {
      this.loading = true;
      listDianjianlist(this.queryParams).then(response => {
        this.dianjianlistList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 点检单位字典翻译
    deptFormat(row, column) {
      return this.selectDictLabel(this.deptOptions, row.dept);
    },
    // 点检班组字典翻译
    teamFormat(row, column) {
      return this.selectDictLabel(this.teamOptions, row.team);
    },
    // 点检类别字典翻译
    leibieFormat(row, column) {
      return this.selectDictLabel(this.leibieOptions, row.leibie);
    },
    // 点检周期字典翻译
    zhouqiFormat(row, column) {
      return this.selectDictLabel(this.zhouqiOptions, row.zhouqi);
    },
    // 点检结果字典翻译
    djresultFormat(row, column) {
      return this.selectDictLabel(this.djresultOptions, row.djresult);
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
        bzhid: null,
        biaozhun: null,
        dept: null,
        team: null,
        leibie: null,
        zhouqi: null,
        bzhnote: null,
        zhoucishu: null,
        djr: null,
        djresult: null,
        djcontent: null,
        djtime: null,
        note: null,
        flag: null,
        djrq: null
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
      this.title = "添加点检记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDianjianlist(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改点检记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDianjianlist(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDianjianlist(this.form).then(response => {
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
      this.$confirm('是否确认删除点检记录编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDianjianlist(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有点检记录数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportDianjianlist(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>