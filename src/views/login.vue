<template>
  <div class="login-container">
    <el-row type="flex">
      <!-- logo模块 -->
      <el-col :span="10">
        <img class="logo bounce-in-top" src="../assets/logo.png" alt="">
      </el-col>
      <!-- 登录模块 -->
      <el-col :span="11" :push="2" class="login-col">
        <div class="login-box vibrate-1">
          <h1 class="hi">欢迎登录</h1>
          <!-- 表单模块 -->
          <el-form :model="form" ref="formRef" class="form" :rules="rules">
            <!-- 账号 -->
            <el-form-item class="userName" prop="userName">
              <el-input prefix-icon="el-icon-s-custom" v-model="form.userName"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="userPassWorld">
              <el-input prefix-icon="el-icon-key" v-model="form.userPassWorld" show-password></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item class="btn-box">
              <el-button round @click="signin" class="hvr-bob btn">注册</el-button>
              <el-button round @click="login" class="hvr-bob btn">登录</el-button>
            </el-form-item>
          </el-form>

          <span><a href="#/findPassWorld" class="forgetPassWorld"> <i class="el-icon-question"></i> 忘记密码，点我立即找回</a></span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        form: {
          userName: '',
          userPassWorld: ''
        },

        // 验证规则
        rules: {
          // 验证是否输入账号
          userName: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }],
          // 验证是否输入密码
          userPassWorld: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      signin() {
        this.$router.push("/signin")
      },

      // 登陆前预验证表单项是否合法
      login() {
        this.$refs.formRef.validate(res => {
          if (!res) return;
          // 登录请求接口


          // 登录成功跳转到首页
          this.$router.push("/home")
        })
      }
    }
  }

</script>

<style lang="less" scoped>
  .login-container {
    height: 100%;
    background-image: url('../assets/login-bg.jpg');
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 50px;

    .logo {
      width: 100%;
    }

    .login-box {
      height: 70%;
      margin: 10% 0 20% 0;
      background-color: rgba(15, 71, 109, 0.5);
      box-sizing: border-box;
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .hi {
        color: #eee;
        text-align: center;
      }

      .el-input {
        width: 400px;
      }

      .btn-box {
        display: flex;
        justify-content: flex-end;
        margin: 30px 0;

        .btn {
          width: 120px;
        }
      }

      .forgetPassWorld {
        text-decoration: none;
        font-size: 15px;
        color: #eee;

        .el-icon-question {
          font-size: 16px;
        }
      }



    }
  }

  // logo动画
  .bounce-in-top {
    -webkit-animation: bounce-in-top 10s both;
    animation: bounce-in-top 10s both;
  }

  // 关键帧
  @-webkit-keyframes bounce-in-top {
    0% {
      -webkit-transform: translateY(-200px);
      transform: translateY(-200px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 1;
    }

    38% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
      opacity: 1;
    }

    55% {
      -webkit-transform: translateY(-100px);
      transform: translateY(-100px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }

    72% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }

    81% {
      -webkit-transform: translateY(-55px);
      transform: translateY(-55px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }

    90% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }

    95% {
      -webkit-transform: translateY(-25px);
      transform: translateY(-25px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }

    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }

  @keyframes bounce-in-top {
    0% {
      -webkit-transform: translateY(-200px);
      transform: translateY(-200px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 1;
    }

    38% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
      opacity: 1;
    }

    55% {
      -webkit-transform: translateY(-100px);
      transform: translateY(-100px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }

    72% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }

    81% {
      -webkit-transform: translateY(-55px);
      transform: translateY(-55px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }

    90% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }

    95% {
      -webkit-transform: translateY(-25px);
      transform: translateY(-25px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }

    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }


  //   漂浮动画
  .vibrate-1 {
    -webkit-animation: vibrate-1 8s linear infinite both;
    animation: vibrate-1 8s linear infinite both;
  }

  @-webkit-keyframes vibrate-1 {
    0% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }

    20% {
      -webkit-transform: translate(-6px, 6px);
      transform: translate(-6px, 6px);
    }

    40% {
      -webkit-transform: translate(-6px, -6px);
      transform: translate(-6px, -6px);
    }

    60% {
      -webkit-transform: translate(6px, 6px);
      transform: translate(6px, 6px);
    }

    80% {
      -webkit-transform: translate(6px, -6px);
      transform: translate(6px, -6px);
    }

    100% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
  }

  @keyframes vibrate-1 {
    0% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }

    20% {
      -webkit-transform: translate(-6px, 6px);
      transform: translate(-6px, 6px);
    }

    40% {
      -webkit-transform: translate(-6px, -6px);
      transform: translate(-6px, -6px);
    }

    60% {
      -webkit-transform: translate(6px, 6px);
      transform: translate(6px, 6px);
    }

    80% {
      -webkit-transform: translate(6px, -6px);
      transform: translate(6px, -6px);
    }

    100% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
  }

</style>
