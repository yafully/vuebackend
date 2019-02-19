<template>
  <div>
    <el-table :data="roleData" style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column label="角色" width="180">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag :type="scope.row.role === 'superAdmin' ? 'primary' : 'success'" size="medium">{{ scope.row.permissions }}</el-tag>
            </div>
        </template>
      </el-table-column>
      
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑角色" :visible.sync="editFormVisible" :append-to-body="true" :close-on-click-modal="false">
    	<!--基本信息编辑-->
      <el-tabs :tab-position="tabPosition" @tab-click="handleClick">
    		<el-tab-pane label="角色信息">
    			<el-form :model="roleEditForm" label-width="80px" :rules="editFormRules" ref="addForm">
            <el-form-item label="角色名" prop="name">
              <el-input v-model="roleEditForm.permissions" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
          
    		</el-tab-pane>

    		<el-tab-pane label="角色权限" :lazy="true">角色权限</el-tab-pane>

    		<el-tab-pane label="角色用户" :lazy="true">角色用户</el-tab-pane>

    	</el-tabs>
    </el-dialog>
  </div>
</template>
<script>
  export default {
  	name: 'RolePage',
    data () {
      return {
        roleData: [{
          id: 20001,
          role: 'superAdmin',
          permissions: '超级管理员'
        }, {
          id: 20002,
          role: 'admin',
          permissions: '管理员'
        }, {
          id: 20003,
          role: 'customer',
          permissions: '普通用户'
        }, {
          id: 20004,
          role: 'guest',
          permissions: '访客'
        }],
        editFormVisible: false,
        tabPosition: 'left',
        //角色基本信息编辑
        editLoading: false,
        roleEditForm: {
          permissions: ''
        },
        editFormRules: {
          name: [
            { required: true, message: '请输入角色名', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
    	handleClick (tab, event) {
    		console.log(tab.index)
    	},
      //列表编辑
      handleEdit(index, row) {
        this.editFormVisible = true
        this.roleEditForm = Object.assign({}, row)
        console.log(this.roleEditForm)
      },
      handleDelete(index, row) {
        console.log(index, row)
      },
      //编辑提交
      editSubmit () {
        
      }
    }
  }
</script>
