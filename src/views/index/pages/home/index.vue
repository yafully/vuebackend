<template>
	<div class="inxBox">
		<component :is="currentRole"/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import AdminDashboard from './Admin'
import EditorDashboard from './Editor'
export default {
  name: 'Dashboard',
  components: { 
  	AdminDashboard, 
  	EditorDashboard 
  },
  computed: {
    ...mapGetters([
      'info'
    ])
  },
  data () {
  	return {
  		currentRole: 'AdminDashboard'
  	}
  },
  created() {
    if(this.info.role !== 'superAdmin') {
    	this.currentRole = 'EditorDashboard'
    }
  }
}
</script>

<style lang="less">

</style>
