/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-03-08 09:46:01
 */
<template>
  <div :style="{height:height+'px',zIndex:zIndex}">
    <div :class="className" :style="{top:pinTop+'px',zIndex:zIndex,position:position,width:width,height:height+'px'}">
      <slot>
        <div>scroll pin</div>
      </slot>
    </div>
  </div>
</template>

<script>
import { Util } from '@common/util.js'
export default {
  name: 'Pin',
  props: {
    pinTop: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 1
    },
    className: {
      type: String,
      default: ''
    },
    container: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      containerEl: undefined,
      active: false,
      position: '',
      width: undefined,
      height: undefined,
      isSticky: false
    }
  },
  mounted() {
  	this.containerEl = this.container ? document.getElementById(this.container) : window
    this.height = Util.getCoordinates(this.$el).height
    this.containerEl.addEventListener('scroll', this.handleScroll)
    //window.addEventListener('resize', this.handleReize)
  },
  activated() {
    this.handleScroll()
  },
  destroyed() {
    this.containerEl.removeEventListener('scroll', this.handleScroll)
    this.containerEl.removeEventListener('resize', this.handleReize)
  },
  methods: {
    sticky() {
      if (this.active) {
        return
      }
      this.position = 'fixed'
      this.active = true
      this.width = this.width + 'px'
      this.isSticky = true
    },
    handleReset() {
      if (!this.active) {
        return
      }
      this.reset()
    },
    reset() {
      this.position = ''
      this.width = 'auto'
      this.active = false
      this.isSticky = false
    },
    handleScroll() {
      const coordinates = Util.getCoordinates(this.$el)	
      this.width = coordinates.width || '100%'
      const offsetTop = coordinates.top
      if (offsetTop < this.pinTop) {
        this.sticky()
        return
      }
      this.handleReset()
    },
    handleReize() {
      if (this.isSticky) {
        this.width = Util.getCoordinates(this.$el).width + 'px'
      }
    }
  }
}
</script>
