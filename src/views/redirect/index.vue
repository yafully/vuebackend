<script>
export default {
  name: 'Reloader',	
  beforeCreate () {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ 
    	//name: this.$route.meta.name,
    	path: '/' + path, 
    	query })
  }
  ,
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
