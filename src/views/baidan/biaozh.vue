<template>
  <div class="app-container">

     <el-menu :default-active="activeIndex" class="el-menu-demo"  mode="horizontal" background-color="#545c64"  text-color="#fff"
  active-text-color="#ffd04b" >
   <el-menu-item index="标准化" class="el-icon-s-flag"> 
     炼钢厂专业标准化检查记录
    <!-- <router-link :to="{path:'/biaozh'}">
                 
                  </router-link> -->
    </el-menu-item>
  <el-menu-item index="科室考评" class="el-icon-s-home"> 
    <router-link :to="{path:'/jixiao'}">
                   绩效考评
                  </router-link>
    
    </el-menu-item>
    <el-menu-item index="重点指标" class="el-icon-film"> 
    <router-link :to="{path:'/charts'}">
                   重点指标
                  </router-link>
    </el-menu-item>
       <el-menu-item index="6" class="el-icon-user-solid"> 
    <router-link :to="{path:'/login'}">
                   后台登录
                  </router-link>
    </el-menu-item>
</el-menu>
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="检查人" prop="checkperson">
        <el-input
          v-model="queryParams.checkperson"
          placeholder="请输入检查人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检查单位" prop="checkdept">
        <el-select v-model="queryParams.checkdept" placeholder="请输入检查单位">
                <el-option
                  v-for="item in deptOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                > </el-option> 
              </el-select> 
      </el-form-item>
      <el-form-item label="检查时间" >
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
     
      <el-form-item label="检查属性" prop="checkprop">
        <el-input
          v-model="queryParams.checkprop"
          placeholder="请输入检查属性"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="整改单位" prop="moddept">        
         <el-select v-model="queryParams.moddept" placeholder="请输入整改单位">
                <el-option
                  v-for="item in deptOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                > </el-option> 
              </el-select> 
      </el-form-item>

      <el-form-item label="状态" prop="status">
      
        <el-select v-model="queryParams.status" placeholder="状态">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                > </el-option> 
              </el-select> 

      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

   

    <el-table
      border
      v-loading="loading"
      :data="bzhjcList"
       @row-dblclick="dbSelected"
      :row-class-name="tableRowClassName"
    >
     
      <el-table-column label="序号" align="center" prop="id" width="60" />
      <el-table-column label="检查人" align="center" prop="checkperson" />
      <el-table-column
        label="检查时间"
        align="center"
        prop="checkdate"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.checkdate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="检查内容" align="center" prop="checkcontent" width="255"/>

      <el-table-column label="检查属性" align="center" prop="checkprop" />
      <el-table-column
        label="整改时间"
        align="center"
        prop="checkmoddate"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.checkmoddate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="整改单位" align="center" prop="moddept" />
      <!-- <el-table-column label="完成时间" align="center" prop="moddonedate"  width="100" /> -->
      <el-table-column label="整改结果" align="center" prop="modresult" width="255" />
      <el-table-column label="验证结果" align="center" prop="confirmresult" />
      <el-table-column label="状态" align="center" prop="status" />
       <el-table-column
      label="图"
      width="50">
      <template slot-scope="scope">
        <el-tag
          v-show="scope.row.checkpicture != null"
          type='danger'
          disable-transitions>有</el-tag>
          <el-tag
          v-show="scope.row.checkpicture ==null"
          type='primary'
          disable-transitions>无</el-tag>
      </template>
    </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />


   <!-- 检查人验证标准化检查对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="confirmopen"
      width="600px"
      append-to-body
    >

     <el-col :span="24" >  
           <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%; " border="1" >
               <tbody>
                <tr>
                  <td><div class="cell">检查人</div></td>
                  <td><div class="cell" >{{ confirmform.checkperson }}</div></td>
                  <td><div class="cell">检查单位</div></td>
                  <td><div class="cell" > {{ confirmform.checkdept }}</div></td>
                  <td><div class="cell">检查时间</div></td>
                  <td><div class="cell" > {{ confirmform.checkdate }}</div></td>
                </tr>
                <tr>
                  <td><div class="cell">检查属性</div></td>
                  <td><div class="cell" >{{ confirmform.checkprop }}</div></td>
                  <td><div class="cell">整改单位</div></td>
                  <td><div class="cell" > {{ confirmform.moddept }}</div></td>
                  <td><div class="cell">整改时间</div></td>
                  <td><div class="cell" > {{ confirmform.checkmoddate }}</div></td>           
                </tr>
                 <tr>
                  <td><div class="cell">检查内容</div></td>
                  <td colspan="5"><div class="cell" >{{ confirmform.checkcontent }}</div></td>        
                </tr>
                 <tr v-if="confirmform.checkpicture != null" >
                  <td><div class="cell">检查图片</div></td>
                  <td colspan="5"><div class="cell" >
                    <el-image
                      style="width: 300px; height: 300px"
                       :src="confirmform.checkpicture"
                        :preview-src-list="[confirmform.checkpicture]">
                    </el-image></div></td>        
                </tr>
                 <tr v-if="confirmform.modpicture != null" >
                  <td><div class="cell">整改图片</div></td>
                  <td colspan="5"><div class="cell" >
                    <el-image
                      style="width: 300px; height: 300px"
                       :src="confirmform.modpicture"
                        :preview-src-list="[confirmform.modpicture]">
                    </el-image></div></td>        
                </tr>
                <tr>
                  <td><div class="cell">整改人</div></td>
                  <td colspan="5"><div class="cell" >{{ confirmform.modperson }}</div></td>        
                </tr>
                <tr>
                  <td><div class="cell">整改完成时间</div></td>
                  <td colspan="5"><div class="cell" >{{ confirmform.moddonedate }}</div></td>        
                </tr>
                <tr>
                  <td><div class="cell">整改结果</div></td>
                  <td colspan="5"><div class="cell" >{{ confirmform.modresult }}</div></td>        
                </tr>
                <tr>
                  <td><div class="cell">原因分析</div></td>
                  <td colspan="5"><div class="cell" >{{ confirmform.modreason }}</div></td>        
                </tr>
                <tr>
                  <td><div class="cell">验证结果</div></td>
                  <td colspan="5"><div class="cell" >{{ confirmform.confirmresult }}</div></td>        
                </tr>
                 <tr>
                  <td><div class="cell">验证详情</div></td>
                  <td colspan="5"><div class="cell" >{{ confirmform.confirmcontent }}</div></td>        
                </tr>
              </tbody>
            </table>
          </div>
      </el-col>
      <!-- <el-form
        ref="confirmform"
        :model="confirmform"
        :rules="rules"
        class="bg-xiangqing"
        label-width="80px"
      >
       
        <el-row >
          <el-col :span="8">
            <el-form-item label="检查人" prop="checkperson">
              {{ confirmform.checkperson }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="检查单位" prop="checkdept">
              {{ confirmform.checkdept }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="检查时间" prop="checkdate">
              {{ confirmform.checkdate }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="检查属性" prop="checkprop">
              {{ confirmform.checkprop }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
             <el-form-item label="整改时间" prop="checkmoddate">
             {{ confirmform.checkmoddate }}
             </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="整改单位" prop="moddeptid">
          {{ confirmform.moddept }}
        </el-form-item>
          </el-col>
        </el-row>
         <el-row>
          <el-form-item label="检查内容" prop="checkcontent">
          {{ confirmform.checkcontent }}
          </el-form-item>
          <el-form-item label="检查图片" v-show="confirmform.checkpicture != null">
          <el-image
            style="width: 300px; height: 300px"
            :src="confirmform.checkpicture"
            :preview-src-list="[confirmform.checkpicture]"
          >
          </el-image>
        </el-form-item>
        </el-row>
          <el-form-item label="整改完成时间" prop="modresult">
          {{confirmform.moddonedate}}
        </el-form-item>
        <el-form-item label="整改结果" prop="modresult">
          {{confirmform.modresult}}
        </el-form-item>
        <el-form-item label="原因分析" prop="modreason">
          {{confirmform.modreason}}
        </el-form-item>
        <el-form-item label="整改图片" v-show="confirmform.modpicture != null">
           <el-image
            style="width: 300px; height: 300px"
            :src="confirmform.modpicture"
            :preview-src-list="[confirmform.modpicture]"
          >
          </el-image>
        </el-form-item>
        
          <el-form-item label="验证结果" prop="confirmresult">
            {{confirmform.confirmresult}}
         
        </el-form-item>  
        <el-form-item label="验证详情" prop="confirmcontent">
          {{confirmform.confirmcontent}}
         
          </el-form-item>  
      </el-form> -->
      <div slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  listBzhjcApi,
  getBzhjcApi
  
} from "@/api/system/bzhjc";
import ImageUpload from "@/components/ImageUpload";

export default {
  name: "Bzhjc",
  components: {
    ImageUpload,
  },
  data() {
    return {
      activeIndex: '标准化',
      // 遮罩层
      loading: true,
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
      // 标准化检查表格数据
      bzhjcList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      replyopen: false,
      confirmopen: false,
      // 验证结果字典
      confirmresultOptions: [],
      // 检查属性字典
      checkpropOptions: [],
      // 整改单位id字典
      moddeptidOptions: [],
      // 整改单位字典
      moddeptOptions: [],
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 50,
        checkperson: null,
        checkdept: null,
        checkdate: null,
        confirmresult: null,
        checkprop: null,
        checkmoddate: null,
        moddeptid: null,
        moddept: null,
        modperson: null,
        status: null,
      },
       deptOptions: [{
           value: '冶炼车间',
          label: '冶炼车间'
        }, {
             value: '精炼车间',
          label: '精炼车间'
        }, {
             value: '连铸车间',
          label: '连铸车间'
        }, {
             value: '脱硫车间',
          label: '脱硫车间'
        }, {
             value: '冶炼维修车间',
          label: '冶炼维修车间'
        }, {
             value: '连铸维修车间',
          label: '连铸维修车间'
        }, {
             value: '运行车间',
          label: '运行车间'
        }, {
          value: '生产技术科',
          label: '生产技术科'
        }, {
          value: '安全科',
          label: '安全科'
        }, {
          value: '综合办公室',
          label: '综合办公室'
        }],
       statusOptions: [{
          value: '等待处理',
          label: '等待处理'
        }, {
          value: '等待验证',
          label: '等待验证'
        }, {
          value: '验证完成',
          label: '验证完成'
        }],
      // 表单参数
      form: {},
      // 表单参数
      replyform: {},
      confirmform: {},
      // 表单校验
      rules: {

        checkdate: [
          { required: true, message: "检查时间不能为空", trigger: "blur" }
        ],
        checkcontent: [
          { required: true, message: "检查内容不能为空", trigger: "blur" }
        ],
        confirmresult: [
          { required: true, message: "验证结果不能为空", trigger: "blur" }
        ],
        checkprop: [
          { required: true, message: "检查属性不能为空", trigger: "blur" }
        ],
        checkmoddate: [
          { required: true, message: "整改时间不能为空", trigger: "blur" }
        ],
        // moddept: [
        //   { required: true, message: "整改单位不能为空", trigger: "blur" }
        // ],
        modreason: [
          { required: true, message: "原因分析不能为空", trigger: "blur" }
        ],
        modresult: [
          { required: true, message: "整改结果不能为空", trigger: "blur" }
        ],
      },
    };
  },
  created() {
    this.getList();
    
  },
  methods: {

     handleSelect(key, keyPath) {
        console.log(key);
        // if(key!='4'){
        //  this.queryParams.khtype=key;
        // this.getList();
        // }
        
      },
    
    tableRowClassName({row, rowIndex}) {
        if (row.status=="等待处理") {
          return 'warning-row';
        } 
        return '';
      },
    /** 查询标准化检查列表 */
    getList() {
      this.loading = true;
      listBzhjcApi(this.addDateRange(this.queryParams, this.dateRange)).then((response) => {
        this.bzhjcList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
  
    // 取消按钮
    cancel() {
      this.confirmopen = false;
      this.resetConfirm();
    },
 
  

     // 验证表单重置
    resetConfirm() {
      this.confirmform = {
        id: null,
        checkperson: null,
        checkdeptid: null,
        checkdept: null,
        checkdate: null,
        checkcontent: null,
        confirmresult: null,
        confirmdate: null,
        confirmcontent: null,
        checkprop: null,
        checkmoddate: null,
        checkpicture: null,
        moddeptid: null,
        moddept: null,
        moddonedate: null,
        modresult: null,
        modreason: null,
        modcontent: null,
        modperson: null,
        modpicture: null,
        status: null,
      };
      this.resetForm("confirmform");
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
   

      /** 双击查看详情操作 */
    dbSelected(row) {
      this.resetConfirm();
      const id = row.id || this.ids
      getBzhjcApi(id).then(response => {
        this.confirmform = response.data;
        this.confirmopen = true;
        this.title = "查看详情";
      });
    },

   



  },
};
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }
  
  .el-table .success-row {
    background: #f0f9eb;
  }

   .bg-xiangqing {
    background: #daf1cd;
  }
</style>