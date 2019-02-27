<template>
	<div class="dashboardBox">
		<panel-group @handleSetAreaChartData="handleSetAreaChartData"/>
		<area-chart :chart-data="areaChartData"></area-chart>
	</div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import AreaChart from '@comp/charts/AreaChart'
const areaChartData = {
  tongbi: {
    houseData: [100, 120, 161, 134, 105, 160, 165],
    industryData: [120, 82, 91, 154, 162, 140, 145]
  },
  huanbi: {
    houseData: [200, 192, 120, 144, 160, 130, 140],
    industryData: [180, 160, 151, 106, 145, 150, 130]
  },
  dingji: {
    houseData: [80, 100, 121, 104, 105, 90, 100],
    industryData: [120, 90, 100, 138, 142, 130, 130]
  },
  jijie: {
    houseData: [130, 140, 141, 142, 145, 150, 160],
    industryData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  name: 'AdminDashboard',
  components: {
  	AreaChart,
  	PanelGroup
  },
  data () {
  	return {
  		areaChartData: areaChartData.tongbi
  	}
  },
  methods: {
    handleSetAreaChartData(type) {
      this.areaChartData = areaChartData[type]
    }
  }
}
</script>

<style>
	.dashboardBox{overflow:hidden;padding:1em;background: #fafafa}
</style>
