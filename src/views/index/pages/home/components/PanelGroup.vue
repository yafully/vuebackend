<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetAreaChartData('tongbi')">
        <div class="card-panel-icon">

        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">同比</div>
          
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetAreaChartData('huanbi')">
        <div class="card-panel-icon">

        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">环比</div>

        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetAreaChartData('dingji')">
        <div class="card-panel-icon">

        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">定基</div>

        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetAreaChartData('jijie')">
        <div class="card-panel-icon">

        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">季节</div>

        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import '@less/dashboard.less'
export default {
  name: 'PanelGroup',
  components: {
  	
  },
  methods: {
    handleSetAreaChartData(type) {
      this.$emit('handleSetAreaChartData', type)
    }
  }
}
</script>
