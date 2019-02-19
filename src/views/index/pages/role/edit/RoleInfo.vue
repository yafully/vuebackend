<template>
	<div>
		<el-form :model="roleInfoForm" label-width="80px" :rules="addFormRules" ref="addForm">
			<el-form-item label="角色名" prop="name">
				<el-input v-model="roleInfoForm.name" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
  name: 'RoleInfo',
  components: {
  	
  },
  data () {
    return {
		roleInfoForm: {
			name: ''
		}
    }
  }
}
</script>

<style>

</style>
