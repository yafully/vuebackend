<template>
  <el-dropdown trigger="hover" class='international-icon' @command="handleSetLanguage">
    <div>
      <i class="el-icon-language"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="language==='zh'">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="language==='en'">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown></template>
<script>
  export default {
    name: 'LangSelect',
    computed: {
      language () {
        return this.$store.getters.language
      }
    },
    methods: {
      handleSetLanguage (lang) {
        this.$i18n.locale = lang
        this.$store.dispatch('setLanguage', lang)
        this.$notify({
          title: 'Info',
          message: 'switch language success',
          type: 'success',
          position: 'bottom-right',
          showClose: false
        })
      }
    }
  }
</script>