<template>
  <div class="outerbox">
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header>
        <h3>比尔之家</h3>
        <el-button size="small" round @click="logout">退出登录</el-button>
      </el-header>

      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse?'66px':'200px'">
          <!-- 折叠侧边栏按钮 -->
          <div class="toogle-button" @click="toogleCollapse">|||</div>

          <el-menu background-color="#333744" text-color="#fff" active-text-color="#409fff" unique-opened
            :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
            <!-- 一级菜单 -->
            <el-submenu index="1">
              <!-- 一级菜单模板 -->
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>用户管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="users" @click="saveNavuState(users)">
                <!-- 二级菜单模板 -->
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>用户列表</span>
                </template>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="2">
              <!-- 一级菜单模板 -->
              <template slot="title">
                <i class="el-icon-s-promotion"></i>
                <span>权限管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="rights">
                <!-- 二级菜单模板 -->
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>权限列表</span>
                </template>
              </el-menu-item>
              <el-menu-item index="roles">
                <!-- 二级菜单模板 -->
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>角色列表</span>
                </template>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <!-- 一级菜单模板 -->
              <template slot="title">
                <i class="el-icon-star-on"></i>
                <span>更多功能</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="money">
                <!-- 二级菜单模板 -->
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>功能详情</span>
                </template>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="4">
              <!-- 一级菜单模板 -->
              <template slot="title">
                <i class="el-icon-s-marketing"></i>
                <span>数据统计</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="report">
                <!-- 二级菜单模板 -->
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>数据列表</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

    <!-- 加载页动画 -->
    <div class="loginpage fade-out-bck">
      <div class="loading-box ">
        <div class="logo-name text-flicker-in-glow">比尔之家</div>
        <i class="el-icon-s-opportunity text-flicker-in-glow"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        isCollapse: false,
        activePath: ''
      }
    },
    methods: {
      logout() {
        // 清空token
        // window.sessionStorage.clear()
        // 重定向到login
        this.$router.push('/login')
      },

      // 折叠侧边栏
      toogleCollapse() {
        this.isCollapse = !this.isCollapse
      },

      //保存侧边栏二级菜单index地址
      saveNavuState(e) {
        window.sessionStorage.setItem('path', e)
        this.activePath = e
      }
    },
    created() {
      this.activePath = window.sessionStorage.getItem('path')
    }
  }

</script>

<style lang="less" scoped>
  .outerbox {
    height: 100%;
    width: 100%;
  }

  .loginpage {
    height: 100%;
    width: 100%;
    background-color: rgb(17, 17, 17);
    position: absolute;
    left: 0;
    top: 0;

    .loading-box {
      font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      font-size: 50px;
      font-weight: bolder;
      color: #eee;
      position: absolute;
      left: 50%;
      top: 20%;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .logo-name {
        margin-bottom: 20px;
      }
    }

  }

  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
  }

  .el-aside {
    background-color: #333744;

    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: #eaedf1;
  }

  .toogle-button {
    background-color: #4a5064;
    text-align: center;
    line-height: 24px;
    font-size: 10px;
    letter-spacing: 0.2em;
    color: #fff;
    cursor: pointer;
  }


  // 加载页动画
  .fade-out-bck {
    -webkit-animation: fade-out-bck 0.7s 2.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: fade-out-bck 0.7s 2.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }

  @-webkit-keyframes fade-out-bck {
    0% {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      opacity: 1;
    }

    100% {
      -webkit-transform: scale(0);
            transform: scale(0);
      opacity: 1;
    }
  }

  @keyframes fade-out-bck {
    0% {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      opacity: 1;
    }

    100% {
     -webkit-transform: scale(0);
            transform: scale(0);
      opacity: 1;
    }
  }


  // 加载页字体动画
  .text-flicker-in-glow {
    -webkit-animation: text-flicker-in-glow 2s linear both;
    animation: text-flicker-in-glow 2s linear both;
  }

  @-webkit-keyframes text-flicker-in-glow {
    0% {
      opacity: 0;
    }

    10% {
      opacity: 0;
      text-shadow: none;
    }

    10.1% {
      opacity: 1;
      text-shadow: none;
    }

    10.2% {
      opacity: 0;
      text-shadow: none;
    }

    20% {
      opacity: 0;
      text-shadow: none;
    }

    20.1% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.25);
    }

    20.6% {
      opacity: 0;
      text-shadow: none;
    }

    30% {
      opacity: 0;
      text-shadow: none;
    }

    30.1% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
    }

    30.5% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
    }

    30.6% {
      opacity: 0;
      text-shadow: none;
    }

    45% {
      opacity: 0;
      text-shadow: none;
    }

    45.1% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
    }

    50% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
    }

    55% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
    }

    55.1% {
      opacity: 0;
      text-shadow: none;
    }

    57% {
      opacity: 0;
      text-shadow: none;
    }

    57.1% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.35);
    }

    60% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.35);
    }

    60.1% {
      opacity: 0;
      text-shadow: none;
    }

    65% {
      opacity: 0;
      text-shadow: none;
    }

    65.1% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.35), 0 0 100px rgba(255, 255, 255, 0.1);
    }

    75% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.35), 0 0 100px rgba(255, 255, 255, 0.1);
    }

    75.1% {
      opacity: 0;
      text-shadow: none;
    }

    77% {
      opacity: 0;
      text-shadow: none;
    }

    77.1% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 110px rgba(255, 255, 255, 0.2), 0 0 100px rgba(255, 255, 255, 0.1);
    }

    85% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 110px rgba(255, 255, 255, 0.2), 0 0 100px rgba(255, 255, 255, 0.1);
    }

    85.1% {
      opacity: 0;
      text-shadow: none;
    }

    86% {
      opacity: 0;
      text-shadow: none;
    }

    86.1% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.45), 0 0 110px rgba(255, 255, 255, 0.25), 0 0 100px rgba(255, 255, 255, 0.1);
    }

    100% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.45), 0 0 110px rgba(255, 255, 255, 0.25), 0 0 100px rgba(255, 255, 255, 0.1);
    }
  }

  @keyframes text-flicker-in-glow {
    0% {
      opacity: 0;
    }

    10% {
      opacity: 0;
      text-shadow: none;
    }

    10.1% {
      opacity: 1;
      text-shadow: none;
    }

    10.2% {
      opacity: 0;
      text-shadow: none;
    }

    20% {
      opacity: 0;
      text-shadow: none;
    }

    20.1% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.25);
    }

    20.6% {
      opacity: 0;
      text-shadow: none;
    }

    30% {
      opacity: 0;
      text-shadow: none;
    }

    30.1% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
    }

    30.5% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
    }

    30.6% {
      opacity: 0;
      text-shadow: none;
    }

    45% {
      opacity: 0;
      text-shadow: none;
    }

    45.1% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
    }

    50% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
    }

    55% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
    }

    55.1% {
      opacity: 0;
      text-shadow: none;
    }

    57% {
      opacity: 0;
      text-shadow: none;
    }

    57.1% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.35);
    }

    60% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.35);
    }

    60.1% {
      opacity: 0;
      text-shadow: none;
    }

    65% {
      opacity: 0;
      text-shadow: none;
    }

    65.1% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.35), 0 0 100px rgba(255, 255, 255, 0.1);
    }

    75% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.35), 0 0 100px rgba(255, 255, 255, 0.1);
    }

    75.1% {
      opacity: 0;
      text-shadow: none;
    }

    77% {
      opacity: 0;
      text-shadow: none;
    }

    77.1% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 110px rgba(255, 255, 255, 0.2), 0 0 100px rgba(255, 255, 255, 0.1);
    }

    85% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 110px rgba(255, 255, 255, 0.2), 0 0 100px rgba(255, 255, 255, 0.1);
    }

    85.1% {
      opacity: 0;
      text-shadow: none;
    }

    86% {
      opacity: 0;
      text-shadow: none;
    }

    86.1% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.45), 0 0 110px rgba(255, 255, 255, 0.25), 0 0 100px rgba(255, 255, 255, 0.1);
    }

    100% {
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.45), 0 0 110px rgba(255, 255, 255, 0.25), 0 0 100px rgba(255, 255, 255, 0.1);
    }
  }

</style>
