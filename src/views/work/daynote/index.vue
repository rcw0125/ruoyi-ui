<template>
  <div class="app-container">
      <el-menu :default-active="activeIndex" class="el-menu-demo" @select="handleSelect" mode="horizontal" background-color="#7ABC9A"  text-color="#fff"
  active-text-color="#ffd04b" >

  <el-submenu index="1">
    <template slot="title" > <i class="el-icon-location"></i>生产技术科</template>
    <el-menu-item index="值班厂长">值班厂长</el-menu-item>
    <el-menu-item index="调度">调度</el-menu-item>
  </el-submenu>

   <el-submenu index="2">
    <template slot="title"><i class="el-icon-s-home"></i>冶炼车间</template>
    <el-menu-item index="转炉作业长">转炉作业长</el-menu-item>   
    <el-menu-item index="2#转炉炉长">2#转炉炉长</el-menu-item>
    <el-menu-item index="3#转炉炉长">3#转炉炉长</el-menu-item>
    <el-menu-item index="4#转炉炉长">4#转炉炉长</el-menu-item>
    <el-menu-item index="炉下渣跨">炉下渣跨</el-menu-item>
    <el-menu-item index="皮带上料">皮带上料</el-menu-item>
    <el-menu-item index="废钢场">废钢场</el-menu-item>
  </el-submenu>
   
   <el-submenu index="3">
    <template slot="title"><i class="el-icon-c-scale-to-original"></i>精炼车间</template>
    <el-menu-item index="1#精炼炉长">1#精炼炉长</el-menu-item>
    <el-menu-item index="2#精炼炉长">2#精炼炉长</el-menu-item>
    <el-menu-item index="3#精炼炉长">3#精炼炉长</el-menu-item>
    <el-menu-item index="RH精炼炉长">RH精炼炉长</el-menu-item>
    <el-menu-item index="4#精炼炉长">4#精炼炉长</el-menu-item>
    <el-menu-item index="5#精炼炉长">5#精炼炉长</el-menu-item> 
  </el-submenu>
  
   <el-submenu index="4">
    <template slot="title"><i class="el-icon-setting"></i>连铸车间</template>
    <el-menu-item index="3#连铸机长">3#连铸机长</el-menu-item>
    <el-menu-item index="4#连铸机长">4#连铸机长</el-menu-item>
    <el-menu-item index="5#连铸机长">5#连铸机长</el-menu-item>
    <el-menu-item index="连铸作业长">连铸作业长</el-menu-item>
    <el-menu-item index="6#连铸机长">6#连铸机长</el-menu-item>
  </el-submenu>
   <el-submenu index="5">
    <template slot="title"><i class="el-icon-document"></i>脱硫车间</template>
    <el-menu-item index="混铁炉">混铁炉</el-menu-item>
    <el-menu-item index="铁水脱硫">铁水脱硫</el-menu-item>
    <el-menu-item index="合金准备">合金准备</el-menu-item>
    <el-menu-item index="上件">上件</el-menu-item>
  </el-submenu>
   <el-submenu index="6">
    <template slot="title"><i class="el-icon-s-custom"></i>维修车间</template>
    <el-menu-item index="冶炼维修作业长">冶炼维修作业长</el-menu-item>
    <el-menu-item index="连铸维修作业长">连铸维修作业长</el-menu-item>
    <el-menu-item index="天车作业长">天车作业长</el-menu-item>
  </el-submenu>

 

  
</el-menu>
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="日期" prop="logtime">
        <el-date-picker clearable size="small"
          v-model="queryParams.logtime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="单位" prop="dept">
        <el-select v-model="queryParams.dept" placeholder="请选择单位"  @change="changedept" clearable size="small">
          <el-option
            v-for="dict in deptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="岗位" prop="post">
        <el-select v-model="queryParams.post" placeholder="请选择项目" @change="handleQuery"  clearable size="small">
          <el-option
            v-for="dict in postOptions"
            :key="dict.code"
            :label="dict.code"
            :value="dict.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="记录人" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入记录人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['system:daynote:add']"
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:daynote:edit']"
        >修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:daynote:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:daynote:export']"
        >导出</el-button>
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="daynoteList" :default-expand-all="true"  @row-dblclick="dbSelected" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="内容" align="center" type="expand">
      <template slot-scope="scope">
          <div  v-html="scope.row.note" />
        </template>
      </el-table-column>
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="日期" align="center" prop="logtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.logtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位" align="center" prop="dept"  />
      <el-table-column label="岗位" align="center" prop="post" />
      <el-table-column label="记录人" align="center" prop="name" >
         <template slot-scope="scope">
       <el-tag>{{scope.row.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="班组" align="center" prop="team" />
      <el-table-column label="状态" align="center" prop="status" >
      <template slot-scope="scope">
         
          <el-tag :type="scope.row.status == '已交班' ? 'success' : 'danger'">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180"/>
        <!-- <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {H}-{M}-{s}') }}</span>
        </template> -->
   
      <el-table-column label="交班时间" align="center" prop="updateTime" width="180">
       <template slot-scope="scope">
         
          <span  v-show="scope.row.status == '已交班'">{{scope.row.updateTime}}</span>
        </template>
      </el-table-column>
        
   
      <!-- <el-table-column label="接班时间" align="center" prop="jiebanTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.jiebanTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:daynote:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:daynote:remove']"
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

       </el-row>
    
         <tinymce 
         v-if="open"
          @change="change"
          :defaultContent="form.note"
          upload_url="http://dev.lin.colorful3.com/cms/file/"
          />
       
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="submitForm">确 定</el-button> -->
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDaynote, getDaynote, delDaynote, addDaynote, updateDaynote, exportDaynote,getPostInfo } from "@/api/system/daynote";
import Tinymce from "@/components/tinymceview";
export default {
  name: "Daynote",
  components: {
    Tinymce,
  },
  data() {
    return {
      text: "this is default content",
      activeIndex:"值班厂长",
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: false,
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
      // 岗位字典
      postOptions: [],
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
    this.queryParams.post="值班厂长";
    this.getList();
    this.getDicts("lgdept").then(response => {
      this.deptOptions = response.data;
    });
    this.getDicts("sys_user_team").then(response => {
      this.teamOptions = response.data;
    });
  },
  methods: {

    handleSelect(key, keyPath) {
        console.log(key);
        this.queryParams.post=key;
        this.getList();
      },
    change(val) {
      //console.log(val)
      this.text=val;
    },
    /** 查询工作日志列表 */
    getList() {
      this.loading = true;
      listDaynote(this.queryParams).then(response => {
        this.daynoteList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

     changedept(val){
       getPostInfo(val).then(response => {   
        this.postOptions=response.noteCfg;
      });    
      this.handleQuery();
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

     /** 双击---查看按钮操作 */
   dbSelected(row) {
     this.reset();
      const id = row.id || this.ids
      getDaynote(id).then(response => {  
        this.form = response.data;
        this.open = true;
        this.title = "查看工作日志";
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
      this.$confirm('是否确认删除工作日志编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDaynote(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
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