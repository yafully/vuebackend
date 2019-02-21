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

		<el-table :data="adminData" v-loading="listLoading" style="width: 100%">
	      <el-table-column type="index" width="60"></el-table-column>
	      <el-table-column width="60">
	      	<template slot-scope="scope">
				  <img :src="scope.row.avatar" :alt="scope.row.username" class="avatar-wrapper"/>
	        </template>
	      </el-table-column>
	      <el-table-column prop="username" label="用户名" width="120" sortable></el-table-column>
	      <el-table-column prop="name" label="用户昵称" width="120" sortable></el-table-column>
	      <el-table-column prop="email" label="邮箱" width="200" sortable></el-table-column>
	      <el-table-column label="角色" width="180">
	        <template slot-scope="scope">
	        	<el-popover trigger="hover" placement="top">
	        		<p>密码: {{ scope.row.password }}</p>
		            <div slot="reference" class="name-wrapper">
		              <el-tag :type="tagType(scope.row.roleInfo.role)" size="medium">{{ scope.row.roleInfo.permissions }}</el-tag>
		            </div>
	            </el-popover>
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
	    <!--新增-->
	    <el-dialog title="新增管理员" width="500px" :visible.sync="addFormVisible" :append-to-body="true" :close-on-click-modal="false">
	      <!--基本信息编辑-->
	    	<el-form :model="userAddForm" label-width="120px" :rules="addFormRules" ref="addForm">
		        <el-form-item label="登录名" prop="username">
		        	<el-input v-model="userAddForm.username" auto-complete="off"></el-input>
		        </el-form-item>
		        <el-form-item label="昵称" prop="name">
		        	<el-input v-model="userAddForm.name" auto-complete="off"></el-input>
		        </el-form-item>
		        <el-form-item label="邮箱" prop="email">
		        	<el-input v-model="userAddForm.email" auto-complete="off"></el-input>
		        </el-form-item>
		        <el-form-item label="登录密码" prop="password">
		        	<el-input type="password" v-model="userAddForm.password" auto-complete="off"></el-input>
		        </el-form-item>
		        <el-form-item label="重复登录密码" prop="checkpass">
		        	<el-input type="password" v-model="userAddForm.checkpass" auto-complete="off"></el-input>
		        </el-form-item>
				<el-form-item label="角色分配" prop="roleInfo">
					<el-select v-model="userAddForm.roleInfo" placeholder="请选择角色" @change="selectGet($event,'new')">
						<el-option v-for="item in roleData"
					      :key="item.id"
					      :label="item.permissions"
					      :value="item.role">
  						</el-option>
					</el-select>
				</el-form-item>
		        <el-form-item label="用户头像">
		        	<el-input v-model="userAddForm.avatar" auto-complete="off"></el-input>
		        </el-form-item>
	    	</el-form>
	    	<div slot="footer" class="dialog-footer">
	    		<el-button @click.native="addFormVisible = false">取消</el-button>
	        	<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
	    	</div>
	    </el-dialog>
	    <!--编辑-->
	    <el-dialog title="编辑管理员" :visible.sync="editFormVisible" :append-to-body="true" :close-on-click-modal="false">
	    	<!--基本信息编辑-->
			<el-form :model="userEditForm" label-width="120px" :rules="editFormRules" ref="editForm">
				<el-form-item label="登录名" prop="username">
		        	<el-input v-model="userEditForm.username" auto-complete="off"></el-input>
		        </el-form-item>
		        <el-form-item label="昵称" prop="name">
		        	<el-input v-model="userEditForm.name" auto-complete="off"></el-input>
		        </el-form-item>
		        <el-form-item label="邮箱" prop="email">
		        	<el-input v-model="userEditForm.email" auto-complete="off"></el-input>
		        </el-form-item>
		        <el-form-item label="登录密码">
		        	<el-input type="password" v-model="userEditForm.newpassword" auto-complete="off"></el-input>
		        </el-form-item>
				<el-form-item label="角色分配" prop="roleInfo">
					<el-select v-model="userEditForm.roleInfo.role" placeholder="请选择角色" @change="selectGet">
						<el-option v-for="item in roleData"
					      :key="item.id"
					      :label="item.permissions"
					      :value="item.role">
  						</el-option>
					</el-select>
				</el-form-item>
		        <el-form-item label="用户头像">
		        	<el-input v-model="userEditForm.avatar" auto-complete="off"></el-input>
		        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
	    </el-dialog>
	</div>
</template>

<script>
import { getRoleList, getAdminList, addAdmin, editAdmin, removeAdmin } from '@api/api'

export default {
  name: 'RoleUser',
  components: {
  	
  },
  data () {
  	let validatePass = (rule, value, callback) => {
		if (value === '') {
		  callback(new Error('请输入密码'))
		} else {
		  if (this.addFormRules.checkpass !== '') {
		    this.$refs.addForm.validateField('checkpass')
		  }
		  callback()
		}
	}
	let validatePass2 = (rule, value, callback) => {
		if (value === '') {
		  callback(new Error('请再次输入密码'));
		} else if (value !== this.userAddForm.password) {
		  callback(new Error('两次输入密码不一致!'))
		} else {
		  callback();
		}
	}
    return {
		page: 1,
		adminData: [],
		listLoading: false,
		roleData: [],
		//新增
		addFormVisible: false,
		addLoading: false,
		userAddForm: {
			username: '',
			password: '',
			checkpass: '',
			email: '',
			roleInfo: {
				role: '',
				permissions:''
			},
			avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
			name: ''
		},
		addFormRules: {
		  username: [
		    { required: true, message: '请输登录色名', trigger: 'blur' }
		  ],
		  name: [
		    { required: true, message: '请输昵称', trigger: 'blur' }
		  ],
		  email: [
		    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      		{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
		  ],
		  password: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          checkpass: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          roleInfo: [
            { required: true, message: '请选择角色', trigger: 'blur' }
          ]
		},
		//编辑
		editFormVisible: false,
		editLoading: false,
		userEditForm: {
			username: '',
			password: '',
			newpassword: '',
			email: '',
			roleInfo: {
				role: 'superAdmin',
				permissions:'管理员'
			},
			avatar: '',
			name: ''
		},
		editFormRules: {
		  username: [
		    { required: true, message: '请输登录色名', trigger: 'blur' }
		  ],
		  name: [
		    { required: true, message: '请输昵称', trigger: 'blur' }
		  ],
		  email: [
		    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      		{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
		  ],
		  password: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          checkpass: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          roleInfo: [
            { required: true, message: '请选择角色', trigger: 'blur' }
          ]
		}
    }
  },
  methods: {
  	getAdmins () {
  		let para = {
          page: this.page
        }
        this.listLoading = true
        //console.log(para)
        getAdminList(para).then((res) => {
          this.total = res.data.total
          this.adminData = res.data.admins
          this.listLoading = false
        })
  	},
  	getRoles () {
  		let para = {
          page: 'all'
        }
        getRoleList(para).then((res) => {
          this.roleData = res.data.roles
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
	},
	//新增
	handleAdd () {
		this.addFormVisible = true
	},
	addSubmit () {
		this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true
              let para = Object.assign({}, this.userAddForm)
              console.log(para)
              addAdmin(para).then((res) => {
                this.addLoading = false
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.$refs['addForm'].resetFields()
                this.addFormVisible = false
                this.getAdmins()
              })
            })
          }
        })
	},
	handleEdit (index, row) {
		this.editFormVisible = true
        this.userEditForm = Object.assign({}, row)
	},
	handleDelete (index, row) {
		this.$confirm('确认删除该用户吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          let para = { id: row.id }
          removeAdmin(para).then((res) => {
            this.listLoading = false
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getAdmins()
          });
        }).catch(() => {

        })
	},
	editSubmit () {
		this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true

              let para = Object.assign({}, this.userEditForm)

              editAdmin(para).then((res) => {
                this.editLoading = false
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.$refs['editForm'].resetFields()
                this.editFormVisible = false
                this.getAdmins()
              })
            })
          }
        })
	},
	selectGet (val,isNew) {
	    let obj = this.roleData.find((item)=>{
	          return item.role === val
	    })
	    this[isNew ? 'userAddForm' : 'userEditForm'].roleInfo =  Object.assign({}, obj)
	}
  },
  mounted () {
  	this.getAdmins()
  	this.getRoles()
  }
}
</script>

<style lang="less">
	.avatar-wrapper{
		max-width: 100%;box-sizing: border-box;padding:1px;border:1px solid #ccc;
	}
</style>
