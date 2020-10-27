<template>
    <div class="sm:mx-24 mt-12 ">
      <highcharts  :options="chartOptions"></highcharts>
    </div>
</template>

<script>

import moment from 'moment'
import {Chart} from 'highcharts-vue'
import { mapActions, mapGetters } from 'vuex'

  export default {
    props: ['selected', 'options'],
    data() {
      return {
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
          }
        }

    },
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


<style lang="scss" scoped>

</style>