<template>
  <div class="app-container">
      <el-row :gutter="20">
        <!--部门数据-->
      <el-col :span="5" :xs="24">
        <div class="text-danger">{{sbname}}</div>
        <div class="head-container">
          <el-input
            v-model="quyuName"
            placeholder="请输入设备名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          />
        </div>
        
        <!-- <el-row> 
              <h4 class="text-danger">
             {{sbname}}
          </h4>
           </el-row> -->
        <div class="head-container">
          <el-tree
             style="height: 700px; overflow-y: scroll;"
            :data="quyuOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
            default-expand-all
            @node-click="handleNodeClick"
          />
         
        </div>
      </el-col>
      <!--用户数据-->
      <el-col :span="19" :xs="24">

         <el-form :model="form" ref="form" :rules="rules" label-width="100px">
       <!-- <el-form-item style="width:100%;">
        <el-button
           
          size="mini"
          type="danger"
          style="width:50%;"
          @click="close"
        >
        关闭     
        </el-button>
      </el-form-item> -->
      <el-form-item label="设备id" v-show="false" prop="sbid">
          <el-input v-model="form.sbid" readonly placeholder="请输入设备id" />
        </el-form-item>
        <el-form-item label="设备名称" prop="sbid">
          <el-input v-model="form.sbname" readonly placeholder="请输入设备名称" />
          <!-- <treeselect v-model="form.sbid" :options="quyuOptions" :normalizer="normalizer" placeholder="请选择设备名称" /> -->
        </el-form-item>
        
         <el-form-item label="故障内容" prop="djcontent">
          <el-input v-model="form.djcontent" type="textarea" rows="2"  placeholder="请输入内容" />
        </el-form-item>
      <el-form-item label="登记人电话" prop="djrphone">
          <el-input v-model="form.djrphone" placeholder="请输入登记人电话" maxlength="11"  />
      </el-form-item>
      <el-form-item label="责任车间" prop="djwxdept">
        <el-select v-model="form.djwxdept" placeholder="请选择责任车间" clearable size="small">
          <el-option
            v-for="dict in djwxdeptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
       
      </el-form-item>
       <el-form-item style="width:100%;">
        <el-button
           
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click="submitForm"
        >
         提 交 故 障     
        </el-button>
      </el-form-item>
    </el-form>
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
     
    <el-tab-pane label="故障记录" name="second">

       <el-form :model="queryParamsGz" ref="queryFormGz" :inline="true" v-show="false" label-width="68px">
      <!-- <el-form-item label="设备id" prop="sbid">
        <el-input
          v-model="queryParams.sbid"
          placeholder="请输入设备id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
        <!-- <el-form-item label="设备名称" prop="parentId" >
          <treeselect v-model="queryParams.sbid"  width="400px" :options="quyuOptions" :normalizer="normalizer" placeholder="请选择设备名称" />
        </el-form-item> -->
      <!-- <el-form-item label="设备名称" prop="sbname">
        <el-input
          v-model="queryParams.sbname"
          placeholder="请输入设备名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="登记车间" prop="djdept">
        <el-select v-model="queryParamsGz.djdept" placeholder="请选择登记车间" clearable size="small">
          <el-option
            v-for="dict in deptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="登记人" prop="djr">
        <el-input
          v-model="queryParamsGz.djr"
          placeholder="请输入登记人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="登记日期" prop="djsk">
        <el-date-picker clearable size="small"
          v-model="queryParamsGz.djsk"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择登记日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="责任车间" prop="djwxdept">
        <el-select v-model="queryParamsGz.djwxdept" placeholder="请选择责任车间" clearable size="small">
          <el-option
            v-for="dict in djwxdeptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      
     
      <el-form-item label="故障分类" prop="jsclfl">
        <el-select v-model="queryParamsGz.jsclfl" placeholder="请选择故障分类" clearable size="small">
          <el-option
            v-for="dict in jsclflOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
     
      <!-- <el-form-item label="故障分类" prop="clgzfenlei">
        <el-input
          v-model="queryParams.clgzfenlei"
          placeholder="请输入故障分类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      
     
      <!-- <el-form-item label="验证结果" prop="yzresult">
        <el-select v-model="queryParamsGz.yzresult" placeholder="请选择验证结果" clearable size="small">
          <el-option
            v-for="dict in yzresultOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item> -->
     
     
    </el-form>

    <!-- <el-row :gutter="10" class="mb8">
     
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExportGz"
          v-hasPermi="['system:guzhang:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->

    <el-table v-loading="loading" :data="guzhangList">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="序号" align="center" prop="id" />
      <!-- <el-table-column label="设备id" align="center" prop="sbid" /> -->
      <el-table-column label="设备名称" align="center" prop="sbname" width="200px"/>
      <el-table-column label="登记车间" align="center" prop="djdept" />
      <el-table-column label="登记人" align="center" prop="djr" />
      <el-table-column label="登记时刻" align="center" prop="djsk" width="180">
      </el-table-column>
      <el-table-column label="故障内容" align="center" prop="djcontent" width="200px"/>
      <el-table-column label="维修车间" align="center" prop="djwxdept" width="110px"/>
      <el-table-column label="登记人电话" align="center" prop="djrphone" width="120px"/>
      <el-table-column label="接收人" align="center" prop="jsr" />
      <el-table-column label="故障初步分析" align="center" prop="jscontent" />
      <el-table-column label="故障大类" align="center" prop="jsclfl"  />
      <el-table-column label="预计处理时间(天)" align="center" prop="jsclsj" />
      <el-table-column label="接收时刻" align="center" prop="jssk" />
      <el-table-column label="接收用时" align="center" prop="jsys" />
      <el-table-column label="处理人" align="center" prop="clr" />
      <el-table-column label="故障处理过程" align="center" prop="clcontent" />
      <el-table-column label="故障小类" align="center" prop="clgzfenlei" />
      <el-table-column label="处理时刻" align="center" prop="clsk" />
      <el-table-column label="处理用时" align="center" prop="clys" />
      <el-table-column label="处理人电话" align="center" prop="clrphone" />
      <el-table-column label="验证人" align="center" prop="yzr" />
      <el-table-column label="验证结果" align="center" prop="yzresult" />
      <el-table-column label="验证内容" align="center" prop="yzcontent" />
      <el-table-column label="验证时刻" align="center" prop="yzsk" />
      <el-table-column label="验证用时" align="center" prop="yzys" />
      <el-table-column label="总用时" align="center" prop="totalys" />
      <el-table-column label="状态" align="center" prop="status" />
      <!-- <el-table-column label="是否维修标志，0 否  1是" align="center" prop="flag" /> -->
      
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParamsGz.pageNum"
      :limit.sync="queryParamsGz.pageSize"
      @pagination="getListGz"
    />
    </el-tab-pane>
    
     </el-tabs>
   
    

    
      </el-col>
      </el-row>

   

  </div>
</template>

<script>
import { listDianjianlist, getDianjianlist, delDianjianlist, addDianjianlist, updateDianjianlist, exportDianjianlist } from "@/api/system/dianjianlist";
import { treeselect } from "@/api/system/quyu";
import { getUserProfile } from "@/api/system/user";
import { listGuzhang, getGuzhang, delGuzhang, addGuzhang, updateGuzhang, exportGuzhang ,getAddInfo} from "@/api/system/guzhang";
import { listJianxiu, getJianxiu, delJianxiu, addJianxiu, updateJianxiu, exportJianxiu } from "@/api/system/jianxiu";

// 富文本组件
import EditorReadOnly from "@/components/EditorReadOnly"

export default {
  name: "Dianjianlist",
  components: {
    EditorReadOnly
  },
  data() {
    return {
      activeName: 'second',
      // 已选择设备名称
      sbname: "",
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
      // 点检记录表格数据
      dianjianlistList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 点检单位字典
      deptOptions: [],
      
      // 部门树选项
      quyuOptions: undefined,
      // 设备区域名称
      quyuName: undefined,
      // 点检班组字典
      teamOptions: [],
      // 点检类别字典
      leibieOptions: [],
      // 点检周期字典
      zhouqiOptions: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 点检结果字典
      djresultOptions: [],
      
      // 查询参数
      queryParamsGz: {
        pageNum: 1,
        pageSize: 10,
        sbid: null,
        sbname: null,
        djdept: null,
        djr: null,
        djsk: null,
        djcontent: null,
        djwxdept: null,
        djrphone: null,
        jsr: null,
        jscontent: null,
        jsclfl: null,
        jsclsj: null,
        jssk: null,
        jsys: null,
        clr: null,
        clcontent: null,
        clgzfenlei: null,
        clsk: null,
        clys: null,
        clrphone: null,
        yzr: null,
        yzresult: null,
        yzcontent: null,
        yzsk: null,
        yzys: null,
        totalys: null,
        flag: null
      },

      // 故障报修表格数据
      guzhangList: [],
      // 责任车间字典
      djwxdeptOptions: [],
      // 故障分类字典
      jsclflOptions: [],
      // 验证结果字典
      yzresultOptions: [],
      
       // 检修状态字典
      statusOptions:[{
          dictValue: '等待检修',
          dictLabel: '等待检修'
        },{
          dictValue: '检修完成',
          dictLabel: '检修完成'
        }, {
          dictValue: '异常结束',
          dictLabel: '异常结束'
        }],
      // 查询参数
      queryParamsJx: {
        pageNum: 1,
        pageSize: 10,
        sbid: null,
        sbname: null,
        dept: null,
        team: null,
        jhr: null,
        jhrq: null,
        djtime: null,
        jxnr: null,
        jxms: null,
        jxtime: null,
        status: null
      },
       // 计划检修表格数据
      jianxiuList: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
         sbid: [
          { required: true, message: "设备id不能为空", trigger: "blur" }
        ],
        sbname: [
          { required: true, message: "设备名称不能为空", trigger: "blur" }
        ],
        djdept: [
          { required: true, message: "登记车间不能为空", trigger: "change" }
        ],
        djr: [
          { required: true, message: "登记人不能为空", trigger: "blur" }
        ],
        djsk: [
          { required: true, message: "登记时刻不能为空", trigger: "blur" }
        ],
        djcontent: [
          { required: true, message: "故障内容不能为空", trigger: "blur" }
        ],
        djwxdept: [
          { required: true, message: "责任车间不能为空", trigger: "change" }
        ],
         djrphone: [
          { required: true, message: "登记人电话不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
      }
    };
  },
   watch: {
    // 根据名称筛选部门树
    quyuName(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.getList();
    this.getTreeselect();
    
    //故障的基础数据加载
    this.getDicts("weixiudept").then(response => {
      this.djwxdeptOptions = response.data;
    });
    this.getUser();
    
    
  },
  
  methods: {

   getUser() {
      getUserProfile().then(response => {
        this.form.djdept=response.data.dept.deptName;
        this.form.djr=response.data.nickName;
        //this.form.djrphone=response.data.phonenumber;
        //console.log(response.data.phonenumber);
        this.$set(this.form, 'djrphone', response.data.phonenumber)
        //this.$forceUpdate();  
       
      });
    },

    /** 查询点检记录列表 */
    getList() {
      this.loading = true;
      listDianjianlist(this.queryParams).then(response => {
        this.dianjianlistList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

     /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          addGuzhang(this.form).then(response => {
              this.msgSuccess("新增故障操作成功");    
              this.getListGz();
              this.form.djcontent=null;
            });
        }
      });
    },
    
     /** 搜索按钮操作 */
    handleQueryGz() {
      this.queryParamsGz.pageNum = 1;
      this.getListGz();
    },
     /** 重置按钮操作 */
    resetQueryGz() {
      this.resetForm("queryFormGz");
      this.handleQueryGz();
    },
    /** 查询故障报修列表 */
    getListGz() {
      this.loading = true;
      listGuzhang(this.queryParamsGz).then(response => {
        this.guzhangList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
   
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件 设备树点击
    handleNodeClick(data) {
      //this.curDeptId= data.id;
      console.log(this.activeName);
      this.sbname=data.label;
      this.queryParamsGz.sbid = data.id;
      this.form.sbid= data.id;
      this.form.sbname=data.label;
      this.handleQueryGz();
     
     
    },

    //tabs 页签切换操作
     handleTabClick(tab, event) {
        console.log(this.activeName);
         if(this.activeName=='first'){
           this.handleQuery();
        } else if(this.activeName=='second'){
           this.handleQueryGz();
        } else if(this.activeName=='third'){
           this.handleQueryJx();
        }
      },
    

   /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {       
        console.log(response.data);
        this.quyuOptions = response.data;
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
        sbid: null,
        sbname: null,
        bzhid: null,
        biaozhun: null,
        dept: null,
        team: null,
        leibie: null,
        zhouqi: null,
        bzhnote: null,
        zhoucishu: null,
        djr: null,
        djresult: null,
        djcontent: null,
        djtime: null,
        note: null,
        flag: null,
        djrq: null
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
    
   
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDianjianlist(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "查看点检记录";
      });
    },
    
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有点检记录数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportDianjianlist(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>

