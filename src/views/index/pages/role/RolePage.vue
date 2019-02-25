<template>
  <div>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增角色</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="roleData" v-loading="listLoading" style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column label="角色" width="180">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag :type="tagType(scope.row.role)" size="medium">{{ scope.row.permissions }}</el-tag>
            </div>
        </template>
      </el-table-column>
      
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)" 
            v-permission="['superAdmin','admin']">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" 
            v-permission="['superAdmin']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <div>这个页面的功能按钮是根据权限显示的</div>
    <div>
      <div v-permission="['superAdmin']">超级管理员看得到我</div>
      <div v-permission="['admin']">管理员看得到我</div>
      <div v-permission="['superAdmin','admin']">管理员和超级管理员都看得到我</div>

    </div>
    <!--编辑-->
    <el-dialog title="编辑角色" :visible.sync="editFormVisible" :append-to-body="true" :close-on-click-modal="false">
    	<!--基本信息编辑-->
      <el-tabs :tab-position="tabPosition" @tab-click="handleClick">
    		<el-tab-pane label="角色信息">
    			<el-form :model="roleEditForm" label-width="80px" :rules="editFormRules" ref="editForm">
            <el-form-item label="角色名" prop="permissions">
              <el-input v-model="roleEditForm.permissions" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
          
    		</el-tab-pane>

    		<el-tab-pane label="角色用户" :lazy="true">角色用户</el-tab-pane>

    	</el-tabs>
    </el-dialog>

    <!--新增-->
    <el-dialog title="新增角色" width="300px" :visible.sync="addFormVisible" :append-to-body="true" :close-on-click-modal="false">
      <!--基本信息编辑-->
      <el-form :model="roleAddForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="角色名" prop="permissions">
          <el-input v-model="roleAddForm.permissions" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import permission from '@/directive/permission/' // 权限判断指令
  import { getRoleList, editRole, addRole, removeRole } from '@api/api'
  export default {
  	name: 'RolePage',
    directives: { permission },//注册局部指令
    data () {
      return {
        listLoading: false,
        total: 0,
        page: 1,
        roleData: [],
        editFormVisible: false,
        tabPosition: 'left',
        //角色基本信息编辑
        editLoading: false,
        roleEditForm: {
          id: '',
          permissions: '',
          role: ''
        },
        editFormRules: {
          permissions: [
            { required: true, message: '请输入角色名', trigger: 'blur' }
          ]
        },
        //角色基本信息新增
        addFormVisible: false,
        addLoading: false,
        roleAddForm: {
          id: '',
          permissions: '',
          role: ''
        },
        addFormRules: {
          permissions: [
            { required: true, message: '请输入角色名', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      //获取角色列表
      getRoles () {
        let para = {
          page: this.page
        }
        this.listLoading = true
        //console.log(para)
        getRoleList(para).then((res) => {
          this.total = res.data.total
          this.roleData = res.data.roles
          this.listLoading = false
        })
      },
    	handleClick (tab, event) {
    		console.log(tab.index)
    	},
      //列表编辑
      handleEdit (index, row) {
        this.editFormVisible = true
        this.roleEditForm = Object.assign({}, row)
        console.log(this.roleEditForm)
      },
      handleDelete (index, row) {
        this.$confirm('确认删除该角色吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          let para = { id: row.id }
          removeRole(para).then((res) => {
            this.listLoading = false
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getRoles()
          });
        }).catch(() => {

        })
      },
      handleAdd () {
        this.addFormVisible = true
      },
      //编辑提交
      editSubmit () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true

              let para = Object.assign({}, this.roleEditForm)

              editRole(para).then((res) => {
                this.editLoading = false
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.$refs['editForm'].resetFields()
                this.editFormVisible = false
                this.getRoles()
              })
            })
          }
        })
      },
      //新增
      addSubmit () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true
              let para = Object.assign({}, this.roleAddForm)
              
              addRole(para).then((res) => {
                this.addLoading = false
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.$refs['addForm'].resetFields()
                this.addFormVisible = false
                this.getRoles()
              })
            })
          }
        })
      },
      tagType (data) {
        let klass = ''
        switch (data) {
          case 'superAdmin':
            klass = 'danger'
          break
          case 'admin':
            klass = 'warning'
          break
          default:
            klass = 'info'
          break  
        }
        return klass
      }
    },
    mounted () {
      this.getRoles()
    }
  }
</script>
