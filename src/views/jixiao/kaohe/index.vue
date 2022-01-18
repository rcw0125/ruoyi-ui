<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="被考核人" prop="nickname">
        <el-input
          v-model="queryParams.nickname"
          placeholder="请输入被考核人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="被考单位" prop="deptname">
         <el-select v-model="queryParams.deptname" @change="handleQuery" placeholder="请输入被考核单位">
                <el-option
                  v-for="item in beikaoheDeptOptions"
                  :key="item.deptName"
                  :label="item.deptName"
                  :value="item.deptName"
                > </el-option> 
              </el-select> 
      </el-form-item>
      
      <el-form-item label="考核人" prop="leadername">
        <el-input
          v-model="queryParams.leadername"
          placeholder="请输入考核人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="考核单位" prop="leaderdept">
        <el-select v-model="queryParams.leaderdept" @change="handleQuery" placeholder="请输入考核单位">
                <el-option
                   v-for="dict in deptOptions"
                  :key="dict.value"
                  :label="dict.dictLabel"
                  :value="dict.dictLabel"
                > </el-option> 
              </el-select> 
      </el-form-item>

      <el-form-item label="考核日期">
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

      <el-form-item label="考核类别" prop="khtype">
       <el-select v-model="queryParams.khtype" @change="handleQuery" placeholder="考核类别">
                <el-option
                  v-for="item in khtypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                > </el-option> 
              </el-select> 
      </el-form-item>
        <el-form-item label="考核性质">
          <el-select v-model="queryParams.khxz" @change="handleQuery" placeholder="请选择考核性质">
            <el-option
              v-for="dict in khxzOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
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
          icon="el-icon-plus"
          size="mini"
          :disabled="single"
          @click="handleView" 
        >查看详情</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:kaohe:add']"
        >新增</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:kaohe:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:kaohe:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:kaohe:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="kaoheList"  @selection-change="handleSelectionChange" @row-dblclick="dbSelected">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="kaoheId" width="70" />
      <el-table-column label="日期" align="center" prop="khrq" width="150">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.khrq, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="被考核人编码" align="center" prop="useraccount" /> -->
       <el-table-column label="被考评单位" align="center" prop="deptname" />
      <el-table-column label="被考评人" align="center" prop="nickname" >
         <template slot-scope="scope">
         <el-tag size="medium">{{ scope.row.nickname }}</el-tag>
      </template>
    </el-table-column>
      <el-table-column label="班组" align="center" prop="team" />
      <el-table-column label="考评人" align="center" prop="leadername" />
      
      <el-table-column label="考评原因" align="left" prop="khnote"  width="500" >
        <template slot-scope="scope">
         <span class="text-danger">{{ scope.row.khnote }}</span>
      </template>
      </el-table-column>
      <el-table-column label="考核金额(元)" align="center" prop="jxkf" />
      
      <!-- <el-table-column label="安全扣分" align="center" prop="aqkf" /> -->
      <!-- <el-table-column label="考核等级" align="center" prop="khdj"  />
      <el-table-column label="考核性质" align="center" prop="khxz"  />
      <el-table-column label="考核种类" align="center" prop="khzl"  /> -->
      
      
      <!-- <el-table-column label="考核人ID" align="center" prop="leaderaccount" /> -->
    
      <!-- <el-table-column label="考核单位" align="center" prop="leaderdept" /> -->
     
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改考核对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        
         <el-form-item label="被考编码" prop="useraccount">
            <el-input v-model="form.useraccount" placeholder="请输入被考核人编码" />
          </el-form-item>
          <el-form-item label="被考核人" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入被考核人" />
        </el-form-item>
         <el-form-item label="被考单位" prop="deptname">
          <el-input v-model="form.deptname" placeholder="请输入被考核单位" />
        </el-form-item>
        
        <el-form-item label="绩效扣分" prop="jxkf">
          <el-input v-model="form.jxkf" placeholder="请输入绩效扣分" />
        </el-form-item>
       <el-form-item label="安全扣分" prop="aqkf">
          <el-input v-model="form.aqkf" placeholder="请输入安全扣分" />
        </el-form-item>
         <el-form-item label="班组">
          <el-select v-model="form.team" placeholder="请选择班组">
            <el-option
              v-for="dict in teamOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
       <el-form-item label="考核等级">
          <el-select v-model="form.khdj" placeholder="请选择考核等级">
            <el-option
              v-for="dict in khdjOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>

         
        
       
        
        <el-form-item label="考核性质">
          <el-select v-model="form.khxz" placeholder="请选择考核性质">
            <el-option
              v-for="dict in khxzOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考核种类">
          <el-select v-model="form.khzl" placeholder="请选择考核种类">
            <el-option
              v-for="dict in khzlOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="khrq">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.khrq"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="考核原因" prop="khnote">
          <el-input v-model="form.khnote"  :rows="5" type="textarea" placeholder="请输入考核内容" />
        </el-form-item>
        <el-form-item label="考核人ID" prop="leaderaccount">
          <el-input v-model="form.leaderaccount" placeholder="请输入考核人ID" />
        </el-form-item>
        <el-form-item label="考核人" prop="leadername">
          <el-input v-model="form.leadername" placeholder="请输入考核人" />
        </el-form-item>
        <el-form-item label="考核单位" prop="leaderdept">
          <el-input v-model="form.leaderdept" placeholder="请输入考核单位" />
        </el-form-item>
        <el-form-item label="考核类别" prop="khtype">
       <el-select v-model="form.khtype" placeholder="考核类别">
                <el-option
                  v-for="item in khtypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                > </el-option> 
              </el-select> 
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-hasPermi="['system:kaohe:edit']"  @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listKaohe, getKaohe, delKaohe, addKaohe, updateKaohe, exportKaohe,getDeptInfo } from "@/api/system/kaohe";

import {  getInfo } from "@/api/system/dept";

export default {
  name: "Kaohe",
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
      // 总条数
      total: 0,
      // 考核表格数据
      kaoheList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 班组字典
      teamOptions: [],
      // 考核等级字典
      khdjOptions: [],
      // 日期范围
      dateRange: [],
      // 考核性质字典
      khxzOptions: [],
      // 考核种类字典
      khzlOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 50,
        nickname: undefined,
        deptname: undefined,
        khrq: undefined,
        leadername: undefined,
        leaderdept: undefined
      },
        dateRange: [],
      // 被考核单位字典
      beikaoheDeptOptions:[],

      deptOptions: [],

      khtypeOptions: [{
          value: '科室考评',
          label: '科室考评'
        }, {
          value: '车间内部考评',
          label: '车间内部考评'
        }, {
          value: '相关方考评',
          label: '相关方考评'
        }],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.$set(this.queryParams, "khtype", "科室考评");
    this.getList();
    this.getDicts("sys_user_team").then(response => {
      this.teamOptions = response.data;
    });
    this.getDicts("sys_khdj").then(response => {
      this.khdjOptions = response.data;
    });
    this.getDicts("sys_khxz").then(response => {
      this.khxzOptions = response.data;
    });
    this.getDicts("sys_user_khzl").then(response => {
      this.khzlOptions = response.data;
    });
    this.getDept();
    this.getDicts("lgdept").then(response => {
      this.deptOptions = response.data;
    });
  },
  methods: {
    /** 查询考核列表 */
    getList() {
      this.loading = true;
      listKaohe(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.kaoheList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    //查询所有岗位
    getDept() {    
      getDeptInfo().then(response => {
         this.beikaoheDeptOptions=response.dept;
      });
    },
    //表单双击行事件
    dbSelected(row){
       this.reset();
      const kaoheId = row.kaoheId || this.ids
      getKaohe(kaoheId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "查看考核单";
      });
    },
    // 班组字典翻译
    teamFormat(row, column) {
      return this.selectDictLabel(this.teamOptions, row.team);
    },
    // 考核等级字典翻译
    khdjFormat(row, column) {
      return this.selectDictLabel(this.khdjOptions, row.khdj);
    },
    // 考核性质字典翻译
    khxzFormat(row, column) {
      return this.selectDictLabel(this.khxzOptions, row.khxz);
    },
    // 考核种类字典翻译
    khzlFormat(row, column) {
      return this.selectDictLabel(this.khzlOptions, row.khzl);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        kaoheId: undefined,
        useraccount: undefined,
        nickname: undefined,
        deptname: undefined,
        jxkf: undefined,
        aqkf: undefined,
        team: undefined,
        khdj: undefined,
        khxz: undefined,
        khzl: undefined,
        khrq: undefined,
        khnote: undefined,
        leaderaccount: undefined,
        leadername: undefined,
        leaderdept: undefined
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
      this.ids = selection.map(item => item.kaoheId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加考核";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const kaoheId = row.kaoheId || this.ids
      getKaohe(kaoheId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改考核";
      });
    },

        /** 查看考核单操作 */
    handleView(row) {
      this.reset();
      const kaoheId = row.kaoheId || this.ids
      getKaohe(kaoheId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "查看考核单";
      });
    },

    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.kaoheId != undefined) {
            updateKaohe(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addKaohe(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const kaoheIds = row.kaoheId || this.ids;
      this.$confirm('是否确认删除考核编号为"' + kaoheIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delKaohe(kaoheIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有考核数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportKaohe(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>