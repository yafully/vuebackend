<template>
	<div class="viewBox" id="viewBox" ref="viewBox">
      <transition name="fade" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view></router-view>
        </keep-alive>  
      </transition>
    </div>
</template>

<script>
export default {
  name: 'MainView',
  computed: {
	cachedViews () {
		return this.$store.state.tagsView.cachedViews
	}
  }
}
</script>

<style>

</style>
