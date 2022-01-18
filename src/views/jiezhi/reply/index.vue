<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      
      <el-form-item prop="jztype">
        <el-input v-model="queryParams.jztype" v-show="false" placeholder="介质类型" > </el-input>
      </el-form-item>
      <el-form-item  prop="status">
         <el-input v-model="queryParams.status" v-show="false"  > </el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">刷新</el-button>
        <el-button
          type="danger"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >回复确认</el-button>
      </el-form-item>
    </el-form>

  
    <el-table v-loading="loading" :data="jizhiList" @row-dblclick="handleUpdate" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" width="70" />
      <el-table-column label="日期" align="center" prop="logtime" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.logtime, '{m}月{d}日') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工位" align="center" prop="gongxu"  />
      <el-table-column label="介质类型" align="center" prop="jztype"  />
      <el-table-column label="设备名称" align="center" prop="sbname" width="120" />
      <el-table-column label="操作类型" align="center" prop="opertype" >
      <template slot-scope="scope">
          <el-tag :type="scope.row.opertype == '启动' ? 'success' : 'danger'">{{scope.row.opertype}}</el-tag>
        </template>
      </el-table-column>
   <el-table-column label="指令人" align="center" prop="zhilingren" />
      <el-table-column label="指令内容" align="center" prop="zhilingnote" />
       <el-table-column label="接操作指令时间" align="center" prop="caozuotime" />
      <!-- <el-table-column label="炉号" align="center" prop="heatid" width="120" />
      <el-table-column label="炉次结束时间" align="center" prop="heatendtime" >
      <template slot-scope="scope">
          <span>{{ parseTime(scope.row.heatendtime, '{h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="岗位人员签字" align="center" prop="gongxuren" />
        -->
      <!-- <el-table-column label="调度" align="center" prop="diaodu" />
      <el-table-column label="炼钢签字时间" align="center" prop="lgqztime" >
      <template slot-scope="scope">
          <span>{{ parseTime(scope.row.lgqztime, '{h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="异常描述" align="center" prop="exceptnote" /> -->
      <!-- 
      <el-table-column label="接准备指令时间" align="center" prop="zhunbeitime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.zhunbeitime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备最新动作时间" align="center" prop="sbdongzuotime" />
     
      <el-table-column label="执行完毕时间" align="center" prop="wanbitime" />
      <el-table-column label="执行人" align="center" prop="zhixingren" />
      <el-table-column label="备注" align="center" prop="dlnote" />
      <el-table-column label="指令状态" align="center" prop="status"/>
      <el-table-column label="判定" align="center" prop="panding" />
      <el-table-column label="标准时间" align="center" prop="biaozhuntime" />
      <el-table-column label="实际用时" align="center" prop="shijitime" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:jizhi:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:jizhi:remove']"
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

    <!-- 添加或修改介质停送记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <!-- <el-form-item label="日期" prop="logtime">
          <el-date-picker clearable size="small"
            v-model="form.logtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item> -->
        <!-- <el-form-item label="工位" prop="gongxu">
          <el-select v-model="form.gongxu" placeholder="请选择工位">
            <el-option
              v-for="dict in gongxuOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="介质类型" prop="jztype">
          <el-select v-model="form.jztype" placeholder="请选择介质类型">
            <el-option
              v-for="dict in jztypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="设备名称" prop="sbname">
          <el-input v-model="form.sbname"  readonly placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="操作类型" prop="opertype">
          <el-input v-model="form.opertype"  readonly placeholder="请选择操作类型" />
          
        </el-form-item>
        <!-- <el-form-item label="炉号" prop="heatid">
          <el-input v-model="form.heatid" placeholder="请输入炉号" />
        </el-form-item>
        <el-form-item label="炉次结束时间" prop="heatendtime">
          <el-input v-model="form.heatendtime" placeholder="请输入炉次结束时间" />
        </el-form-item>
        <el-form-item label="岗位人员签字" prop="gongxuren">
          <el-input v-model="form.gongxuren" placeholder="请输入岗位人员签字" />
        </el-form-item> -->
        <!-- <el-form-item label="调度" prop="diaodu">
          <el-input v-model="form.diaodu" readonly placeholder="请输入调度" />
        </el-form-item>
        <el-form-item label="炼钢签字时间" prop="lgqztime">
          <el-input v-model="form.lgqztime" readonly placeholder="请输入炼钢签字时间" />
        </el-form-item>
        <el-form-item label="炼钢异常描述" prop="exceptnote">
          <el-input v-model="form.exceptnote" readonly type="textarea" placeholder="请输入异常描述" />
        </el-form-item> -->
        <!-- <el-form-item label="指令人" prop="zhilingren">
          <el-input v-model="form.zhilingren" placeholder="请输入指令人" />
        </el-form-item> -->
        <el-form-item label="指令内容" prop="zhilingnote">
          <el-input v-model="form.zhilingnote" type="textarea" readonly placeholder="请输入指令内容" />
        </el-form-item>
        <el-form-item label="接准备指令时间" prop="zhunbeitime">
           <el-input v-model="form.zhunbeitime"  readonly placeholder="请输入接操作指令时间" />
        </el-form-item>
        <el-form-item label="接操作指令时间" prop="caozuotime">
          <el-input v-model="form.caozuotime"  readonly placeholder="请输入接操作指令时间" />
        </el-form-item>
        <el-form-item label="设备动作时间" prop="sbdongzuotime">
          <el-input v-model="form.sbdongzuotime" readonly  placeholder="请输入设备最新动作时间" />
        </el-form-item>
        <el-form-item label="执行人" prop="zhixingren">
          <el-input v-model="form.zhixingren" placeholder="请输入执行人" />
        </el-form-item>
        <el-form-item label="备注" prop="dlnote">
          <el-input v-model="form.dlnote" type="textarea" placeholder="请输入内容 " />
        </el-form-item>
        <!-- 
        
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listJizhi, getJizhi, delJizhi, addJizhi, updateJizhi, exportJizhi,getEmsequipcfg,reply } from "@/api/system/emsjiezhi";

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
      // 表单参数
      form: {},
      routerId: "",
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
    this.routerId = this.$route.params && this.$route.query.sid;
    this.$set(this.queryParams, "jztype", this.routerId);
    this.$set(this.queryParams, "status", "执行中");
    this.getList();
    this.getDicts("jiezhitingsonggongxu").then(response => {
      this.gongxuOptions = response.data;
    });
    this.getDicts("jiezhileixing").then(response => {
      this.jztypeOptions = response.data;
    });
    this.getDicts("jiezhicaozuo").then(response => {
      this.opertypeOptions = response.data;
    });
    this.getDicts("jiezhizhiling").then(response => {
      this.statusOptions = response.data;
    });
    this.getShebeiName();
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
    
    getShebeiName(){
       getEmsequipcfg().then(response => {   
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
        this.title = "确认介质停送申请";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
            reply(this.form).then(response => {
              this.msgSuccess("操作成功");
              this.open = false;
              this.getList();
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