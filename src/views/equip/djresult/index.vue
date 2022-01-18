<template>
  <div class="app-container">
    
    <el-row>
  <el-col :sm="12" :lg="6">
    <el-result icon="success" title="点检成功" subTitle="请继续扫码点检其它设备">
      
      <template slot="extra">
        <el-button type="primary" size="medium" @click="Close">关 闭</el-button>
      </template>
    </el-result>
  </el-col>
  <!-- <el-col :sm="12" :lg="6">
    <el-result icon="warning" title="警告提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <el-button type="primary" size="medium">返回</el-button>
      </template>
    </el-result>
  </el-col> -->
  <!-- <el-col :sm="12" :lg="6">
    <el-result icon="error" title="错误提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <el-button type="primary" size="medium">返回</el-button>
      </template>
    </el-result>
  </el-col>
  <el-col :sm="12" :lg="6">
    <el-result icon="info" title="信息提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <el-button type="primary" size="medium">返回</el-button>
      </template>
    </el-result>
  </el-col> -->
</el-row>
<el-row >
   <el-button
          size="medium"
          type="danger"
          style="width:100%;"
         @click="handlegz"
        >
         前往故障报修
        </el-button>
</el-row>
   
  </div>
</template>

<script>

export default {
  name: "result",
  data() {
    return {
      Object,
      // 版本号
      version: "3.7.0",
      //路由参数
      routerId: 0,
      count:300,
      sc:""
    };
  },
   created() {
    this.routerId = this.$route.params && this.$route.query.sid;
    this.sc= this.$route.params && this.$route.query.sc;
    //this.zidongguanbi();
  },

  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
   // 返回按钮，返回到欢迎界面
    Close() {
      this.$store.dispatch("tagsView/delView", this.$route);
       this.$router.push({ path: "/index" });
    },
       //点击后禁用6秒
     zidongguanbi () {
      var countDown = setInterval(() => {
        if (this.count < 1) {       
          this.count = 300
          clearInterval(countDown)
          this.Close()
        } else {
          this.count-- 
        }
      }, 1000)
    },

    // 点检成功后，跳转到操作成功界面
    handlegz() {
      this.$store.dispatch("tagsView/delView", this.$route);
       this.$router.push({ path: "/guzhang?sid="+this.routerId+"&sc="+this.sc });
    }
  },
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

