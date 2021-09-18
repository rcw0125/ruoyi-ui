<template>
  <div class="app-container">
   <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
          <h2 class="text-danger">
           车间内部考评
          </h2>            
      </el-col>
    </el-row>
     <el-form ref="form" :model="form"  :rules="rules" label-width="100px">
      
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" :inline="true">
            <el-form-item  label="被考核人编码" prop="useraccount"  >
              <el-input v-model="form.useraccount" disabled placeholder="被考核人编码" class="redcolor"/>      
            </el-form-item>           
          </el-col>
         <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
            <el-form-item >
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              @click="selectUser"       
            >选择被考核人</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="被考核人" prop="nickname">
              <el-input v-model="form.nickname" disabled placeholder="被考核人" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="被考核单位" prop="deptname">
              <el-input v-model="form.deptname" disabled  placeholder="被考核单位" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="绩效扣分" prop="jxkf">
              <el-input oninput="value=value.replace(/[^\d.]/g,'')" maxlength="5" v-model="form.jxkf" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
             <el-form-item label="安全扣分" prop="aqkf">
              <el-input oninput="value=value.replace(/[^\d.]/g,'')" maxlength="5" v-model="form.aqkf" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
        
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
             <el-form-item label="选择班组">
              <el-select v-model="form.team" placeholder="白班">
                <el-option
                  v-for="dict in teamOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictLabel"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
             <el-form-item label="考核等级">
              <el-select v-model="form.khdj" placeholder="一般违规">
                <el-option
                  v-for="dict in khdjOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictLabel"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
              <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="考核性质">
              <el-select v-model="form.khxz" placeholder="生产考核">
                <el-option
                  v-for="dict in khxzOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictLabel"
                > </el-option> 
              </el-select> 
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="考核种类" prop="khzl">
              <el-select v-model="form.khzl" placeholder="结果考核">
                <el-option
                  v-for="dict in khzlOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictLabel"
                > </el-option> 
              </el-select>   
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
           <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="考核日期" prop="khrq">
               <el-date-picker
                   v-model="form.khrq"
                   type="date"  
                   value-format="yyyy-MM-dd"          
                   placeholder="选择日期">
              </el-date-picker>       
            </el-form-item>
          </el-col>
          <!-- 考核类型隐藏不显示 -->
          <el-col :span="12">
            <el-form-item   prop="khtype">
              <el-input v-model="form.khtype" v-show="false" placeholder="车间考评" />
            </el-form-item>
          </el-col>
        </el-row>
       
        <el-row>
          <el-col :span="24">
            <el-form-item label="考核原因" prop="khnote">
              <el-input v-model="form.khnote" type="textarea"  :rows="5" placeholder="请输入考核原因"></el-input>
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

    

    <!-- 添加或修改参数配置对话框 -->
    <!--      
     当一个 form 元素中只有一个输入框时，每次鼠标点击输入框后，不管是否输入数据，按下回车键后都跳转到首页。
     原因是在该输入框中按下回车键默认自动提交该表单。如果希望阻止这一默认行为，可以在标签上添加 @submit.native.prevent。20200826 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
 
      <el-row :gutter="20">
    
      <!--用户数据-->

      <el-col :span="22" :xs="24">
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px" @submit.native.prevent>
          <el-form-item label="用户姓名" prop="nickName">
            <el-input
              v-model="queryParams.nickName"
              placeholder="请输入用户姓名"
              clearable
              size="small"        
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>        
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>       
          </el-form-item>
        </el-form>
        <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="用户编号" align="center" prop="userId"  v-if="false" />
          <el-table-column label="用户名称" align="center" prop="userName" :show-overflow-tooltip="true" />
          <el-table-column label="用户昵称" align="center" prop="nickName" :show-overflow-tooltip="true" />
          <el-table-column label="部门" align="center" prop="dept.deptName" :show-overflow-tooltip="true" />
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
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="single"  @click="submitDialog">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

 
  </div>
</template>

<script>
import {  addKaohe,listMyUser_user } from "@/api/system/kaohe";
import { getToken } from "@/utils/auth";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { praseStrEmpty } from "@/utils/ruoyi";

export default {
  name: "Kaohe",
  components: { Treeselect },
  data() {
    return {
      
      // 遮罩层
      loading: true,
      // 选中数组
      usernames: [],
      nicknames: [],
      deptnames: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      // 考核等级字典
      khdjOptions: [],
      // 考核种类字典
      khzlOptions: [],
      // 考核性质字典
      khxzOptions: [],
      // 班组字典
      teamOptions: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},

      getCode: '确认考核',
      count: 6,
      disable: false,

      defaultProps: {
        children: "children",
        label: "label"
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
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined
      },
      // 表单校验
       rules: {
         //为什么验证通不过
       
        jxkf: [
          { required: true, message: "绩效扣分不能为空", trigger: "blur" }
        ],
        aqkf: [
          { required: true, message: "安全扣分不能为空", trigger: "blur" }
        ],
        team: [
          { required: true, message: "班组不能为空", trigger: "blur" }
        ],
        khdj: [
          { required: true, message: "考核等级不能为空", trigger: "change" }
        ],
        khxz: [
          { required: true, message: "考核性质不能为空", trigger: "blur" }
        ],
        khzl: [
          { required: true, message: "考核种类不能为空", trigger: "blur" }
        ],
        khrq: [
          { required: true, message: "日期不能为空", trigger: "blur" }
        ],
        khnote: [
          { required: true, message: "考核内容不能为空", trigger: "blur" }
        ],       
       }
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("sys_khdj").then(response => {
      this.khdjOptions = response.data;
    });
    this.getDicts("sys_khxz").then(response => {
      this.khxzOptions = response.data;
    });
    this.getDicts("sys_user_khzl").then(response => {
      this.khzlOptions = response.data;
    });
    this.getDicts("sys_user_team").then(response => {
      this.teamOptions = response.data;
    });
    
    var now = new Date();
       var year = now.getFullYear(); //得到年份
       var month = now.getMonth(); //得到月份
       var date = now.getDate(); //得到日期
       month = month + 1;
       month = month.toString().padStart(2, "0");
       date = date.toString().padStart(2, "0");
       var defaultDate = `${year}-${month}-${date}`;
       this.$set(this.form, "khrq", defaultDate);
       this.$set(this.form, "khdj", "一般违规");
       this.$set(this.form, "khxz", "生产考评");
       this.$set(this.form, "khzl", "结果考评");
       this.$set(this.form, "team", "白班");
       this.$set(this.form, "aqkf", 0);
       this.$set(this.form, "jxkf", 0.5);
       this.$set(this.form, "khtype", "车间内部考评");
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listMyUser_user(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.userList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    
        /** 提交按钮 */
    submitForm() {
      //提交表单之前，要先对表单进行验证
       this.$refs["form"].validate(valid => {
        if (valid) {
          //先禁止再次点击
           this.zuZhiDianJi();   
           addKaohe(this.form).then(response => {
              console.log(response);
              if (response.code=== 200) {
                 this.msgSuccess("新增成功");
               
              }
            });
        }
      });
    },

      //点击后禁用6秒
     zuZhiDianJi () {
      var countDown = setInterval(() => {
        if (this.count < 1) {       
          this.disable = false
          this.getCode =  '确认考核'
          this.count = 6
          clearInterval(countDown)
        } else {
         
          this.disable = true
          this.getCode = this.count-- + 's后继续考核'
        }
      }, 1000)
    },

      // 表单重置
    reset() {
      userList: null,
      this.queryform = {  
        nickName: undefined,     

      };
      this.resetForm("queryform");
    },

  
  
   
    // 取消按钮
    cancel() {
      this.reset();
      this.open = false;
    },
    
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
       this.usernames = selection.map(item => item.userName);
       this.nicknames = selection.map(item => item.nickName);
       this.deptnames = selection.map(item => item.dept.deptName);
      this.single = selection.length != 1;  
    },
  

    /** 修改按钮操作 */
    selectUser() {
      
     
      this.reset();
      this.handleQuery();
      // this.getList();   
      this.open = true;
    },

 
    /** 提交按钮 */
    submitDialog(){     

        this.open = false;
        this.form.useraccount=praseStrEmpty(this.usernames[0]);
        this.form.nickname=praseStrEmpty(this.nicknames[0]);
        this.form.deptname=praseStrEmpty(this.deptnames[0]);        
    },
   
  
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    }
  }
};
</script>