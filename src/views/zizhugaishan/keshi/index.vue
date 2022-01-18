<template>
  <div class="app-container">
   
    <el-row :gutter="10" class="mb8">
       <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="multiple"
          @click="handlekesshenhe"
          
        >科室审核</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="zizhugaishanList"  @row-dblclick="dbSelected" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <!-- <el-table-column label="项目编号" align="center" prop="xmcode" /> -->
      <el-table-column label="改善点" align="center" prop="xmgsd" width="260" />
      <el-table-column label="项目分类" align="center" prop="xmfl"  />
      <el-table-column label="录入日期" align="center" prop="tctime" width="180"/>      
      <!-- <el-table-column label="提出人编码" align="center" prop="tcrcode" /> -->
      <el-table-column label="提出人" align="center" prop="tcr" />
      <el-table-column label="提出单位" align="center" prop="tcrdw" />
      <el-table-column label="完成日期" align="center" prop="wctime" width="180"/>
      <!-- <el-table-column label="审核日期" align="center" prop="shtime" />
      <el-table-column label="车间审核人" align="center" prop="shr" />
      <el-table-column label="评价日期" align="center" prop="pjtime" />
      <el-table-column label="科室评价人" align="center" prop="pjr" />
      <el-table-column label="改善前照片" align="center" prop="photoBefore" />
      <el-table-column label="改善后照片" align="center" prop="photoAfter" />
      <el-table-column label="改善前描述" align="center" prop="commentAfter" />
      <el-table-column label="改善过程" align="center" prop="commentProcess" />
      <el-table-column label="改善过程" align="center" prop="commentBefore" /> -->
      <el-table-column label="改善人1" align="center" prop="gsrname1" />
      <el-table-column label="改善人2" align="center" prop="gsrname2" />
      <!-- <el-table-column label="项目状态" align="center" prop="status" /> -->
      <!-- <el-table-column label="不通过原因" align="center" prop="reason" />
      <el-table-column label="审核科室" align="center" prop="shks" />
      <el-table-column label="精益办分级" align="center" prop="jybfj" /> -->   
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handlechejshenhe(scope.row)"
          >更正审核科室</el-button>
         
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

    <!-- 添加或修改员工自主改善对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!-- <el-form-item label="项目编号" prop="xmcode">
          <el-input v-model="form.xmcode" placeholder="请输入项目编号" />
        </el-form-item> -->
        <el-form-item label="改善点" prop="xmgsd">
          <el-input v-model="form.xmgsd"  placeholder="请输入项目改善点" />
        </el-form-item>
        <el-form-item label="项目分类" prop="xmfl">
          <el-select v-model="form.xmfl" placeholder="请选择项目分类">
            <el-option
              v-for="dict in xmflOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="录入日期"  prop="tctime">
          <el-date-picker clearable disabled size="small"
            v-model="form.tctime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择录入日期">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="提出人编码" prop="tcrcode">
          <el-input v-model="form.tcrcode" placeholder="请输入提出人编码" />
        </el-form-item>
        <el-form-item label="提出人" prop="tcr">
          <el-input v-model="form.tcr" placeholder="请输入提出人" />
        </el-form-item> -->
        <!-- <el-form-item label="提出单位" prop="tcrdw">
          <el-select v-model="form.tcrdw" placeholder="请选择提出单位">
            <el-option
              v-for="dict in tcrdwOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="完成日期" prop="wctime">
          <el-date-picker clearable size="small"
            v-model="form.wctime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择完成日期">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="审核日期" prop="shtime">
          <el-input v-model="form.shtime" placeholder="请输入审核日期" />
        </el-form-item>
        <el-form-item label="车间审核人" prop="shr">
          <el-input v-model="form.shr" placeholder="请输入车间审核人" />
        </el-form-item>
        <el-form-item label="评价日期" prop="pjtime">
          <el-input v-model="form.pjtime" placeholder="请输入评价日期" />
        </el-form-item>
        <el-form-item label="科室评价人" prop="pjr">
          <el-input v-model="form.pjr" placeholder="请输入科室评价人" />
        </el-form-item> -->
        <el-form-item label="改善前照片">
          <imageUpload v-model="form.photoBefore"/>
        </el-form-item>
        <el-form-item label="改善后照片">
          <imageUpload v-model="form.photoAfter"/>
        </el-form-item> 
        <el-form-item label="改善前" prop="commentBefore">
          <el-input v-model="form.commentBefore" type="textarea" placeholder="请输入改善前描述" />
        </el-form-item>
        <el-form-item label="改善过程" prop="commentProcess">
          <el-input v-model="form.commentProcess" type="textarea" placeholder="请输入改善过程" />
        </el-form-item>
         <el-form-item label="改善后" prop="commentAfter">
          <el-input v-model="form.commentAfter" type="textarea" placeholder="请输入改善后描述" />
        </el-form-item>
        <el-form-item label="改善人1" prop="gsrname1">
          <el-input v-model="form.gsrname1" placeholder="请输入改善人1姓名" />
        </el-form-item>
        <!-- <el-form-item label="改善人1编码" prop="gsrcode1">
          <el-input v-model="form.gsrcode1" placeholder="请输入改善人1编码" />
        </el-form-item> -->
        <el-form-item label="改善人2" prop="gsrname2">
          <el-input v-model="form.gsrname2" placeholder="请输入改善人2姓名" />
        </el-form-item>
        <!-- <el-form-item label="改善人2编码" prop="gsrcode2">
          <el-input v-model="form.gsrcode2" placeholder="请输入改善人2编码" />
        </el-form-item> -->
        <!-- <el-form-item label="协助人" prop="xzrname">
          <el-input v-model="form.xzrname" placeholder="请输入协助人" />
        </el-form-item>
        <el-form-item label="协助人编码" prop="xzrcode">
          <el-input v-model="form.xzrcode" placeholder="请输入协助人编码" />
        </el-form-item> -->
        <!-- <el-form-item label="项目状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择项目状态">
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="不通过原因" prop="reason">
          <el-input v-model="form.reason" placeholder="请输入不通过原因" />
        </el-form-item>
        <el-form-item label="审核科室" prop="shks">
          <el-input v-model="form.shks" placeholder="请输入审核科室" />
        </el-form-item>
        <el-form-item label="精益办分级" prop="jybfj">
          <el-input v-model="form.jybfj" placeholder="请输入精益办分级" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

      <!-- 车间审核员工自主改善对话框 -->
    <el-dialog :title="title" :visible.sync="chejopen" width="600px" append-to-body>
      <el-form ref="chejform" :model="chejform" :rules="rules" label-width="80px">
        <!-- <el-form-item label="项目编号" prop="xmcode">
          <el-input v-model="form.xmcode" placeholder="请输入项目编号" />
        </el-form-item> -->
         <el-row>
            <el-col :span="24">
            <el-form-item label="改善点" prop="xmgsd">
              {{chejform.xmgsd}}
            </el-form-item>
          </el-col>
         </el-row>
        
        <el-row>
            <el-col :span="8">
            <el-form-item label="项目分类" prop="xmfl">
              {{chejform.xmfl}}
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item  label="录入日期" prop="tctime">
              {{chejform.tctime}}
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item  label="完成日期" prop="wctime">
              {{chejform.wctime}}
            </el-form-item>
            </el-col>
         </el-row>
         <el-row>
            <el-col :span="8">
            <el-form-item label="提出人" prop="tcr">
              {{chejform.tcr}}
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item  label="改善人1" prop="gsrname1">
              {{chejform.gsrname1}}
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item  label="改善人2" prop="gsrname2">
              {{chejform.gsrname2}}
            </el-form-item>
            </el-col>
         </el-row>

        <el-row> 
          <el-form-item label="改善前照片">
          <el-image
            style="width: 300px; height: 300px"
            :src="chejform.photoBefore"
            :preview-src-list="[chejform.photoBefore]"
          >
          </el-image>
        </el-form-item>
        </el-row>
         <el-row> 
          <el-form-item label="改善后照片">
          <el-image
            style="width: 300px; height: 300px"
            :src="chejform.photoAfter"
            :preview-src-list="[chejform.photoAfter]"
          >
          </el-image>
        </el-form-item>
        </el-row>
        <el-form-item label="改善前" prop="commentBefore">
          {{chejform.commentBefore}}
        </el-form-item>
        <el-form-item label="改善过程" prop="commentProcess">
           {{chejform.commentProcess}}
        </el-form-item>
         <el-form-item label="改善后" prop="commentAfter">
           {{chejform.commentAfter}}
        </el-form-item>

        <!-- <el-form-item label="提出人编码" prop="tcrcode">
          <el-input v-model="form.tcrcode" placeholder="请输入提出人编码" />
        </el-form-item>
        <el-form-item label="提出人" prop="tcr">
          <el-input v-model="form.tcr" placeholder="请输入提出人" />
        </el-form-item> -->
        <!-- <el-form-item label="提出单位" prop="tcrdw">
          <el-select v-model="form.tcrdw" placeholder="请选择提出单位">
            <el-option
              v-for="dict in tcrdwOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item> -->
       
        <!-- <el-form-item label="审核日期" prop="shtime">
          <el-input v-model="form.shtime" placeholder="请输入审核日期" />
        </el-form-item>
        <el-form-item label="车间审核人" prop="shr">
          <el-input v-model="form.shr" placeholder="请输入车间审核人" />
        </el-form-item>
        <el-form-item label="评价日期" prop="pjtime">
          <el-input v-model="form.pjtime" placeholder="请输入评价日期" />
        </el-form-item>
        <el-form-item label="科室评价人" prop="pjr">
          <el-input v-model="form.pjr" placeholder="请输入科室评价人" />
        </el-form-item> -->
       
        
        <!-- <el-form-item label="改善人2编码" prop="gsrcode2">
          <el-input v-model="form.gsrcode2" placeholder="请输入改善人2编码" />
        </el-form-item> -->
        <!-- <el-form-item label="协助人" prop="xzrname">
          <el-input v-model="form.xzrname" placeholder="请输入协助人" />
        </el-form-item>
        <el-form-item label="协助人编码" prop="xzrcode">
          <el-input v-model="form.xzrcode" placeholder="请输入协助人编码" />
        </el-form-item> -->
        <!-- 
        <el-form-item label="不通过原因" prop="reason">
          <el-input v-model="form.reason" placeholder="请输入不通过原因" />
        </el-form-item>
        
        <el-form-item label="精益办分级" prop="jybfj">
          <el-input v-model="form.jybfj" placeholder="请输入精益办分级" />
        </el-form-item> -->
        <!-- <el-form-item label="审核结果" prop="status">
          <el-select v-model="chejform.status" placeholder="请选择审核结果">
            <el-option
              v-for="item in chejshhOptions"
               :key="item.value"
               :label="item.label"
               :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="不通过原因" prop="reason">
          <el-input v-model="chejform.reason"  type="textarea"  placeholder="请输入不通过原因" />
        </el-form-item> -->
        <el-form-item label="审核科室" prop="shks">
          <el-select v-model="chejform.shks" placeholder="选择审核科室">
                <el-option
                  v-for="item in shksOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                > </el-option> 
              </el-select> 
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitchejForm">确 定</el-button>
        <el-button @click="chejcancel">取 消</el-button>
      </div>
    </el-dialog>
   
     <!-- 科室审核员工自主改善对话框 -->
    <el-dialog :title="title" :visible.sync="kesopen" width="600px" append-to-body>
      <el-form ref="kesform" :model="kesform" :rules="rules" label-width="80px">
        <!-- <el-form-item label="项目编号" prop="xmcode">
          <el-input v-model="form.xmcode" placeholder="请输入项目编号" />
        </el-form-item> -->
         <el-row>
            <el-col :span="24">
            <el-form-item label="改善点" prop="xmgsd">
              {{kesform.xmgsd}}
            </el-form-item>
          </el-col>
         </el-row>
        
        <el-row>
            <el-col :span="8">
            <el-form-item label="项目分类" prop="xmfl">
              {{kesform.xmfl}}
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item  label="录入日期" prop="tctime">
              {{kesform.tctime}}
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item  label="完成日期" prop="wctime">
              {{kesform.wctime}}
            </el-form-item>
            </el-col>
         </el-row>
         <el-row>
            <el-col :span="8">
            <el-form-item label="提出人" prop="tcr">
              {{kesform.tcr}}
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item  label="改善人1" prop="gsrname1">
              {{kesform.gsrname1}}
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item  label="改善人2" prop="gsrname2">
              {{kesform.gsrname2}}
            </el-form-item>
            </el-col>
         </el-row>

        <el-row> 
          <el-form-item label="改善前照片">
          <el-image
            style="width: 300px; height: 300px"
            :src="kesform.photoBefore"
            :preview-src-list="[kesform.photoBefore]"
          >
          </el-image>
        </el-form-item>
        </el-row>
         <el-row> 
          <el-form-item label="改善后照片">
          <el-image
            style="width: 300px; height: 300px"
            :src="kesform.photoAfter"
            :preview-src-list="[kesform.photoAfter]"
          >
          </el-image>
        </el-form-item>
        </el-row>
        <el-form-item label="改善前" prop="commentBefore">
          {{kesform.commentBefore}}
        </el-form-item>
        <el-form-item label="改善过程" prop="commentProcess">
           {{kesform.commentProcess}}
        </el-form-item>
         <el-form-item label="改善后" prop="commentAfter">
           {{kesform.commentAfter}}
        </el-form-item>

        <!-- <el-form-item label="提出人编码" prop="tcrcode">
          <el-input v-model="form.tcrcode" placeholder="请输入提出人编码" />
        </el-form-item>
        <el-form-item label="提出人" prop="tcr">
          <el-input v-model="form.tcr" placeholder="请输入提出人" />
        </el-form-item> -->
        <!-- <el-form-item label="提出单位" prop="tcrdw">
          <el-select v-model="form.tcrdw" placeholder="请选择提出单位">
            <el-option
              v-for="dict in tcrdwOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item> -->
       
        <!-- <el-form-item label="审核日期" prop="shtime">
          <el-input v-model="form.shtime" placeholder="请输入审核日期" />
        </el-form-item>
        <el-form-item label="车间审核人" prop="shr">
          <el-input v-model="form.shr" placeholder="请输入车间审核人" />
        </el-form-item>
        <el-form-item label="评价日期" prop="pjtime">
          <el-input v-model="form.pjtime" placeholder="请输入评价日期" />
        </el-form-item>
        <el-form-item label="科室评价人" prop="pjr">
          <el-input v-model="form.pjr" placeholder="请输入科室评价人" />
        </el-form-item> -->
       
        
        <!-- <el-form-item label="改善人2编码" prop="gsrcode2">
          <el-input v-model="form.gsrcode2" placeholder="请输入改善人2编码" />
        </el-form-item> -->
        <!-- <el-form-item label="协助人" prop="xzrname">
          <el-input v-model="form.xzrname" placeholder="请输入协助人" />
        </el-form-item>
        <el-form-item label="协助人编码" prop="xzrcode">
          <el-input v-model="form.xzrcode" placeholder="请输入协助人编码" />
        </el-form-item> -->
        <!-- 
        <el-form-item label="不通过原因" prop="reason">
          <el-input v-model="form.reason" placeholder="请输入不通过原因" />
        </el-form-item>
        
        <el-form-item label="精益办分级" prop="jybfj">
          <el-input v-model="form.jybfj" placeholder="请输入精益办分级" />
        </el-form-item> -->
        <el-form-item label="审核结果" prop="status">
          <el-select v-model="kesform.status" placeholder="请选择审核结果">
            <el-option
              v-for="item in kesshhOptions"
               :key="item.value"
               :label="item.label"
               :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="不通过原因" prop="ksreason">
          <el-input v-model="kesform.ksreason"  type="textarea"  placeholder="请输入不通过原因" />
        </el-form-item>
       
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitkesForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getKesList,getChjList,listZizhugaishan, getZizhugaishan, delZizhugaishan,getUpdateInfo, addZizhugaishan, updateZizhugaishan, exportZizhugaishan,getChjInfo,getKesInfo,getJybInfo,chjShh,kesShh,jybShh } from "@/api/system/zizhugaishan";
import ImageUpload from '@/components/ImageUpload';

export default {
  name: "Zizhugaishan",
  components: {
    ImageUpload,
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
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 员工自主改善表格数据
      zizhugaishanList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      chejopen:false,
      kesopen:false,
      // 项目分类字典
      xmflOptions: [],
      // 提出单位字典
      tcrdwOptions: [],
      // 项目状态字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        xmfl: null,
        tcrdw: null,
      },
      // 表单参数
      form: {},
      // 车间审核表单参数
      chejform: {},
      // 科室审核表单参数
      kesform: {},
      shksOptions: [{
           value: '生产技术科',
          label: '生产技术科'
        }, {
          value: '安全科',
          label: '安全科'
        }, {
          value: '综合办公室',
          label: '综合办公室'
        }],
      chejshhOptions:  [{
          value: '车间审核通过',
          label: '车间审核通过'
        }, {
          value: '车间审核未通过',
          label: '车间审核未通过'
        }], 
       kesshhOptions:  [{
          value: '科室审核通过',
          label: '科室审核通过'
        }, {
          value: '科室审核未通过',
          label: '科室审核未通过'
        }],
        jybshhOptions:  [{
          value: '精益办审核通过',
          label: '精益办审核通过'
        }, {
          value: '精益办审核未通过',
          label: '精益办审核未通过'
        }],
      // 表单校验
      rules: {
       
        xmgsd: [
          { required: true, message: "项目改善点不能为空", trigger: "blur" }
        ],
        xmfl: [
          { required: true, message: "项目分类不能为空", trigger: "change" }
        ],
        tcrdw: [
          { required: true, message: "提出单位不能为空", trigger: "change" }
        ],
        tctime: [
          { required: true, message: "录入日期不能为空", trigger: "blur" }
        ],
        wctime: [
          { required: true, message: "完成日期不能为空", trigger: "blur" }
        ],
        photoBefore: [
          { required: true, message: "改善前照片不能为空", trigger: "blur" }
        ],
        photoAfter: [
          { required: true, message: "改善后照片不能为空", trigger: "blur" }
        ],
        commentAfter: [
          { required: true, message: "改善后描述不能为空", trigger: "blur" }
        ],
        commentProcess: [
          { required: true, message: "改善过程不能为空", trigger: "blur" }
        ],
        gsrname1: [
          { required: true, message: "改善人姓名1不能为空", trigger: "blur" }
        ],
        commentBefore: [
          { required: true, message: "改善前描述不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "审核结果不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("jygstype").then(response => {
      this.xmflOptions = response.data;
    });
    this.getDicts("lgdept").then(response => {
      this.tcrdwOptions = response.data;
    });
    this.getDicts("jygsstatus").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询员工自主改善列表 */
    getList() {
      this.loading = true;
      getKesList(this.queryParams).then(response => {
        this.zizhugaishanList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 项目分类字典翻译
    xmflFormat(row, column) {
      return this.selectDictLabel(this.xmflOptions, row.xmfl);
    },
    // 提出单位字典翻译
    tcrdwFormat(row, column) {
      return this.selectDictLabel(this.tcrdwOptions, row.tcrdw);
    },
    // 项目状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.kesopen = false;
      this.resetkesform();
    },

    // 取消按钮
    chejcancel() {
      this.chejopen = false;
      this.resetchejform();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        xmcode: null,
        xmgsd: null,
        xmfl: null,
        tctime: null,
        tcrcode: null,
        tcr: null,
        tcrdw: null,
        wctime: null,
        shtime: null,
        shr: null,
        pjtime: null,
        pjr: null,
        photoBefore: null,
        photoAfter: null,
        commentAfter: null,
        commentProcess: null,
        commentBefore: null,
        gsrname1: null,
        gsrcode1: null,
        gsrname2: null,
        gsrcode2: null,
        xzrname: null,
        xzrcode: null,
        status: null,
        reason: null,
        shks: null,
        jybfj: null
      };
      this.resetForm("form");
    },

     // 车间表单重置
    resetchejform() {
      this.chejform = {
        id: null,
        xmcode: null,
        xmgsd: null,
        xmfl: null,
        tctime: null,
        tcrcode: null,
        tcr: null,
        tcrdw: null,
        wctime: null,
        shtime: null,
        shr: null,
        pjtime: null,
        pjr: null,
        photoBefore: null,
        photoAfter: null,
        commentAfter: null,
        commentProcess: null,
        commentBefore: null,
        gsrname1: null,
        gsrcode1: null,
        gsrname2: null,
        gsrcode2: null,
        xzrname: null,
        xzrcode: null,
        status: null,
        reason: null,
        shks: null,
        jybfj: null
      };
      this.resetForm("chejform");
    },
    
     // 科室表单重置
    resetkesform() {
      this.kesform = {
        id: null,
        xmcode: null,
        xmgsd: null,
        xmfl: null,
        tctime: null,
        tcrcode: null,
        tcr: null,
        tcrdw: null,
        wctime: null,
        shtime: null,
        shr: null,
        pjtime: null,
        pjr: null,
        photoBefore: null,
        photoAfter: null,
        commentAfter: null,
        commentProcess: null,
        commentBefore: null,
        gsrname1: null,
        gsrcode1: null,
        gsrname2: null,
        gsrcode2: null,
        xzrname: null,
        xzrcode: null,
        status: null,
        ksreason: null,
        shks: null,
        jybfj: null
      };
      this.resetForm("kesform");
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
       var now = new Date();
       var year = now.getFullYear(); //得到年份
       var month = now.getMonth(); //得到月份
       var date = now.getDate(); //得到日期
       month = month + 1;
       month = month.toString().padStart(2, "0");
       date = date.toString().padStart(2, "0");
       var defaultDate = `${year}-${month}-${date}`;
       this.$set(this.form, "tctime", defaultDate);
      this.open = true;
      this.title = "添加员工自主改善";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getUpdateInfo(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改员工自主改善";
      });
    },
    
    
    /** 更正审核科室按钮操作 */
    handlechejshenhe(row) {
      this.resetchejform();
      const id = row.id || this.ids
      getZizhugaishan(id).then(response => {
        this.chejform = response.data;
        // this.chejform.status=null;
        this.chejopen = true;
        this.title = "更正审核科室";
      });
    },

     /** 科室审核按钮操作 */
    handlekesshenhe(row) {
      this.resetkesform();
      const id = row.id || this.ids
      getKesInfo(id).then(response => {
        this.kesform = response.data;
        this.kesform.status=null;
        this.kesopen = true;
        this.title = "科室审核";
      });
    },

    /** 双击---科室审核按钮操作 */
   dbSelected(row) {
      this.resetkesform();
      const id = row.id || this.ids
      getKesInfo(id).then(response => {
        this.kesform = response.data;
        this.kesform.status=null;
        this.kesopen = true;
        this.title = "科室审核";
      });
    },


   /** 更正审核科室 */
    submitchejForm() {
      this.$refs["chejform"].validate(valid => {
        if (valid) {
           updateZizhugaishan(this.chejform).then(response => {
              this.msgSuccess("更正审核科室成功");
              this.chejopen = false;
              this.getList();
            });
          }
        })
    },

     
   /** 科室审核 */
    submitkesForm() {
      this.$refs["kesform"].validate(valid => {
        if (valid) {
          if (this.kesform.id != null) {
            if(this.kesform.status=="科室审核未通过"){
              if(this.kesform.ksreason==null){
                 this.$message.error('请填写未通过原因！');
                 return;
              }
            }
            kesShh(this.kesform).then(response => {
              this.msgSuccess("科室审核成功");
              this.kesopen = false;
              this.getList();
            });
          } 
          }
        })
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
           if(this.form.photoBefore==null){
             this.$message.error('改善前照片不能为空！');
                 return;
           }
           if(this.form.photoAfter==null){
             this.$message.error('改善后照片不能为空！');
                 return;
           }
          if (this.form.id != null) {
            updateZizhugaishan(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZizhugaishan(this.form).then(response => {
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
      this.$confirm('是否确认删除员工自主改善编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delZizhugaishan(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有员工自主改善数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportZizhugaishan(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>