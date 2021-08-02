<template>
  <div>
    <!-- 顶部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 表格 -->
      <el-table :data="tableData" stripe border>
        <el-table-column type="index" align="center">
        </el-table-column>
        <el-table-column prop="rightsName" label="权限名称" align="center">
        </el-table-column>
        <el-table-column prop="path" label="路径" align="center">
        </el-table-column>
        <el-table-column prop="rightsLevel" label="权限等级" align="center">
          <template slot-scope="scope">
           <div v-if="scope.row.rightsLevel===1"><el-tag>一级</el-tag></div>
           <div v-if="scope.row.rightsLevel===2"><el-tag type="success">二级</el-tag></div>
           <div v-if="scope.row.rightsLevel===3"><el-tag type="warning">三级</el-tag></div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
            rightsName: '商品管理',
            path: 'goods',
            rightsLevel: 1
          },
          {
            rightsName: '订单管理',
            path: 'booking',
            rightsLevel: 2
          },
          {
            rightsName: '角色管理',
            path: 'role',
            rightsLevel: 3
          }
        ]
      }
    },
  }

</script>

<style lang="less" scoped>
  .box-card {
    margin-top: 20px;
  }

</style>
