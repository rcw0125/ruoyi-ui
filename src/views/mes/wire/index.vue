<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="日期" prop="logtime">
        <el-date-picker  size="small"
          v-model="queryParams.logtime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="精炼" prop="lfid">
        <el-select v-model="queryParams.lfid" placeholder="请选择精炼"  @change="handleQuery"  clearable size="small">
          <el-option
            v-for="dict in lfidOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="班组" prop="team">
        <el-select v-model="queryParams.team"  @change="handleQuery" placeholder="请选择班组" clearable size="small">
          <el-option
            v-for="dict in teamOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="处理号" prop="treatno">
        <el-input
          v-model="queryParams.treatno"
          placeholder="请输入处理号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="物料名称" prop="codeDes">
        <el-select v-model="queryParams.codeDes" @change="handleQuery" placeholder="请选择物料名称" clearable size="small">
          <el-option
            v-for="dict in codeDesOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
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
      <!-- <el-form-item label="物料编码" prop="wirecode">
        <el-input
          v-model="queryParams.wirecode"
          placeholder="请输入物料编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
         <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
         
        >导出</el-button>
        <!-- <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button> -->
      </el-form-item>
    </el-form>

    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:wire:add']"
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
          v-hasPermi="['system:wire:edit']"
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
          v-hasPermi="['system:wire:remove']"
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
          v-hasPermi="['system:wire:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->
   <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
     <el-menu-item index="0">喂线加入总量</el-menu-item>
     <el-menu-item index="1" >炉次明细</el-menu-item>
     <div class="line"></div>
    </el-menu>
    <el-table v-loading="loading" :data="wireList" stripe @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="序号" align="center"  width="80" prop="id" />
      <el-table-column label="日期" align="center" prop="logtime" v-if="mxvisible" width="180"/>
      <el-table-column label="精炼" align="center" prop="lfid"  />
      <el-table-column label="班组" align="center" prop="team"  />
      <!-- <el-table-column label="处理号" align="center" prop="treatno" /> -->
      <el-table-column label="炉号" align="center" prop="heatid" v-if="mxvisible"/>
      <el-table-column label="物料名称" align="center" prop="codeDes"  />
      <el-table-column label="重量" align="center" prop="weight" />
      <!-- <el-table-column label="物料编码" align="center" prop="wirecode" /> -->
    
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:wire:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:wire:remove']"
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

    <!-- 添加或修改精炼喂线数据对话框 -->
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
        <el-form-item label="处理号" prop="treatno">
          <el-input v-model="form.treatno" placeholder="请输入处理号" />
        </el-form-item>
        <el-form-item label="炉号" prop="heatid">
          <el-input v-model="form.heatid" placeholder="请输入炉号" />
        </el-form-item>
        <el-form-item label="重量" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入重量" />
        </el-form-item>
        <el-form-item label="物料编码" prop="wirecode">
          <el-input v-model="form.wirecode" placeholder="请输入物料编码" />
        </el-form-item>
        <el-form-item label="物料名称" prop="codeDes">
          <el-select v-model="form.codeDes" placeholder="请选择物料名称">
            <el-option
              v-for="dict in codeDesOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
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
import { listWire,listSumWire, getWire, delWire, addWire, updateWire, exportWire,exportSumWire } from "@/api/system/wire";

export default {
  name: "Wire",
  data() {
    return {
      activeIndex: '0',
      keyflag:0,
      mxvisible:false,
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
      // 精炼喂线数据表格数据
      wireList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 精炼字典
      lfidOptions: [],
      // 班组字典
      teamOptions: [],
      // 物料名称字典
      codeDesOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 150,
        logtime: null,
        lfid: null,
        team: null,
        treatno: null,
        heatid: null,
        wirecode: null,
        codeDes: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
     var now = new Date();
       var year = now.getFullYear(); //得到年份
       var month = now.getMonth(); //得到月份
       var date = now.getDate(); //得到日期
       month = month + 1;
       month = month.toString().padStart(2, "0");
       date = date.toString().padStart(2, "0");
       var defaultDate = `${year}-${month}-${date}`;
       this.$set(this.queryParams, "logtime", defaultDate);
    this.getList();
    this.getDicts("lfid").then(response => {
      this.lfidOptions = response.data;
    });
    this.getDicts("sys_user_team").then(response => {
      this.teamOptions = response.data;
    });
    this.getDicts("wire").then(response => {
      this.codeDesOptions = response.data;
    });
  },
  methods: {

     handleSelect(key, keyPath) {
      this.keyflag=key;
      
        if(key==1){
        
          this.mxvisible=true;
         
        }
        else{
          
          this.mxvisible=false;
          
        }
         this.getList();
       
      },
    /** 查询精炼喂线数据列表 */
    getList() {
       if(this.queryParams.logtime==""||this.queryParams.logtime==null){
        this.$message.error('日期不能为空，请先选择日期！');
        return;
      }
      this.loading = true;
        if(this.keyflag==1){
        
           listWire(this.queryParams).then(response => {
           this.wireList = response.rows;
           this.total = response.total;
           this.loading = false;
           });
         
        }
        else{
          listSumWire(this.queryParams).then(response => {
          this.wireList = response.rows;
          this.total = response.total;
          this.loading = false;
          });
         
          
        }
     
    },

    // 精炼字典翻译
    lfidFormat(row, column) {
      return this.selectDictLabel(this.lfidOptions, row.lfid);
    },
    // 班组字典翻译
    teamFormat(row, column) {
      return this.selectDictLabel(this.teamOptions, row.team);
    },
    // 物料名称字典翻译
    codeDesFormat(row, column) {
      return this.selectDictLabel(this.codeDesOptions, row.codeDes);
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
        lfid: null,
        team: null,
        treatno: null,
        heatid: null,
        weight: null,
        wirecode: null,
        codeDes: null
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
      this.title = "添加精炼喂线数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWire(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改精炼喂线数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWire(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWire(this.form).then(response => {
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
      this.$confirm('是否确认删除精炼喂线数据编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delWire(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      

      this.$confirm('是否确认导出所有精炼喂线数据数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          if(this.keyflag==1){
          return exportWire(queryParams);
        }
        else{
           return exportSumWire(queryParams);
        }
          
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
