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

    <div class="sm:mx-24 mt-12 ">
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
      labels: {},
      gridLineWidth: 1,
      categories: []
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
          pointStart: 0
      }
    },

    series: [{
        color: '#48bb78',
        name: 'Active Cases',
        data: this.activeCases
      }, {
        color: '#e53e3e',
        name: 'Closed Cases',
        data: this.closedCases
      },
      {
        color: '#4299e1',
        name: 'new Cases',
        data: this.newCases
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
      getDays(year, month) {
       let result= Array.from({length: moment(`${year} ${month}`).daysInMonth()}, (x, i) => moment(`${year} ${month}`).startOf('month').add(i, 'days').format('DD MMM'));
        this.monthDays = result
      },

      ...mapActions([
        'getCases'
      ])
    },
    mounted() {
      this.getDays(2020, this.selected)
      this.getCases(this.selected)
      const MONTHS = () => {
        const months = []
        const dateStart = moment()
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
        'newCases',
      ]),

    },
    watch: {
      activeCases: function (val) {
        this.chartOptions.series[0].data = this.activeCases
        this.chartOptions.xAxis.categories = this.monthDays
      },
      closedCases: function (val) {
        this.chartOptions.series[1].data = this.closedCases
      },
      newCases: function (val) {
        this.chartOptions.series[2].data = this.newCases
      },
      selected: function (val) {
        this.getCases(val)
        this.getDays(2020, val)
      }
    }

  }
</script>

<style scoped>
</style>
