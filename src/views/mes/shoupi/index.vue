<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="铸机" v-show="this.routerId==1" prop="ccmid">
        <el-select v-model="queryParams.ccmid" placeholder="请选择铸机" @change="handleQuery" clearable size="small">
          <el-option
            v-for="dict in ccmidOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
       <el-form-item label="炉座" v-show="this.routerId==2" prop="bofid">
        <el-select v-model="queryParams.bofid" placeholder="请选择炉座"  @change="handleQuery" clearable size="small">
          <el-option
            v-for="dict in bofidOptions"
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
     
      <el-form-item label="生产日期" v-show="this.routerId==1" prop="productiondate">
        <el-date-picker  size="small"
          v-model="queryParams.productiondate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择生产日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="生产日期" v-show="this.routerId==2" prop="boftime">
        <el-date-picker  size="small"
          v-model="queryParams.boftime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择转炉生产日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="NC标志" prop="ncflag">
        <el-select v-model="queryParams.ncflag" placeholder="请选择NC标志"  @change="handleQuery" clearable size="small">
          <el-option
            v-for="dict in ncflagOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <!-- <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button> -->
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
          v-hasPermi="['system:shoupi:add']"
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
          v-hasPermi="['system:shoupi:edit']"
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
          v-hasPermi="['system:shoupi:remove']"
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
          v-hasPermi="['system:shoupi:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->
    <!-- 只要在el-table元素中定义了height属性，即可实现固定表头的表格，而不需要额外的代码。 -->
    <!-- 固定列需要使用fixed属性，它接受 Boolean 值或者leftright，表示左边固定还是右边固定。 -->
    <el-table v-loading="loading"  stripe  height="700" :data="shoupiList" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="铸机"  fixed align="center" prop="ccmid" width="70" />
      <el-table-column label="炉号"  fixed align="center" prop="heatid" width="95"/>
      <el-table-column label="炉座" align="center" prop="bofid" width="70" />
      <el-table-column label="开吹时间" align="center" prop="blowstart" width="80"/>
      <el-table-column label="钢种" align="center" prop="steelgrade" width="100"/>
      <el-table-column label="包次" align="center" prop="baocihao" width="50"/>
      
      <el-table-column label="铁水" align="center" prop="ironweight" width="60" />
      <el-table-column label="废钢" align="center" prop="scrapweight" width="60"/>
      <el-table-column label="铁块" align="center" prop="pigironweight" width="60"/>
      <el-table-column label="压块" align="center" prop="ykweight" width="60"/>
      <el-table-column label="钢水" align="center" prop="steelweight" width="66"/>
      <el-table-column label="收坯" align="center" prop="bloomweight" width="66"/>
      <el-table-column label="铁耗" align="center" prop="tiehao" width="66"/>
      <el-table-column label="氧气消耗" align="center" prop="yangqi" width="75"/>
      <el-table-column label="转炉石灰" align="center" prop="bofshihui" width="75"/>
      <el-table-column label="烧结返矿" align="center" prop="shaojiefankuang" width="90"/>
      <el-table-column label="精炼石灰" align="center" prop="lfshihui" width="75"/>
      <el-table-column label="转炉合金" align="center" prop="bofalloy" width="75"/>
      <el-table-column label="精炼合金" align="center" prop="lfalloy" width="75"/>
      <el-table-column label="铁水温度" align="center" prop="irontemp" width="75"/>
      <el-table-column label="NC标志" align="center" prop="ncflag" />
      <el-table-column label="石灰石" align="center" prop="shihuishi" />
      <el-table-column label="留渣" align="center" prop="liuzha" />
      <el-table-column label="炉龄" align="center" prop="luling" />
      <el-table-column label="冶炼周期" align="center" prop="zhouqi" />
      <el-table-column label="轻烧白云石" align="center" prop="qingshaobaiyunshi" />
      <el-table-column label="炼钢白云灰" align="center" prop="lgbaiyunshi" />
      <el-table-column label="拉碳温度" align="center" prop="lactemp" />
      <el-table-column label="顶渣灰" align="center" prop="dingzhahui" />
      <el-table-column label="补吹次数" align="center" prop="reblowCount" />
      <el-table-column label="补吹判定" align="center" prop="blowjudge" />
      <el-table-column label="生产日期" align="center" prop="productiondate" width="100">
        <!-- <template slot-scope="scope">
          <span>{{ parseTime(scope.row.productiondate, '{y}-{m}-{d}') }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="转炉生产日期" align="center" prop="boftime" width="100"/>
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:shoupi:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:shoupi:remove']"
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

    <!-- 添加或修改收坯统计对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="铸机" prop="ccmid">
          <el-select v-model="form.ccmid" placeholder="请选择铸机">
            <el-option
              v-for="dict in ccmidOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="炉号" prop="heatid">
          <el-input v-model="form.heatid" placeholder="请输入炉号" />
        </el-form-item>
        <el-form-item label="炉座" prop="bofid">
          <el-select v-model="form.bofid" placeholder="请选择炉座">
            <el-option
              v-for="dict in bofidOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开吹时间" prop="blowstart">
          <el-input v-model="form.blowstart" placeholder="请输入开吹时间" />
        </el-form-item>
        <el-form-item label="钢种" prop="steelgrade">
          <el-input v-model="form.steelgrade" placeholder="请输入钢种" />
        </el-form-item>
        <el-form-item label="包次" prop="baocihao">
          <el-input v-model="form.baocihao" placeholder="请输入包次" />
        </el-form-item>
        <el-form-item label="生产日期" prop="productiondate">
          <el-date-picker clearable size="small"
            v-model="form.productiondate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择生产日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="铁水" prop="ironweight">
          <el-input v-model="form.ironweight" placeholder="请输入铁水" />
        </el-form-item>
        <el-form-item label="废钢" prop="scrapweight">
          <el-input v-model="form.scrapweight" placeholder="请输入废钢" />
        </el-form-item>
        <el-form-item label="铁块" prop="pigironweight">
          <el-input v-model="form.pigironweight" placeholder="请输入铁块" />
        </el-form-item>
        <el-form-item label="压块" prop="ykweight">
          <el-input v-model="form.ykweight" placeholder="请输入压块" />
        </el-form-item>
        <el-form-item label="钢水" prop="steelweight">
          <el-input v-model="form.steelweight" placeholder="请输入钢水" />
        </el-form-item>
        <el-form-item label="收坯" prop="bloomweight">
          <el-input v-model="form.bloomweight" placeholder="请输入收坯" />
        </el-form-item>
        <el-form-item label="氧气消耗" prop="yangqi">
          <el-input v-model="form.yangqi" placeholder="请输入氧气消耗" />
        </el-form-item>
        <el-form-item label="转炉石灰" prop="bofshihui">
          <el-input v-model="form.bofshihui" placeholder="请输入转炉石灰" />
        </el-form-item>
        <el-form-item label="精炼石灰" prop="lfshihui">
          <el-input v-model="form.lfshihui" placeholder="请输入精炼石灰" />
        </el-form-item>
        <el-form-item label="转炉合金" prop="bofalloy">
          <el-input v-model="form.bofalloy" placeholder="请输入转炉合金" />
        </el-form-item>
        <el-form-item label="精炼合金" prop="lfalloy">
          <el-input v-model="form.lfalloy" placeholder="请输入精炼合金" />
        </el-form-item>
        <el-form-item label="铁水温度" prop="irontemp">
          <el-input v-model="form.irontemp" placeholder="请输入铁水温度" />
        </el-form-item>
        <el-form-item label="NC标志" prop="ncflag">
          <el-input v-model="form.ncflag" placeholder="请输入NC标志" />
        </el-form-item>
        <el-form-item label="石灰石" prop="shihuishi">
          <el-input v-model="form.shihuishi" placeholder="请输入石灰石" />
        </el-form-item>
        <el-form-item label="留渣" prop="liuzha">
          <el-input v-model="form.liuzha" placeholder="请输入留渣" />
        </el-form-item>
        <el-form-item label="炉龄" prop="luling">
          <el-input v-model="form.luling" placeholder="请输入炉龄" />
        </el-form-item>
        <el-form-item label="冶炼周期" prop="zhouqi">
          <el-input v-model="form.zhouqi" placeholder="请输入冶炼周期" />
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
import { listShoupi, getShoupi, delShoupi, addShoupi, updateShoupi, exportShoupi } from "@/api/system/shoupi";

export default {
  name: "Shoupi",
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
      // 收坯统计表格数据
      shoupiList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 铸机字典
      ccmidOptions: [],
      // 炉座字典
      bofidOptions: [],
      // NC标志字典
      ncflagOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 150,
        ccmid: null,
        heatid: null,
        bofid: null,
        boftime: null,
        productiondate: null,
        ncflag: null,
      },
      routerId: "",
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.routerId = this.$route.params && this.$route.query.sid;
    console.log(this.routerId);
     var now = new Date();
       var year = now.getFullYear(); //得到年份
       var month = now.getMonth(); //得到月份
       var date = now.getDate(); //得到日期
       month = month + 1;
       month = month.toString().padStart(2, "0");
       date = date.toString().padStart(2, "0");
       var defaultDate = `${year}-${month}-${date}`;
       if(this.routerId=='1'){
           this.$set(this.queryParams, "productiondate", defaultDate);
       }
       else{

         this.$set(this.queryParams, "boftime", defaultDate);
       }
      
    this.getList();
    this.getDicts("ccmid").then(response => {
      this.ccmidOptions = response.data;
    });
    this.getDicts("bofid").then(response => {
      this.bofidOptions = response.data;
    });
    this.getDicts("ncflag").then(response => {
      this.ncflagOptions = response.data;
    });
  },
  methods: {
    /** 查询收坯统计列表 */
    getList() {
      if(this.queryParams.productiondate==null&&this.routerId=='1'){
        this.$message.error('日期不能为空，请选择');
        return;
      }
      if(this.queryParams.boftime==null&&this.routerId=='2'){
        this.$message.error('日期不能为空，请选择');
        return;
      }
      this.loading = true;
      listShoupi(this.queryParams).then(response => {
        this.shoupiList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 铸机字典翻译
    ccmidFormat(row, column) {
      return this.selectDictLabel(this.ccmidOptions, row.ccmid);
    },
    // 炉座字典翻译
    bofidFormat(row, column) {
      return this.selectDictLabel(this.bofidOptions, row.bofid);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        ccmid: null,
        heatid: null,
        bofid: null,
        blowstart: null,
        steelgrade: null,
        baocihao: null,
        productiondate: null,
        ironweight: null,
        scrapweight: null,
        pigironweight: null,
        ykweight: null,
        steelweight: null,
        bloomweight: null,
        yangqi: null,
        bofshihui: null,
        lfshihui: null,
        bofalloy: null,
        lfalloy: null,
        irontemp: null,
        ncflag: null,
        shihuishi: null,
        liuzha: null,
        luling: null,
        zhouqi: null
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
      this.ids = selection.map(item => item.ccmid)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加收坯统计";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const ccmid = row.ccmid || this.ids
      getShoupi(ccmid).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改收坯统计";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.ccmid != null) {
            updateShoupi(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addShoupi(this.form).then(response => {
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
      const ccmids = row.ccmid || this.ids;
      this.$confirm('是否确认删除收坯统计编号为"' + ccmids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delShoupi(ccmids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有收坯统计数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportShoupi(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
