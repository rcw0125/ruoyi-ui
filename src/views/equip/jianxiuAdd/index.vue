<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="区域名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入区域名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
	    <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button
          type="info"
          plain
          icon="el-icon-sort"
          size="mini"
          @click="toggleExpandAll"
        >展开/折叠</el-button>
      </el-form-item>
    </el-form>

    <el-table
       v-if="refreshTable"
      v-loading="loading"
      :data="quyuList"
      row-key="id"
      
       :default-expand-all="isExpandAll"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
     
      <el-table-column label="设备名称"  prop="name" width="260" />
       <el-table-column label="设备id" align="center" prop="id" />
      <!-- <el-table-column label="显示顺序" align="center" prop="orderNum" /> -->
      <!-- <el-table-column label="部件名称" align="center" prop="note" /> -->
      <el-table-column label="创建时间" align="center" prop="createTime" width="200">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
       <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <dict-tag :options="statusOptions" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
         
           <el-button 
            size="mini" 
            type="text" 
            icon="el-icon-plus" 
            @click="handleAdd(scope.row)"
            
          >新增检修计划</el-button>
         
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改设备区域对话框 -->
    <!-- 添加或修改计划检修对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="设备ID" prop="sbid">
          <el-input v-model="form.sbid" readonly placeholder="请输入设备ID" />
        </el-form-item>
        <el-form-item label="设备名称" prop="sbname">
          <el-input v-model="form.sbname" readonly placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="检修单位" v-show="false" prop="dept">
          <el-input v-model="form.dept" placeholder="请输入检修单位" />
          
        </el-form-item>
        <el-form-item label="检修班组" prop="team">
          <el-select v-model="form.team" placeholder="请选择检修班组">
            <el-option
              v-for="dict in teamOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划人" v-show="false" prop="jhr">
          <el-input v-model="form.jhr" placeholder="请输入计划人" />
        </el-form-item>
        <el-form-item label="计划日期" prop="jhrq">
          <el-date-picker clearable size="small"
            v-model="form.jhrq"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择计划日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="登记时间" v-show="false" prop="djtime">
          <el-input v-model="form.djtime" placeholder="请输入登记时间" />
        </el-form-item>
        <el-form-item label="检修内容" prop="jxnr">
          <el-input v-model="form.jxnr" type="textarea"  :rows="5" placeholder="请输入检修内容" />
        </el-form-item>
        <!-- <el-form-item label="检修描述" v-show="false" prop="jxms">
          <el-input v-model="form.jxms" type="textarea"  :rows="5" placeholder="请输入检修描述" />
        </el-form-item> -->
        <el-form-item label="检修时间" v-show="false" prop="jxtime">
          <el-input v-model="form.jxtime" placeholder="请输入检修时间" />
        </el-form-item>
        <el-form-item v-show="false" label="状态">
           <el-input v-model="form.status" placeholder="请输入检修时间" />
            
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
import { listQuyu, getQuyu, delQuyu, addQuyu, updateQuyu, exportQuyu } from "@/api/system/quyu";
import { listJianxiu, getJianxiu, delJianxiu, addJianxiu, updateJianxiu, exportJianxiu } from "@/api/system/jianxiu";
import { getUserProfile } from "@/api/system/user";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "Quyu",
  components: {
    Treeselect
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 设备区域表格数据
      quyuList: [],
     // 检修班组树选项
      teamOptions: [],
      // 设备区域树选项
      quyuOptions: [],

      // 检修车间
      dept: "",
      // 计划人
      username: "",
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 重新渲染表格状态
      refreshTable: true,
      isExpandAll:false,
      // 状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        name: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        sbid: [
          { required: true, message: "设备ID不能为空", trigger: "blur" }
        ],
        sbname: [
          { required: true, message: "设备名称不能为空", trigger: "blur" }
        ],
        team: [
          { required: true, message: "检修班组不能为空", trigger: "blur" }
        ],
        jhrq: [
          { required: true, message: "计划日期不能为空", trigger: "blur" }
        ],
        jxnr: [
          { required: true, message: "检修内容不能为空", trigger: "blur" }
        ],
        jxms: [
          { required: true, message: "检修描述不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态(等待检修、检修完成、异常结束)不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
    this.getUser();
  },
  methods: {

    getUser() {
      getUserProfile().then(response => {
        this.username=response.data.nickName;
        this.dept=response.data.dept.deptName;
        console.log(response.data.dept.deptName);
        this.getDicts(response.data.dept.deptName+"检修班组").then(response => {
        this.teamOptions = response.data;
    });
        
      });
    },
    /** 查询设备区域列表 */
    getList() {
      this.loading = true;
      listQuyu(this.queryParams).then(response => {
        this.quyuList = this.handleTree(response.data, "id", "parentId");
        this.loading = false;
      });
    },
    /** 转换设备区域数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children
      };
    },
    
    /** 展开/折叠操作 */
    toggleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },

	/** 查询部门下拉树结构 */
    getTreeselect() {
      listQuyu().then(response => {
        this.quyuOptions = this.handleTree(response.data, "id");
        // this.quyuOptions = [];
        // const data = { id: 0, name: '顶级节点', children: [] };
        // data.children = this.handleTree(response.data, "id", "parentId");
        // this.quyuOptions.push(data);
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
        dept: null,
        team: null,
        jhr: null,
        jhrq: null,
        djtime: null,
        jxnr: null,
        jxms: null,
        jxtime: null,
        status: "等待检修"
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      if (row != undefined) {
        
        this.form.sbid = row.id;
         this.form.sbname = row.name;
         this.form.dept=this.dept;
         this.form.jhr=this.username;
      }
	  
      this.open = true;
      this.title = "添加检修计划";
    },
  
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          addJianxiu(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
             
            });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm('是否确认删除设备区域编号为"' + row.id + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delQuyu(row.id);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    }
  }
};
</script>
