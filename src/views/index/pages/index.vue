<template>
    <el-container v-wechat-title="$route.meta.title">
      <el-aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <el-header height="40px" class="header-left">
          系统管理
        </el-header>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router :collapse="collapsed">
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span class="menu-title" v-text="item.name"></span>
              </template>
              <el-menu-item v-for="child in item.children" :index="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
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
                      <el-breadcrumb-item v-for="item in $route.matched">
                        {{ item.name }}
                      </el-breadcrumb-item>
                    </el-breadcrumb>
                  </el-col>
                </el-row>
            </el-col>
            <el-col :span="12" class="userinfo">
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
    export default {
      name: 'Home',
      data () {
        return {
          collapsed:false,
          sysUserName: '',
          sysUserAvatar: ''
        }
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
          var _this = this;
          this.$confirm('确认退出吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass: 'abc',
            type: 'warning'
          }).then(() => {
            sessionStorage.removeItem('user')
            _this.$router.push('/login')
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
        //console.log(this.$router.options.routes)
        //获取UserInfo
        var user = sessionStorage.getItem('user')
        if (user) {
          user = JSON.parse(user)
          this.sysUserName = user.name || ''
          this.sysUserAvatar = user.avatar || ''
        }
      }
    }
</script>
<style lang="scss">
  .abc{max-width:300px}
  .el-container{
    height: 100%;
    position: relative;
    z-index: 2;
  }
  .el-header{
    background:#000;
    color:#fff;
    height:40px;
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
    .header-left{width:0;height:0;overflow:hidden;visibility:hidden;}
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
