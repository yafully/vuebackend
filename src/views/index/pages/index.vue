<template>
    <el-container v-wechat-title="$route.meta.title" :class="[collapsed ? 'menu-collapsed' : 'menu-expanded']">
      
      <el-scrollbar class="scrollbar-wrapper sidebar-container" ref="menuScroll">
        <el-aside width="230px">
          <el-header height="40px" class="header-left" v-text="collapsed ? `Logo` : $t('navbar.title')">

          </el-header>
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" router :collapse="collapsed" :collapse-transition="false">
            <template v-for="(item,index) in routers">
              <el-submenu :index="index+''" v-if="!item.leaf && !item.hidden && item.children.length>0" :key="'ms'+index">
                <template slot="title">
                  <i :class="item.iconCls"></i>
                  <span class="menu-title" v-text="$t(`routeName.${item.name}`)"></span>
                </template>

                <menu-tree :menuData="item.children"></menu-tree>
              </el-submenu>
              <el-menu-item v-if="item.leaf&&item.children.length>0 && !item.hidden" :index="item.children[0].path" :key="'mi'+index">
                <i :class="item.iconCls"></i>
                <span class="menu-title" v-text="$t(`routeName.${item.children[0].name}`)" slot="title"></span>
              </el-menu-item>
            </template>
          </el-menu>
          <br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位<br/>占位Last
        </el-aside>

      </el-scrollbar>

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

              <lang-select></lang-select>

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
  import menuTree from './layout/menuTree'
  import { mapGetters } from 'vuex'
  import Cookies from 'js-cookie'
  import store from '@/vuex'
  import LangSelect from '@comp/lang'
  export default {
    name: 'Home',
    data () {
      return {
        layoutResize: '40px',
        isfullScreen: true,
        collapsed:false,
        sysUserName: '',
        sysUserAvatar: ''
      }
    },
    components: {
      menuTree,
      LangSelect
    },
    computed: {
      fullscreenTip () {
        return this.isfullScreen ? this.$t('navbar.screenfull') : this.$t('navbar.screenNormal')
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
      //Resize
      //let self = this
      window.addEventListener('resize', () => {
        setTimeout(() => {
          this.$refs.menuScroll.update()
        }, 500)
      })
      
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
  .header-left{position:fixed;top:0;left:0;width:230px;z-index:10;line-height:40px;text-align:center;}
  .menu-call{text-align:center;}
  .breadcrumb-inner .el-breadcrumb{line-height:40px;}
  .userinfo{
    text-align:right;line-height:40px;
    .userinfo-inner{color:#fff;cursor:pointer;
      img{width:34px;height:34px;border-radius:100%;vertical-align:middle;margin-right:5px;}
    }
  }

  .sidebar-container{
    -webkit-transition:150ms;-moz-transition:150ms;-o-transition:150ms;transition:150ms;
    .el-aside{
      position: relative;
      padding-top: 40px;
      z-index: 1;
      overflow: hidden;
      
    }
    .el-menu{border-right:none;}
  }
  .menu-collapsed{
    .sidebar-container{
      flex:0 0 64px;
      width: 64px;
    }
    .header-left,.el-scrollbar{width: 64px}
  }
  .menu-expanded{
    .sidebar-container{
      flex:0 0 230px;
      width: 230px;
    }
    .header-left,.el-scrollbar{width: 230px}
  }
  .el-menu--collapse{
    .menu-title{width:0;height:0;overflow:hidden;visibility:hidden;}
  }
  .el-menu--vertical{
    .el-menu--popup{
      border-radius:0;
    }    
  }

  .scrollbar-wrapper {
    //&.el-scrollbar{position: fixed;top:0;height: 100%;z-index:10;}
    border-right:1px solid #d8dce5;
    .el-scrollbar__wrap{overflow-x:hidden;height: 100%}
  }  
</style>
