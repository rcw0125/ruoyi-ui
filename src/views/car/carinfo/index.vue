<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="车号" prop="carno">
        <el-input
          v-model="queryParams.carno"
          placeholder="请输入车号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      
       <el-form-item label="使用日期">
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
      <el-form-item label="车型" prop="cartype">
        <el-select v-model="queryParams.cartype" placeholder="请选择车型" @change="handleQuery" clearable size="small">
          <el-option
            v-for="dict in cartypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="用车单位" prop="dept">
        <el-select v-model="queryParams.dept" placeholder="请选择单位" @change="handleQuery"  clearable size="small">
          <el-option
            v-for="dict in deptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
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
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:carinfo:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:carinfo:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="carinfoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="45" align="center" />
      <el-table-column label="序号" width="45" align="center" prop="id" />
      <el-table-column label="车号" align="center" prop="carno" />
      <el-table-column label="日期" align="center" prop="logtime" width="100">
        <!-- <template slot-scope="scope">
          <span>{{ parseTime(scope.row.logtime, '{y}-{m}-{d}') }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="车型" align="center" prop="cartype" />
      <el-table-column label="用车单位" align="center" prop="dept"  />
      <el-table-column label="作业开始时间" align="center" prop="begintime" width="180">
        
      </el-table-column>
      <el-table-column label="作业结束时间" align="center" prop="endtime" width="180">
       
      </el-table-column>
      <el-table-column label="用车时长(小时)" align="center" prop="totaltime" />
      <el-table-column label="作业量" align="center" prop="zuoyeliang" />
      <el-table-column label="用车费用" align="center" prop="feiyong" />
      <el-table-column label="使用地点" align="center" prop="didian" />
      <el-table-column label="用车事由" align="center" width="150" prop="shiyou" />
     
      <el-table-column label="收费方式" align="center" width="130" prop="shoufeifangshi" />
      <el-table-column label="单价" align="center" prop="danjia" />
      <el-table-column label="收费说明" align="center" width="150" prop="beizhu" />
      <el-table-column label="用车人" align="center" prop="yongcheren" />
      <el-table-column label="记录人" align="center" prop="logren" />
       <el-table-column label="备注" align="center" prop="note" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:carinfo:edit']"
          >修改</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:carinfo:remove']"
          >删除</el-button> -->
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

    <!-- 添加或修改用车台账对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="车号" prop="carno">
          <el-input v-model="form.carno" placeholder="请输入车号" />
        </el-form-item>
        <el-form-item label="日期" prop="logtime">
          <el-date-picker clearable size="small"
            v-model="form.logtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="车型" prop="cartype">
          <el-select v-model="form.cartype" placeholder="请选择车型">
            <el-option
              v-for="dict in cartypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位" prop="dept">
          <el-select v-model="form.dept" placeholder="请选择单位">
            <el-option
              v-for="dict in deptOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作业开始时间" prop="begintime">
          <el-date-picker id="frmbegintime" clearable size="small"
            @change="calshichang"
            v-model="form.begintime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择作业开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="作业结束时间" prop="endtime">
          <el-date-picker id="frmendtime"  clearable size="small"
            @change="calshichang"
            v-model="form.endtime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择作业结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="用车时长(分钟)" prop="totaltime">
          <el-input  oninput="value=value.match(/^\d*(\.?\d{0,2})/g)" v-model="form.totaltime" placeholder="请输入用车时长(分钟)" />
        </el-form-item>
        <el-form-item label="作业量" prop="zuoyeliang">
          <el-input v-model="form.zuoyeliang" placeholder="请输入作业量" />
        </el-form-item>
        <el-form-item label="用车费用" prop="feiyong">
          <el-input v-model="form.feiyong" placeholder="请输入用车费用" />
        </el-form-item>
        <el-form-item label="使用地点" prop="didian">
          <el-input v-model="form.didian" placeholder="请输入使用地点" />
        </el-form-item>
        <el-form-item label="用车事由" prop="shiyou">
          <el-input v-model="form.shiyou" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="form.note" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="收费方式" prop="shoufeifangshi">
          <el-input v-model="form.shoufeifangshi" placeholder="请输入收费方式" />
        </el-form-item>
        <el-form-item label="单价" prop="danjia">
          <el-input v-model="form.danjia" placeholder="请输入单价" />
        </el-form-item>
        <el-form-item label="收费说明" prop="beizhu">
          <el-input v-model="form.beizhu" placeholder="请输入收费说明" />
        </el-form-item>
        <el-form-item label="用车人" prop="yongcheren">
          <el-input v-model="form.yongcheren" placeholder="请输入用车人" />
        </el-form-item>
        <el-form-item label="记录人" prop="logren">
          <el-input v-model="form.logren" placeholder="请输入记录人" />
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
import { listCarinfo, getCarinfo, delCarinfo, addCarinfo, updateCarinfo, exportCarinfo } from "@/api/system/carinfo";

export default {
  name: "Carinfo",
  components: {
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
      // 日期范围
      dateRange: [],
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 用车台账表格数据
      carinfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 车型字典
      cartypeOptions: [],
      // 单位字典
      deptOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        carno: null,
        logtime: null,
        cartype: null,
        dept: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        carno: [
          { required: true, message: "车号不能为空", trigger: "blur" }
        ],
        logtime: [
          { required: true, message: "日期不能为空", trigger: "blur" }
        ],
        cartype: [
          { required: true, message: "车型不能为空", trigger: "change" }
        ],
        dept: [
          { required: true, message: "单位不能为空", trigger: "change" }
        ],
        begintime: [
          { required: true, message: "作业开始时间不能为空", trigger: "blur" }
        ],
        endtime: [
          { required: true, message: "作业结束时间不能为空", trigger: "blur" }
        ],
        totaltime: [
          { required: true, message: "用车时长(分钟)不能为空", trigger: "blur" }
        ],
        zuoyeliang: [
          { required: true, message: "作业量不能为空", trigger: "blur" }
        ],
        feiyong: [
          { required: true, message: "用车费用不能为空", trigger: "blur" }
        ],
        didian: [
          { required: true, message: "使用地点不能为空", trigger: "blur" }
        ],
        shiyou: [
          { required: true, message: "用车事由不能为空", trigger: "blur" }
        ],
        shoufeifangshi: [
          { required: true, message: "收费方式不能为空", trigger: "blur" }
        ],
        danjia: [
          { required: true, message: "单价不能为空", trigger: "blur" }
        ],
        beizhu: [
          { required: true, message: "收费说明不能为空", trigger: "blur" }
        ],
        // yongcheren: [
        //   { required: true, message: "用车人不能为空", trigger: "blur" }
        // ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("yctzcx").then(response => {
      this.cartypeOptions = response.data;
    });
    this.getDicts("lgdept").then(response => {
      this.deptOptions = response.data;
    });
  },
  methods: {
    /** 查询用车台账列表 */
    getList() {
      this.loading = true;
      listCarinfo(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.carinfoList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 车型字典翻译
    cartypeFormat(row, column) {
      return this.selectDictLabel(this.cartypeOptions, row.cartype);
    },
    // 单位字典翻译
    deptFormat(row, column) {
      return this.selectDictLabel(this.deptOptions, row.dept);
    },

    // 计算时长
    calshichang() {
      if(this.form.begintime==null){
        return;
      }
      if(this.form.endtime==null){
        return;
      }
      var begindate = new Date(this.form.begintime);
      var enddate = new Date(this.form.endtime);
      this.form.totaltime=(enddate-begindate)/1000/60;
      console.log(document.getElementById("frmbegintime").value);
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
        carno: null,
        logtime: null,
        cartype: null,
        dept: null,
        begintime: null,
        endtime: null,
        totaltime: null,
        zuoyeliang: null,
        feiyong: null,
        didian: null,
        shiyou: null,
        note: null,
        shoufeifangshi: null,
        danjia: null,
        beizhu: null,
        yongcheren: null,
        logren: null
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
      this.title = "添加用车台账";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCarinfo(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用车台账";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCarinfo(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCarinfo(this.form).then(response => {
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
      this.$confirm('是否确认删除用车台账编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCarinfo(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有用车台账数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportCarinfo(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>