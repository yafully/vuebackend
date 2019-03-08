/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-03-08 13:45:57
 */
<template>
  <detail :is-edit="false"/>
</template>

<script>
import Detail from './components/detail'

export default {
  name: 'ArticleCreate',
  components: { Detail }
}
</script>
