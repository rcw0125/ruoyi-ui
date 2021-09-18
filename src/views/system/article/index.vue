<template>
  <div class="app-container">
  <el-row :gutter="20">
    <!--部门数据-->
      <el-col :span="4" :xs="24">
        <!-- <div class="head-container">
          <el-input
            v-model="deptName"
            placeholder="请输入部门名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          />
        </div> -->
        <div class="head-container">
          <el-tree
            :data="deptOptions"
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
   <el-col :span="20" :xs="24">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="文章所在分类专栏Id" prop="classifyId">
        <el-input
          v-model="queryParams.classifyId"
          placeholder="请输入文章所在分类专栏Id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="技术频道" prop="channelId">
        <el-input
          v-model="queryParams.channelId"
          placeholder="请输入系统内置技术频道Id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入标题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关键字" prop="keywords">
        <el-input
          v-model="queryParams.keywords"
          placeholder="请输入关键字"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="来源" prop="source">
        <el-input
          v-model="queryParams.source"
          placeholder="请输入来源"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="摘要" prop="excerpt">
        <el-input
          v-model="queryParams.excerpt"
          placeholder="请输入摘要"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="浏览次数" prop="viewHits">
        <el-input
          v-model="queryParams.viewHits"
          placeholder="请输入浏览次数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="评论数量" prop="commentQuantity">
        <el-input
          v-model="queryParams.commentQuantity"
          placeholder="请输入评论数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="点赞数量" prop="likesQuantity">
        <el-input
          v-model="queryParams.likesQuantity"
          placeholder="请输入点赞数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="列表缩略图封面" prop="thumbnail">
        <el-input
          v-model="queryParams.thumbnail"
          placeholder="请输入列表缩略图封面"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="是否审核" prop="isAudit">
        <el-input
          v-model="queryParams.isAudit"
          placeholder="请输入是否审核"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否推荐" prop="recommend">
        <el-input
          v-model="queryParams.recommend"
          placeholder="请输入是否推荐"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="是否置顶" prop="isStickie">
        <el-input
          v-model="queryParams.isStickie"
          placeholder="请输入是否置顶"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="随笔档案   如2019年1月" prop="archive">
        <el-input
          v-model="queryParams.archive"
          placeholder="请输入随笔档案   如2019年1月"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="随笔类型" prop="articleType">
        <el-select v-model="queryParams.articleType" placeholder="请选择随笔类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="1:MarkDown编辑器  2:富文本编辑器," prop="editor">
        <el-input
          v-model="queryParams.editor"
          placeholder="请输入1:MarkDown编辑器  2:富文本编辑器,"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态：1.暂存;2.发布;3.私密随笔" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态：1.暂存;2.发布;3.私密随笔" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="字数" prop="wordNumber">
        <el-input
          v-model="queryParams.wordNumber"
          placeholder="请输入字数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预计阅读时长" prop="readingTime">
        <el-input
          v-model="queryParams.readingTime"
          placeholder="请输入预计阅读时长"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="随笔是否开启评论" prop="commentable">
        <el-input
          v-model="queryParams.commentable"
          placeholder="请输入随笔是否开启评论"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="创建者" prop="createUserId">
        <el-input
          v-model="queryParams.createUserId"
          placeholder="请输入创建者ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="是否删除" prop="isDeleted">
        <el-input
          v-model="queryParams.isDeleted"
          placeholder="请输入是否删除"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="删除人id" prop="deleteUserId">
        <el-input
          v-model="queryParams.deleteUserId"
          placeholder="请输入删除人id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="删除时间" prop="deleteTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.deleteTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择删除时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="最后修改人Id" prop="updateUserId">
        <el-input
          v-model="queryParams.updateUserId"
          placeholder="请输入最后修改人Id"
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
          v-hasPermi="['system:article:add']"
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
          v-hasPermi="['system:article:edit']"
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
          v-hasPermi="['system:article:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:article:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="articleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <!-- <el-table-column label="文章所在分类专栏Id" align="center" prop="classifyId" /> -->
      <el-table-column label="技术频道" align="center" prop="channelId" />
      <el-table-column label="标题" align="center" prop="title" />
      <!-- <el-table-column label="关键字" align="center" prop="keywords" /> -->
      <el-table-column label="来源" align="center" prop="source" />
      <!-- <el-table-column label="摘要" align="center" prop="excerpt" />
      <el-table-column label="正文" align="center" prop="content" /> -->
      <el-table-column label="浏览次数" align="center" prop="viewHits" />
      <el-table-column label="评论数量" align="center" prop="commentQuantity" />
      <el-table-column label="点赞数量" align="center" prop="likesQuantity" />
      <!-- <el-table-column label="列表缩略图封面" align="center" prop="thumbnail" /> -->
      <el-table-column label="是否审核" align="center" prop="isAudit" />
      <el-table-column label="是否推荐" align="center" prop="recommend" />
      <el-table-column label="是否置顶" align="center" prop="isStickie" />
      <!-- <el-table-column label="随笔档案   如2019年1月" align="center" prop="archive" />
      <el-table-column label="随笔类型" align="center" prop="articleType" />
      <el-table-column label="1:MarkDown编辑器  2:富文本编辑器," align="center" prop="editor" /> -->
      <!-- <el-table-column label="状态" align="center" prop="status" />
      <el-table-column label="字数" align="center" prop="wordNumber" />
      <el-table-column label="预计阅读时长" align="center" prop="readingTime" />
      <el-table-column label="随笔是否开启评论" align="center" prop="commentable" />
      <el-table-column label="创建者ID" align="center" prop="createUserId" />
      <el-table-column label="是否删除" align="center" prop="isDeleted" />
      <el-table-column label="删除人id" align="center" prop="deleteUserId" /> -->
      <!-- <el-table-column label="删除时间" align="center" prop="deleteTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deleteTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后修改人Id" align="center" prop="updateUserId" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:article:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:article:remove']"
          >删除</el-button>
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
    <!-- 添加或修改博客文章对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!-- <el-form-item label="文章所在分类专栏Id" prop="classifyId">
          <el-input v-model="form.classifyId" placeholder="请输入文章所在分类专栏Id" />
        </el-form-item> -->
        <el-form-item label="技术频道" prop="channelId">
          <el-input v-model="form.channelId" placeholder="请输入系统内置技术频道Id" />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="关键字" prop="keywords">
          <el-input v-model="form.keywords" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="来源" prop="source">
          <el-input v-model="form.source" placeholder="请输入来源" />
        </el-form-item>
        <el-form-item label="摘要" prop="excerpt">
          <el-input v-model="form.excerpt" placeholder="请输入摘要" />
        </el-form-item>
        
        <tinymce 
         v-if="open"
          @change="change"
          :defaultContent="form.content"
          upload_url="http://dev.lin.colorful3.com/cms/file/"
          />
        <!-- <el-form-item label="浏览次数" prop="viewHits">
          <el-input v-model="form.viewHits" placeholder="请输入浏览次数" />
        </el-form-item>
        <el-form-item label="评论数量" prop="commentQuantity">
          <el-input v-model="form.commentQuantity" placeholder="请输入评论数量" />
        </el-form-item>
        <el-form-item label="点赞数量" prop="likesQuantity">
          <el-input v-model="form.likesQuantity" placeholder="请输入点赞数量" />
        </el-form-item> -->
        <el-form-item label="封面" prop="thumbnail">
          <el-input v-model="form.thumbnail" placeholder="请输入列表缩略图封面" />
        </el-form-item>
        <!-- <el-form-item label="是否审核" prop="isAudit">
          <el-input v-model="form.isAudit" placeholder="请输入是否审核" />
        </el-form-item>
        <el-form-item label="是否推荐" prop="recommend">
          <el-input v-model="form.recommend" placeholder="请输入是否推荐" />
        </el-form-item>
        <el-form-item label="是否置顶" prop="isStickie">
          <el-input v-model="form.isStickie" placeholder="请输入是否置顶" />
        </el-form-item>
        <el-form-item label="随笔档案   如2019年1月" prop="archive">
          <el-input v-model="form.archive" placeholder="请输入随笔档案   如2019年1月" />
        </el-form-item>
        <el-form-item label="随笔类型" prop="articleType">
          <el-select v-model="form.articleType" placeholder="请选择随笔类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="1:MarkDown编辑器  2:富文本编辑器," prop="editor">
          <el-input v-model="form.editor" placeholder="请输入1:MarkDown编辑器  2:富文本编辑器," />
        </el-form-item>
        <el-form-item label="状态：1.暂存;2.发布;3.私密随笔">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="字数" prop="wordNumber">
          <el-input v-model="form.wordNumber" placeholder="请输入字数" />
        </el-form-item>
        <el-form-item label="预计阅读时长" prop="readingTime">
          <el-input v-model="form.readingTime" placeholder="请输入预计阅读时长" />
        </el-form-item>
        <el-form-item label="随笔是否开启评论" prop="commentable">
          <el-input v-model="form.commentable" placeholder="请输入随笔是否开启评论" />
        </el-form-item>
        <el-form-item label="创建者ID" prop="createUserId">
          <el-input v-model="form.createUserId" placeholder="请输入创建者ID" />
        </el-form-item>
        <el-form-item label="是否删除" prop="isDeleted">
          <el-input v-model="form.isDeleted" placeholder="请输入是否删除" />
        </el-form-item>
        <el-form-item label="删除人id" prop="deleteUserId">
          <el-input v-model="form.deleteUserId" placeholder="请输入删除人id" />
        </el-form-item>
        <el-form-item label="删除时间" prop="deleteTime">
          <el-date-picker clearable size="small"
            v-model="form.deleteTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择删除时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最后修改人Id" prop="updateUserId">
          <el-input v-model="form.updateUserId" placeholder="请输入最后修改人Id" />
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
import { listArticle, getArticle, delArticle, addArticle, updateArticle, exportArticle } from "@/api/system/article";
import { listCaidan } from "@/api/system/caidan";
import Editor from '@/components/Editor';
import Tinymce from "@/components/tinymce";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Article",
  components: {
    Editor,Treeselect,Tinymce,
  },
  data() {
    return {
      text: "this is default content",
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
      // 博客文章表格数据
      articleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 部门树选项
      deptOptions: undefined,
      defaultProps: {
        children: "children",
        label: "name"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        classifyId: null,
        channelId: null,
        title: null,
        keywords: null,
        source: null,
        excerpt: null,
        content: null,
        viewHits: null,
        commentQuantity: null,
        likesQuantity: null,
        thumbnail: null,
        isAudit: null,
        recommend: null,
        isStickie: null,
        archive: null,
        articleType: null,
        editor: null,
        status: null,
        wordNumber: null,
        readingTime: null,
        commentable: null,
        createUserId: null,
        isDeleted: null,
        deleteUserId: null,
        deleteTime: null,
        updateUserId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        channelId: [
          { required: true, message: "系统内置技术频道Id不能为空", trigger: "blur" }
        ],
        viewHits: [
          { required: true, message: "浏览次数不能为空", trigger: "blur" }
        ],
        commentQuantity: [
          { required: true, message: "评论数量不能为空", trigger: "blur" }
        ],
        likesQuantity: [
          { required: true, message: "点赞数量不能为空", trigger: "blur" }
        ],
        isAudit: [
          { required: true, message: "是否审核不能为空", trigger: "blur" }
        ],
        recommend: [
          { required: true, message: "是否推荐不能为空", trigger: "blur" }
        ],
        isStickie: [
          { required: true, message: "是否置顶不能为空", trigger: "blur" }
        ],
        articleType: [
          { required: true, message: "随笔类型不能为空", trigger: "change" }
        ],
        editor: [
          { required: true, message: "1:MarkDown编辑器  2:富文本编辑器,不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态：1.暂存;2.发布;3.私密随笔不能为空", trigger: "blur" }
        ],
        wordNumber: [
          { required: true, message: "字数不能为空", trigger: "blur" }
        ],
        readingTime: [
          { required: true, message: "预计阅读时长不能为空", trigger: "blur" }
        ],
        commentable: [
          { required: true, message: "随笔是否开启评论不能为空", trigger: "blur" }
        ],
        createUserId: [
          { required: true, message: "创建者ID不能为空", trigger: "blur" }
        ],
        isDeleted: [
          { required: true, message: "是否删除不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getTreeselect();
  },
  methods: {
    change(val) {
      //console.log(val)
      this.text=val;
    },
    /** 查询博客文章列表 */
    getList() {
      this.loading = true;
      listArticle(this.queryParams).then(response => {
        this.articleList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      listCaidan().then(response => {
        this.deptOptions =this.handleTree(response.data, "id", "parentId");
      });
    },

     // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      // this.curDeptId= data.id;
      this.queryParams.deptId = data.id;
      // this.getList();
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
        classifyId: null,
        channelId: null,
        title: null,
        keywords: null,
        source: null,
        excerpt: null,
        content: null,
        viewHits: null,
        commentQuantity: null,
        likesQuantity: null,
        thumbnail: null,
        isAudit: null,
        recommend: null,
        isStickie: null,
        archive: null,
        articleType: null,
        editor: null,
        status: 0,
        wordNumber: null,
        readingTime: null,
        commentable: null,
        createUserId: null,
        createTime: null,
        isDeleted: null,
        deleteUserId: null,
        deleteTime: null,
        updateUserId: null,
        updateTime: null
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
      this.title = "添加博客文章";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getArticle(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改博客文章";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateArticle(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addArticle(this.form).then(response => {
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
      this.$confirm('是否确认删除博客文章编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delArticle(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有博客文章数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportArticle(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
