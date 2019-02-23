<template>
  <div class="tags-view-container" height="34px">
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
		>
        {{ tag.name }}
        <span v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-panel>

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
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
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
    $route() {
      this.addTags()
      //this.moveToCurrentTag()

    }
  },
  methods: {
  	isActive (route) {
      return route.path === this.$route.path
    },
  	addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('addView', this.$route)
      }
      console.log(this.$store.state.tagsView.visitedViews)
      return false
    }
  },
  mounted () {
  	this.addTags()
  }
}
</script>

<style lang="less">
.tags-view-container {
  position:absolute;z-index:1;top:44px;left:0;	
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
}    
</style>
