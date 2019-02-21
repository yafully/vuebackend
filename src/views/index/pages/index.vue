<template>
    <el-container v-wechat-title="$route.meta.title">
      <el-aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <el-header height="40px" class="header-left" v-text="collapsed ? `Logo` : `系统管理`">

        </el-header>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router :collapse="collapsed" :collapse-transition="false">
          <template v-for="(item,index) in routers">
            <el-submenu :index="index+''" v-if="!item.leaf && !item.hidden" :key="'ms'+index">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span class="menu-title" v-text="item.name"></span>
              </template>
              <el-menu-item v-for="(child, inx) in item.children" v-bind:key="'msi'+inx" :index="child.path">
                <i :class="child.iconCls"></i>
                <span v-if="!child.hidden">{{child.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0 && !item.hidden" :index="item.children[0].path" :key="'mi'+index">
              <i :class="item.iconCls"></i><span class="menu-title" v-text="item.children[0].name"></span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="40px"> 
            <el-col :span="12">
                <el-row :gutter="5">
                  <el-col :span="1" class="menu-call">
                    <el-button type="text" @click.prevent="collapse">
                      <i class="el-icon-menu"></i>
                    </el-button>
                  </el-col>
                  <el-col :span="12" class="breadcrumb-inner">
                    <el-breadcrumb separator="/">
                      <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="'bread'+index">
                        {{ item.name }}
                      </el-breadcrumb-item>
                    </el-breadcrumb>
                  </el-col>
                </el-row>
            </el-col>

            <el-col :span="12" class="userinfo">
              <el-tooltip class="item" effect="dark" :content="fullscreenTip" placement="bottom">
                <i :class="[isfullScreen ? 'el-icon-icon-fullscreen' : 'el-icon-icon-normal']" @click="fullScreen"></i>
              </el-tooltip>

              <el-dropdown trigger="hover">
                <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>我的消息</el-dropdown-item>
                  <el-dropdown-item @click.native="open">设置</el-dropdown-item>
                  <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
        </el-header>
        <el-main>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Cookies from 'js-cookie'
  import store from '@/vuex'
  export default {
    name: 'Home',
    data () {
      return {
        isfullScreen: true,
        collapsed:false,
        sysUserName: '',
        sysUserAvatar: ''
      }
    },
    computed: {
      fullscreenTip () {
        return this.isfullScreen ? '全屏' : '退出全屏'
      },
      ...mapGetters(['routers']) //展开vuex里面的getter对象内的routers渲染菜单
    },
    methods: {
      fullScreen (e) {
        let elem = e.target
        if (this.isfullScreen) {
          var docElm = document.documentElement
          if (docElm.requestFullscreen) {
            docElm.requestFullscreen()
          } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen()
          } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen()
          } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen()
          }
          this.isfullScreen = false
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
          this.isfullScreen = true
        }
      },
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
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'abc',
          type: 'warning'
        }).then(() => {
          //sessionStorage.removeItem('user')
          //_this.$router.push('/login')
          store.dispatch('setToken', null)
          store.dispatch('getInfo', false)
          //console.log(store.getters.token)
          
          location.reload()//必须要reload否则会有很多奇怪的bug大坑一个
          //_this.$router.push('/login')
        }).catch(() => {

        });
      },
      //折叠导航栏
      collapse () {
        this.collapsed=!this.collapsed
      },
      handleopen() {
        //console.log('handleopen');
      },
      handleclose() {
        //console.log('handleclose');
      },
      handleselect (a, b) {
        console.log(a)
        console.log(b)
      }
    },
    mounted () {
      // console.log(this.routers)
      // console.log(11111)
      //console.log(store.getters.routers)
      //console.log(this.$store.state.routers)
      //console.log(this.$router.options.routes)
      //console.log(this.$route.matched)
      //获取UserInfo
      
      var user = sessionStorage.getItem('info')
      if (user) {
        user = JSON.parse(user)
        this.sysUserName = user.name || ''
        this.sysUserAvatar = user.avatar || ''
      }
    }
  }
</script>
<style lang="less">
  .abc{max-width:300px}
  .el-container{
    height: 100%;
    position: relative;
    z-index: 2;
  }
  .main{
    .el-header{
      background:#000;
      color:#fff;
      height:40px;padding:0;
    }
  }
  .header-left{line-height:40px;text-align:center;}
  .menu-call{text-align:center;}
  .breadcrumb-inner .el-breadcrumb{line-height:40px;}
  .userinfo{
    text-align:right;line-height:40px;
    .userinfo-inner{color:#fff;cursor:pointer;
      img{width:34px;height:34px;border-radius:100%;vertical-align:middle;margin-right:5px;}
    }
  }

  .el-aside{
    background:#ccc;
    -webkit-transition:150ms;-moz-transition:150ms;-o-transition:150ms;transition:150ms;
  }
  .menu-collapsed{
    flex:0 0 64px;
    width: 64px;
    //.header-left{padding:0;width:0;height:0;overflow:hidden;visibility:hidden;}
  }
  .menu-expanded{
    flex:0 0 230px;
    width: 230px;
  }
  .el-menu--collapse{
    .menu-title{width:0;height:0;overflow:hidden;visibility:hidden;}
  }
  .el-menu--vertical{
    .el-menu--popup{
      border-radius:0;
    }    
  }

</style>
