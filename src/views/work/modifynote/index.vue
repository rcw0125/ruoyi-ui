<template>
  <div class="app-container">
  

    <el-row :gutter="10" class="mb8">
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
          :disabled="single"
          @click="handleDelete"
        >确认交班</el-button>
      </el-col>

       <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >刷新</el-button>
      </el-col>
   

    </el-row>

    <el-table v-loading="loading" :data="daynoteList" @row-dblclick="dbSelected" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="日期" align="center" prop="logtime" width="180"/>
      <!-- <el-table-column label="岗位" align="center" prop="post" /> -->
      <el-table-column label="记录人" align="center" prop="name" />
      <el-table-column label="班组" align="center" prop="team" />
      <el-table-column label="状态" align="center" prop="status" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180"/>
        <!-- <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {H}-{M}-{s}') }}</span>
        </template> -->
      <!-- </el-table-column>
      <el-table-column label="交班时间" align="center" prop="jiaobanTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.jiaobanTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接班时间" align="center" prop="jiebanTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.jiebanTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
           
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
         
          >确认交班</el-button>
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

    <!-- 添加或修改工作日志对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
       <el-row>
         <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="日期" prop="logtime">
               <el-date-picker
                   v-model="form.logtime"
                   type="date"      
                   value-format="yyyy-MM-dd"     
                   placeholder="选择日期">
              </el-date-picker>       
            </el-form-item>
          </el-col>

         <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
             <el-form-item label="班组">
              <el-select v-model="form.team" placeholder="选择班组">
                <el-option
                  v-for="dict in teamOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictLabel"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <el-button type="primary" @click="submitForm">确 认 修 改</el-button>
          </el-col>

       </el-row>
          

         
         
        <!-- <el-form-item label="单位" prop="dept">
          <el-select v-model="form.dept" placeholder="请选择单位">
            <el-option
              v-for="dict in deptOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位" prop="post">
          <el-input v-model="form.post" placeholder="请输入岗位" />
        </el-form-item>
        <el-form-item label="记录人" prop="name">
          <el-input v-model="form.name" placeholder="请输入记录人" />
        </el-form-item> -->
        <!-- <el-form-item label="内容" prop="note">
          <el-input v-model="form.note" placeholder="请输入内容" />
        </el-form-item> -->
         <tinymce 
         v-if="open"
          @change="change"
          :defaultContent="form.note"
          upload_url="http://dev.lin.colorful3.com/cms/file/"
          />
       
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import { listDaynote, getDaynote, delDaynote, addDaynote, updateDaynote, exportDaynote,samePostList,lockDaynote } from "@/api/system/daynote";
import Tinymce from "@/components/tinymceview";
export default {
  name: "Daynote",
  components: {
     Tinymce,
  },
  data() {
    return {
       text: "this is default content",
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
      // 工作日志表格数据
      daynoteList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 单位字典
      deptOptions: [],
      // 班组字典
      teamOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        logtime: null,
        dept: null,
        post: null,
        name: null,
        note: null,
        team: null,
        status: null,
        createTime: null,
        updateTime: null,
        jiaobanTime: null,
        jiebanTime: null
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
  },
  methods: {
    change(val) {
      //console.log(val)
      this.text=val;
    },
    /** 查询工作日志列表 */
    getList() {
      this.loading = true;
      samePostList().then(response => {
        this.daynoteList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 单位字典翻译
    deptFormat(row, column) {
      return this.selectDictLabel(this.deptOptions, row.dept);
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
        dept: null,
        post: null,
        name: null,
        note: null,
        team: null,
        status: "0",
        createTime: null,
        updateTime: null,
        jiaobanTime: null,
        jiebanTime: null
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
      this.title = "添加工作日志";
    },

     /** 双击---修改按钮操作 */
   dbSelected(row) {
     this.reset();
      const id = row.id || this.ids
      getDaynote(id).then(response => {  
        this.form = response.data;
        this.open = true;
        this.title = "修改工作日志";
      });
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDaynote(id).then(response => {  
        this.form = response.data;
        this.open = true;
        this.title = "修改工作日志";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            this.form.note=this.text;
            updateDaynote(this.form).then(response => {         
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDaynote(this.form).then(response => {
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
      this.$confirm('是否确认工作日志编号为"' + ids + '"的数据项进行交班操作?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return lockDaynote(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("已交班成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有工作日志数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportDaynote(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>