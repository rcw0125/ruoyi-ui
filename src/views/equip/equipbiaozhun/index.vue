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
         <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="设备ID" v-show="false" prop="sbid">
        <el-input
          v-model="queryParams.sbid"
          placeholder="请输入设备ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> 
      <el-form-item label="设备名称" v-show="false" prop="sbname">
        <el-input
          v-model="queryParams.sbname"
          placeholder="请输入设备名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
     
        <el-form-item label="设备名称" v-show="false" prop="parentId" >
          <treeselect v-model="queryParams.sbid"  width="400px" :options="quyuOptions" :normalizer="normalizer" placeholder="请选择设备名称" />
        </el-form-item>
         
      
      <!-- <el-form-item label="点检路线" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入点检路线"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="点检单位" v-show="routerId==1" prop="dept">
        <el-select v-model="queryParams.dept" placeholder="请选择点检单位" clearable size="small">
          <el-option
            v-for="dict in deptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="点检类别" prop="leibie">
        <el-select v-model="queryParams.leibie" placeholder="请选择点检类别" clearable size="small">
          <el-option
            v-for="dict in leibieOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
       <el-form-item label="点检等级" prop="fenji">
        <el-select v-model="queryParams.fenji" placeholder="请选择点检等级" clearable size="small">
          <el-option
            v-for="dict in fenjiOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="点检周期" prop="zhouqi">
        <el-select v-model="queryParams.zhouqi" placeholder="请选择点检周期" clearable size="small">
          <el-option
            v-for="dict in zhouqiOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="备注" prop="note">
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
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:equipbiaozhun:add']"
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
          v-hasPermi="['system:equipbiaozhun:edit']"
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
          v-hasPermi="['system:equipbiaozhun:remove']"
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
          v-hasPermi="['system:equipbiaozhun:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="equipbiaozhunList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="设备ID" align="center" prop="sbid" />
      <el-table-column label="设备名称" align="center"   prop="sbname" width="180">
       <template slot-scope="scope">
          <router-link :to="'/equip/dianjian?sid=' + scope.row.sbid" class="link-type">
            <span>{{ scope.row.sbname }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="点检路线" align="center" prop="name" />
      <el-table-column label="点检单位" align="center" prop="dept"  v-if="routerId==1" />
      <el-table-column label="点检班组" align="center" prop="team"  />
      <el-table-column label="点检类别" align="center" prop="leibie" />
      <el-table-column label="点检周期" align="center" prop="zhouqi"  />
      <el-table-column label="关注参数" align="center" width="100" :show-overflow-tooltip="true" prop="yxcs" />
      <el-table-column label="点检等级" align="center" prop="fenji"  />
      <!-- <el-table-column label="周点检次数" align="center" prop="zhoucishu"   /> -->
   
      <!-- <el-table-column label="最近点检" align="center" prop="lasttime"  width="180" v-if="routerId==1" /> -->
         <el-table-column label="顺序" align="center" prop="ordernum" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:equipbiaozhun:edit']"
          >修改</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:equipbiaozhun:remove']"
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
      </el-col>
    </el-row>  

   

    <!-- 添加或修改点检标准对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        
        <!-- <el-form-item label="设备id" v-show="false" prop="sbid">
          <el-input v-model="form.sbid" placeholder="请输入设备id" />
        </el-form-item> -->
        <el-form-item label="设备名称" prop="sbname">
          <el-input v-model="form.sbname" readonly placeholder="请输入设备名称" />
        </el-form-item>
        <!-- <el-form-item label="设备名称" prop="sbid">
          <treeselect v-model="form.sbid" :options="quyuOptions" :normalizer="normalizer" placeholder="请选择设备名称" />
        </el-form-item> -->
       
        <el-form-item label="点检路线" prop="name">
          <el-input v-model="form.name" placeholder="请输入点检路线" />
        </el-form-item>
        <el-form-item label="点检标准">
          <editor v-model="form.biaozhun" :min-height="192"/>
        </el-form-item>
        <el-form-item label="点检单位" v-show="routerId==1"  prop="dept">
          <el-select v-model="form.dept" @change="getPost" placeholder="请选择点检单位">
            <el-option
              v-for="dict in deptOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="点检班组"  prop="team">
          <el-select v-model="form.team" placeholder="请选择点检班组">
            <el-option
              v-for="dict in teamOptions"
              :key="dict.postName"
              :label="dict.postName"
              :value="dict.postName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="点检类别" prop="leibie">
          <el-select v-model="form.leibie" placeholder="请选择点检类别">
            <el-option
              v-for="dict in leibieOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="点检周期" prop="zhouqi">
          <el-select v-model="form.zhouqi" placeholder="请选择点检周期">
            <el-option
              v-for="dict in zhouqiOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="关注参数" prop="yxcs">
          <el-input v-model="form.yxcs" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="点检等级" prop="fenji">
          <el-select v-model="form.fenji" placeholder="请选择点检等级">
            <el-option
              v-for="dict in fenjiOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="顺序" prop="ordernum">
          <!-- <el-input v-model="form.ordernum" placeholder="请输入顺序" /> -->
           <el-input-number v-model="form.ordernum" controls-position="right" :min="0"  :max="500"/>
        </el-form-item>
        <!-- <el-form-item label="备注" prop="note">
          <el-input v-model="form.note" type="textarea"  :rows="3" placeholder="请输入备注" />
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
import { listEquipbiaozhun,listMyEquipbiaozhun, getEquipbiaozhun, delEquipbiaozhun, addEquipbiaozhun, updateEquipbiaozhun, exportEquipbiaozhun,getPostinfo } from "@/api/system/equipbiaozhun";
import { listQuyu } from "@/api/system/quyu";
import { treeselect } from "@/api/system/quyu";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Equipbiaozhun",
  components: {
    Treeselect
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      defaultProps: {
        children: "children",
        label: "name"
      },
     // 已选择设备名称
      sbname: "",
      sbid: undefined,
      yxcs:"",
      fenji:"",
    // 设备区域名称
      quyuName: undefined,
      
      // 导出遮罩层
      exportLoading: false,

      // 设备区域树选项
      quyuOptions: [],
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
      // 点检标准表格数据
      equipbiaozhunList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 点检单位字典
      deptOptions: [],
      // 点检班组字典
      teamOptions: [],
      // 点检类别字典
      leibieOptions: [],
      // 点检周期字典
      zhouqiOptions: [],
      // 点检等级字典
      fenjiOptions: [],
      //路由参数
      routerId: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sbid: null,
        sbname: null,
        name: null,
        biaozhun: null,
        dept: null,
        team: null,
        leibie: null,
        zhouqi: null,
        note: null,
        yxcs: null,
        fenji: null
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
        name: [
          { required: true, message: "点检路线不能为空", trigger: "blur" }
        ],
        biaozhun: [
          { required: true, message: "点检标准不能为空", trigger: "blur" }
        ],
        team: [
          { required: true, message: "点检班组不能为空", trigger: "change" }
        ],
        dept: [
          { required: true, message: "点检单位不能为空", trigger: "change" }
        ],
        leibie: [
          { required: true, message: "点检类别不能为空", trigger: "change" }
        ],
        zhouqi: [
          { required: true, message: "点检周期不能为空", trigger: "change" }
        ],
         fenji: [
          { required: true, message: "点检等级不能为空", trigger: "change" }
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
    //this.routerId = this.$route.params && this.$route.params.id;
    //使用query，而不是param（router配置里的使用）
    this.routerId = this.$route.params && this.$route.query.id;
    console.log(this.routerId);
    this.getList();
    this.getDicts("lgdept").then(response => {
      this.deptOptions = response.data;
    });
    // this.getDicts("sys_user_team").then(response => {
    //   this.teamOptions = response.data;
    // });
    this.getDicts("dianjianleibie").then(response => {
      this.leibieOptions = response.data;
    });
    this.getDicts("dianjianzhouqi").then(response => {
      this.zhouqiOptions = response.data;
    });
    this.getDicts("djdengji").then(response => {
      this.fenjiOptions = response.data;
    });
    this.getTreeselect();
    if(this.routerId!=1){
        this.getPost("0");
    }
    
  },
  methods: {

        // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 节点单击事件 设备树点击
    handleNodeClick(data) {
     
      this.queryParams.sbid = data.id;
      this.sbname=data.name;
      this.sbid= data.id;
      this.yxcs=data.yxcs;
      this.fenji=data.fenji;
      this.handleQuery();
     
    },

    /** 查询点检标准列表 */
    getList() {
      this.loading = true;
      if(this.routerId==1){
         listEquipbiaozhun(this.queryParams).then(response => {
        this.equipbiaozhunList = response.rows;
        this.total = response.total;
        this.loading = false;
        });
      }
      else{
        listMyEquipbiaozhun(this.queryParams).then(response => {
        this.equipbiaozhunList = response.rows;
        this.total = response.total;
        this.loading = false;
          });

      }
      
      
    },

    getPost(val){
      console.log(val);
      getPostinfo(val).then(response => {
        this.teamOptions=response.posts;
        console.log(response.posts);
      });
    },

    /** 查询部门下拉树结构 */
    getTreeselect() {
      listQuyu().then(response => {
        this.quyuOptions = this.handleTree(response.data, "id");
        // console.log(this.quyuOptions);
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
        name: null,
        biaozhun: null,
        dept: null,
        team: null,
        leibie: null,
        zhouqi: null,
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
      this.form.sbid=this.sbid;
      this.form.sbname=this.sbname;
      this.form.fenji=this.fenji;
      this.form.yxcs=this.yxcs;
      this.form.ordernum=11;
      this.open = true;
      this.title = "添加点检标准";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      const id = row.id || this.ids
      getEquipbiaozhun(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改点检标准";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
           if(this.form.sbid==null){
                this.$message.error('设备名称不能为空，请选择设备！');
                return;
            };
            if(this.form.biaozhun==null){
                this.$message.error('点检标准不能为空，请填写点检标准！');
                return;
            };
          if (this.form.id != null) {

            updateEquipbiaozhun(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addEquipbiaozhun(this.form).then(response => {
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
      this.$confirm('是否确认删除点检标准编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delEquipbiaozhun(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有点检标准数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportEquipbiaozhun(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>

