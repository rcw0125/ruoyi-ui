<template>
  <div class="app-container">

    <el-menu :default-active="activeIndex" class="el-menu-demo" @select="handleSelect" mode="horizontal" background-color="#545c64"  text-color="#fff"
  active-text-color="#ffd04b" >
  <el-menu-item index="科室考评" class="el-icon-s-home"> 科室考评</el-menu-item>
 
  <el-menu-item index="车间内部考评"  class="el-icon-c-scale-to-original">
     车间考评
  </el-menu-item>
  <el-menu-item index="相关方考评" class="el-icon-s-custom"> 相关方考评</el-menu-item>
  <el-menu-item index="4" class="el-icon-s-flag"> 
    <router-link :to="{path:'/biaozh'}">
                   标准化检查
                  </router-link>
    </el-menu-item>
    <el-menu-item index="5" class="el-icon-film"> 
    <router-link :to="{path:'/charts'}">
                   重点指标
                  </router-link>
    </el-menu-item>
     <el-menu-item index="6" class="el-icon-user-solid"> 
    <router-link :to="{path:'/login'}">
                   后台登录
                  </router-link>
    </el-menu-item>
</el-menu>
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
         <el-select v-model="queryParams.deptname" placeholder="请输入被考核单位">
                <el-option
                  v-for="item in deptOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
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
        <el-select v-model="queryParams.leaderdept" placeholder="请输入考核单位">
                <el-option
                  v-for="item in deptOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
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
       <el-select v-model="queryParams.khtype" placeholder="考核类别">
                <el-option
                  v-for="item in khtypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                > </el-option> 
              </el-select> 
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

  
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
       <el-col :span="12">
          <el-form-item label="被考编码" prop="useraccount">
            <el-input v-model="form.useraccount" placeholder="请输入被考核人编码" />
          </el-form-item>
       </el-col>
        <el-col :span="12">
           <el-form-item label="被考核人" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入被考核人" />
        </el-form-item>
       </el-col>
        <el-col :span="12">
          <el-form-item label="被考单位" prop="deptname">
          <el-input v-model="form.deptname" placeholder="请输入被考核单位" />
        </el-form-item>
       </el-col>
       
        <el-col :span="12">
          <el-form-item label="绩效扣分" prop="jxkf">
          <el-input v-model="form.jxkf" placeholder="请输入绩效扣分" />
        </el-form-item>
       </el-col>
       <el-col :span="12">
         <el-form-item label="安全扣分" prop="aqkf">
          <el-input v-model="form.aqkf" placeholder="请输入安全扣分" />
        </el-form-item>
       </el-col>
       
        <el-col :span="12">
          <el-form-item label="班组">
            <el-input v-model="form.team" placeholder="请输入班组" />
        </el-form-item>
       </el-col>

          <el-col :span="12">
          <el-form-item label="考核等级">
             <el-input v-model="form.khdj" placeholder="请输入考核等级" />
        </el-form-item>
       </el-col>
      <el-col :span="12">
          <el-form-item label="考核性质">
          <el-input v-model="form.khxz" placeholder="请输入考核性质" />
        </el-form-item>
       </el-col>

        <el-col :span="12">
           <el-form-item label="考核种类">
           <el-input v-model="form.khzl" placeholder="请输入考核种类" />
        </el-form-item>
       </el-col>
         <el-col :span="12">
           <el-form-item label="日期" prop="khrq">
            <el-input v-model="form.khrq" placeholder="请输入考核日期" />
        </el-form-item>
       </el-col>
        
        <el-form-item label="考核内容" prop="khnote">
          <el-input v-model="form.khnote" type="textarea" placeholder="请输入考核内容" />
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
      </el-form>
      <div slot="footer" class="dialog-footer">
       
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listKaoheApi, getKaoheApi, delKaohe, addKaohe, updateKaohe, exportKaohe } from "@/api/system/kaohe";

export default {
  name: "Kaohe",
  data() {
    return {
      activeIndex: '科室考评',
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
        pageSize: 10,
        khtype:undefined,
        nickname: undefined,
        deptname: undefined,
        khrq: undefined,
        leadername: undefined,
        leaderdept: undefined
      },
      
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
  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key);
        if(key!='4'&& key!='5'&& key!='6'){
         this.queryParams.khtype=key;
        this.getList();
        }   
      },
    /** 查询考核列表 */
    getList() {
      this.loading = true;
      listKaoheApi(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.kaoheList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    //表单双击行事件
    dbSelected(row){
       this.reset();
      const kaoheId = row.kaoheId || this.ids
      getKaoheApi(kaoheId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "查看考核单";
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