<template>
	<el-dropdown trigger="hover">
		<span class="el-dropdown-link userinfo-inner">
			<img :src="userdata.avatar" />
			{{ userdata.name }}
		</span>
		<el-dropdown-menu slot="dropdown">
		  <el-dropdown-item @click.native="test">我的消息</el-dropdown-item>
		  <el-dropdown-item @click.native="open">设置</el-dropdown-item>
		  <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script>
export default {
  name: 'UserDrop',
  props: {
  	userdata: Object
  },
  methods: {
  	open () {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          customClass: 'abc',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      logout () {
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'abc',
          type: 'warning'
        }).then(() => {
          //sessionStorage.removeItem('user')
          //_this.$router.push('/login')
          this.$store.dispatch('setToken', null)
          this.$store.dispatch('getInfo', false)
          //console.log(store.getters.token)
          
          location.reload()//必须要reload否则会有很多奇怪的bug大坑一个
          //_this.$router.push('/login')
        }).catch(() => {

        });
      },
      test () {
        this.$mymsg("hello vue",function(a){
          console.log(a)
        })
      }
  }
  // ,
  // mounted () {
  // 	console.log(this.userdata)
  // }
}
</script>

<style>

</style>
