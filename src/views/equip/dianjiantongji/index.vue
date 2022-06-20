<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="时间" prop="logtime">
        <el-date-picker clearable size="small"
          v-model="queryParams.logtime"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择时间">
        </el-date-picker>
      </el-form-item>
     
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      </el-form-item>
       
<!--        
      <el-form-item>
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:dianjiantongji:edit']"
        >修改</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:dianjiantongji:remove']"
        >删除</el-button>
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['system:dianjiantongji:export']"
        >导出</el-button>
      </el-form-item>
    </el-form>

    

    <el-table v-loading="loading" :data="dianjiantongjiList" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="时间" align="center" prop="logtime" width="180">
        <!-- <template slot-scope="scope">
          <span>{{ parseTime(scope.row.logtime, '{y}-{m}-{d}') }}</span>
        </template> -->
      </el-table-column>
      <!-- <el-table-column label="周" align="center" prop="zhou" />
      <el-table-column label="时间段" align="center" prop="sjd" /> -->
      <el-table-column label="点检单位" align="center" prop="djdw" />
      <el-table-column label="应点检数量" align="center" prop="ydjsl" />
      <el-table-column label="实际点检数量" align="center" prop="sdjsl" />
      <el-table-column label="点检率" align="center" prop="djrate" />
      <el-table-column label="车间指标" align="center" prop="cjzb" />
      <el-table-column label="问题数量" align="center" prop="wtsl" />
      <el-table-column label="管理问题数量" align="center" prop="glwtsl" />
      <!-- <el-table-column label="管理问题数量累计" align="center" prop="glwtsllj" /> -->
      <el-table-column label="问题率" align="center" prop="wtrate" />
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:dianjiantongji:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dianjiantongji:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    
    <!-- <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    /> -->
    <div class="continer">    
     <section class="content-box">
      <section class="item-box">
        <itemBox :title="tsccGaugeOptionalSettings_weixiu.title">
           <el-col :span="6" :style="{width:'25%',height:'100%'}" >
              <TsccGaugeChart
            :chartData="tsccGaugeData_weixiu"
            :requiredSettings="tsccGaugeRequiredSettings_weixiu"
            :optionalSettings="tsccGaugeOptionalSettings_weixiu"
          />
           </el-col>
          <el-col :span="6" :style="{width:'25%',height:'100%'}" >
            <TsccGaugeChart
            :chartData="tsccGaugeData_yunxing"
            :requiredSettings="tsccGaugeRequiredSettings_yunxing"
            :optionalSettings="tsccGaugeOptionalSettings_yunxing"
          />
          </el-col>
          <el-col :span="6" :style="{width:'25%',height:'100%'}" >
            <TsccGaugeChart
            :chartData="tsccGaugeData_yelian"
            :requiredSettings="tsccGaugeRequiredSettings_yelian"
            :optionalSettings="tsccGaugeOptionalSettings_yelian"
          />
          </el-col>
          <el-col :span="6" :style="{width:'25%',height:'100%'}" >
             <TsccGaugeChart
            :chartData="tsccGaugeData_lianzhu"
            :requiredSettings="tsccGaugeRequiredSettings_lianzhu"
            :optionalSettings="tsccGaugeOptionalSettings_lianzhu"
          />
          </el-col>
         
         
        </itemBox>
      </section>
       <!-- <section class="item-box">
        <itemBox :title="tsccGaugeOptionalSettings_yunxing.title">
         
          <TsccGaugeChart
            :chartData="tsccGaugeData_yunxing"
            :requiredSettings="tsccGaugeRequiredSettings_yunxing"
            :optionalSettings="tsccGaugeOptionalSettings_yunxing"
          />
        </itemBox>
      </section>
      <section class="item-box">
        <itemBox :title="tsccGaugeOptionalSettings_yelian.title">
         
          <TsccGaugeChart
            :chartData="tsccGaugeData_yelian"
            :requiredSettings="tsccGaugeRequiredSettings_yelian"
            :optionalSettings="tsccGaugeOptionalSettings_yelian"
          />
        </itemBox>
      </section>
       <section class="item-box">
        <itemBox :title="tsccGaugeOptionalSettings_lianzhu.title">
          
          <TsccGaugeChart
            :chartData="tsccGaugeData_lianzhu"
            :requiredSettings="tsccGaugeRequiredSettings_lianzhu"
            :optionalSettings="tsccGaugeOptionalSettings_lianzhu"
          />
        </itemBox>
      </section> -->
     
     </section>
       <!-- 设备点检数量、分类点检数量 -->
     <section class="content-box">
     
      <section class="item-box">
         
        <itemBox  :title="shebeidianjianqingkuang">
          <el-col :span="12" :style="{width:'50%',height:'100%'}" >
            <tscc-bar-chart
            :chartData="tsccBarData"
            :requiredSettings="tsccBarRequiredSettings"
            :optionalSettings="tsccBarOptionalSettings"
            style="height:90%;margin-top:20px"
          ></tscc-bar-chart>
         </el-col>
         <el-col :span="12" :style="{width:'50%',height:'100%'}" >
            <TsccPieChart
            :chartData="tsccDoughnutData"
            :requiredSettings="tsccDoughnutRequiredSettings"
            :optionalSettings="tsccDoughnutOptionalSettings"
          />
         </el-col>
          
        </itemBox>
      </section>
     </section>
  <!-- 设备检修图表 -->
      <section class="content-box">
     
      <section class="item-box">
        <itemBox  :title="shebeijianxiuqingkuang">
             <el-col :span="12" :style="{width:'50%',height:'100%'}" >
                <tscc-bar-chart
            :chartData="tsccBarData_jianxiu"
            :requiredSettings="tsccBarRequiredSettings_jianxiu"
            :optionalSettings="tsccBarOptionalSettings_jianxiu"
            style="height:90%;margin-top:20px"
          ></tscc-bar-chart>
             </el-col>
               <el-col :span="6" :style="{width:'25%',height:'100%'}" >
                   <TsccGaugeChart
            :chartData="tsccGaugeData_jianxiuyunxing"
            :requiredSettings="tsccGaugeRequiredSettings_jianxiuyunxing"
            :optionalSettings="tsccGaugeOptionalSettings_jianxiuyunxing"
          />
                </el-col>
                 <el-col :span="6" :style="{width:'25%',height:'100%'}">
                     <TsccGaugeChart
            :chartData="tsccGaugeData_jianxiuweixiu"
            :requiredSettings="tsccGaugeRequiredSettings_jianxiuweixiu"
            :optionalSettings="tsccGaugeOptionalSettings_jianxiuweixiu"
          />

                </el-col>
         

        </itemBox>
         </section>
        <!-- <section class="item-box">
        <itemBox :title="tsccGaugeOptionalSettings_jianxiuweixiu.title">
         
          <TsccGaugeChart
            :chartData="tsccGaugeData_jianxiuweixiu"
            :requiredSettings="tsccGaugeRequiredSettings_jianxiuweixiu"
            :optionalSettings="tsccGaugeOptionalSettings_jianxiuweixiu"
          />
        </itemBox>
      </section> -->

       <!-- <section class="item-box">
         
             <itemBox :title="tsccGaugeOptionalSettings_jianxiuyunxing.title" >
                <el-col :span="12" :style="{width:'50%',height:'100%'}" >
                   <TsccGaugeChart
            :chartData="tsccGaugeData_jianxiuyunxing"
            :requiredSettings="tsccGaugeRequiredSettings_jianxiuyunxing"
            :optionalSettings="tsccGaugeOptionalSettings_jianxiuyunxing"
          />
                </el-col>
                 <el-col :span="12" :style="{width:'50%',height:'100%'}">
                     <TsccGaugeChart
            :chartData="tsccGaugeData_jianxiuweixiu"
            :requiredSettings="tsccGaugeRequiredSettings_jianxiuweixiu"
            :optionalSettings="tsccGaugeOptionalSettings_jianxiuweixiu"
          />

                </el-col>
       
         
        </itemBox>
          
       
      </section> -->
      
      

     </section>
   <!-- 设备故障图表 -->
     <section class="content-box">
    
      <section class="item-box">
        <itemBox  :title="shebeiguzhangqingkuang">
             <el-col :span="12" :style="{width:'50%',height:'100%'}" >
                <TsccLineChart
                 :chartData="tsccLineData"
                 :requiredSettings="tsccLineRequiredSettings"
                 :optionalSettings="tsccLineOptionalSettings"
                  style="height:100%;margin-top:20px"
                 ></TsccLineChart>
             </el-col>
               <el-col :span="12" :style="{width:'50%',height:'100%'}" >
                    <tscc-bar-chart
                       :chartData="tsccBarData_guzhang"
                       :requiredSettings="tsccBarRequiredSettings_guzhang"
                       :optionalSettings="tsccBarOptionalSettings_guzhang"
                        style="height:90%;margin-top:20px"
                    ></tscc-bar-chart>
               

                </el-col>
        </itemBox>
         </section>
            <!-- 设备故障报修及时接收率图表 -->
          <section class="item-box">
        <itemBox :title="tsccGaugeOptionalSettings_weixiu_baoxiu_jieshou.title">
           <el-col :span="12" :style="{width:'50%',height:'100%'}" >
              <TsccGaugeChart
            :chartData="tsccGaugeData_weixiu_baoxiu_jieshou"
            :requiredSettings="tsccGaugeRequiredSettings_weixiu_baoxiu_jieshou"
            :optionalSettings="tsccGaugeOptionalSettings_weixiu_baoxiu_jieshou"
          />
           </el-col>
          <el-col :span="12" :style="{width:'50%',height:'100%'}" >
            <TsccGaugeChart
            :chartData="tsccGaugeData_yunxing_baoxiu_jieshou"
            :requiredSettings="tsccGaugeRequiredSettings_yunxing_baoxiu_jieshou"
            :optionalSettings="tsccGaugeOptionalSettings_yunxing_baoxiu_jieshou"
          />
          </el-col>
          
        </itemBox>
      </section>
     </section>
     
    <!-- 设备故障报修验证率图表 -->
     <section class="content-box">
      <section class="item-box">
        <itemBox :title="tsccGaugeOptionalSettings_weixiu_baoxiu.title">
           <el-col :span="6" :style="{width:'25%',height:'100%'}" >
              <TsccGaugeChart
            :chartData="tsccGaugeData_weixiu_baoxiu"
            :requiredSettings="tsccGaugeRequiredSettings_weixiu_baoxiu"
            :optionalSettings="tsccGaugeOptionalSettings_weixiu_baoxiu"
          />
           </el-col>
          <el-col :span="6" :style="{width:'25%',height:'100%'}" >
            <TsccGaugeChart
            :chartData="tsccGaugeData_yunxing_baoxiu"
            :requiredSettings="tsccGaugeRequiredSettings_yunxing_baoxiu"
            :optionalSettings="tsccGaugeOptionalSettings_yunxing_baoxiu"
          />
          </el-col>
          <el-col :span="6" :style="{width:'25%',height:'100%'}" >
            <TsccGaugeChart
            :chartData="tsccGaugeData_yelian_baoxiu"
            :requiredSettings="tsccGaugeRequiredSettings_yelian_baoxiu"
            :optionalSettings="tsccGaugeOptionalSettings_yelian_baoxiu"
          />
          </el-col>
          <el-col :span="6" :style="{width:'25%',height:'100%'}" >
             <TsccGaugeChart
            :chartData="tsccGaugeData_lianzhu_baoxiu"
            :requiredSettings="tsccGaugeRequiredSettings_lianzhu_baoxiu"
            :optionalSettings="tsccGaugeOptionalSettings_lianzhu_baoxiu"
          />
          </el-col>
        </itemBox>
      </section>
     </section>

         <!-- 设备故障报修及时接收率图表 -->
     <!-- <section class="content-box">
      <section class="item-box">
        <itemBox :title="tsccGaugeOptionalSettings_weixiu_baoxiu_jieshou.title">
           <el-col :span="12" :style="{width:'50%',height:'100%'}" >
              <TsccGaugeChart
            :chartData="tsccGaugeData_weixiu_baoxiu_jieshou"
            :requiredSettings="tsccGaugeRequiredSettings_weixiu_baoxiu_jieshou"
            :optionalSettings="tsccGaugeOptionalSettings_weixiu_baoxiu_jieshou"
          />
           </el-col>
          <el-col :span="12" :style="{width:'50%',height:'100%'}" >
            <TsccGaugeChart
            :chartData="tsccGaugeData_yunxing_baoxiu_jieshou"
            :requiredSettings="tsccGaugeRequiredSettings_yunxing_baoxiu_jieshou"
            :optionalSettings="tsccGaugeOptionalSettings_yunxing_baoxiu_jieshou"
          />
          </el-col>
          
        </itemBox>
      </section>
     </section> -->



    </div>
    <!-- 点检分类 -->
     <el-table v-loading="loading" v-show="false" :data="dianjianfenleiList" >
      
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="月份" align="center" prop="logtime" width="180"/>
        
      <el-table-column label="点检类别" align="center" prop="djfl"  />
      <el-table-column label="点检数量" align="center" prop="djsl" />
      <el-table-column label="问题数量" align="center" prop="wtsl" />
    </el-table>
    <!-- 检修计划 -->
     <el-table v-loading="loading"  v-show="false" :data="jianxiutongjiList" >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="登记单位" align="center" prop="djdw" />
      <el-table-column label="月份" align="center" prop="logtime" width="180"/>
      <!-- <el-table-column label="周" align="center" prop="zhou" />
      <el-table-column label="时间段" align="center" prop="sjd" /> -->
      <el-table-column label="申报数量" align="center" prop="sbsl" />
      <el-table-column label="实际数量" align="center" prop="sjsl" />
      <el-table-column label="兑现率" align="center" prop="rate" />
     
    </el-table>

      <el-table v-loading="loading" :data="guzhangtongjiList" >
     
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="登记单位" align="center" prop="djdw"  />
      <el-table-column label="月份" align="center" prop="logtime" width="180"/>
       
      <el-table-column label="登记数量" align="center" prop="djsl" />
      <el-table-column label="应接收数量" align="center" prop="yjssl" />
      <el-table-column label="接收数量" align="center" prop="jssl" />
      <el-table-column label="处理数量" align="center" prop="clsl" />
      <el-table-column label="待处理数量" align="center" prop="dclsl" />
      <el-table-column label="应验证数量" align="center" prop="yyzsl" />
      <el-table-column label="验证数量" align="center" prop="yzsl" />
      <el-table-column label="验证率" align="center" prop="yzrate" />
      <el-table-column label="延误数量" align="center" prop="ywsl" />
      <el-table-column label="延误率" align="center" prop="ywrate" />
      <el-table-column label="接收率" align="center" prop="jsrate" />
      <el-table-column label="处理率" align="center" prop="clrate" />
      <!-- <el-table-column label="周" align="center" prop="zhou" />
      <el-table-column label="时间段" align="center" prop="sjd" />
      <el-table-column label="时间点" align="center" prop="ts" /> -->
      
    </el-table>
    <!-- 添加或修改月点检统计对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="ID" prop="id">
          <el-input v-model="form.id" placeholder="请输入ID" />
        </el-form-item>
        <el-form-item label="时间" prop="logtime">
          <el-date-picker clearable size="small"
            v-model="form.logtime"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="周" prop="zhou">
          <el-input v-model="form.zhou" placeholder="请输入周" />
        </el-form-item>
        <el-form-item label="时间段" prop="sjd">
          <el-input v-model="form.sjd" placeholder="请输入时间段" />
        </el-form-item>
        <el-form-item label="点检单位" prop="djdw">
          <el-input v-model="form.djdw" placeholder="请输入点检单位" />
        </el-form-item>
        <el-form-item label="应点检数量" prop="ydjsl">
          <el-input v-model="form.ydjsl" placeholder="请输入应点检数量" />
        </el-form-item>
        <el-form-item label="实际点检数量" prop="sdjsl">
          <el-input v-model="form.sdjsl" placeholder="请输入实际点检数量" />
        </el-form-item>
        <el-form-item label="点检率" prop="djrate">
          <el-input v-model="form.djrate" placeholder="请输入点检率" />
        </el-form-item>
        <el-form-item label="车间指标" prop="cjzb">
          <el-input v-model="form.cjzb" placeholder="请输入车间指标" />
        </el-form-item>
        <el-form-item label="问题数量" prop="wtsl">
          <el-input v-model="form.wtsl" placeholder="请输入问题数量" />
        </el-form-item>
        <el-form-item label="管理问题数量" prop="glwtsl">
          <el-input v-model="form.glwtsl" placeholder="请输入管理问题数量" />
        </el-form-item>
        <el-form-item label="管理问题数量累计" prop="glwtsllj">
          <el-input v-model="form.glwtsllj" placeholder="请输入管理问题数量累计" />
        </el-form-item>
        <el-form-item label="问题率" prop="wtrate">
          <el-input v-model="form.wtrate" placeholder="请输入问题率" />
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
import { listDianjiantongji, getDianjiantongji, delDianjiantongji, addDianjiantongji, updateDianjiantongji, exportDianjiantongji } from "@/api/system/dianjiantongji";
//查询、导出点检分类
import { listDianjianfenlei, exportDianjianfenlei } from "@/api/system/dianjianfenlei";
//查询、导出检修计划
import { listJianxiutongji, exportJianxiutongji } from "@/api/system/jianxiutongji";
//查询、导出故障报修
import { listGuzhangtongji, exportGuzhangtongji } from "@/api/system/guzhangtongji";

import itemBox from "@/components/itemBox";
//仪表图
import TsccGaugeChart from "@/components/charts/TsccGaugeChart";
//柱状图
import TsccBarChart from "@/components/charts/TsccBarChart";
//饼图
import TsccPieChart from "@/components/charts/TsccPieChart";
//折线图
import TsccLineChart from "@/components/charts/TsccLineChart";
export default {
  name: "Dianjiantongji",
  data() {
    return {

        // 仪表盘
      tsccGaugeData_weixiu: 0,
      tsccGaugeRequiredSettings_weixiu: {
        name: "维修"
      },
      tsccGaugeOptionalSettings_weixiu: {
        title: "各车间设备点检率",
        //fd666d
        //67e0e3  #E4EF0B
        //37a2da
        color: [
           [0.6, '#FF0000'],
           [0.9, '#FFFF00'],
           [1, '#00FF00']
        ]
      },
      tsccGaugeData_yunxing: 0,
      tsccGaugeRequiredSettings_yunxing: {
        name: "运行"
      },
      tsccGaugeOptionalSettings_yunxing: {
        title: "运行车间点检率",
        //fd666d
        //67e0e3  #E4EF0B
        //37a2da
        color: [
            [0.6, '#FF0000'],
           [0.9, '#FFFF00'],
           [1, '#00FF00']
        ]
      },
      tsccGaugeData_yelian: 0,
      tsccGaugeRequiredSettings_yelian: {
        name: "冶炼"
      },
      tsccGaugeOptionalSettings_yelian: {
        title: "冶炼车间点检率",
        //fd666d
        //67e0e3  #E4EF0B
        //37a2da
        color: [
            [0.6, '#FF0000'],
           [0.9, '#FFFF00'],
           [1, '#00FF00']
        ]
      },
       tsccGaugeData_lianzhu: 0,
      tsccGaugeRequiredSettings_lianzhu: {
        name: "连铸"
      },
      tsccGaugeOptionalSettings_lianzhu: {
        title: "连铸车间点检率",
        //fd666d
        //67e0e3  #E4EF0B
        //37a2da
        color: [
            [0.6, '#FF0000'],
           [0.9, '#FFFF00'],
           [1, '#00FF00']
        ]
      },

      tsccGaugeData_jianxiuweixiu: 0,
      tsccGaugeRequiredSettings_jianxiuweixiu: {
        name: "维修"
      },
      tsccGaugeOptionalSettings_jianxiuweixiu: {
        title: "维修车间检修兑现率",
        //fd666d
        //67e0e3  #E4EF0B
        //37a2da
        color: [
            [0.6, '#FF0000'],
           [0.9, '#FFFF00'],
           [1, '#00FF00']
        ]
      },


       tsccGaugeData_jianxiuyunxing: 0,
      tsccGaugeRequiredSettings_jianxiuyunxing: {
        name: "运行"
      },
      tsccGaugeOptionalSettings_jianxiuyunxing: {
        title: "各车间检修兑现率",
        //fd666d
        //67e0e3  #E4EF0B
        //37a2da
        color: [
            [0.6, '#FF0000'],
           [0.9, '#FFFF00'],
           [1, '#00FF00']
        ]
      },

       //柱状图--设备点检
       shebeidianjianqingkuang:"各车间设备点检数量、分类点检数量",
      tsccBarData: [[120, 200, 150],[320, 300, 250],[320, 300, 250]],
      //tsccBarData: [],
      tsccBarRequiredSettings: {
        xAxisData: ["Mon", "Tue", "Wed"],
       // xAxisData: [],
        barType: 1 //1为单柱  2为多柱
      },
      tsccBarOptionalSettings: {
        graphicColor: ["#00feff", "#027eff", "#0286ff", "yellow"],
        legendData: ["应点检次数","实际点检次数","管理人员问题数量"],
        unit: ["次数"],
        barBorderRadius: [10, 10, 0, 0]
      },

       //柱状图--设备检修
       shebeijianxiuqingkuang:"各车间设备计划检修数量、兑现率",
      tsccBarData_jianxiu: [[120, 200],[320, 300]],
      //tsccBarData: [],
      tsccBarRequiredSettings_jianxiu: {
        xAxisData: ["Mon", "Tue"],
       // xAxisData: [],
        barType: 1 //1为单柱  2为多柱
      },
      tsccBarOptionalSettings_jianxiu: {
        graphicColor: ["#00feff", "#027eff", "#0286ff", "yellow"],
        legendData: ["申报数量","完成数量"],
        unit: ["数量"],
        barBorderRadius: [10, 10, 0, 0]
      },

        //环形饼图
      tsccDoughnutData: [302, 217, 175],
      tsccDoughnutRequiredSettings: {
        nameArr: ["盛发", "热电", "总厂"],
        radius: ["50%", "70%"]
      },
      tsccDoughnutOptionalSettings: {
        title: "分类点检情况",
        //颜色设置
        color: ["#17DA93", "#94CA1F", "rgba(0,255,255,1)"],
        center: ["50%", "47%"],
        bottom: "5%"
      },

       
       shebeiguzhangqingkuang:"各车间设备故障报修申报、处理情况",
      // 折线图
      tsccLineData: [
        [40, 50, 52],
        [100, 200, 300],
        
      ],
      tsccLineRequiredSettings: {
        xAxisData: ["2018年", "2019年", "2020年"],
        nameArr: ["报修数量", "验证数量"]
      },
      tsccLineOptionalSettings: {
        title: "申报验证",
        titleColor: "red",
        xAxisLineColor: "red",
        xAxisLabelColor: "#fff",
        yAxisLineColor: "yellow",
        // color: ["#3E1CDC", "#097CEB", "#21C76E"],
        unit: ["数量(项)"],
        grid: {
          left: "2%",
          right: "7%",
          bottom: "20%",
          containLabel: true
        }
      },

       tsccBarData_guzhang: [[120, 200, 150],[320, 300, 250],[320, 300, 250]],
      //tsccBarData: [],
      tsccBarRequiredSettings_guzhang: {
        xAxisData: ["Mon", "Tue"],
       // xAxisData: [],
        barType: 1 //1为单柱  2为多柱
      },
      tsccBarOptionalSettings_guzhang: {
        graphicColor: ["#00feff", "#027eff", "#0286ff", "yellow"],
        legendData: ["待处理数量","已接收数量","已处理数量"],
        unit: ["数量(项)"],
        barBorderRadius: [10, 10, 0, 0]
      },


      
        // 仪表盘---设备故障报修验证率
      tsccGaugeData_weixiu_baoxiu: 0,
      tsccGaugeRequiredSettings_weixiu_baoxiu: {
        name: "维修"
      },
      tsccGaugeOptionalSettings_weixiu_baoxiu: {
        title: "各车间设备故障报修验证率",
        //fd666d
        //67e0e3  #E4EF0B
        //37a2da
        color: [
           [0.6, '#FF0000'],
           [0.9, '#FFFF00'],
           [1, '#00FF00']
        ]
      },
      tsccGaugeData_yunxing_baoxiu: 0,
      tsccGaugeRequiredSettings_yunxing_baoxiu: {
        name: "运行"
      },
      tsccGaugeOptionalSettings_yunxing_baoxiu: {
        title: "运行车间点检率",
        //fd666d
        //67e0e3  #E4EF0B
        //37a2da
        color: [
            [0.6, '#FF0000'],
           [0.9, '#FFFF00'],
           [1, '#00FF00']
        ]
      },
      tsccGaugeData_yelian_baoxiu: 0,
      tsccGaugeRequiredSettings_yelian_baoxiu: {
        name: "冶炼"
      },
      tsccGaugeOptionalSettings_yelian_baoxiu: {
        title: "冶炼车间点检率",
        //fd666d
        //67e0e3  #E4EF0B
        //37a2da
        color: [
            [0.6, '#FF0000'],
           [0.9, '#FFFF00'],
           [1, '#00FF00']
        ]
      },
       tsccGaugeData_lianzhu_baoxiu: 0,
      tsccGaugeRequiredSettings_lianzhu_baoxiu: {
        name: "连铸"
      },
      tsccGaugeOptionalSettings_lianzhu_baoxiu: {
        title: "连铸车间点检率",
        //fd666d
        //67e0e3  #E4EF0B
        //37a2da
        color: [
            [0.6, '#FF0000'],
           [0.9, '#FFFF00'],
           [1, '#00FF00']
        ]
      },

        // 仪表盘---设备故障报修及时接收率
      tsccGaugeData_weixiu_baoxiu_jieshou: 0,
      tsccGaugeRequiredSettings_weixiu_baoxiu_jieshou: {
        name: "维修"
      },
      tsccGaugeOptionalSettings_weixiu_baoxiu_jieshou: {
        title: "各车间设备故障报修及时接收率",
        //fd666d
        //67e0e3  #E4EF0B
        //37a2da
        color: [
           [0.6, '#FF0000'],
           [0.9, '#FFFF00'],
           [1, '#00FF00']
        ]
      },
      tsccGaugeData_yunxing_baoxiu_jieshou: 0,
      tsccGaugeRequiredSettings_yunxing_baoxiu_jieshou: {
        name: "运行"
      },
      tsccGaugeOptionalSettings_yunxing_baoxiu_jieshou: {
        title: "运行车间点检率",
        //fd666d
        //67e0e3  #E4EF0B
        //37a2da
        color: [
            [0.6, '#FF0000'],
           [0.9, '#FFFF00'],
           [1, '#00FF00']
        ]
      },
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
      // 月点检统计表格数据
      dianjiantongjiList: [],
      // 点检分类统计表格数据
      dianjianfenleiList: [],
      // 设备检修统计表格数据
      jianxiutongjiList: [],
       // 设备故障统计表格数据
      guzhangtongjiList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        logtime: null,
        zhou: null,
        sjd: null,
        djdw: null,
        ydjsl: null,
        sdjsl: null,
        djrate: null,
        cjzb: null,
        wtsl: null,
        glwtsl: null,
        glwtsllj: null,
        wtrate: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  components: {
    // EditorDialog,
    itemBox,
    TsccPieChart,
    TsccLineChart,
    TsccBarChart,
    TsccGaugeChart
  },
  created() {
    var now = new Date();
       var year = now.getFullYear(); //得到年份
       var month = now.getMonth(); //得到月份
      //  var date = now.getDate()-1; //得到日期
      // month = month + 1;
       month = month.toString().padStart(2, "0");
      //  date = date.toString().padStart(2, "0");
       var defaultDate = `${year}-${month}`;
       this.$set(this.queryParams, "logtime", defaultDate);
    this.getList();
    this.getFenLeiList();
    this.getJianXiuList();
    this.getGuZhangList();
  },
  methods: {
    /** 查询月点检统计列表 */
    getList() {
      this.loading = true;
      listDianjiantongji(this.queryParams).then(response => {
        this.dianjiantongjiList = response.rows;
        this.total = response.total;
        this.loading = false;
        this.tsccGaugeData_weixiu=this.search('维修车间');
        this.tsccGaugeData_yunxing=this.search('运行车间');
        this.tsccGaugeData_yelian=this.search('冶炼车间');
        this.tsccGaugeData_lianzhu=this.search('连铸车间');
       // console.log([response.rows.map(item => {	return item.ydjsl}),response.rows.map(item => {	return item.sdjsl})]);
        //this.tsccBarData.pop();
       // this.tsccBarData.push([response.rows.map(item => {	return item.ydjsl}),response.rows.map(item => {	return item.sdjsl})]);
       // this.tsccBarRequiredSettings.xAxisData.pop();
        //this.tsccBarRequiredSettings.xAxisData.push(response.rows.map(item => {	return item.djdw}));
        //this.tsccBarData=response.rows.map(item => {	return item.ydjsl});
      
        this.tsccBarRequiredSettings.xAxisData=response.rows.map(item => {	return item.djdw});
        this.tsccBarData=[response.rows.map(item => {	return item.ydjsl}),response.rows.map(item => {	return item.sdjsl}),response.rows.map(item => {	return item.glwtsl})];
        //this.tsccBarOptionalSettings.legendData=
        //this.$forceUpdate(); 
        // console.log( this.tsccGaugeData);
        // console.log( this.tsccGaugeData1);

      });
    },
    //查询点检分类
     getFenLeiList() {
      this.loading = true;
      listDianjianfenlei(this.queryParams).then(response => {
        this.dianjianfenleiList = response.rows;
        this.tsccDoughnutRequiredSettings.nameArr=response.rows.map(item => {	return item.djfl});
        this.tsccDoughnutData=response.rows.map(item => {	return item.djsl});
        // this.total = response.total;
        this.loading = false;
      });
    },

     /** 查询设备检修统计列表 */
    getJianXiuList() {
      this.loading = true;
      listJianxiutongji(this.queryParams).then(response => {
        this.jianxiutongjiList = response.rows;
        this.tsccBarRequiredSettings_jianxiu.xAxisData=response.rows.map(item => {	return item.djdw});
        this.tsccBarData_jianxiu=[response.rows.map(item => {	return item.sbsl}),response.rows.map(item => {	return item.sjsl})];
        this.tsccGaugeData_jianxiuweixiu=this.searchJianxiu('维修车间');
        this.tsccGaugeData_jianxiuyunxing=this.searchJianxiu('运行车间');       
        //this.total = response.total;
        this.loading = false;
      });
    },

    /** 查询设备故障统计列表 */
    getGuZhangList() {
      this.loading = true;
      listGuzhangtongji(this.queryParams).then(response => {
       this.guzhangtongjiList = response.rows;
       this.tsccLineRequiredSettings.xAxisData=response.rows.map(item => {	return item.djdw});
       this.tsccLineData=[response.rows.map(item => {	return item.djsl}),response.rows.map(item => {	return item.yzsl})];
       //维修车间故障报修接收、处理图表
       var weixiu=[];
        this.guzhangtongjiList.forEach(item =>{
          if(item.djdw== '维修车间'||item.djdw== '运行车间'){
            weixiu.push(item);
          }
        })  
       this.tsccBarRequiredSettings_guzhang.xAxisData=weixiu.map(item => {	return item.djdw});
       this.tsccBarData_guzhang=[weixiu.map(item => {	return item.dclsl}),weixiu.map(item => {	return item.jssl}),weixiu.map(item => {	return item.clsl})];
      
       this.tsccGaugeData_weixiu_baoxiu=this.searchGuzhang('维修车间');
       this.tsccGaugeData_yunxing_baoxiu=this.searchGuzhang('运行车间');
       this.tsccGaugeData_yelian_baoxiu=this.searchGuzhang('冶炼车间');
       this.tsccGaugeData_lianzhu_baoxiu=this.searchGuzhang('连铸车间');
        this.tsccGaugeData_weixiu_baoxiu_jieshou=this.searchJieshou('维修车间');
       this.tsccGaugeData_yunxing_baoxiu_jieshou=this.searchJieshou('运行车间');
       this.loading = false;
      });
    },

    search(keyword){
        var rate=0;
        this.dianjiantongjiList.forEach(item =>{
          if(item.djdw== keyword){
            rate=item.djrate;
           
          }
        })
        
        return rate;
      },

      searchJianxiu(keyword){
        var rate=0;
        this.jianxiutongjiList.forEach(item =>{
          if(item.djdw== keyword){
            rate=item.rate;
           
          }
        })  
        return rate;
      },
         searchGuzhang(keyword){
        var rate=0;
        this.guzhangtongjiList.forEach(item =>{
          if(item.djdw== keyword){
            rate=item.yzrate;
           
          }
        })  
        return rate;
      },
        searchJieshou(keyword){
        var rate=0;
        this.guzhangtongjiList.forEach(item =>{
          if(item.djdw== keyword){
            rate=item.jsrate;
           
          }
        })  
        return rate;
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
        logtime: null,
        zhou: null,
        sjd: null,
        djdw: null,
        ydjsl: null,
        sdjsl: null,
        djrate: null,
        cjzb: null,
        wtsl: null,
        glwtsl: null,
        glwtsllj: null,
        wtrate: null
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
      this.title = "添加月点检统计";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDianjiantongji(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改月点检统计";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDianjiantongji(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDianjiantongji(this.form).then(response => {
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
      this.$confirm('是否确认删除月点检统计编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDianjiantongji(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有月点检统计数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportDianjiantongji(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
         }).then(() => {
          this.exportLoading = true;
          return exportJianxiutongji(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false; 
        }).then(() => {
          this.exportLoading = true;
          return exportGuzhangtongji(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;   
        }).catch(() => {});
    }
  }
};
</script>
<style scoped lang="scss">
.continer {
  background: url(../../../assets/images/banner.png) no-repeat center;
  background-size: 100% 100%;
  height: 70%;
  /* padding-top: 5rem; */
  padding: 1rem 1rem 1rem 1rem;
}
.head-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20rem;
}
.content-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  height: 20rem;
}
.item-box {
  height: 100%;
  flex: 1;
  margin-right: 1.5rem;
  position: relative;
}
</style>
