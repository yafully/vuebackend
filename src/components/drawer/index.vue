/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-28 21:01:11
 */
<template>
  <!-- container -->
<div :class="['vue-drawer', show ? 'active' : '', pos!='left' ? 'drawer-right' : 'drawer-left']">
    <div :style="{'transform': 'translate3d('+translateX+'px,0,0)','width': parseWidth }"
    class="vue-drawer-main">
	    <div ref="drawer" :class="['drawer', show ? 'active' : '']" >
			<slot name="drawer"></slot>
		</div>
	    
  	</div>
	<div :class="['vue-drawer-mask', show ? 'active' : '']" @click="hideMask" v-if="overlay"></div>
</div> 
</template>

<script>
 export default {
   props: {
   	 width: {
   	   type: String,
       default: '300'
   	 },
   	 overlay: {
       type: Boolean,
       default: true
     },
     show: {
       type: Boolean,
       default: false
     },
     pos: {
       type: String,
       default: 'left'
     }
   },
   computed: {
   		parseWidth () {
   			return this.width.indexOf('%') > 0 ? this.width : this.width + 'px'
   		}
   },
   data() {
     return {
      drawerWidth:0,
      translateX:0
    }
  },
  watch:{
    show:function(){
      //listener
    	this.$emit(this.show ? 'on-show' : 'on-hide')

      //transition

      if (!this.show) {
      	this.translateX = this.pos == 'left' ? -this.width : 0
      } else {
      	this.translateX = this.pos == 'left' ? 0 : -this.width
      }
        
    }
  },
  mounted(){
   //  this.$nextTick(function () {
   //    this.drawerWidth = this.$refs.drawer.clientWidth
  	// })
  },
  methods: {
   hideMask() {
     // this.show = false;
     this.$emit('change-show',false)
   }
 }
}
</script>

<style lang="less">
 .vue-drawer {
   position: fixed;
   z-index: 15;
   top: 0;
   width: 0;
   height: 100%;
   &.active{
   	
   	.vue-drawer-mask{
   		visibility: visible;
   		opacity: 1;
   	}
   }
 }
 .drawer-right{
 	right:0;
 	.drawer{transform: translateX(102%);border-left:1px solid #555;}
 }
 .drawer-left{
 	left:0;
 	.drawer{transform: translateX(-102%);border-right:1px solid #555;}
 }

 .vue-drawer-main {
  height: 100%;
   position: absolute;z-index: 2;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   transition: transform ease-in-out 0.38s;
 }

.vue-drawer-mask {
   position: fixed;
   top: 0;
   left: 0;
   width:100%;
   height:100%;
   z-index: 1;
   visibility: hidden;
   opacity: 0;
   transition: opacity ease-in-out 0.38s;
   background-color: rgba(0, 0, 0, 0.3);
 }

 .vue-drawer .drawer {
   width: 100%;
   background-color: #fff;
   position: absolute;
   top: 0;
   height:100%;
   overflow: hidden;
   pointer-events: none;
   visibility: hidden;
   transition: transform ease-in-out 0.38s;
   will-change: none;
   &.active {
		pointer-events: inherit;
		visibility: visible;
		transform: translateX(0%);
	}
 }


</style>
