<template>
  <div class="app-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div>访问统计</div>
      <line-chart :chart-data="lineChartData" />
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <div style="text-align:center;padding-bottom:36px;color:#333;">用户行为</div>
          <radder-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrappr">
          <div style="text-align:center;padding-bottom:36px;color:#333;">访问终端</div>
          <pie-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div style="text-align:center;padding-bottom:36px;color:#333;">地区来源</div>
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RadderChart from './components/RaddarChart'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import { mapGetters } from 'vuex'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  name: 'Home',
  components: {
    RadderChart,
    PanelGroup,
    LineChart,
    BarChart,
    PieChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.home-contain{
  background:rgb(240, 242, 245);
  padding: 32px;
  .chart-wrapper {
    background: #ffffff;
    padding: 16px 16px 0;
    margin-bottom: 32px
  }
}

</style>
