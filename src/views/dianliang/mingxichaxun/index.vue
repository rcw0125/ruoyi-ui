<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="断路器编号" prop="bianhao">
        <el-input
          v-model="queryParams.bianhao"
          placeholder="请输入断路器编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="倍率" prop="beilv">
        <el-input
          v-model="queryParams.beilv"
          placeholder="请输入倍率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="描述" prop="miaoshu">
        <el-input
          v-model="queryParams.miaoshu"
          placeholder="请输入描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="总" prop="total">
        <el-input
          v-model="queryParams.total"
          placeholder="请输入总"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="尖峰" prop="jianfeng">
        <el-input
          v-model="queryParams.jianfeng"
          placeholder="请输入尖峰"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="高峰" prop="gaofeng">
        <el-input
          v-model="queryParams.gaofeng"
          placeholder="请输入高峰"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="平" prop="ping">
        <el-input
          v-model="queryParams.ping"
          placeholder="请输入平"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="谷" prop="gu">
        <el-input
          v-model="queryParams.gu"
          placeholder="请输入谷"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      
     <el-form-item label="选择日期" >
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
<!-- 
      <el-form-item label="日期" prop="logtime">
        <el-date-picker clearable size="small"
          v-model="queryParams.logtime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item> -->
     

       <el-form-item label="车间" prop="dept">
        <el-select v-model="queryParams.dept" placeholder="请选择车间"  @change="handleQuery"  clearable size="small">
          <el-option
            v-for="dict in deptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="类别" prop="leibie">
        <el-select v-model="queryParams.leibie" placeholder="请选择类别" @change="handleQuery"  clearable size="small">
          <el-option
            v-for="dict in leibieOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="来源" prop="laiyuan">
        <el-select v-model="queryParams.laiyuan" placeholder="请选择来源" @change="handleQuery" clearable size="small">
          <el-option
            v-for="dict in laiyuanOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="排序" prop="ordernum">
        <el-input
          v-model="queryParams.ordernum"
          placeholder="请输入排序"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input
          v-model="queryParams.note"
          placeholder="请输入备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
          v-hasPermi="['system:mingxi:add']"
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
          v-hasPermi="['system:mingxi:edit']"
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
          v-hasPermi="['system:mingxi:remove']"
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
          v-hasPermi="['system:mingxi:export']"
        >导出</el-button>
        
          <el-col :span="1.5">
            <el-button
              type="info"
              plain
              icon="el-icon-upload2"
              size="mini"
              @click="handleImport"
            
            >导入</el-button>
        </el-col>

          <el-col :span="1.5">
            <el-button
              type="danger"
              plain
              icon="el-icon-upload2"
              size="mini"
              @click="jiSuanDianLiang"
            
            >计算各车间电量</el-button>
        </el-col>

      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->

    <el-table v-loading="loading" :data="mingxiList" show-summary :summary-method="getSummaries" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="断路器编号" align="center" prop="bianhao" />
      <el-table-column label="倍率" align="center" prop="beilv" />
      <el-table-column label="描述" align="center" prop="miaoshu" /> -->
      
      <!-- <el-table-column label="尖峰" align="center" prop="jianfeng" />
      <el-table-column label="高峰" align="center" prop="gaofeng" />
      <el-table-column label="平" align="center" prop="ping" />
      <el-table-column label="谷" align="center" prop="gu" /> -->
      <el-table-column label="日期" align="center" prop="logtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.logtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="电量" align="center" prop="total" />
      <el-table-column label="类别" align="center" prop="leibie" />
      <el-table-column label="车间" align="center" prop="dept"  />
      <el-table-column label="来源" align="center" prop="laiyuan" />
      <!-- <el-table-column label="排序" align="center" prop="ordernum" /> -->
      <el-table-column label="备注" align="center" prop="note" />
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:mingxi:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:mingxi:remove']"
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

    <!-- 添加或修改电量明细对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!-- <el-form-item label="断路器编号" prop="bianhao">
          <el-input v-model="form.bianhao" placeholder="请输入断路器编号" />
        </el-form-item>
        <el-form-item label="倍率" prop="beilv">
          <el-input v-model="form.beilv" placeholder="请输入倍率" />
        </el-form-item>
        <el-form-item label="描述" prop="miaoshu">
          <el-input v-model="form.miaoshu" placeholder="请输入描述" />
        </el-form-item> -->
        <el-form-item label="日期"  prop="logtime">
          <el-date-picker clearable  size="small"
            v-model="form.logtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" readonly placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="总" prop="total">
          <el-input v-model="form.total" placeholder="请输入总" />
        </el-form-item>
        <!-- <el-form-item label="尖峰" prop="jianfeng">
          <el-input v-model="form.jianfeng" placeholder="请输入尖峰" />
        </el-form-item>
        <el-form-item label="高峰" prop="gaofeng">
          <el-input v-model="form.gaofeng" placeholder="请输入高峰" />
        </el-form-item>
        <el-form-item label="平" prop="ping">
          <el-input v-model="form.ping" placeholder="请输入平" />
        </el-form-item>
        <el-form-item label="谷" prop="gu">
          <el-input v-model="form.gu" placeholder="请输入谷" />
        </el-form-item> -->
        
        <el-form-item label="类别" prop="leibie">
          <el-select v-model="form.leibie" placeholder="请选择类别">
            <el-option
              v-for="dict in leibieOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车间" prop="dept">
          <el-select v-model="form.dept" placeholder="请选择车间">
            <el-option
              v-for="dict in deptOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源" prop="laiyuan">
          <el-select v-model="form.laiyuan" placeholder="请选择来源">
            <el-option
              v-for="dict in laiyuanOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="ordernum">
          <el-input v-model="form.ordernum" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="form.note" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

     <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?logtime=' + upload.logtime"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <div class="el-upload__tip" slot="tip">
            
            <el-date-picker clearable size="small"
              v-model="upload.logtime"
              type="date"
              value-format="yyyy-MM-dd"
            placeholder="选择日期">
        </el-date-picker>
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <!-- <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate">下载模板</el-link> -->
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listMingxi, getMingxi, delMingxi, addMingxi, updateMingxi, exportMingxi,CalDianLiangDaylist } from "@/api/system/mingxi";
import { getToken } from "@/utils/auth";
export default {
  name: "Mingxi",
  data() {
    return {
      // 日期范围
      dateRange: [],
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
      // 电量明细表格数据
      mingxiList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 类别字典
      leibieOptions: [],
      // 车间字典
      deptOptions: [],
      // 来源字典
      laiyuanOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 50,
        bianhao: null,
        beilv: null,
        miaoshu: null,
        total: null,
        jianfeng: null,
        gaofeng: null,
        ping: null,
        gu: null,
        logtime: null,
        name: null,
        leibie: null,
        dept: null,
        laiyuan: null,
        ordernum: null,
        note: null
      },

       // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        logtime: "",
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/mingxi/importData"
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
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
       //this.$set(this.queryParams, "logtime", defaultDate);
       this.dateRange.push(defaultDate);
       this.dateRange.push(defaultDate);
    this.getList();
    this.getDicts("jiezhileixing").then(response => {
      this.leibieOptions = response.data;
    });
    this.getDicts("dianliangdept").then(response => {
      this.deptOptions = response.data;
    });
    this.getDicts("datafrom").then(response => {
      this.laiyuanOptions = response.data;
    });
   
  },
  methods: {
    /** 查询电量明细列表 */
    getList() {
      this.loading = true;
      listMingxi(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.mingxiList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    jiSuanDianLiang() {
      CalDianLiangDaylist(this.queryParams).then(response => {
        this.msgSuccess("计算完毕");
      });
    },

    getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))&&index==2) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 度';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },

    // 类别字典翻译
    leibieFormat(row, column) {
      return this.selectDictLabel(this.leibieOptions, row.leibie);
    },
    // 车间字典翻译
    deptFormat(row, column) {
      return this.selectDictLabel(this.deptOptions, row.dept);
    },
    // 来源字典翻译
    laiyuanFormat(row, column) {
      return this.selectDictLabel(this.laiyuanOptions, row.laiyuan);
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
        bianhao: null,
        beilv: null,
        miaoshu: null,
        total: null,
        jianfeng: null,
        gaofeng: null,
        ping: null,
        gu: null,
        logtime: null,
        name: null,
        leibie: null,
        dept: null,
        laiyuan: null,
        ordernum: null,
        note: null
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
      this.title = "添加电量明细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMingxi(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改电量明细";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMingxi(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMingxi(this.form).then(response => {
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
      this.$confirm('是否确认删除电量明细编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delMingxi(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
      /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "电量导入";
      this.upload.open = true;
    },
    // /** 下载模板操作 */
    // importTemplate() {
    //   importTemplate().then(response => {
    //     this.download(response.msg);
    //   });
    // },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有电量明细数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportMingxi(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>