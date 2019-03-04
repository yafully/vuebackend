<template>
	<div>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-refresh" @click="handleCurrentChange(1,true)">清除</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="toggleSelection([users[1], users[2]])">自定义选中2-3</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="users" @selection-change="selsChange" highlight-current-row v-loading="listLoading" style="width: 100%;" ref="multipleTable">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="100" sortable>
			</el-table-column>
			<el-table-column label="生日" width="180" sortable>
				<template slot-scope="scope">
			        <i class="el-icon-time"></i>
			        <span style="margin-left: 10px">{{ scope.row.birth }}</span>
			      </template>
			</el-table-column>
			<el-table-column prop="addr" label="地址" min-width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-tooltip content="编辑" placement="top">
						<el-button size="small" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
					</el-tooltip>
					<el-tooltip content="删除" placement="top">
						<el-button type="danger" size="small" icon="el-icon-circle-close-outline" @click="handleDel(scope.$index, scope.row)"></el-button>
					</el-tooltip>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination 
			layout="prev, pager, next" 
			@current-change="handleCurrentChange" 
			:page-size="20" 
			:total="total" 
			:current-page.sync="page" 
			@size-change="handleSizeChange" 
			style="float:right;">
			</el-pagination>
		</el-col>
		<!--编辑界面-->
		<el-dialog title="编辑用户" :visible.sync="editFormVisible" :append-to-body="true" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
		<!--新增界面-->
		<el-dialog title="新增用户" :visible.sync="addFormVisible" :append-to-body="true" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
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
import { Util } from '@common/util'
import { scrollTo } from '@common/scrollTo'
import { getUserListPage, editUser, removeUser, addUser, batchRemoveUser } from '@api/api'

export default {
	name: 'Table',
	data () {
		return {
			filters: {
				name: ''
			},
			users: [],
			total: 0,
			page: 1,
			listLoading: false,
			autoScroll:true,
			sels: [],//列表选中列
			//编辑部分
			editFormVisible: false,//编辑界面是否显示
			editLoading: false,
			//编辑界面数据
			editForm: {
				id: 0,
				name: '',
				sex: -1,
				age: 0,
				birth: '',
				addr: ''
			},
			//编辑界面规则
			editFormRules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				]
			},
			//新增部分
			addFormVisible: false,
			addLoading: false,
			addFormRules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				]
			},
			//新增界面数据
			addForm: {
				name: '',
				sex: -1,
				age: 0,
				birth: '',
				addr: ''
			}
		}
	},
	components: {
		
	},
	methods: {
		//获取角色列表
		getUsers () {
			let para = {
				page: this.page,
				name: this.filters.name
			}
			this.listLoading = true
			//console.log(para)
			getUserListPage(para).then((res) => {
				this.total = res.data.total
				this.users = res.data.users
				this.listLoading = false
				
			})
		},
		//性别显示转换
		formatSex (row) {
			return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知'
		},
		//日期格式转换
		// dateFormat(row, column, cellValue, index){
		// 	const daterc = row[column.property]

		// 	if(daterc!=null){
		// 		const timeFormat= daterc.replace("/Date(", "").replace(")/", "")
		// 		return timeFormat
		// 	}
	 //    },
		//编辑部分
		handleEdit (index, row) {
			this.editFormVisible = true
			this.editForm = Object.assign({}, row)
		},
		//编辑提交
		editSubmit () {
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true;
						//NProgress.start();
						let para = Object.assign({}, this.editForm);
						para.birth = (!para.birth || para.birth == '') ? '' : Util.formatDate(new Date(para.birth), 'yyyy-MM-dd')
						editUser(para).then((res) => {
							this.editLoading = false;
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields()
							this.editFormVisible = false
							this.getUsers()
						});
					});
				}
			});
		},
		//删除提交
		handleDel (index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true
				let para = { id: row.id }
				removeUser(para).then((res) => {
					this.listLoading = false
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.getUsers()
				});
			}).catch(() => {

			})
		},
		//新增界面
		handleAdd () {
			this.addFormVisible = true
			this.addForm = {
				name: '',
				sex: -1,
				age: 0,
				birth: '',
				addr: ''
			};
		},
		//新增
		addSubmit () {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.addLoading = true
						let para = Object.assign({}, this.addForm)
						para.birth = (!para.birth || para.birth == '') ? '' : Util.formatDate(new Date(para.birth), 'yyyy-MM-dd')
						addUser(para).then((res) => {
							this.addLoading = false
							this.$message({
								message: '提交成功',
								type: 'success'
							})
							this.$refs['addForm'].resetFields()
							this.addFormVisible = false
							this.getUsers()
						})
					})
				}
			})
		},
		//翻页
		handleCurrentChange (val, clear) {
			if (clear) this.filters.name = ''
			this.page = val
			this.getUsers()
			if (this.autoScroll) {
		        scrollTo(0, 20)
		    }
		},
		handleSizeChange () {
			if (this.autoScroll) {
		        scrollTo(0, 20)
		    }
		},
		//批量删除
		selsChange (sels) {
			this.sels = sels
		},
		batchRemove () {
			let ids = this.sels.map(item => item.id).toString()
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true
				//NProgress.start();
				let para = { ids: ids }
				batchRemoveUser(para).then((res) => {
					this.listLoading = false;
					//NProgress.done();
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.getUsers();
				});
			}).catch(() => {

			})
		},
		toggleSelection (rows) {
	      if (rows) {
	        rows.forEach(row => {
	          this.$refs.multipleTable.toggleRowSelection(row);
	        });
	      } else {
	        this.$refs.multipleTable.clearSelection();
	      }
	    }
	},
	mounted () {
		this.getUsers()
		console.log(`移动设备:${Util.isMobile()}`)
	}
}
</script>

<style lang="less">
	.toolbar{
		padding:5px;background: #fafafa;
		.el-form--inline{
			.el-form-item{
				margin-bottom:0;
			}			
		}

	}
</style>
