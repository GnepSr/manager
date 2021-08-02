<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-button type="primary" @click="showAddRoleDialog">添加角色</el-button>
      <!-- 添加角色 -->
      <el-dialog title="添加角色" :visible.sync="addRoleDialogVisible" width="50%">
        <el-form :model="roleForm" :rules="roleRules" ref="roleRef" label-width="100px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="desc">
            <el-input v-model="roleForm.desc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancleAddRole">取 消</el-button>
          <el-button type="primary" @click="addRole">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 角色列表 -->
      <el-table :data="roleList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row :class="['bd-bottom',i1===0?'bd-top':'']" v-for="(item1,i1) in scope.row.children" :key="item1.id">
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRights(scope.row,item1.id)">{{item1.lable}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级权限和三级权限 -->
              <el-col :span="19">
                <!-- 渲染二级权限 -->
                <el-row :class="i2===0?'':'bd-top'" v-for="(item2,i2) in item1.children" :key="item2.id">
                  <el-col :span="5">
                    <el-tag type="success" closable @close="removeRights(scope.row,item1.id)">{{item2.lable}}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>

                  <!-- 渲染三级权限 -->
                  <el-col :span="12">
                    <el-tag v-for="(item3) in item2.children" :key="item3.id" type="warning" closable
                      @close="removeRights(scope.row,item1.id)">
                      {{item3.lable}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" align="center">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRights(scope.row)">分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 权限分配对话框 -->
      <el-dialog title="分配权限" :visible.sync="setRightsDialogVisible" width="50%" @close="setRightsDialogClose">
        <!-- 树形控件 -->
        <el-tree :data="data" ref="treeRef" :props="treeProps" show-checkbox node-key="id" default-expand-all
          :default-checked-keys="defKeys">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setRightsDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="allotRights">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        addRoleDialogVisible: false,
        setRightsDialogVisible: false,
        defKeys: [],
        roleForm: {
          name: '',
          desc: ''
        },
        roleRules: {
          name: [{
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }],
          desc: [{
            required: true,
            message: '请输入角色描述',
            trigger: 'blur'
          }, ]
        },
        data: [{
          id: 10001,
          label: '一级权限',
          children: [{
            id: 10011,
            label: '二级权限',
            children: [{
                id: 10111,
                label: '三级权限'
              },
              {
                id: 10115,
                label: '三级权限'
              },
              {
                id: 10116,
                label: '三级权限'
              },
              {
                id: 10117,
                label: '三级权限'
              }
            ]
          }]
        }, {
          id: 10002,
          label: '一级权限',
          children: [{
            id: 10022,
            label: '二级权限',
            children: [{
              id: 10222,
              label: '三级权限'
            }]
          }, {
            id: 10021,
            label: '二级权限',
            children: [{
              id: 10211,
              label: '三级权限'
            }]
          }]
        }, {
          id: 10003,
          label: '一级权限',
          children: [{
            id: 10031,
            label: '二级权限',
            children: [{
              id: 10331,
              label: '三级权限'
            }]
          }, {
            id: 10032,
            label: '二级权限',
            children: [{
              id: 10332,
              label: '三级权限'
            }]
          }]
        }],
        roleList: [{
            roleName: '超级管理员',
            roleDesc: '超级管理员拥有所有权限',
            children: [{
                id: 1000001,
                lable: '一级权限',
                children: [{
                    id: 1000011,
                    lable: '二级权限',
                    children: [{
                        id: 1000111,
                        lable: '三级权限'
                      },
                      {
                        id: 10001111,
                        lable: '三级权限'
                      },
                      {
                        id: 100011111,
                        lable: '三级权限'
                      },
                      {
                        id: 1000111111,
                        lable: '三级权限'
                      },
                      {
                        id: 10001111111,
                        lable: '三级权限'
                      },
                      {
                        id: 100011111111,
                        lable: '三级权限'
                      },
                    ]
                  },
                  {
                    id: 1000022,
                    lable: '二级权限',
                    children: [{
                        id: 10002222,
                        lable: '三级权限'
                      },
                      {
                        id: 100022222,
                        lable: '三级权限'
                      },
                      {
                        id: 1000222222,
                        lable: '三级权限'
                      },
                      {
                        id: 10002222222,
                        lable: '三级权限'
                      },
                      {
                        id: 100022222222,
                        lable: '三级权限'
                      },
                      {
                        id: 1000222222222,
                        lable: '三级权限'
                      },
                    ]
                  },
                  {
                    id: 100000333,
                    lable: '二级权限',
                    children: [{
                        id: 1000003333,
                        lable: '三级权限'
                      },
                      {
                        id: 10000033331,
                        lable: '三级权限'
                      },
                      {
                        id: 10000033332,
                        lable: '三级权限'
                      },
                      {
                        id: 10000033334,
                        lable: '三级权限'
                      },
                      {
                        id: 10000033336,
                        lable: '三级权限'
                      },
                      {
                        id: 10000033337,
                        lable: '三级权限'
                      },
                      {
                        id: 10000033330,
                        lable: '三级权限'
                      },
                    ]
                  },
                ]
              },
              {
                id: 1000001,
                lable: '一级权限',
                children: [{
                    id: 1000011,
                    lable: '二级权限',
                    children: [{
                        id: 1000111,
                        lable: '三级权限'
                      },
                      {
                        id: 10001111,
                        lable: '三级权限'
                      },
                      {
                        id: 100011111,
                        lable: '三级权限'
                      },
                      {
                        id: 1000111111,
                        lable: '三级权限'
                      },
                      {
                        id: 10001111111,
                        lable: '三级权限'
                      },
                      {
                        id: 100011111111,
                        lable: '三级权限'
                      },
                    ]
                  },
                  {
                    id: 1000022,
                    lable: '二级权限',
                    children: [{
                        id: 10002222,
                        lable: '三级权限'
                      },
                      {
                        id: 100022222,
                        lable: '三级权限'
                      },
                      {
                        id: 1000222222,
                        lable: '三级权限'
                      },
                      {
                        id: 10002222222,
                        lable: '三级权限'
                      },
                      {
                        id: 100022222222,
                        lable: '三级权限'
                      },
                      {
                        id: 1000222222222,
                        lable: '三级权限'
                      },
                    ]
                  },
                  {
                    id: 100000333,
                    lable: '二级权限',
                    children: [{
                        id: 1000003333,
                        lable: '三级权限'
                      },
                      {
                        id: 10000033331,
                        lable: '三级权限'
                      },
                      {
                        id: 10000033332,
                        lable: '三级权限'
                      },
                      {
                        id: 10000033334,
                        lable: '三级权限'
                      },
                      {
                        id: 10000033336,
                        lable: '三级权限'
                      },
                      {
                        id: 10000033337,
                        lable: '三级权限'
                      },
                      {
                        id: 10000033330,
                        lable: '三级权限'
                      },
                    ]
                  },
                ]
              }
            ]
          },
          {
            roleName: '管理员',
            roleDesc: '管理员拥有部分权限',
            children: {
              id: 2,
              lable: '一级权限',
              children: {
                id: 2.2,
                lable: '二级权限',
                children: {
                  id: 2.3,
                  lable: '三级权限'
                }
              }
            }
          },
          {
            roleName: '普通用户',
            roleDesc: '普通用户拥有浏览权限',
            children: {
              id: 3,
              lable: '一级权限',
              children: {
                id: 3.2,
                lable: '二级权限',
                children: {
                  id: 3.3,
                  lable: '三级权限'
                }
              }
            }
          }
        ],
        treeProps: {
          children: 'children',
          lable: 'lable'
        },
      }
    },
    methods: {
      // 显示添加角色
      showAddRoleDialog() {
        this.addRoleDialogVisible = true
      },
      // 添加角色
      addRole() {
        // 表单预校验
        this.$refs.roleRef.validate(res => {
          if (!res) return

          // 发请求

          this.$message.success('添加角色成功')
          this.addRoleDialogVisible = false
        })
      },
      // 取消添加角色
      cancleAddRole() {
        this.$refs.roleRef.resetFields()
        this.$message('已取消添加角色')
        this.addRoleDialogVisible = false
      },
      removeRights(role, rightsId) {
        this.$confirm('删除该权限, 是否继续?', '提示', {
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
      showSetRights(role) {
        this.getLeafKeys(role, this.defKeys)
        this.setRightsDialogVisible = true
        console.log(this.treeList)
      },

      // 获取所有勾选的子节点
      getLeafKeys(node, arr) {
        if (!node.children) {
          return arr.push(node.id)
        }

        node.children.forEach(element => {
          this.getLeafKeys(element, arr)
        });
      },

      // 关闭权限分配对话框清空缓存数组
      setRightsDialogClose() {
        this.defKeys = []
      },

      // 点击确定分配角色权限
      allotRights() {
        const keys = [
          ...this.$refs.treeRef.getCheckedKeys,
          ...this.$refs.treeRef.getHalfCheckedKeys
        ]

        const keysStr = keys.join(',')

        this.setRightsDialogVisible = false
      }
    }
  }

</script>

<style lang="less" scoped>
  .box-card {
    margin-top: 20px;
  }

  .el-table {
    margin-top: 20px;
  }

  .el-tag {
    margin: 6px;
  }

  .bd-top {
    border-top: 1px solid #eee;
  }

  .bd-bottom {
    border-bottom: 1px solid #eee;
  }

  .el-row {
    display: flex;
    align-items: center;
  }

</style>
