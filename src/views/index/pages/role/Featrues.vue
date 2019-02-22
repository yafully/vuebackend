<template>
	<el-row :gutter="20" v-loading="pageLoading">
	  <el-col :span="12">
	  	<el-tree
		  :data="featrues" 
		  show-checkbox
		  node-key="id"
		  :default-expanded-keys="[2, 3]"
		  :default-checked-keys="[5]" 
		  :highlight-current="true"
		  @node-click="handleNodeClick"
		  :props="defaultProps" 
		  ref="roleTree">
		  <span class="custom-tree-node" slot-scope="{ node, data }">
	        <span>
	        {{ $t(`routeName.${node.label}`) }}
	        {{ data.meta.role.join('-') }}
	    	</span>
	      </span>
		</el-tree>
	  </el-col>
	  <el-col :span="12">
	  	<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
		    	全选 - <el-tag :type="this.activeId ? 'primary' : 'danger'" size="medium">{{ $t(`routeName.${nowAtive}`)}}</el-tag>
			</el-checkbox>
			<el-button type="primary" @click.native="saveRole" style="float:right">保存权限</el-button>
		  </div>
		  <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRolesChange">
		    <el-checkbox v-for="role in roles" :label="role" :key="role">{{role}}</el-checkbox>
		  </el-checkbox-group>
		</el-card>
	  </el-col>
	</el-row>
</template>

<script>
	import {addRouter} from '@/route/index'
	function saveR (data, param) {
		for (let i = 0; i < data.length; i++) {
			if (data[i].id === param.id) {
				data[i].meta.role = param.role.split(',')
	  		}
	  		if (data[i].children && data[i].children.length) {
			    saveR(data[i].children, param)
			}
		}
		return data
	}
	export default {
	  name: '',
	  components: {
	  	
	  },
	  data () {
	    return {
	    	pageLoading: false,
	    	activeId: false,
	    	activeName: '',
	    	activeData: {},
	    	//Tree	
			featrues: addRouter,
			defaultProps: {
				label: 'name',
				role: 'meta.role'
			},
			//Checkbox
			checkAll: false,
	        checkedRoles: [],
	        roles: ['superAdmin', 'admin', 'customer', 'guest'],
	        isIndeterminate: false
	    }
	  },
	  computed: {
	  	nowAtive () {
	  		return this.activeId ? this.activeName : '未选择功能节点'
	  	}
	  },
	  methods: {
	  	handleNodeClick (data) {
	  		this.activeId = data.id
	  		this.activeName = data.name
	  		this.checkedRoles = data.meta.role
	  		this.activeData = data
	  		// const tree = this.$refs.roleTree
	  		// const key = tree.getCurrentKey()
	  		// console.log(data)
	  		// const newData = Object.assign(data, {meta:{role:this.checkedRoles}})
	  		// tree.updateKeyChildren(key,newData)
	  		//console.log(newData)
	  		console.log(this.activeData)
	  	},
	  	handleCheckAllChange(val) {
			this.checkedRoles = val ? this.roles : []
			this.isIndeterminate = false
			this.updateRole()
		},
		handleCheckedRolesChange(value) {
			let checkedCount = value.length
			this.checkAll = checkedCount === this.roles.length
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.roles.length
			this.updateRole()
		},
		updateRole () {
			//console.log(this.activeData)
			const tree = this.$refs.roleTree
	  		const key = tree.getCurrentKey()
	  		this.activeData.meta.role = this.checkedRoles
	  		//tree.updateKeyChildren(key,this.activeData)
	  		//console.log(this.activeData)
		},
		saveRole () {
			let param = {
				id: this.activeId,
				role: this.checkedRoles.toString()
			}
			this.featrues = saveR(this.featrues, param)
			//需要动态提交
		}
	  },
	  mounted () {
	  	//console.log(this.featrues)
	  }
	}
</script>

<style>

</style>
