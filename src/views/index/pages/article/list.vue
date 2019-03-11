/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-03-11 16:03:52
 */
<template>
	<div>
		<!--工具条-->
		<pin :pinTop="74" :zIndex="5" container="viewBox">
			<el-col :span="24" class="toolbar" id="toolbal">
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
						<el-button type="primary" icon="el-icon-refresh" @click="clearList(1,true)">清除</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</pin>

		<el-table v-loading="listLoading" :data="articles" border fit highlight-current-row style="width: 100%">
	      <el-table-column align="center" label="ID" width="80">
	        <template slot-scope="scope">
	          <span>{{ scope.row.id }}</span>
	        </template>
	      </el-table-column>

	      <el-table-column width="180px" align="center" label="Date">
	        <template slot-scope="scope">
	          <span>{{ scope.row.timestamp }}</span>
	        </template>
	      </el-table-column>

	      <el-table-column width="120px" align="center" label="Author">
	        <template slot-scope="scope">
	          <span>{{ scope.row.author }}</span>
	        </template>
	      </el-table-column>

	      <el-table-column width="100px" label="Importance">
	        <template slot-scope="scope">
	          {{scope.row.importance}}
	        </template>
	      </el-table-column>

	      <el-table-column class-name="status-col" label="Status" width="110">
	        <template slot-scope="scope">
	          <el-tag :type="scope.row.status">{{ scope.row.status }}</el-tag>
	        </template>
	      </el-table-column>

	      <el-table-column min-width="300px" label="Title">
	        <template slot-scope="scope">

	          <router-link :to="'/aticle/edit/'+scope.row.id" class="link-type">
	            <span>{{ scope.row.title }}</span>
	          </router-link>
	        </template>
	      </el-table-column>

	      <el-table-column align="center" label="Actions" width="120">
	        <template slot-scope="scope">
	          <router-link :to="'/aticle/edit/'+scope.row.id">
	            <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
	          </router-link>
	        </template>
	      </el-table-column>
	    </el-table>
	    <!--工具条-->
		<el-col :span="24" class="toolbar">
			<pagination :pageSize="20" :total="pagination.total" :page="pagination.page" @pagechange="getList"></pagination>
		</el-col>
	</div>
</template>

<script>
import { Util } from '@common/util'
import Pin from '@comp/pin/'
import Pagination from '@comp/pagination/'
import { scrollTo } from '@common/scrollTo'
import { getArticleList } from '@api/api'
//import Pagination from '@comp/pagination/'
export default {
	name: 'ArticleList',
	data () {
		return {
			filters: {
				name: ''
			},
			articles: [],
			pagination: {
				total: 0,
				page: 1
			},
			listLoading: false,
			autoScroll:true,
		}
	},
	components: {
		Pagination,
		Pin
	},
	computed: {
		
	},
	methods: {
		getList(p) {
			let para = {
				page: Object.prototype.toString.call(p) === "[object Object]" ? p.page : this.pagination.page,//如果不是传入的对象则取默认值
				name: this.filters.name
			}	
	      	this.listLoading = true
			getArticleList(para).then(res => {
				this.pagination.total = res.data.total
				this.articles = res.data.articles
				this.listLoading = false
				if (this.autoScroll) {
			        scrollTo(0, 10)
			    }
			})
	    }
	},
	mounted () {
		this.getList()
	}
}
</script>

<style lang="less">

</style>
