<template>
  <div class="app-container">
           <el-steps :active="5" align-center>
  <el-step title="选择工位" description="自动获取最新的生产炉号、时间"></el-step>
  <el-step title="选择设备名称" description=""></el-step>
  <el-step title="选择操作" description="启动还是停止"></el-step>
  <el-step title="岗位签字" description=""></el-step>
  <el-step title="提交" description="有异常情况时，填写异常描述"></el-step>
</el-steps>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
         <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
        <blockquote class="text-warning" style="font-size: 14px">
          
          <h4 class="text-danger">
            注意：5#机除尘、3#4#机火切机、脱硫风机需岗位人员在主控室填写，其他均由调度填写。岗位人员签字：1、3、5LF除尘、50T侧吸填写调度姓名，其他填写岗位人员姓名
          </h4>
        </blockquote>

        <hr />
      </el-col>
    </el-row>
        <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"  :inline="true">
           <el-form-item label="日期" prop="logtime">
          <el-date-picker clearable size="small"
            v-model="form.logtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>          
       </el-col>      
         <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"  :inline="true">
           <el-form-item label="介质类型" prop="jztype">
             <el-input v-model="form.jztype" readonly placeholder="请输入介质类型" />
          <!-- <el-select v-model="form.jztype" placeholder="请选择介质类型">
            <el-option
              v-for="dict in jztypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select> -->
        </el-form-item>       
       </el-col>
        </el-row>
       <el-row>
         <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"  :inline="true">
            <el-form-item label="工位" prop="gongxu">
          <el-select v-model="form.gongxu" @change="changegongxu" placeholder="请选择工位">
            <el-option
              v-for="dict in gongxuOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>    
       </el-col>

         <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"  :inline="true">
           <el-form-item label="设备名称" prop="sbname">
           <el-select v-model="form.sbname" placeholder="请选择设备" clearable size="small">
          <el-option
            v-for="dict in shebeiOptions"
            :key="dict.sbname"
            :label="dict.sbname"
            :value="dict.sbname"
          />
        </el-select>
        </el-form-item>
       </el-col>
       </el-row>
       
       <el-row>
         <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"  :inline="true">
           <el-form-item label="炉号" prop="heatid">
          <el-input v-model="form.heatid" readonly placeholder="请输入炉号" />
        </el-form-item>
       </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"  :inline="true">
            <el-form-item label="炉次结束时间" prop="heatendtime">
          <el-input v-model="form.heatendtime" readonly placeholder="请输入炉次结束时间" />
        </el-form-item>
       </el-col>
       </el-row>
       

       <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"  :inline="true">
             <el-form-item label="操作类型" prop="opertype">
          <el-select v-model="form.opertype" placeholder="请选择操作类型">
            <el-option
              v-for="dict in opertypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
       </el-col>
       
         <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"  :inline="true">
              <el-form-item label="岗位人员签字" prop="gongxuren">
          <el-input v-model="form.gongxuren" placeholder="请输入岗位人员签字" />
        </el-form-item>
       </el-col>
       </el-row>
       
        <!-- <el-form-item label="调度" prop="diaodu">
          <el-input v-model="form.diaodu" placeholder="请输入调度" />
        </el-form-item>
        <el-form-item label="炼钢签字时间" prop="lgqztime">
          <el-input v-model="form.lgqztime" placeholder="请输入炼钢签字时间" />
        </el-form-item> -->
        <el-form-item label="异常描述" prop="exceptnote">
          <el-input v-model="form.exceptnote" type="textarea" placeholder="请输入异常描述" />
        </el-form-item>
        <!-- <el-form-item label="指令人" prop="zhilingren">
          <el-input v-model="form.zhilingren" placeholder="请输入指令人" />
        </el-form-item>
        <el-form-item label="指令内容" prop="zhilingnote">
          <el-input v-model="form.zhilingnote" placeholder="请输入指令内容" />
        </el-form-item>
        <el-form-item label="接准备指令时间" prop="zhunbeitime">
          <el-date-picker clearable size="small"
            v-model="form.zhunbeitime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择接准备指令时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="设备最新动作时间" prop="sbdongzuotime">
          <el-input v-model="form.sbdongzuotime" placeholder="请输入设备最新动作时间" />
        </el-form-item>
        <el-form-item label="接操作指令时间" prop="caozuotime">
          <el-input v-model="form.caozuotime" placeholder="请输入接操作指令时间" />
        </el-form-item>
        <el-form-item label="执行完毕时间" prop="wanbitime">
          <el-select v-model="form.wanbitime" placeholder="请选择执行完毕时间">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="执行人" prop="zhixingren">
          <el-input v-model="form.zhixingren" placeholder="请输入执行人" />
        </el-form-item>
        <el-form-item label="备注" prop="dlnote">
          <el-input v-model="form.dlnote" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="指令状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择指令状态">
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="判定" prop="panding">
          <el-input v-model="form.panding" placeholder="请输入判定" />
        </el-form-item>
        <el-form-item label="标准时间" prop="biaozhuntime">
          <el-input v-model="form.biaozhuntime" placeholder="请输入标准时间" />
        </el-form-item>
        <el-form-item label="实际用时" prop="shijitime">
          <el-input v-model="form.shijitime" placeholder="请输入实际用时" />
        </el-form-item> -->

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


  </div>
</template>

<script>
import { listJizhi, getJizhi, delJizhi, addJizhi, updateJizhi, exportJizhi,getEmsequipcfg,getHeatIdInfo } from "@/api/system/emsjiezhi";

export default {
  name: "Jizhi",
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
      // 介质停送记录表格数据
      jizhiList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 工位字典
      gongxuOptions: [],
      // 设备名称字典
      shebeiOptions: [],
      // 介质类型字典
      jztypeOptions: [],
      // 操作类型字典
      opertypeOptions: [],
      // 指令状态字典
      statusOptions: [],

      getCode: '确认提交申请单',
      count: 6,
      disable: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        logtime: null,
        gongxu: null,
        jztype: null,
        sbname: null,
        opertype: null,
        heatid: null,
        heatendtime: null,
        gongxuren: null,
        diaodu: null,
        lgqztime: null,
        exceptnote: null,
        zhilingren: null,
        zhilingnote: null,
        zhunbeitime: null,
        sbdongzuotime: null,
        caozuotime: null,
        wanbitime: null,
        zhixingren: null,
        dlnote: null,
        status: null,
        panding: null,
        biaozhuntime: null,
        shijitime: null
      },

      routerId: "",
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        logtime: [
          { required: true, message: "日期不能为空", trigger: "blur" }
        ],
        gongxu: [
          { required: true, message: "工位不能为空", trigger: "change" }
        ],
        jztype: [
          { required: true, message: "介质类型不能为空", trigger: "change" }
        ],
        sbname: [
          { required: true, message: "设备名称不能为空", trigger: "blur" }
        ],
        opertype: [
          { required: true, message: "操作类型不能为空", trigger: "change" }
        ],
        gongxuren: [
          { required: true, message: "岗位人员签字不能为空", trigger: "blur" }
        ],
        zhilingnote: [
          { required: true, message: "指令内容不能为空", trigger: "blur" }
        ],
        zhunbeitime: [
          { required: true, message: "接准备指令时间不能为空", trigger: "blur" }
        ],
        wanbitime: [
          { required: true, message: "执行完毕时间不能为空", trigger: "change" }
        ],
        zhixingren: [
          { required: true, message: "执行人不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    //this.getList();
    this.routerId = this.$route.params && this.$route.query.sid;
    this.$set(this.form, "jztype", this.routerId);
    this.getDicts("jiezhitingsonggongxu").then(response => {
      this.gongxuOptions = response.data;
    });
    // this.getDicts("jiezhileixing").then(response => {
    //   this.jztypeOptions = response.data;
    // });
    this.getDicts("jiezhicaozuo").then(response => {
      this.opertypeOptions = response.data;
    });
    // this.getDicts("jiezhizhiling").then(response => {
    //   this.statusOptions = response.data;
    // });
    this.getShebeiName(this.routerId);
    var now = new Date();
       var year = now.getFullYear(); //得到年份
       var month = now.getMonth(); //得到月份
       var date = now.getDate(); //得到日期
       month = month + 1;
       month = month.toString().padStart(2, "0");
       date = date.toString().padStart(2, "0");
       var defaultDate = `${year}-${month}-${date}`;
       this.$set(this.form, "logtime", defaultDate);
  },
  methods: {
    /** 查询介质停送记录列表 */
    getList() {
      this.loading = true;
      listJizhi(this.queryParams).then(response => {
        this.jizhiList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },


     changegongxu(val){
      
       getHeatIdInfo(val).then(response => {   

        this.form.heatid=response.data.heatid;
        this.form.heatendtime=response.data.heatendtime;
        this.$forceUpdate();  
      });    
      },
    
    getShebeiName(type){
       console.log(type);
       getEmsequipcfg(type).then(response => {   
        this.shebeiOptions=response.equip;
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
        id: null,
        logtime: null,
        gongxu: null,
        jztype: null,
        sbname: null,
        opertype: null,
        heatid: null,
        heatendtime: null,
        gongxuren: null,
        diaodu: null,
        lgqztime: null,
        exceptnote: null,
        zhilingren: null,
        zhilingnote: null,
        zhunbeitime: null,
        sbdongzuotime: null,
        caozuotime: null,
        wanbitime: null,
        zhixingren: null,
        dlnote: null,
        status: null,
        panding: null,
        biaozhuntime: null,
        shijitime: null
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
      this.title = "添加介质停送记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getJizhi(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改介质停送记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if(this.form.heatendtime=="" &&this.form.exceptnote==null&&this.form.opertype=="停止"){
            this.$message.error('停止操作且炉次结束时间为空时，必须填写异常描述');
            return;
          }
          addJizhi(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.reset();
            });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除介质停送记录编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delJizhi(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有介质停送记录数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportJizhi(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>