<template>

  <div class="wrapper">
    <div align="right">
       <el-dropdown class="dropdown" style="background-color: transparent">
  <el-button type="primary" icon="el-icon-check" style="background-color: transparent">
    更多功能菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </el-button>
  <el-dropdown-menu slot="dropdown" style="color:#FFFFFF;background-color: transparent">
      <el-dropdown-item   >
         <router-link :to="{path:'/jixiao'}">
                  绩效考评数据查看
                  </router-link>
        </el-dropdown-item>
        <el-dropdown-item > <router-link :to="{path:'/biaozh'}">
                  标准化检查数据查看
                  </router-link></el-dropdown-item>
        <el-dropdown-item > <router-link :to="{path:'/charts'}">
                  指标数据查看
                  </router-link></el-dropdown-item>          
        
  </el-dropdown-menu>
</el-dropdown>

    </div>
   
    <ul class="bg-bubbles">
            <li v-for="n in 10" :key="n+'n'"></li>
            <ol v-for="m in 5"  :key="m+'m'"></ol>
        </ul>
        <div class="bg bg-blur" style="display: none;"></div>
        <div style="height: 10%;"></div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">炼钢管理系统</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaOnOff">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
       
    

      <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
        <blockquote class="text-warning" style="font-size: 14px">
          
         <el-link href=" http://192.168.36.9:808/#/jixiao" type="danger" target="_blank"
            ><h4>绩效考评记录☛点我进入</h4> </el-link
          >
  
          <el-link href="http://192.168.36.9:808/#/biaozh" type="danger" target="_blank"
            ><h4>标准化检查记录☛点我进入</h4></el-link>
          
        </blockquote>

      </el-col>
    </el-row>
    

    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 20210426 炼钢设备科 All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        // username: "admin",
        // password: "admin123",
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      },
      loading: false,
      // 验证码开关
      captchaOnOff: false,
      // 注册开关
      register: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    //this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.captchaOnOff = res.captchaOnOff === undefined ? false : res.captchaOnOff;
        if (this.captchaOnOff) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
          }).catch(() => {
            this.loading = false;
              if (this.captchaOnOff) {
              this.getCode();
            }
          });
        }
      });
    },

    
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
// .login {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   background-image: url("../assets/images/login-background.jpg");
//   background-size: cover;
// }
.dropdown {
  text-align: right;
  z-index: 999;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  font-weight:bold;
  color: #707070;
}

 .wrapper {
        background: #50a3a2;
        background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
        background: linear-gradient(to bottom right, #127c7b 0, #50a3a2);
        opacity: 0.8;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .wrapper.form-success .containerLogin h1 {
        -webkit-transform: translateY(85px);
        -ms-transform: translateY(85px);
        transform: translateY(85px);
    }

 .bg {
        margin: 0px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: url(../assets/loginbck.png) no-repeat top left;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
    }

    // .login-container {
    //     -webkit-border-radius: 5px;
    //     border-radius: 5px;
    //     -moz-border-radius: 5px;
    //     background-clip: padding-box;
    //     margin: auto;
    //     width: 350px;
    //     padding: 35px 35px 15px 35px;
    //     background: #fff;
    //     border: 1px solid #eaeaea;
    //     box-shadow: 0 0 25px #cac6c6;
    //     z-index: 9999;
    //     position: relative;
    // }

.login-form {
  // border-radius: 6px;
  // background: #ffffff;
  // width: 400px;
  // padding: 25px 25px 5px 25px;
   -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        z-index: 9999;
        position: relative;
  
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 
  38px;
}

 .bg-bubbles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    .bg-bubbles li, .bg-bubbles ol {
        position: absolute;
        list-style: none;
        display: block;
        width: 40px;
        height: 40px;
        background-color: rgba(255, 255, 255, 0.15);
        bottom: -160px;
        -webkit-animation: square 25s infinite;
        animation: square 25s infinite;
        -webkit-transition-timing-function: linear;
        transition-timing-function: linear;
    }

    ol {
        padding: 0 !important;
    }

    .bg-bubbles ol:nth-child(11) {
        left: 10%;
        top: 10%;
        width: 20px;
        height: 20px;
    }

    .bg-bubbles ol:nth-child(12) {
        left: 20%;
        top: 40%;

        width: 60px;
        height: 60px;
    }

    .bg-bubbles ol:nth-child(13) {
        left: 65%;
        top: 30%;

        width: 100px;
        height: 60px;
    }

    .bg-bubbles ol:nth-child(14) {
        left: 70%;
        top: 30%;
        width: 100px;
        height: 150px;
    }

    .bg-bubbles ol:nth-child(15) {
        left: 50%;
        top: 70%;

        width: 40px;
        height: 60px;
    }

    .bg-bubbles li:nth-child(1) {
        left: 10%;
    }

    .bg-bubbles li:nth-child(2) {
        left: 20%;
        width: 80px;
        height: 80px;
        -webkit-animation-delay: 2s;
        animation-delay: 2s;
        -webkit-animation-duration: 17s;
        animation-duration: 17s;
    }

    .bg-bubbles li:nth-child(3) {
        left: 25%;
        -webkit-animation-delay: 4s;
        animation-delay: 4s;
    }

    .bg-bubbles li:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        -webkit-animation-duration: 22s;
        animation-duration: 22s;
        background-color: rgba(255, 255, 255, 0.25);
    }

    .bg-bubbles li:nth-child(5) {
        left: 70%;
    }

    .bg-bubbles li:nth-child(6) {
        left: 80%;
        width: 120px;
        height: 120px;
        -webkit-animation-delay: 3s;
        animation-delay: 3s;
        background-color: rgba(255, 255, 255, 0.2);
    }

    .bg-bubbles li:nth-child(7) {
        left: 32%;
        width: 160px;
        height: 160px;
        -webkit-animation-delay: 7s;
        animation-delay: 7s;
    }

    .bg-bubbles li:nth-child(8) {
        left: 55%;
        width: 20px;
        height: 20px;
        -webkit-animation-delay: 15s;
        animation-delay: 15s;
        -webkit-animation-duration: 40s;
        animation-duration: 40s;
    }

    .bg-bubbles li:nth-child(9) {
        left: 25%;
        width: 10px;
        height: 10px;
        -webkit-animation-delay: 2s;
        animation-delay: 2s;
        -webkit-animation-duration: 40s;
        animation-duration: 40s;
        background-color: rgba(255, 255, 255, 0.3);
    }

    .bg-bubbles li:nth-child(10) {
        left: 90%;
        width: 160px;
        height: 160px;
        -webkit-animation-delay: 11s;
        animation-delay: 11s;
    }

    @-webkit-keyframes square {
        0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }

        100% {
            -webkit-transform: translateY(-700px) rotate(600deg);
            transform: translateY(-700px) rotate(600deg);
        }
    }

    @keyframes square {
        0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }

        100% {
            -webkit-transform: translateY(-700px) rotate(600deg);
            transform: translateY(-700px) rotate(600deg);
        }
    }
</style>
