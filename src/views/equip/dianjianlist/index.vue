<template>
  <div class="app-container">
      <el-row :gutter="20">
        <!--部门数据-->
      <el-col :span="5" :xs="24" >
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
        <div class="head-container" >
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
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
     <el-tab-pane label="点检记录" name="first">
      <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="设备id" prop="sbid">
        <el-input
          v-model="queryParams.sbid"
          placeholder="请输入设备id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
      <!-- <el-form-item label="标准id" prop="bzhid">
        <el-input
          v-model="queryParams.bzhid"
          placeholder="请输入标准id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="点检单位" prop="dept">
        <el-select v-model="queryParams.dept" placeholder="请选择点检单位" clearable size="small">
          <el-option
            v-for="dict in deptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="点检班组" prop="team">
        <el-select v-model="queryParams.team" placeholder="请选择点检班组" clearable size="small">
          <el-option
            v-for="dict in teamOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="点检类别" prop="leibie">
        <el-select v-model="queryParams.leibie" placeholder="请选择点检类别" clearable size="small">
          <el-option
            v-for="dict in leibieOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item label="分级" prop="fenji">
        <el-select v-model="queryParams.fenji" placeholder="请选择分级" clearable size="small">
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
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="标准备注" prop="bzhnote">
        <el-input
          v-model="queryParams.bzhnote"
          placeholder="请输入标准备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="周应点检次数" prop="zhoucishu">
        <el-input
          v-model="queryParams.zhoucishu"
          placeholder="请输入周应点检次数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="点检人" prop="djr">
        <el-input
          v-model="queryParams.djr"
          placeholder="请输入点检人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="点检结果" prop="djresult">
        <el-select v-model="queryParams.djresult" placeholder="请选择点检结果" clearable size="small">
          <el-option
            v-for="dict in djresultOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="点检时刻" prop="djtime">
        <el-date-picker clearable size="small"
          v-model="queryParams.djtime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择点检时刻">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input
          v-model="queryParams.note"
          placeholder="请输入备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否可以点检" prop="flag">
        <el-input
          v-model="queryParams.flag"
          placeholder="请输入是否可以点检"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="点检日期" prop="djrq">
        <el-date-picker clearable size="small"
          v-model="queryParams.djrq"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择点检日期">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label="点检日期">
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
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
         
        >导出</el-button>
      </el-form-item>
      </el-form>
     <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:dianjianlist:add']"
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
          v-hasPermi="['system:dianjianlist:edit']"
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
          v-hasPermi="['system:dianjianlist:remove']"
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
          v-hasPermi="['system:dianjianlist:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->
       <el-table v-loading="loading" :data="dianjianlistList" @row-dblclick="handleUpdate" >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="序号" align="center" prop="id" />
      <!-- <el-table-column label="设备id" align="center" prop="sbid" /> -->
      <el-table-column label="设备名称" align="center" prop="sbname" width="200px" />
      <!-- <el-table-column label="标准id" align="center" prop="bzhid" /> -->
      <!-- <el-table-column label="标准内容" align="center" prop="biaozhun" /> -->
      <el-table-column label="点检单位" align="center" prop="dept"  width="100px"/>
     
      <!-- <el-table-column label="标准备注" align="center" prop="bzhnote" /> -->
      <!-- <el-table-column label="周应点检次数" align="center" prop="zhoucishu" /> -->
      <el-table-column label="点检人" align="center" prop="djr" />
      <el-table-column label="点检结果" align="center" prop="djresult" >
       <template slot-scope="scope">
         <el-tag
          v-show="scope.row.djresult=='异常'"
          type='danger'
          >{{ scope.row.djresult }}</el-tag>
          <el-tag
          v-show="scope.row.djresult=='正常'"
          type='primary'
          >{{ scope.row.djresult }}</el-tag>
      </template> 
      </el-table-column>
      <el-table-column label="点检内容" align="center" prop="djcontent" width="180" />
      <el-table-column label="点检时刻" align="center" prop="djtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.djtime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="方式" align="center" prop="laiyuan"  />
      <!-- <el-table-column label="点检类别" align="center" prop="leibie"  /> -->
      <el-table-column label="点检周期" align="center" prop="zhouqi"  />
       <!-- <el-table-column label="点检班组" align="center" prop="team" width="120" /> -->
      
      <!-- <el-table-column label="备注" align="center" prop="note" />
      <el-table-column label="是否可以点检" align="center" prop="flag" />
      <el-table-column label="点检日期" align="center" prop="djrq" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.djrq, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:dianjianlist:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dianjianlist:remove']"
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
     </el-tab-pane>
    <el-tab-pane label="故障记录" name="second">
       <el-form :model="queryParamsGz" ref="queryFormGz" :inline="true" v-show="showSearch" label-width="68px">
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
      <!-- <el-form-item label="登记日期" prop="djsk">
        <el-date-picker clearable size="small"
          v-model="queryParamsGz.djsk"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择登记日期">
        </el-date-picker>
      </el-form-item> -->
       <el-form-item label="登记日期">
         <el-date-picker
              v-model="dateRangeGz"
              size="small"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
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
     
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQueryGz">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQueryGz">重置</el-button>
         <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExportGz"
         
        >导出</el-button>
      </el-form-item>
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
      <el-table-column label="登记车间" align="center" prop="djdept" width="100px" />
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
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getListGz"
    />
    </el-tab-pane>
    <el-tab-pane label="检修计划记录" name="third">
      <el-form :model="queryParamsJx" ref="queryFormJx" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="设备ID" prop="sbid">
        <el-input
          v-model="queryParams.sbid"
          placeholder="请输入设备ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="设备名称" prop="sbname">
        <el-input
          v-model="queryParamsJx.sbname"
          placeholder="请输入设备名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检修单位" prop="dept">
        <el-select v-model="queryParamsJx.dept" placeholder="请选择检修单位" clearable size="small">
          <el-option
            v-for="dict in djwxdeptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="检修班组" prop="team">
        <el-input
          v-model="queryParamsJx.team"
          placeholder="请输入检修班组"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="计划人" prop="jhr">
        <el-input
          v-model="queryParams.jhr"
          placeholder="请输入计划人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="计划日期" prop="jhrq">
        <el-date-picker clearable size="small"
          v-model="queryParamsJx.jhrq"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择计划日期">
        </el-date-picker>
      </el-form-item> -->
       <el-form-item label="计划日期">
         <el-date-picker
              v-model="dateRangeJx"
              size="small"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="登记时间" prop="djtime">
        <el-input
          v-model="queryParams.djtime"
          placeholder="请输入登记时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检修内容" prop="jxnr">
        <el-input
          v-model="queryParams.jxnr"
          placeholder="请输入检修内容"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检修描述" prop="jxms">
        <el-input
          v-model="queryParams.jxms"
          placeholder="请输入检修描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检修时间" prop="jxtime">
        <el-input
          v-model="queryParams.jxtime"
          placeholder="请输入检修时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="状态" prop="status">
         <el-select v-model="queryParamsJx.status" placeholder="请选择状态"  size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select> 
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQueryJx">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQueryJx">重置</el-button>
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExportJx"    
        >导出</el-button>
      </el-form-item>
    </el-form>

  
    <el-table v-loading="loading" :data="jianxiuList" >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="ID" align="center" prop="id" />
      <!-- <el-table-column label="设备ID" align="center" prop="sbid" /> -->
      <el-table-column label="设备名称" align="center" prop="sbname" width="200px" />
      <el-table-column label="检修单位" align="center" prop="dept" width="120px"/>
      <el-table-column label="检修班组" align="center" prop="team" width="120px" />
      
      <el-table-column label="计划日期" align="center" prop="jhrq" width="120">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.jhrq, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="登记时间" align="center" prop="djtime" /> -->
      <el-table-column label="检修内容" align="center" prop="jxnr" width="200px" />
      <el-table-column label="检修描述" align="center" prop="jxms" width="200px" />
      <el-table-column label="检修时间" align="center" prop="jxtime" width="100px" />
      <el-table-column label="状态" align="center" prop="status" />
      <el-table-column label="计划人" align="center" prop="jhr" />
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:jianxiu:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:jianxiu:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getListJx"
    />
    </el-tab-pane>
     </el-tabs>
   
    

    
      </el-col>
      </el-row>

   

    <!-- 添加或修改点检记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="设备id" prop="sbid">
          <el-input v-model="form.sbid" placeholder="请输入设备id" />
        </el-form-item>
        <el-form-item label="设备名称" prop="sbname">
          <el-input v-model="form.sbname" placeholder="请输入设备名称" />
        </el-form-item>
        <!-- <el-form-item label="标准id" prop="bzhid">
          <el-input v-model="form.bzhid" placeholder="请输入标准id" />
        </el-form-item> -->
        <el-form-item label="点检内容">
          <el-input v-model="form.djcontent" type="textarea" :rows=3 placeholder="请输入内容" />     
        </el-form-item>
         <el-form-item label="点检结果" prop="djresult">
          <el-select v-model="form.djresult" placeholder="请选择点检结果">
            <el-option
              v-for="dict in djresultOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="关注参数" v-show="form.yxcs!= null &&form.yxcs!=''" prop="yxcs">
          <el-input v-model="form.yxcs" type="textarea" readonly rows="3" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="点检等级"  prop="fenji">
          <el-input v-model="form.fenji"  readonly placeholder="分级" />
        </el-form-item>
         <el-form-item label="点检照片" v-show="form.fenji=='S级'||form.fenji=='A级'">
          <el-image
            style="width: 300px; height: 300px"
            :src="form.pic"
            :preview-src-list="[form.pic]"
          >
          </el-image>
          </el-form-item>
         <el-form-item label="标准内容" prop="biaozhun">
          <!-- <el-input v-model="form.biaozhun" type="textarea" placeholder="请输入内容" /> -->
           <EditorReadOnly  v-model="form.biaozhun"  :min-height="192"/>
        </el-form-item>
        <el-form-item label="点检单位" prop="dept">
          <el-select v-model="form.dept" placeholder="请选择点检单位">
            <el-option
              v-for="dict in deptOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="点检班组" prop="team">
          <el-select v-model="form.team" placeholder="请选择点检班组">
            <el-option
              v-for="dict in teamOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="点检类别" prop="leibie">
          <el-select v-model="form.leibie" placeholder="请选择点检类别">
            <el-option
              v-for="dict in leibieOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="点检周期" prop="zhouqi">
          <el-select v-model="form.zhouqi" placeholder="请选择点检周期">
            <el-option
              v-for="dict in zhouqiOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标准备注" prop="bzhnote">
          <el-input v-model="form.bzhnote" placeholder="请输入标准备注" />
        </el-form-item>
        <el-form-item label="周应点检次数" prop="zhoucishu">
          <el-input v-model="form.zhoucishu" placeholder="请输入周应点检次数" />
        </el-form-item>
        <el-form-item label="点检人" prop="djr">
          <el-input v-model="form.djr" placeholder="请输入点检人" />
        </el-form-item>
       
        <!-- <el-form-item label="点检内容">
          <editor v-model="form.djcontent" :min-height="192"/>
        </el-form-item> -->
       
        <!-- <el-form-item label="点检时刻" prop="djtime">
        
          <el-date-picker clearable size="small"
            v-model="form.djtime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择点检时刻">
          </el-date-picker>
        </el-form-item> -->
        <!-- <el-form-item label="备注" prop="note">
          <el-input v-model="form.note" placeholder="请输入备注" />
        </el-form-item> -->
        <!-- <el-form-item label="是否可以点检" prop="flag">
          <el-input v-model="form.flag" placeholder="请输入是否可以点检" />
        </el-form-item>
        <el-form-item label="点检日期" prop="djrq">
          <el-date-picker clearable size="small"
            v-model="form.djrq"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择点检日期">
          </el-date-picker>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="submitForm">确 定</el-button> -->
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDianjianlist, getDianjianlist, delDianjianlist, addDianjianlist, updateDianjianlist, exportDianjianlist } from "@/api/system/dianjianlist";
import { treeselect } from "@/api/system/quyu";
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
      activeName: 'first',

       // 日期范围
      dateRange: [],
       // 日期范围
      dateRangeGz: [],
       // 日期范围
      dateRangeJx: [],
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
      // // 点检类别字典
      leibieOptions: [],
       // 分级字典
      fenjiOptions: [],

      // 点检周期字典
      zhouqiOptions: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 点检结果字典
      djresultOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
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
      },
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
    this.getDicts("lgdept").then(response => {
      this.deptOptions = response.data;
    });
    this.getDicts("sys_user_team").then(response => {
      this.teamOptions = response.data;
    });
    // this.getDicts("dianjianleibie").then(response => {
    //   this.leibieOptions = response.data;
    // });
     this.getDicts("djdengji").then(response => {
      this.fenjiOptions = response.data;
    });
    this.getDicts("dianjianzhouqi").then(response => {
      this.zhouqiOptions = response.data;
    });
    this.getDicts("dianjianjieguo").then(response => {
      this.djresultOptions = response.data;
    });
    //故障的基础数据加载
    this.getDicts("weixiudept").then(response => {
      this.djwxdeptOptions = response.data;
    });
    this.getDicts("sbgzlx").then(response => {
      this.jsclflOptions = response.data;
    });
    this.getDicts("yzjg").then(response => {
      this.yzresultOptions = response.data;
    });
    
  },
  
  methods: {
    /** 查询点检记录列表 */
    getList() {
      this.loading = true;
      listDianjianlist(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.dianjianlistList = response.rows;
        this.total = response.total;
        this.loading = false;
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
      listGuzhang(this.addDateRange(this.queryParamsGz, this.dateRangeGz)).then(response => {
        this.guzhangList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
     /** 导出按钮操作 */
    handleExportJx() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有计划检修数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportJianxiu(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    },

    /** 导出按钮操作 故障报修*/
    handleExportGz() {
      const queryParams = this.queryParamsGz;
      this.$confirm('是否确认导出所有故障报修数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportGuzhang(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    },

  
     /** 查询计划检修列表 */
    getListJx() {
      this.loading = true;
      listJianxiu(this.addDateRange(this.queryParamsJx, this.dateRangeJx)).then(response => {
        this.jianxiuList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
     /** 搜索按钮操作 */
    handleQueryJx() {
      this.queryParamsJx.pageNum = 1;
      this.getListJx();
    },
    /** 重置按钮操作 */
    resetQueryJx() {
      this.resetForm("queryFormJx");
      this.handleQueryJx();
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
      this.queryParams.sbid = data.id;
      this.queryParamsGz.sbid = data.id;
      this.queryParamsJx.sbid = data.id;
      if(this.activeName=='first'){
           this.handleQuery();
      }
      else if(this.activeName=='second'){
        this.handleQueryGz();
      }else if(this.activeName=='third'){
        this.handleQueryJx();
      }
     
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

