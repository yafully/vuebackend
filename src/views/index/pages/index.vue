<template>
    <div v-wechat-title="$t(`routeName.${$route.meta.title}`)" :class="['workspace', collapsed ? 'menu-collapsed' : 'menu-expanded']">
      <el-scrollbar class="scrollbar-wrapper sidebar-container" ref="menuScroll">

          <div class="header header-left" v-text="collapsed ? `Logo` : $t('navbar.title')"></div>

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
            <div class="doTd">
              <div class="tools-item">
                <i class="el-icon-menu" @click.prevent="collapse"></i>
              </div>
              <div class="tools-item breadcrumb-inner">
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="'bread'+index">
                    {{ item.name !=='' ? $t(`routeName.${item.name}`) :'' }}
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </div>

            <div class="doTd head-right-tools">
              <el-tooltip class="item" effect="dark" :content="fullscreenTip" placement="bottom">
                <div class="tools-item">
                  <i :class="['icon', isfullScreen ? 'el-icon-icon-fullscreen' : 'el-icon-icon-normal']" @click="fullScreen"></i>
                </div>
              </el-tooltip>

              <lang-select></lang-select>

              <user-drop :userdata="userData" class="userinfo"></user-drop>
            </div>
        </div>

        <tags-view></tags-view>
        <main-view></main-view>

      </div>

    </div>
</template>

<script>
  import '@less/layout.less'
  import menuTree from './layout/menuTree'
  import UserDrop from './layout/UserDrop'
  import TagsView from './layout/TagsView'
  import MainView from './layout/MainView'
  import { mapGetters } from 'vuex'
  import Cookies from 'js-cookie'
  import LangSelect from '@comp/lang'
  export default {
    name: 'Layout',
    data () {
      return {
        layoutResize: '40px',
        isfullScreen: true,
        collapsed:false,
        userData: {}
      }
    },
    components: {
      TagsView,
      UserDrop,
      menuTree,
      MainView,
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
        this.userData = user
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
