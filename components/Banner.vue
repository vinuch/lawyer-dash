<template>
  <div class="mx-4 sm:mx-16 mt-16 mb-48">
    <div class="flex flex-wrap mb-10">
      <div
        class="border transition duration-500 ease-in-out transform hover:-translate-y-1 cursor-pointer hover:shadow-xl w-full my-2 sm:w-3/12 rounded-md p-6 sm:mr-6"
      >
        <p class="text-xl">Requests in progress</p>
        <span class="font-bold text-4xl">17</span>
      </div>

      <div
        class="border transition duration-500 ease-in-out transform hover:-translate-y-1 cursor-pointer hover:shadow-xl w-full my-2 sm:w-3/12 rounded-md p-6 sm:mr-6"
      >
        <p class="text-xl">Lawyers Available</p>
        <span class="font-bold text-4xl">15</span>
        <p class="text-sm">
          A lawyer may handle <span class="font-bold"> 2 to 3</span> cases at a
          time
        </p>
      </div>

      <div
        class="border transition duration-500 ease-in-out transform hover:-translate-y-1 cursor-pointer hover:shadow-xl w-full my-2 sm:w-3/12 rounded-md p-6 sm:mr-6"
      >
        <p class="text-xl">New cases today</p>
        <span class="font-bold text-4xl">7</span>
      </div>
    </div>

    <v-select
      class="w-5/12 sm:w-2/12 rounded-md cursor-pointer"
      :options="options"
      v-model="selected"
      :clearable="false"
    ></v-select>
    <!-- <highcharts class="chart" :options="chartOptions"></highcharts> -->
    <!-- <highcharts v-if="chartVisibility" class="chart" :options="chartOptions" ref="chart"></highcharts> -->
    <div class="sm:mx-24 mt-12 overflow-x-scroll">
      <highcharts  :options="chartOptions"></highcharts>
    </div>
  </div>
</template>

<script>

import moment from 'moment'
import {Chart} from 'highcharts-vue'
import { mapActions, mapGetters } from 'vuex'

  export default {
    data() {
      return {
        options: [],
        selected: '',
        monthDays: [],
        chartOptions: {
          chart: {
    type: "spline"
  },
        title: {
        text: 'Number of Cases per month'
    },

    yAxis: {
        title: {
            text: 'Number of Cases'
        }
    },

    xAxis: {
      title: {
        x: 3,
        y: 15,
        text: 'Days of The month'
      },
        // tickInterval: 2,
        tickInterval: 1 ,
         labels: {
           format: '{value:0f}' + ' oct'
            // formatter: function() {
                
            //     return this.value
            // }
          },
        gridLineWidth: 1,
        // tickInterval: 1, 
        // accessibility: {
        //     rangeDescription: 'Range: new Date(12/1/17) to new Date(12/18/17'
        // }
        categories: this.monthDays 
    },
     tooltip: {
       pointFormat: "{series.name}: <b>{point.y}</b><br/>",
    shared: true,
    crosshairs: true
  },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 1
        }
    },
//  {
//         color: '#4299e1',
//         name: 'New Cases',
//         data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387,11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387,11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387,11744, 17722, 16005, 19771, 20185, 24377]
//     }
        // data: [23934, 22503, 27177, 29658, 37031, 19931, 37133, 54175,33934, 22503, 27177, 39658, 37031, 19931, 37133, 44175,43934, 52503, 37177, 29658, 37031, 19931, 37133, 24175,43934, 52503, 57177, 69658]
        // data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434,24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434,24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434,24916, 24064, 29742, 29851, 32490, 30282]

    series: [{
        color: '#48bb78',
        name: 'Active Cases',
        // data: [23934, 22503, 27177, 29658, 37031, 19931, 37133, 54175,33934, 22503, 27177, 39658, 37031, 19931, 37133, 44175,43934, 52503, 37177, 29658, 37031, 19931, 37133, 24175,43934, 52503, 57177, 69658]
        data: this.activeCases
}, {
        color: '#e53e3e',
        name: 'Closed Cases',
        data: this.closedCases
        // data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434,24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434,24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434,24916, 24064, 29742, 29851, 32490, 30282]
}],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

    }}},
    components: {
      highcharts: Chart
    },
    methods: {
      getDays() {
        for (let i = 1; i <= moment().daysInMonth(); i++) {
        this.monthDays.push(i)          
        }
      },
      setData() {
        this.chartOptions.series[0].data = this.activeCases
      },
      ...mapActions([
        'getCases'
      ])
    },
    mounted() {
      this.getDays()
      this.getCases('april')
      const MONTHS = () => {
          const months = ['This Month']
          const dateStart = moment().add(-1, 'month')
          const dateEnd = moment().add(-7, 'month')
          while (dateEnd.diff(dateStart, 'months')) {
            months.push(dateStart.format('MMMM'))
            dateStart.add(-1, 'month')
          }
          return months
        }

        this.options =  MONTHS()
        this.selected = this.options[0]

    },
    computed: {
      ...mapGetters([
        'currentCases',
        'closedCases',
        'activeCases',
        'isLoading'
      ])
    },
    watch: {
      activeCases: function (val) {
        this.chartOptions.series[0].data = this.activeCases
        // this.fullName = val + ' ' + this.lastName
      },
      closedCases: function (val) {
        this.chartOptions.series[1].data = this.closedCases
        // this.fullName = val + ' ' + this.lastName
      },
    }

  }
</script>

<style scoped>
.highcharts-figure, .highcharts-data-table table {
  min-width: 360px; 
  max-width: 800px;
  margin: 1em auto;
}

.highcharts-data-table table {
	font-family: Verdana, sans-serif;
	border-collapse: collapse;
	border: 1px solid #EBEBEB;
	margin: 10px auto;
	text-align: center;
	width: 100%;
	max-width: 500px;
}
.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
  padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
  padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}
.highcharts-data-table tr:hover {
  background: #f1f7ff;
}</style>
