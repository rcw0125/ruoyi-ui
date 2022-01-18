<template>
  <div class="app-container">
   
   
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
  <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
          <h4 class="text-danger">
           注意：必须先选择车型信息，有了单价，才能计算总费用
          </h4>
               
      </el-col>
    </el-row>
      <el-row :gutter="10">
       <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
            <el-form-item >
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              @click="selectCar"  
            >点击选择车型信息</el-button>
            </el-form-item>
          </el-col>
    </el-row>



    
       
       <el-row>
       <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="车型" prop="cartype">
          <el-input v-model="form.cartype"   readonly placeholder="请输入车号" />
        </el-form-item>
       </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
           <el-form-item label="收费方式" prop="shoufeifangshi">
          <el-input v-model="form.shoufeifangshi" readonly placeholder="请输入收费方式" />
        </el-form-item>
       </el-col>
       </el-row>

       <el-row>
         
       
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="单价" prop="danjia">
          <el-input v-model="form.danjia" readonly placeholder="请输入单价" />
        </el-form-item>
       </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
           <el-form-item label="收费说明" prop="beizhu">
          <el-input v-model="form.beizhu" readonly placeholder="请输入收费说明" />
        </el-form-item>
       </el-col>
       </el-row>

        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="车号"  prop="carno">
           <el-input v-model="form.carno" placeholder="请输入车号" />
          </el-form-item>
       </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
           <el-form-item label="日期" prop="logtime">
          <el-date-picker clearable size="small"
            v-model="form.logtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
       </el-col>
        </el-row>

       <el-row>
         <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
           <el-form-item label="开始时间" prop="begintime">
          <el-date-picker id="frmbegintime" clearable size="small"
            @change="calshichang"
            v-model="form.begintime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择作业开始时间">
          </el-date-picker>
        </el-form-item>
       </el-col>
       
       <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
             <el-form-item label="结束时间" prop="endtime">
          <el-date-picker id="frmendtime"  clearable size="small"
            @change="calshichang"
            v-model="form.endtime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择作业结束时间">
          </el-date-picker>
        </el-form-item>
       </el-col>
       </el-row>

         
       
        <el-row>
              <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"> 
          
        <el-form-item label="用车时长" prop="totaltime">
          <el-input  disabled v-model="form.totaltime" placeholder="请输入用车时长(分钟)" />
        </el-form-item>
       </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="作业量" prop="zuoyeliang">
          <el-input v-model="form.zuoyeliang"  oninput="value=value.match(/^\d*(\.?\d{0,2})/g)"  @change="calfeiyong" placeholder="请输入作业量" />
        </el-form-item>
       </el-col>
       </el-row>

       <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
           <el-form-item label="用车费用" prop="feiyong">
          <el-input v-model="form.feiyong" placeholder="请输入用车费用" />
        </el-form-item>
       </el-col>
         <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="使用地点" prop="didian">
          <el-input v-model="form.didian" placeholder="请输入使用地点" />
        </el-form-item>
       </el-col>
       </el-row>

        
       <el-row>

        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
             <el-form-item label="用车人" prop="yongcheren">
          <el-input v-model="form.yongcheren" placeholder="请输入用车人" />
        </el-form-item>
       </el-col>
       <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
             <el-form-item label="备注" prop="note">
          <el-input v-model="form.note" placeholder="请输入备注" />
        </el-form-item>
       </el-col>
       </el-row>
        
       <el-row>
       <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
           <el-form-item label="用车事由" prop="shiyou">
          <el-input v-model="form.shiyou" type="textarea" placeholder="请输入内容" />
        </el-form-item>
       </el-col>
        
       </el-row>
        
        <el-row>
          <el-col :span="24">
             <el-form-item>
         <el-button
          type="danger"
          icon="el-icon-edit"
          round
          :disabled="disable"
          @click="submitForm"
        >{{getCode}}</el-button>
       </el-form-item>
          </el-col>
        </el-row>
       
      </el-form>

  

   

    <!-- 添加或修改用车台账对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
       <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
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
     
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      </el-form-item>
    </el-form>
      <el-table v-loading="loading" :data="carcfgList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" width="80"  prop="id" />
      <el-table-column label="车型" align="center" width="80"  prop="cartype" />
      <el-table-column label="收费方式" align="center" width="90" prop="shoufeifangshi" />
      <el-table-column label="单价" align="center" width="80" prop="danjia" />
      <el-table-column label="备注" align="left" prop="beizhu" width="300"/>

    </el-table>
  
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="single" @click="submitCarCfg">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listCarinfo, getCarinfo, delCarinfo, addCarinfo, updateCarinfo, exportCarinfo } from "@/api/system/carinfo";
import { listCarcfg } from "@/api/system/carcfg";
import { praseStrEmpty } from "@/utils/ruoyi";

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
      
      getCode: '确认新增',
      count: 6,
      disable: false,
      // 选中配置信息
      cartypes: [],
      shoufeifangshis: [],
      danjias: [],
      beizhus: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 用车台账表格数据
      carcfgList: [],
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
        
        dept: [
          { required: true, message: "单位不能为空", trigger: "change" }
        ],
        begintime: [
          { required: true, message: "作业开始时间不能为空", trigger: "blur" }
        ],
        endtime: [
          { required: true, message: "作业结束时间不能为空", trigger: "blur" }
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
        
        // yongcheren: [
        //   { required: true, message: "用车人不能为空", trigger: "blur" }
        // ],
      }
    };
  },
  created() {
    // this.getList();
    this.getDicts("yctzcx").then(response => {
      this.cartypeOptions = response.data;
    });
    // this.getDicts("lgdept").then(response => {
    //   this.deptOptions = response.data;
    // });
     var now = new Date();
       var year = now.getFullYear(); //得到年份
       var month = now.getMonth(); //得到月份
       var date = now.getDate(); //得到日期
       month = month + 1;
       month = month.toString().padStart(2, "0");
       date = date.toString().padStart(2, "0");
       var defaultDate = `${year}-${month}-${date}`;
       this.$set(this.form, "logtime", defaultDate);
       this.$set(this.form, "begintime", defaultDate+' 12:00:00');
       this.$set(this.form, "endtime", defaultDate+' 12:00:00');
  },
  methods: {

    /** 查询用车配置列表 */
    getList() {
       this.loading = true;
       
      listCarcfg(this.queryParams).then(response => {
        this.carcfgList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
      this.open = true;
    },

       /** 修改按钮操作 */
    selectCar() {
      this.queryParams.cartype=null;
      this.getList();
    },

    submitCarCfg(){
        this.open = false;
        this.form.cartype=praseStrEmpty(this.cartypes[0]);
        this.form.shoufeifangshi=praseStrEmpty(this.shoufeifangshis[0]);
        this.form.danjia=praseStrEmpty(this.danjias[0]); 
        this.form.beizhu=praseStrEmpty(this.beizhus[0]); 
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
      this.form.totaltime=((enddate-begindate)/1000/60/60).toFixed(2);
      this.$forceUpdate();  
    },

      // 计算费用
    calfeiyong() {
      if(this.form.danjia==null){
        this.$message.error('请先选择车型、单价，然后再输入作业量，计算费用！');
        return;
      }
      
       var begindate = new Date(this.form.begintime);
      var enddate = new Date(this.form.endtime);
      this.form.feiyong=(this.form.danjia*this.form.zuoyeliang).toFixed(2);
      this.$forceUpdate();  
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
      this.cartypes = selection.map(item => item.cartype)
      this.shoufeifangshis = selection.map(item => item.shoufeifangshi)
      this.danjias = selection.map(item => item.danjia)
      this.beizhus = selection.map(item => item.beizhu)
      this.single = selection.length!==1
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
          if(this.form.totaltime<0.01){
            this.$message.error('用车时长小于0.01，请认真填写数据！');
             return;
          }
          this.zuZhiDianJi();   
           addCarinfo(this.form).then(response => {
              this.msgSuccess("新增成功");
             
            });
        }
      });
    },
         //点击后禁用6秒
     zuZhiDianJi () {
      var countDown = setInterval(() => {
        if (this.count < 1) {       
          this.disable = false
          this.getCode =  '确认新增'
          this.count = 6
          clearInterval(countDown)
        } else {
         
          this.disable = true
          this.getCode = this.count-- + 's后继续新增'
        }
      }, 1000)
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