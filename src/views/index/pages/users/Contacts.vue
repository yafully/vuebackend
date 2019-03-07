<template>
	<div>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" v-on:click="getInfo">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-refresh" @click="clearList(1,true)">清除</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="telephones" border highlight-current-row v-loading="loading" style="width: 100%;">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="单位名称">
							<span>{{ props.row.name }}</span>
						</el-form-item>
						<el-form-item label="经度">
							<span>{{ props.row.lon.number }}</span>
						</el-form-item>
						<el-form-item label="纬度">
							<span>{{ props.row.lat.number }}</span>
						</el-form-item>
						<el-form-item label="联系电话">
							<span>{{ props.row.telephone }}</span>
						</el-form-item>
						<el-form-item label="描述">
							<span>{{ props.row.description }}</span>
						</el-form-item>
						<el-form-item label="地址">
							<span>{{ props.row.address }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column type="index" width="60">

			</el-table-column>
			<el-table-column prop="name" label="姓名" width="200" sortable>
			</el-table-column>
			<el-table-column prop="lon.number" label="经度" width="150" sortable>
			</el-table-column>
			<el-table-column prop="lat.number" label="纬度" width="150"></el-table-column>
			<el-table-column prop="telephone" label="联系电话" width="150">
				<template slot-scope="scope">
					<i class="fa fa-phone"></i>
					<!-- <el-icon name="time"></el-icon> -->
					<span style="margin-left: 10px">{{ scope.row.telephone }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="description" label="描述" width="100" sortable>
				<template slot-scope="scope">
					<el-popover trigger="hover" placement="top">
						<p>姓名: {{ scope.row.name }}</p>
						<p>地址: {{ scope.row.address }}</p>
						<p>电话：{{scope.row.telephone}}</p>
						<p>描述：{{scope.row.description}}</p>
						<div slot="reference" class="name-wrapper">
							<el-tag>{{ scope.row.name }}</el-tag>
						</div>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column prop="address" label="地址" min-width="200" sortable>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="50">
				<template slot-scope="scope">
					<el-button @click.native.prevent="deleteRow(scope.$index, scope.row)"
					type="text" size="small"> 删除 </el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
<!-- 			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" :current-page.sync="page" style="float:right;">
			</el-pagination> -->

			<pagination :pageSize="20" :total="pagination.total" :page="pagination.page" @pagechange="getInfo"></pagination>
		</el-col>
	</div>
</template>

<script>
import { getTelephone, removeTelephone } from '@api/api';
import { scrollTo } from '@common/scrollTo'
import Pagination from '@comp/pagination/'
export default {
	name: 'Contacts',
	components: {
		Pagination
	},
	data () {
		return {
		  loading: false,
		  telephones: [],
		  filters: {
		  	name: ''
		  },
		  pagination: {
				total: 0,
				page: 1
			}
		}
	},
	methods: {
		//翻页
		// handleCurrentChange (val, clear = false) {
		// 	if (clear) this.filters.name = ''
		// 	this.page = val
		// 	this.getInfo()
		// },
		//清除
		clearList (val, clear = false) {
			if(this.filters.name === '') return
			if (clear) this.filters.name = ''
			this.pagination.page = val
		
			this.getInfo()
			if (this.autoScroll) {
		        scrollTo(0, 20)
		    }
		},
		getInfo (p) {
			let para = {
				page: Object.prototype.toString.call(p) === "[object Object]" ? p.page : this.pagination.page,
				name: this.filters.name
			}
			this.loading = true
			getTelephone(para).then((res) => {
				this.pagination.total = res.data.total
				this.telephones = res.data.telephones
				this.loading = false
			});
		},
		deleteRow (index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.loading = true
				let para = { id: row.id }
				removeTelephone(para).then((res) => {
					this.loading = false
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.getInfo()
				});
			}).catch(() => {

			})
		}
	},
	mounted:function() {
		this.$nextTick(function(){
			this.getInfo()
		})
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