/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-03-07 13:53:31
 */
<template>
	<div class="page-box">
		<el-pagination 
		:layout="layout" 
		:page-size="pageSize" 
		:total="total" 
		:current-page.sync="currentPage" 
		@size-change="handleSizeChange" 
		@current-change="handleCurrentChange" 
		style="float:right;">
		</el-pagination>
	</div>
</template>

<script>

export default {
	name: 'Pagination',
	props: {
		layout: {
			type: String,
			default: 'prev, pager, next'
		},
		pageSize: {
			type: Number,
			default: 20
		},
		total: {
			type: Number,
			required: true
		},
		page: {
	      type: Number,
	      default: 1
	    }
	},
	computed: {
		//注意这里传入的当前页码不能直接调用page要转一下否则报错
		currentPage: {
	      get() {
	        return this.page
	      },
	      set(val) {
	        this.$emit('update:page', val)
	      }
	    }
	},
	methods: {
		handleSizeChange (val) {
			//console.log('页数改变')
			this.$emit('pagechange1',{ page: this.currentPage, limit: this.pageSize })
		},
		handleCurrentChange (val) {
			//console.log('页码改变')
			this.$emit('pagechange',{ page: val, limit: this.pageSize })
		}
	}
}
</script>

<style lang="less">

</style>
