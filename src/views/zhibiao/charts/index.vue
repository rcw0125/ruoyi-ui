<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :rules="rules" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="单位" prop="dept">
        <el-select v-model="queryParams.dept" placeholder="请选择所属单位" @change="changedept" clearable size="small">
          <el-option
            v-for="dict in deptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="项目" prop="name">
        <el-select v-model="queryParams.name" placeholder="请选择项目"  clearable size="small">
          <el-option
            v-for="dict in zhibiaoOptions"
            :key="dict.name"
            :label="dict.name"
            :value="dict.name"
          />
        </el-select>
      </el-form-item>
    
      <el-form-item label="指标日期" >
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
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button type="success" icon="el-icon-refresh" size="mini" @click="handleExport">导出Excel</el-button>
      </el-form-item>
     
    </el-form>
    <!-- echarts图形控件 -->
    <div id="myChart" :style="{width: '95%', height: '600px'}"></div>
    

    <el-table v-loading="loading" :data="zhibiaoList"  @row-dblclick="dbSelected" >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="项目" align="center" prop="name" />
      <el-table-column label="所属单位" align="center" prop="dept" />
      <el-table-column label="计划值" align="center" prop="planval" />
      <el-table-column label="完成值" align="center" prop="val" />
      <el-table-column label="影响原因" align="center" prop="reason" />
      <el-table-column label="采取措施" align="center" prop="cuoshi" />
      <el-table-column label="日期" align="center" prop="logtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.logtime, '{y}-{m}-{d}') }}</span>
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

    <!-- 添加或修改指标记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
       
        <el-form-item label="所属单位"   prop="dept">
          <el-select v-model="form.dept" @change="changeFormDept"  :disabled="disable" placeholder="请选择所属单位">
            <el-option
              v-for="dict in deptOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="项目"   prop="name">
          <el-select v-model="form.name" placeholder="请选择项目"   :disabled="disable"  clearable size="small">
          <el-option
            v-for="dict in zhibiaoFormOptions"
            :key="dict.name"
            :label="dict.name"
            :value="dict.name"
          />
        </el-select>
        </el-form-item>
        <el-form-item label="计划值" prop="planval">
          <el-input v-model="form.planval" oninput="value=value.replace(/[^\d.]/g,'')" maxlength="10" placeholder="请输入计划值" />
        </el-form-item>
        <el-form-item label="完成值" prop="val">
          <el-input v-model="form.val" oninput="value=value.replace(/[^\d.]/g,'')" maxlength="5" placeholder="请输入完成值" />
        </el-form-item>
        <el-form-item label="影响原因" prop="reason">
          <el-input v-model="form.reason" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="采取措施" prop="cuoshi">
          <el-input v-model="form.cuoshi" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="日期"   prop="logtime">
          <el-date-picker clearable size="small"
            :disabled="logtimedisable"
            v-model="form.logtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listZhibiao, getZhibiao, delZhibiao, addZhibiao, updateZhibiao, exportZhibiao,getinfo } from "@/api/system/zhibiao";

export default {
  name: "Zhibiao",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: false,
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
      // 指标记录表格数据
      zhibiaoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      disable: false,
      logtimedisable: false,
      // 所属单位字典
      deptOptions: [],
      //指标选择框
      zhibiaoOptions: [],
      //增加对话框指标选择框
      zhibiaoFormOptions: [],
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 100,
        name: null,
        dept: null,
        logtime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "项目不能为空", trigger: "blur" }
        ],
        dept: [
          { required: true, message: "所属单位不能为空", trigger: "change" }
        ]
        
      }
    };
  },
  created() {
   // this.getList();
    this.getDicts("lgdept").then(response => {
      this.deptOptions = response.data;
    });
    // this.$set(this.queryParams, "dept", "冶炼车间");
    
  },
  mounted(){
    //this.getList();
  },
  methods: {
    /** 查询指标记录列表 */
    getList() {
       this.$refs["queryForm"].validate(valid => {
        if (valid) {
           this.loading = true;
          listZhibiao(this.addDateRange(this.queryParams, this.dateRange)).then(response => {

           this.zhibiaoList = response.rows;
           this.total = response.total;
           this.loading = false;
           this.drawLine(response.rows);
       
       
           });
        }
      });

     
    },
    drawLine(datas){
        let shuliang=datas.length-1
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
         myChart.setOption({
            title: { text:datas[0].name+ '趋势图' },
            legend: {
			          data:"指标"
		        },
            toolbox: {
              show: true,
              feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
            },
            tooltip: {},
            xAxis: {
                data:  datas.map(item => {	return item.logtime})
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              
                type: 'line',
                data: datas.map(item => {	return item.val}),
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                },
               markLine: {
                data: [
                  {
                               silent:false,             //鼠标悬停事件  true没有，false有
                               lineStyle:{               //警戒线的样式  ，虚实 dotted虚线  solid实线 颜色
                                   type:"dotted", 
                               },
                                   label:{
                                   position:'end',
                                   formatter:"计划值线:"+datas[shuliang].planval
                               },
                               yAxis:datas[shuliang].planval         
                              
                           },
                   // {type: 'average', name: '平均值'}
                 ]
               }
            }]
        });
        myChart.resize();
       },

    

     changedept(val){
       getinfo(val).then(response => {   
        this.zhibiaoOptions=response.dept;
      });    
      },
      changeFormDept(val){
       getinfo(val).then(response => {   
        this.zhibiaoFormOptions=response.dept;
      });     
      },
    // 所属单位字典翻译
    deptFormat(row, column) {
      return this.selectDictLabel(this.deptOptions, row.dept);
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
        name: null,
        dept: null,
        planval: null,
        val: null,
        reason: null,
        cuoshi: null,
        logtime: null
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
   
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
       var now = new Date();
       var year = now.getFullYear(); //得到年份
       var month = now.getMonth(); //得到月份
       var date = now.getDate(); //得到日期
       month = month + 1;
       month = month.toString().padStart(2, "0");
       date = date.toString().padStart(2, "0");
       var defaultDate = `${year}-${month}-${date}`;
       this.$set(this.form, "logtime", defaultDate);
       this.logtimedisable=false;
       this.disable=false;
      this.open = true;
      this.title = "添加指标记录";
    },
 
    dbSelected(row) {
      this.reset();
      this.form = {

        name: row.name,
        dept: row.dept,
        planval: row.planval,
        val: row.val,
        reason: row.reason,
        cuoshi: row.cuoshi,
        logtime: row.logtime
      };
       this.logtimedisable=false;
        this.disable=true;
        this.open = true;
        this.title = "指标分析详情";
     
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
       this.disable=true;
        this.logtimedisable=true;
      getZhibiao(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改指标记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateZhibiao(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZhibiao(this.form).then(response => {
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
      this.$confirm('是否确认删除指标记录编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delZhibiao(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有指标记录数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportZhibiao(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>