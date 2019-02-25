<template>
  <div class="tags-view-container">
    <scroll-panel ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        :key="tag.path"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)" 
        @contextmenu.prevent.native="openMenu(tag, $event)"
		>
        {{ $t(`routeName.${tag.name}`) }}
        <span v-if="!tag.meta.noClose" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-panel>

	<ul v-show="conMenuVisible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li v-if="selectedTag.meta && !selectedTag.meta.noClose" @click="closeSelectedTag(selectedTag)">Close</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ScrollPanel from '@comp/scrollPanel/'
export default {
  name: '',
  components: {
  	ScrollPanel
  },
  data () {
    return {
      conMenuVisible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      remainTags: []
    }
  },
  computed: {
  	// ...mapState({
  	// 	visitedViews: 'visitedViews',
  	// 	routers: 'routers'
  	// })
  	//...mapState(['visitedViews','routers'])
    visitedViews () {
      return this.$store.state.tagsView.visitedViews
    },
    routers () {
      return this.$store.state.permission.routers
    }
  },
  watch: {
    $route () {
      this.addTags()

    },
    conMenuVisible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
  	isActive (route) {
      return route.path === this.$route.path
    },
  	addTags () {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('addView', this.$route)
        this.moveToCurrentTag()
      }
      //console.log(this.$store.state.tagsView.visitedViews)
      //console.log(this.$store.state.tagsView.cachedViews)
      return false
    },
    moveToCurrentTag() {
      let tags = this.$refs.tag
      //console.log(this.$route.name)
      //console.log(this.$route.path)
      if(tags){
	      this.$nextTick(() => {
	        for (const tag of tags) {
	          if (tag.to.path === this.$route.path) {
	            this.$refs.scrollPane.moveToTarget(tag)
	            break
	          }
	        }
	      })
      }
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('delCachedView', view).then(() => {
        const { fullPath } = view

        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath,
            meta: {
            	name: view.meta.title
            }
          })
        })
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews)
        }
        if (this.conMenuVisible) {
          this.closeMenu()	
        }
      })
    },
    closeAllTags(view) {
      this.$store.dispatch('delAllViews').then(({ visitedViews }) => {
        if (this.remainTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews)
      })
    },
    toLastView(visitedViews) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView)
      } else {
        // You can set another route
        this.$router.push('/')
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const offsetHeight = this.$el.offsetHeight // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = e.clientY - offsetHeight

      this.conMenuVisible = true
      this.selectedTag = tag
      // console.log(this.selectedTag)
      // console.log(this.conMenuVisible)
    },
    closeMenu() {
      this.conMenuVisible = false
    }
  },
  mounted () {
  	this.addTags()
  }
}
</script>

<style lang="less">
.tags-view-container {
  position:absolute;z-index:2;top:44px;left:0;	
  box-sizing: border-box;	
  width: 100%;
  height: 30px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 24px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      box-sizing: border-box;

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &:before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}

</style>
