<template>
  <div class="app-container" >

    <!--用户数据-->
    <el-col  :xs="24">

      <el-menu mode="horizontal" class="el-menu-demo" default-active="1"  @select="handleSelect"  background-color="#1890FF"
        text-color="#fff" active-text-color="#ffd04b">
        <template v-for="menu in this.deptOptions">
          <el-submenu :key="menu.id" :index="menu.id+''" v-if="menu.children">
            <template slot="title">
              <span slot="title">{{menu.name}}</span>
            </template>
            <menu-tree :menuData="menu.children"></menu-tree>
          </el-submenu>
          <el-menu-item :key="menu.id" :index="menu.id+''" v-else>
            <span slot="title">{{menu.name}}</span>
          </el-menu-item>
        </template>
        
      </el-menu>


      <el-form :model="queryParams" ref="queryForm" :inline="true" v-if="false" v-show="showSearch" label-width="68px">
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
          <el-input v-model="queryParams.title" placeholder="请输入标题" clearable size="small"
            @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item label="关键字" prop="keywords">
          <el-input v-model="queryParams.keywords" placeholder="请输入关键字" clearable size="small"
            @keyup.enter.native="handleQuery" />
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
          <el-input v-model="queryParams.isStickie" placeholder="请输入是否置顶" clearable size="small"
            @keyup.enter.native="handleQuery" />
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
          <el-input v-model="queryParams.createUserId" placeholder="请输入创建者ID" clearable size="small"
            @keyup.enter.native="handleQuery" />
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

     
      <el-table v-loading="loading" :data="articleList" v-if="!open" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" align="center" prop="id" />
        <!-- <el-table-column label="文章所在分类专栏Id" align="center" prop="classifyId" /> -->
        <el-table-column label="技术频道" align="center" prop="channelId" :formatter="channelFormat" />
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
            <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
              v-hasPermi="['system:article:edit']">修改</el-button>
            <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
              v-hasPermi="['system:article:remove']">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-if="!open" v-show="total>0" :total="total" :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize" @pagination="getList" />
    </el-col>
  

  </div>
</template>

<script>
import { listArticle, getArticle, delArticle, addArticle, updateArticle, exportArticle } from "@/api/system/article";
import { listCaidan } from "@/api/system/caidan";
import Editor from '@/components/Editor';
import MenuTree from '@/components/MenuTree'
import Tinymce from "@/components/tinymce";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Article",
  components: {
    Editor,Treeselect,Tinymce,MenuTree,
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
      // 菜单树选项
      deptOptions: [],
      // 菜单树选项--原始集合
      caidanOptions: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
       menuList: [
        {
          index: '1',
          icon: 'el-icon-menu',
          name: '一级菜单01',
          children: [
            {
              index: '1-1',
              icon: 'el-icon-film',
              name: '二级菜单01',
              children: [
                {
                  index: '1-1-1',
                  icon: 'el-icon-date',
                  name: '三级菜单01',
                  children: [
                    {
                      index: '1-1-1-1',
                      icon: 'el-icon-monitor',
                      name: '四级菜单01'
                    }
                  ]
                },
                {
                  index: '1-1-2',
                  icon: 'el-icon-headset',
                  name: '三级菜单02'
                }
              ]
            },
            {
              index: '1-2',
              icon: 'el-icon-data-line',
              name: '二级菜单02'
            }
          ]
        },
        {
          index: '2',
          icon: 'el-icon-s-data',
          name: '一级菜单02'
        },
        {
          index: '3',
          icon: 'el-icon-s-operation',
          name: '一级菜单03'
        },
        {
          index: '4',
          icon: 'el-icon-user',
          name: '一级菜单04'
        }
      ],
    
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
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" }
        ],
        content: [
          { required: true, message: "内容不能为空", trigger: "blur" }
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
       
      }
    };
  },
  created() {
    this.getList();
    this.getTreeselect();
  },
  methods: {
    change(val) {
      console.log(val)
      this.text=val;
    },

    handleSelect(key, keyPath) {
        //console.log(key);
        this.queryParams.channelId=key;
        this.getList();
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
        this.caidanOptions =response.data;
        this.deptOptions =this.handleTree(response.data, "id", "parentId");
        //console.log(this.deptOptions)
      });
    },
    
    // 技术频道翻译
    channelFormat(row, column) {
      var name="";
        this.caidanOptions.forEach(item =>{
          if(item.id== row.channelId){
            name=item.name;
           
          }
        })
        return name;
    },
    /** 转换新闻菜单数据结构 */
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

     // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      // this.curDeptId= data.id;
      this.form.channelId=data.id;
      this.queryParams.channelId = data.id;
       this.$forceUpdate();  
       if(!this.open){
          this.getList();
       }
      
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
        content:"",
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
      this.open = false;
      const id = row.id || this.ids
      getArticle(id).then(response => {
        this.form = response.data;
       // this.$forceUpdate();
       
        this.open = true;
        this.title = "修改博客文章";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.content=this.text;
          // if( this.form.content==null){
          //   this.$message.error('内容不能为空！');
          //   return;
          // };
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
