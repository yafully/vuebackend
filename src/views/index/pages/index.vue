<template>
    <el-container v-wechat-title="$route.meta.title">
      <el-aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <el-header height="40px">
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
          <el-button type="text" @click.prevent="collapse">菜单</el-button>
        </el-header>
        <el-main>
          <el-button type="text" @click="open">点击打开 Message Box</el-button>
          <el-button type="text" @click="logout">Logout</el-button>
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
          collapsed:false
        }
      },
      methods: {
        open() {
          this.$alert('这是一段内容', '标题名称', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        },
        logout: function () {
          var _this = this;
          this.$confirm('确认退出吗?', '提示', {
            //type: 'warning'
          }).then(() => {
            sessionStorage.removeItem('user');
            _this.$router.push('/login');
          }).catch(() => {

          });
        },
        //折叠导航栏
        collapse:function(){
          this.collapsed=!this.collapsed;
        },
        handleopen() {
          //console.log('handleopen');
        },
        handleclose() {
          //console.log('handleclose');
        },
        handleselect: function (a, b) {
          console.log(a)
          console.log(b)
        }
      },
      mounted () {
        //console.log(this.$router.options.routes)
      }
    }
</script>
<style lang="scss">
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
  .el-aside{
    background:#ccc;
  }
  .menu-collapsed{
    flex:0 0 64px;
    width: 64px;
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
