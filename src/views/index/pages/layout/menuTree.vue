<template>
    <div>
      <template v-for="(child,index) in menuData">
        <el-submenu :index="index+''" :key="'ms'+index" v-if="child.children.length>0">
          <template slot="title">
            <i :class="child.iconCls"></i>
            <span class="menu-title" v-text="$t(`routeName.${child.name}`)"></span>
          </template>
          <menu-tree :menuData="child.children"></menu-tree>
        </el-submenu>
		
		    <el-menu-item v-else :index="resolvePath(child.path)" :key="child.name">
          <i :class="child.iconCls"></i>
          <span class="menu-title" v-text="$t(`routeName.${child.name}`)"></span>
        </el-menu-item>
      </template>
    </div>
</template>

<script>
import path from 'path'
export default {
  name: 'menuTree',
  props: {
    menuData: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>