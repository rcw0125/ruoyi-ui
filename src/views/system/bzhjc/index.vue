<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="检查人" prop="checkperson">
        <el-input
          v-model="queryParams.checkperson"
          placeholder="请输入检查人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检查单位id" prop="checkdeptid">
        <el-input
          v-model="queryParams.checkdeptid"
          placeholder="请输入检查单位id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检查单位" prop="checkdept">
        <el-input
          v-model="queryParams.checkdept"
          placeholder="请输入检查单位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检查时间" prop="checkdate">
        <el-input
          v-model="queryParams.checkdate"
          placeholder="请输入检查时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="验证结果" prop="confirmresult">
        <el-input
          v-model="queryParams.confirmresult"
          placeholder="请输入验证结果"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="验证时间" prop="confirmdate">
        <el-input
          v-model="queryParams.confirmdate"
          placeholder="请输入验证时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检查属性" prop="checkprop">
        <el-select v-model="queryParams.checkprop" placeholder="请选择检查属性" clearable size="small">
          <el-option
            v-for="dict in checkpropOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="整改时间" prop="checkmoddate">
        <el-input
          v-model="queryParams.checkmoddate"
          placeholder="请输入整改时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="整改单位id" prop="moddeptid">
        <el-select v-model="queryParams.moddeptid" placeholder="请选择整改单位id" clearable size="small">
          <el-option
            v-for="dict in moddeptidOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="整改单位" prop="moddept">
        <el-input
          v-model="queryParams.moddept"
          placeholder="请输入整改单位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="整改完成时间" prop="moddonedate">
        <el-input
          v-model="queryParams.moddonedate"
          placeholder="请输入整改完成时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="原因分析" prop="modreason">
        <el-input
          v-model="queryParams.modreason"
          placeholder="请输入原因分析"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="整改人" prop="modperson">
        <el-input
          v-model="queryParams.modperson"
          placeholder="请输入整改人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-input
          v-model="queryParams.status"
          placeholder="请输入状态"
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
          v-hasPermi="['system:bzhjc:add']"
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
          v-hasPermi="['system:bzhjc:edit']"
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
          v-hasPermi="['system:bzhjc:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:bzhjc:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="bzhjcList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="检查人" align="center" prop="checkperson" />
      <el-table-column label="检查单位id" align="center" prop="checkdeptid" />
      <el-table-column label="检查单位" align="center" prop="checkdept" />
      <el-table-column label="检查时间" align="center" prop="checkdate" />
      <el-table-column label="检查内容" align="center" prop="checkcontent" />
      <el-table-column label="验证结果" align="center" prop="confirmresult" />
      <el-table-column label="验证时间" align="center" prop="confirmdate" />
      <el-table-column label="验证详情" align="center" prop="confirmcontent" />
      <el-table-column label="检查属性" align="center" prop="checkprop" :formatter="checkpropFormat" />
      <el-table-column label="整改时间" align="center" prop="checkmoddate" />
      <el-table-column label="检查图片" align="center" prop="checkpicture" />
      <el-table-column label="整改单位id" align="center" prop="moddeptid" :formatter="moddeptidFormat" />
      <el-table-column label="整改单位" align="center" prop="moddept" />
      <el-table-column label="整改完成时间" align="center" prop="moddonedate" />
      <el-table-column label="整改结果" align="center" prop="modresult" />
      <el-table-column label="原因分析" align="center" prop="modreason" />
      <el-table-column label="整改内容" align="center" prop="modcontent" />
      <el-table-column label="整改人" align="center" prop="modperson" />
      <el-table-column label="整改图片" align="center" prop="modpicture" />
      <el-table-column label="状态" align="center" prop="status" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:bzhjc:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:bzhjc:remove']"
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

    <!-- 添加或修改标准化检查对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="检查人" prop="checkperson">
          <el-input v-model="form.checkperson" placeholder="请输入检查人" />
        </el-form-item>
        <el-form-item label="检查单位id" prop="checkdeptid">
          <el-input v-model="form.checkdeptid" placeholder="请输入检查单位id" />
        </el-form-item>
        <el-form-item label="检查单位" prop="checkdept">
          <el-input v-model="form.checkdept" placeholder="请输入检查单位" />
        </el-form-item>
        <el-form-item label="检查时间" prop="checkdate">
          <el-input v-model="form.checkdate" placeholder="请输入检查时间" />
        </el-form-item>
        <el-form-item label="检查内容">
          <editor v-model="form.checkcontent" :min-height="192"/>
        </el-form-item>
        <el-form-item label="验证结果" prop="confirmresult">
          <el-input v-model="form.confirmresult" placeholder="请输入验证结果" />
        </el-form-item>
        <el-form-item label="验证时间" prop="confirmdate">
          <el-input v-model="form.confirmdate" placeholder="请输入验证时间" />
        </el-form-item>
        <el-form-item label="验证详情" prop="confirmcontent">
          <el-input v-model="form.confirmcontent" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="检查属性" prop="checkprop">
          <el-select v-model="form.checkprop" placeholder="请选择检查属性">
            <el-option
              v-for="dict in checkpropOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="整改时间" prop="checkmoddate">
          <el-input v-model="form.checkmoddate" placeholder="请输入整改时间" />
        </el-form-item>
        <el-form-item label="检查图片">
          <imageUpload v-model="form.checkpicture"/>
        </el-form-item>
        <el-form-item label="整改单位id" prop="moddeptid">
          <el-select v-model="form.moddeptid" placeholder="请选择整改单位id">
            <el-option
              v-for="dict in moddeptidOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="整改单位" prop="moddept">
          <el-input v-model="form.moddept" placeholder="请输入整改单位" />
        </el-form-item>
        <el-form-item label="整改完成时间" prop="moddonedate">
          <el-input v-model="form.moddonedate" placeholder="请输入整改完成时间" />
        </el-form-item>
        <el-form-item label="整改结果" prop="modresult">
          <el-input v-model="form.modresult" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="原因分析" prop="modreason">
          <el-input v-model="form.modreason" placeholder="请输入原因分析" />
        </el-form-item>
        <el-form-item label="整改内容" prop="modcontent">
          <el-input v-model="form.modcontent" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="整改人" prop="modperson">
          <el-input v-model="form.modperson" placeholder="请输入整改人" />
        </el-form-item>
        <el-form-item label="整改图片">
          <imageUpload v-model="form.modpicture"/>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input v-model="form.status" placeholder="请输入状态" />
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
import { listBzhjc, getBzhjc, delBzhjc, addBzhjc, updateBzhjc, exportBzhjc } from "@/api/system/bzhjc";
import ImageUpload from '@/components/ImageUpload';
import Editor from '@/components/Editor';

export default {
  name: "Bzhjc",
  components: {
    ImageUpload,
    Editor,
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
      // 标准化检查表格数据
      bzhjcList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 检查属性字典
      checkpropOptions: [],
      // 整改单位id字典
      moddeptidOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        checkperson: null,
        checkdeptid: null,
        checkdept: null,
        checkdate: null,
        checkcontent: null,
        confirmresult: null,
        confirmdate: null,
        confirmcontent: null,
        checkprop: null,
        checkmoddate: null,
        checkpicture: null,
        moddeptid: null,
        moddept: null,
        moddonedate: null,
        modresult: null,
        modreason: null,
        modcontent: null,
        modperson: null,
        modpicture: null,
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
    this.getDicts("bzhjcshx").then(response => {
      this.checkpropOptions = response.data;
    });
    this.getDicts("bzhjcdept").then(response => {
      this.moddeptidOptions = response.data;
    });
  },
  methods: {
    /** 查询标准化检查列表 */
    getList() {
      this.loading = true;
      listBzhjc(this.queryParams).then(response => {
        this.bzhjcList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 检查属性字典翻译
    checkpropFormat(row, column) {
      return this.selectDictLabel(this.checkpropOptions, row.checkprop);
    },
    // 整改单位id字典翻译
    moddeptidFormat(row, column) {
      return this.selectDictLabel(this.moddeptidOptions, row.moddeptid);
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
        checkperson: null,
        checkdeptid: null,
        checkdept: null,
        checkdate: null,
        checkcontent: null,
        confirmresult: null,
        confirmdate: null,
        confirmcontent: null,
        checkprop: null,
        checkmoddate: null,
        checkpicture: null,
        moddeptid: null,
        moddept: null,
        moddonedate: null,
        modresult: null,
        modreason: null,
        modcontent: null,
        modperson: null,
        modpicture: null,
        status: null
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
      this.title = "添加标准化检查";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getBzhjc(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改标准化检查";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateBzhjc(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBzhjc(this.form).then(response => {
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
      this.$confirm('是否确认删除标准化检查编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delBzhjc(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有标准化检查数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportBzhjc(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
