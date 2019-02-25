<template>
    <div v-wechat-title="$t(`routeName.${$route.meta.title}`)" :class="['workspace', collapsed ? 'menu-collapsed' : 'menu-expanded']">
      <el-scrollbar class="scrollbar-wrapper sidebar-container" ref="menuScroll">

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


      </el-scrollbar>

      <div class="mainspace">
        <div class="header"> 
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
                        {{ item.name !=='' ? $t(`routeName.${item.name}`) :'' }}
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
        </div>

        <tags-view></tags-view>

        <div class="viewBox">
          <transition name="fade" mode="out-in">
            <keep-alive :include="cachedViews">
              <router-view></router-view>
            </keep-alive>  
          </transition>
        </div>
      </div>

    </div>
</template>

<script>
  import '@less/layout.less'
  import menuTree from './layout/menuTree'
  import TagsView from './layout/TagsView'
  import { mapGetters } from 'vuex'
  import Cookies from 'js-cookie'
  import store from '@/vuex'
  import LangSelect from '@comp/lang'
  export default {
    name: 'Layout',
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
      TagsView,
      menuTree,
      LangSelect
    },
    computed: {
      cachedViews () {
        console.log(this.$store.state.tagsView.cachedViews)
        return this.$store.state.tagsView.cachedViews
      },
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

</style>
