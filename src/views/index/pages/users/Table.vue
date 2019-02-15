<template>
	<div>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-plus">新增</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-refresh">清除</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
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
			<el-table-column prop="birth" label="生日" width="120" sortable>
			</el-table-column>
			<el-table-column prop="addr" label="地址" min-width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
					<el-button type="danger" size="small" icon="el-icon-circle-close-outline" @click="handleDel(scope.$index, scope.row)"></el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</div>
</template>

<script>
import { getUserListPage } from '@api/api'

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
			sels: []//列表选中列
		}
	},
	components: {
		
	},
	methods: {
		//获取用户列表
		getUsers () {
			let para = {
				page: this.page,
				name: this.filters.name
			}
			this.listLoading = true
			getUserListPage(para).then((res) => {
				this.total = res.data.total
				this.users = res.data.users
				this.listLoading = false
			})
		},
		//性别显示转换
		formatSex: function (row) {
			return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
		},
		handleEdit () {

		},
		handleDel () {

		},
		handleCurrentChange(val) {
			this.page = val;
			this.getUsers();
		},
		//批量删除
		batchRemove: function () {}
	},
	mounted () {
		this.getUsers()
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
