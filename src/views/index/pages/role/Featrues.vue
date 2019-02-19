<template>
	<div>
		<el-tree
		  :data="featrues" 
		  show-checkbox
		  node-key="id"
		  :default-expanded-keys="[2, 3]"
		  :default-checked-keys="[5]" 
		  :expand-on-click-node="false" 
		  :props="defaultProps">
		  <span class="custom-tree-node" slot-scope="{ node, data }">
	        <span>{{ node.label }}{{ data.meta.role }}</span>
			<span>
				<el-button
		            type="text"
		            size="mini"
		            @click="remove(node, data)">
		            编辑权限
		        </el-button>
          </span>
	      </span>
		</el-tree>
	</div>
</template>

<script>
	import {addRouter} from '@/route/index'

	export default {
	  name: '',
	  components: {
	  	
	  },
	  data () {
	    return {
	    	//Tree	
			featrues: addRouter,
			defaultProps: {
				label: 'name',
				role: 'meta.role'
			}
	    }
	  },
	  methods: {
	  	remove (node, data) {
	  		//const parent = node.parent
        	//const children = parent.data.children || parent.data
        	//const index = children.findIndex(d => d.id === data.id)
        	console.log(data)
	  	}	
	  },
	  mounted () {
	  	console.log(this.featrues)
	  }
	}
</script>

<style>

</style>
