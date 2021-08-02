<template>
  <div>
    <!-- 面包屑导航条 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片内容区域 -->
    <el-card class="box-card">
      <!-- 搜索框 -->
      <el-row :gutter="20" style="margin-bottom:20px">
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="inputV" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>

        <el-col :span="6">
          <el-button type="primary" @click="showDialog">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户信息表格 -->
      <el-table :data="tableData" border stripe>
        <!-- 索引列 -->
        <el-table-column type="index" align="center">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="电话" align="center">
        </el-table-column>
        <el-table-column prop="role_name" label="角色" align="center">
        </el-table-column>
        <el-table-column prop="user_statu" label="状态" align="center">
          <!-- 作用域插槽获取数据 -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.user_statu">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="deletUser"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSeetingRole(scope.row)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
        :page-sizes="[5, 10, 20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="50">
      </el-pagination>

      <!-- 添加用户对话框 -->
      <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" @close="dialogClose()">
        <!-- 用户信息表单 -->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passWorld">
            <el-input v-model="addForm.passWorld" show-password></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <!-- 表单提交取消 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改用户对话框 -->
      <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClose">
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
          <el-form-item label="用户名">
            <el-input v-model="editForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="editForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUser">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 分配角色对话框 -->
      <el-dialog title="分配角色" :visible.sync="setRoleDialogVisible" width="50%" @close="setRoleDialogClose">
        <el-form ref="setRoleFormRef" :model="setRoleForm" label-width="100px">
          <el-form-item label="当前用户名">
            <el-input v-model="setRoleForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="当前用户角色">
            <el-input v-model="setRoleForm.role_name" disabled></el-input>
          </el-form-item>
          <el-form-item label="分配新的角色">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancleSeetingRole">取 消</el-button>
          <el-button type="primary" @click="seetingRole">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        editDialogVisible: false,
        setRoleDialogVisible: false,
        setRoleForm: {},
        value: '',
        options: [{
          value: '1',
          label: '超级管理员'
        }, {
          value: '2',
          label: '普通管理员'
        }, {
          value: '3',
          label: '会员用户'
        }, {
          value: '4',
          label: '普通用户'
        }],
        addForm: {
          name: '',
          email: '',
          phone: '',
          passWorld: ''
        },
        addFormRules: {
          name: [{
              required: true,
              message: '请输入姓名',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 5,
              message: '请输入正确的姓名',
              trigger: 'blur'
            }
          ],
          email: [{
              required: true,
              message: '请输入邮箱地址',
              trigger: 'blur'
            },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change']
            }
          ],
          phone: [{
              required: true,
              message: '请输入电话号码',
              trigger: 'blur'
            },
            {
              min: 11,
              max: 11,
              message: '请输入正确的电话号码',
              trigger: 'blur'
            }
          ],
          passWorld: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        },
        inputV: '',
        dialogVisible: false,
        editForm: {
          name: '',
          email: '',
          phone: ''
        },
        editFormRules: {
          email: [{
              required: true,
              message: '请输入邮箱',
              trigger: 'blur'
            },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change']
            }
          ],
          phone: [{
              required: true,
              message: '请输入电话号码',
              trigger: 'blur'
            },
            {
              min: 11,
              max: 11,
              message: '请输入正确的电话号码',
              trigger: 'blur'
            }
          ]
        },
        tableData: [{
          name: '吴鹏',
          email: 'beal_wu_peng@sina.com',
          phone: '18280478391',
          role_name: '超级管理员',
          user_statu: true
        }, {
          name: '比尔',
          email: 'beal_wu_peng@sina.com',
          phone: '18280478391',
          role_name: '超级管理员',
          user_statu: true
        }, {
          name: '菠萝',
          email: 'beal_wu_peng@sina.com',
          phone: '18280478391',
          role_name: '超级管理员',
          user_statu: true
        }, {
          name: '比比',
          email: 'beal_wu_peng@sina.com',
          phone: '18280478391',
          role_name: '超级管理员',
          user_statu: true
        }]
      }
    },
    methods: {

      // 监听每页条数
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },

      // 监听当前页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },

      // 显示添加用户对话框
      showDialog() {
        this.dialogVisible = true
      },

      // 关闭添加用户对话框
      dialogClose() {
        // 关闭表单时重置表单内容
        this.$refs.addFormRef.resetFields();
      },

      // 添加用户
      addUser() {
        // 表单预校验
        this.$refs.addFormRef.validate(res => {
          if (!res) return

          // 提交表单信息


          this.dialogVisible = false

          // 刷新用户列表数据
        });
      },

      // 显示修改用户对话框
      showEditDialog() {
        this.editDialogVisible = true
      },

      // 修改用户信息
      editUser() {
        // 表单预验证
        this.$refs.editFormRef.validate(res => {
          if (!res) return

          // 提交表单信息

          this.editDialogVisible = false

          // 刷新列表数据
        })
      },

      // 关闭修改用户对话框
      editDialogClose() {
        this.$refs.editFormRef.resetFields();
      },

      // 删除用户
      deletUser() {
        this.$confirm('删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      // 显示分配角色对话框
      showSeetingRole(userInfo) {
        this.setRoleForm = userInfo

        // 发请求获取所有角色列表


        this.setRoleDialogVisible = true
      },

      // 取消分配角色
      cancleSeetingRole() {
        this.$message('已取消分配角色')

        this.setRoleDialogVisible = false
      },

      // 分配角色
      seetingRole() {
        // 发送请求

        this.$message.success('分配角色成功')

        this.setRoleDialogVisible = false
      },

      // 监听分配角色对话框关闭
      setRoleDialogClose() {
        this.value=''
      }
    }
  }

</script>

<style lang="less" scoped>
  .el-breadcrumb {
    margin-bottom: 20px;
  }

  .box-card {
    width: 100%;
  }

  .el-select .el-input {
    width: 200px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .el-pagination {
    margin-top: 16px;
    text-align: center;
  }

</style>
