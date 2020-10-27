<template>
  <div class="mx-4 sm:mx-16 mt-16 mb-48">
    <div class="flex flex-wrap mb-10">
      <div class="border transition duration-500 ease-in-out transform hover:-translate-y-1 cursor-pointer hover:shadow-xl w-full my-2 sm:w-3/12 rounded-md p-6 sm:mr-6">
        <p class="text-xl">Requests in progress</p>
        <span class="font-bold text-4xl">17</span>
      </div>

      <div class="border transition duration-500 ease-in-out transform hover:-translate-y-1 cursor-pointer hover:shadow-xl w-full my-2 sm:w-3/12 rounded-md p-6 sm:mr-6">
        <p class="text-xl">Lawyers Available</p>
        <span class="font-bold text-4xl">15</span>
        <p class="text-sm">
          A lawyer may handle <span class="font-bold"> 2 to 3</span> cases at a
          time
        </p>
      </div>

      <div class="border transition duration-500 ease-in-out transform hover:-translate-y-1 cursor-pointer hover:shadow-xl w-full my-2 sm:w-3/12 rounded-md p-6 sm:mr-6">
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
      <Chart :selected="selected" :options="options"/>
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
        selected: ''
        }

    },
    mounted() {
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


  }
</script>

<style scoped>
</style>
