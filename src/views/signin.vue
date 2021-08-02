<template>
  <div class="signin-container">
    <div class="sign-box vibrate-1">
      <h1 class="h1">加入我们</h1>

      <!-- 账号密码模块 -->
      <el-form :model="signForm" ref="signFormRef" :rules="rules">
        <!-- 账号 -->
        <el-form-item class="userName" prop="userName">
          <el-input prefix-icon="el-icon-s-custom" v-model="signForm.userName" placeholder="请输入账号"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="userPassWorld">
          <el-input prefix-icon="el-icon-key" v-model="signForm.userPassWorld" show-password placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="checkPass">
          <el-input prefix-icon="el-icon-key" v-model="signForm.checkPass" show-password placeholder="确认密码">
          </el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btn-box">
          <el-button round @click="cancleSign" class="hvr-bob btn">取消</el-button>
          <el-button round @click="signIn" class="hvr-bob btn">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      // 校验是否输入密码与两次密码是否一致
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.signForm.checkPass !== '') {
            this.$refs.signFormRef.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.signForm.userPassWorld) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        signForm: {
          userName: '',
          userPassWorld: '',
          checkPass: ''
        },
        rules: {
          // 验证是否输入账号
          userName: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }],
          // 验证是否输入密码
          userPassWorld: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          checkPass: [{
            validator: validatePass2,
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      cancleSign() {
        this.$refs.signFormRef.resetFields()
        this.$message('已取消')
      },

      signIn() {
        var that = this
        //   预校验
        this.$refs.signFormRef.validate(res => {
          if (!res) return

          // 发起请求
          
          this.$message.success('注册成功,3秒后将自动跳转至登录页')
          setTimeout(() => {
            that.$router.push('/login')
          }, 3000);
        })
      }
    }
  }

</script>

<style lang="less" scoped>
  .signin-container {
    height: 100%;
    background-image: url('../assets/login-bg.jpg');
    background-size: 100% 100%;

    .sign-box {
      height: 50%;
      width: 50%;
      min-width: 700px;
      background-color: rgba(15, 71, 109, 0.5);
      border-radius: 16px;
      position: absolute;
      top: 20%;
      left: 25%;

      .h1 {
        color: #eee;
        text-align: center;
      }

      .el-form {
        margin: 0 auto;
        width: 60%;

        .btn-box {
          margin-top: 30px;
          display: flex;
          justify-content: flex-end;

          .btn {
            width: 120px;
          }
        }
      }
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
