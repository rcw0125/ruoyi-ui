<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="选择单位" prop="dept">
        <el-select v-model="queryParams.dept" @change="handleQuery" placeholder="请输入单位">
                <el-option
                  v-for="item in deptOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                > </el-option> 
              </el-select> 
      </el-form-item>
      <el-form-item label="岗位" prop="code">
         <el-select v-model="queryParams.code" placeholder="请选择岗位"  @change="handleQuery" clearable size="small">
          <el-option
            v-for="dict in postOptions"
            :key="dict.postCode"
            :label="dict.postName"
            :value="dict.postName"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">刷新</el-button>
        <!-- <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button> -->
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
          v-hasPermi="['system:daynotecfg:add']"
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
          v-hasPermi="['system:daynotecfg:edit']"
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
          v-hasPermi="['system:daynotecfg:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:daynotecfg:export']"
        >导出</el-button>
      </el-col>
       <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdateCfg"
          v-hasPermi="['system:daynotecfg:edit']"
        >修改模板</el-button>
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="daynotecfgList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="单位" align="center" prop="dept" />
      <el-table-column label="岗位" align="center" prop="code" />
      <el-table-column label="是否白班" align="center" prop="baiban" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdateCfg(scope.row)"
            
          >修改模板</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:daynotecfg:remove']"
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

    <!-- 添加或修改工作日志模板对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

      <el-form-item label="单位" prop="dept">
        <el-select v-model="form.dept" placeholder="请选择单位">
                <el-option
                  v-for="item in deptOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                > </el-option> 
              </el-select> 
      </el-form-item>
        <el-form-item label="岗位" prop="code">
          <el-select v-model="form.code" placeholder="请选择岗位"  clearable size="small">
          <el-option
            v-for="dict in postOptions"
            :key="dict.postCode"
            :label="dict.postName"
            :value="dict.postName"
          />
        </el-select>
        </el-form-item>
        <el-form-item label="是否白班" prop="baiban">      
           <el-select v-model="form.baiban" placeholder="请选择是否"  clearable size="small">
          <el-option
            v-for="dict in baibanOptions"
            :key="dict.value"
            :label="dict.value"
            :value="dict.value"
          />
        </el-select>
        </el-form-item>
        <!-- <el-form-item label="模板"  v-html="form.note">
          
 
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
import { listDaynotecfg,listMyDaynotecfg, getDaynotecfg, delDaynotecfg, addDaynotecfg, updateDaynotecfg, exportDaynotecfg,getPostInfo } from "@/api/system/daynotecfg";
import Editor from '@/components/Editor';

export default {
  name: "Daynotecfg",
  components: {
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
      // 工作日志模板表格数据
      daynotecfgList: [],
      //岗位选择框
      postOptions: [],
      
       deptOptions: [{
           value: '冶炼车间',
          label: '冶炼车间'
        }, {
             value: '精炼车间',
          label: '精炼车间'
        }, {
             value: '连铸车间',
          label: '连铸车间'
        }, {
             value: '脱硫车间',
          label: '脱硫车间'
        }, {
             value: '冶炼维修车间',
          label: '冶炼维修车间'
        }, {
             value: '连铸维修车间',
          label: '连铸维修车间'
        }, {
             value: '运行车间',
          label: '运行车间'
        }, {
          value: '生产科',
          label: '生产科'
        }, {
          value: '安全科',
          label: '安全科'
        }, {
          value: '精益生产办公室',
          label: '精益生产办公室'
        }, {
          value: '质量技术科',
          label: '质量技术科'
        }, {
          value: '设备科',
          label: '设备科'
        }],

      baibanOptions:  [{
          value: '否',
          label: '否'
        }, {
          value: '是',
          label: '是'
        }], 
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        code: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getPost();
    this.getList();
  },
  methods: {
    /** 查询工作日志模板列表 */
    getList() {
      this.loading = true;
      listMyDaynotecfg(this.queryParams).then(response => {
        this.daynotecfgList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

   //查询所有岗位
    getPost() {    
      getPostInfo().then(response => {
         this.postOptions=response.post;
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
        id: null,
        code: null,
        baiban: null,
        note: null,
        createTime: null,
        updateTime: null
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
      this.title = "添加工作日志模板";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDaynotecfg(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改工作日志";
      });
    },

    /** 修改模板按钮操作 */
    handleUpdateCfg(row) {
      this.reset();
      const id = row.id || this.ids
      this.$router.push("/daynotecfg/type/data/" + id);
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDaynotecfg(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDaynotecfg(this.form).then(response => {
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
      this.$confirm('是否确认删除工作日志模板编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDaynotecfg(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有工作日志模板数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportDaynotecfg(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>