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
      <!-- <el-form-item label="精炼" prop="lfid">
        <el-select v-model="queryParams.lfid" placeholder="请选择精炼" clearable size="small">
          <el-option
            v-for="dict in lfidOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="班组" prop="team">
        <el-select v-model="queryParams.team" placeholder="请选择班组" clearable size="small">
          <el-option
            v-for="dict in teamOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="Si命中炉数" prop="sicount">
        <el-input
          v-model="queryParams.sicount"
          placeholder="请输入Si命中炉数"
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
          v-hasPermi="['system:mingzhonglv:add']"
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
          v-hasPermi="['system:mingzhonglv:edit']"
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
          v-hasPermi="['system:mingzhonglv:remove']"
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
          v-hasPermi="['system:mingzhonglv:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->
     
     <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
     <el-menu-item index="0">成分下限命中率</el-menu-item>
     <el-menu-item index="1" >炉次明细</el-menu-item>
     
     <div class="line"></div>
    </el-menu>

    <el-table v-loading="loading" :data="mingzhonglvList" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="日期" align="center" prop="logtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.logtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="精炼" align="center" prop="lfid"/>
       <el-table-column label="班组" align="center" prop="team" v-if="mxvisible"/>
        <el-table-column label="炉号" align="center" prop="heatid" v-if="mxvisible"/>
       <el-table-column label="Si" align="center" prop="si" />
       <el-table-column label="Mn" align="center" prop="mn" />
       <el-table-column label="Cr" align="center" prop="cr" />
     
      <el-table-column label="Si命中炉数" align="center" prop="sicount"  v-if="cfvisible" />
      <el-table-column label="Si总炉数" align="center" prop="sitotal" v-if="cfvisible" /> 
      <el-table-column label="Mn命中炉数" align="center" prop="mncount"  v-if="cfvisible"/>
      <el-table-column label="Mn总炉数" align="center" prop="mntotal"   v-if="cfvisible"/>
      <el-table-column label="Cr命中炉数" align="center" prop="crcount"  v-if="cfvisible"/>
      <el-table-column label="Cr总炉数" align="center" prop="crtotal"  v-if="cfvisible" />
      
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:mingzhonglv:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:mingzhonglv:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    
    <pagination
      v-show="total>0&mxvisible"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

   <div class="continer" v-show="cfvisible">    
     <section class="content-box">
      <section class="item-box">
        <itemBox :title="tsccGaugeOptionalSettings.title">
          <!-- <basicGauge :chartData="headData10"></basicGauge> -->
          <TsccGaugeChart
            :chartData="tsccGaugeData"
            :requiredSettings="tsccGaugeRequiredSettings"
            :optionalSettings="tsccGaugeOptionalSettings"
          />
        </itemBox>
      </section>
       <section class="item-box">
        <itemBox :title="tsccGaugeOptionalSettings1.title">
          <!-- <basicGauge :chartData="headData10"></basicGauge> -->
          <TsccGaugeChart
            :chartData="tsccGaugeData1"
            :requiredSettings="tsccGaugeRequiredSettings1"
            :optionalSettings="tsccGaugeOptionalSettings1"
          />
        </itemBox>
      </section>
       <section class="item-box">
        <itemBox :title="tsccGaugeOptionalSettings2.title">
          <!-- <basicGauge :chartData="headData10"></basicGauge> -->
          <TsccGaugeChart
            :chartData="tsccGaugeData2"
            :requiredSettings="tsccGaugeRequiredSettings2"
            :optionalSettings="tsccGaugeOptionalSettings2"
          />
        </itemBox>
      </section>
     </section>
    </div>

    <!-- 添加或修改成分命中率对话框 -->
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
        <el-form-item label="Si命中炉数" prop="sicount">
          <el-input v-model="form.sicount" placeholder="请输入Si命中炉数" />
        </el-form-item>
        <el-form-item label="Si总炉数" prop="sitotal">
          <el-input v-model="form.sitotal" placeholder="请输入Si总炉数" />
        </el-form-item>
        <el-form-item label="Si" prop="si">
          <el-input v-model="form.si" placeholder="请输入Si" />
        </el-form-item>
        <el-form-item label="Mn" prop="mn">
          <el-input v-model="form.mn" placeholder="请输入Mn" />
        </el-form-item>
        <el-form-item label="Mn命中炉数" prop="mncount">
          <el-input v-model="form.mncount" placeholder="请输入Mn命中炉数" />
        </el-form-item>
        <el-form-item label="Cr" prop="cr">
          <el-input v-model="form.cr" placeholder="请输入Cr" />
        </el-form-item>
        <el-form-item label="Mn总炉数" prop="mntotal">
          <el-input v-model="form.mntotal" placeholder="请输入Mn总炉数" />
        </el-form-item>
        <el-form-item label="Cr命中炉数" prop="crcount">
          <el-input v-model="form.crcount" placeholder="请输入Cr命中炉数" />
        </el-form-item>
        <el-form-item label="Cr总炉数" prop="crtotal">
          <el-input v-model="form.crtotal" placeholder="请输入Cr总炉数" />
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
import { listMingzhonglv, getMingzhonglv, delMingzhonglv, addMingzhonglv, updateMingzhonglv, exportMingzhonglv } from "@/api/system/mingzhonglv";
import { listMingzhongmingxi, getMingzhongmingxi, delMingzhongmingxi, addMingzhongmingxi, updateMingzhongmingxi, exportMingzhongmingxi } from "@/api/system/mingzhongmingxi";
import itemBox from "@/components/itemBox";
import TsccGaugeChart from "@/components/charts/TsccGaugeChart";
export default {
  name: "Mingzhonglv",
  data() {
    return {
      activeIndex: '0',
      cfvisible:true,
       mxvisible:false,

          // 仪表盘
      tsccGaugeData: 0,
      tsccGaugeRequiredSettings: {
        name: ""
      },
      tsccGaugeOptionalSettings: {
        title: "成分Si命中率",
        //fd666d
        //67e0e3  #E4EF0B
        //37a2da
        color: [
           [0.6, '#FF0000'],
           [0.9, '#FFFF00'],
           [1, '#00FF00']
        ]
      },
       tsccGaugeData1: 0,
      tsccGaugeRequiredSettings1: {
        name: ""
      },
      tsccGaugeOptionalSettings1: {
        title: "成分Mn命中率",
        //fd666d
        //67e0e3  #E4EF0B
        //37a2da
        color: [
            [0.6, '#FF0000'],
           [0.9, '#FFFF00'],
           [1, '#00FF00']
        ]
      },
       tsccGaugeData2: 0,
      tsccGaugeRequiredSettings2: {
        name: ""
      },
      tsccGaugeOptionalSettings2: {
        title: "成分Cr命中率",
        //fd666d
        //67e0e3  #E4EF0B
        //37a2da
        color: [
            [0.6, '#FF0000'],
           [0.9, '#FFFF00'],
           [1, '#00FF00']
        ]
      },
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
      // 成分命中率表格数据
      mingzhonglvList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 精炼字典
      lfidOptions: [],
      // 班组字典
      teamOptions: [],
      keyflag:0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 150,
        logtime: null,
        lfid: null,
        team: null,
        sicount: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
   components: {
    // EditorDialog,
    itemBox,
    TsccGaugeChart
  },
  created() {
     var curday = new Date();
      var lastday = new Date(curday.getTime()-1*24*60*60*1000) ;//得到昨天日期
      //Date.now-24*60*60*1000
       var year = lastday.getFullYear(); //得到年份
       var month = lastday.getMonth(); //得到月份
       var date = lastday.getDate(); //得到日期
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
  },
  methods: {

    handleSelect(key, keyPath) {
         this.keyflag=key;
       if(this.queryParams.logtime==""||this.queryParams.logtime==null){
        this.$message.error('日期不能为空，请先选择日期！');
        return;
      }
        if(key==1){
          this.cfvisible=false;
          this.mxvisible=true;
           this.getMingxiList();
        }
        else{
          this.cfvisible=true;
          this.mxvisible=false;
           this.getList();
        }
       
      },
    /** 查询成分命中率列表 */
    getList() {
      this.loading = true;
      listMingzhonglv(this.queryParams).then(response => {
        this.mingzhonglvList = response.rows;
        this.total = response.total;
        this.loading = false;
        this.tsccGaugeData=this.searchSi('合计');
        this.tsccGaugeData1=this.searchMn('合计');
         this.tsccGaugeData2=this.searchCr('合计');
      });
    },

    searchSi(keyword){
        var rate=0;
        this.mingzhonglvList.forEach(item =>{
          if(item.lfid== keyword){
            if(item.si!='-'){
                rate=item.si-0;
            }
            
          }
        })
        return rate;
      },
    searchMn(keyword){
        var rate=0;
        this.mingzhonglvList.forEach(item =>{
          if(item.lfid== keyword){
             if(item.mn!='-'){
                rate=item.mn-0;
            }
          }
        })
        return rate;
      },
     searchCr(keyword){
        var rate=0;
        this.mingzhonglvList.forEach(item =>{
          if(item.lfid== keyword){
            if(item.cr!='-'){
                rate=item.cr-0;
            }
          }
        })
        return rate;
      }, 
     /** 查询成分命中明细列表 */
    getMingxiList() {
      this.loading = true;
      listMingzhongmingxi(this.queryParams).then(response => {
        this.mingzhonglvList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 精炼字典翻译
    lfidFormat(row, column) {
      return this.selectDictLabel(this.lfidOptions, row.lfid);
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
        lfid: null,
        team: null,
        sicount: null,
        sitotal: null,
        si: null,
        mn: null,
        mncount: null,
        cr: null,
        mntotal: null,
        crcount: null,
        crtotal: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
       if(this.queryParams.logtime==""||this.queryParams.logtime==null){
        this.$message.error('日期不能为空，请先选择日期！');
        return;
      }
      this.queryParams.pageNum = 1;
      if(this.keyflag==1){
          this.cfvisible=false;
          this.mxvisible=true;
           this.getMingxiList();
        }
        else{
          this.cfvisible=true;
          this.mxvisible=false;
           this.getList();
        }
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
      this.title = "添加成分命中率";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMingzhonglv(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改成分命中率";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMingzhonglv(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMingzhonglv(this.form).then(response => {
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
      this.$confirm('是否确认删除成分命中率编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delMingzhonglv(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      if(this.queryParams.logtime==""||this.queryParams.logtime==null){
        this.$message.error('日期不能为空，请先选择日期！');
        return;
      }
      if(this.keyflag==1){
          this.$confirm('是否确认导出所有成分命中明细数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportMingzhongmingxi(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
        }
        else{
         this.$confirm('是否确认导出所有成分命中率数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportMingzhonglv(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
        }
      
    }
  }
};
</script>
<style scoped lang="scss">
.continer {
  background: url(../../../assets/images/banner.png) no-repeat center;
  background-size: 100% 100%;
  height: 70%;
  /* padding-top: 5rem; */
  margin-top: 1rem;
  padding: 1rem 1rem 1rem 1rem;
}
.head-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20rem;
}
.content-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  height: 18rem;
}
.item-box {
  height: 100%;
  flex: 1;
  margin-right: 1.5rem;
  position: relative;
}
</style>