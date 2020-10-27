import axios from 'axios'
import moment from 'moment'

export const state = () => ({
  currentCases: [],
  activeCases: [],
  newCases: [],
  closedCases: [],
  isLoading: true
})

export const mutations = {
  SET_CURRENT_CASES(state, payload){
    state.currentCases = payload
  },
  SET_ACTIVE_CASES(state, payload){
    state.activeCases = payload
  },
  SET_NEW_CASES(state, payload){
    state.newCases = payload
  },
  SET_CLOSED_CASES(state, payload){
    state.closedCases = payload
  },

}

export const actions = {
  async getCases({ commit }, month){
    let activeCase = new Array(moment(`${moment().year()} ${month}`).daysInMonth()).fill(0)
    let closedCase = new Array(moment(`${moment().year()} ${month}`).daysInMonth()).fill(0)
    let newCase = new Array(moment(`${moment().year()} ${month}`).daysInMonth()).fill(0)

     let request = await axios.get(`http://localhost:5000/${month}`)
      .then((res) => {
        commit('SET_CURRENT_CASES', res.data)

        

        res.data.forEach((item) =>{
          let day = moment(item.createdDate).date()
          if(item.closedDate == null){
            activeCase[day-1]++
          }
          if(item.closedDate){
            console.log()
            closedCase[day-1]++
          }
          if(moment(`2020-${month}-${day}`).format("MM-DD-YYYY") === moment(item.createdDate).format("MM-DD-YYYY")){
            newCase[day]++
          }
        })
        console.log(activeCase, closedCase, newCase)
        commit('SET_ACTIVE_CASES', activeCase)
        commit('SET_CLOSED_CASES', closedCase)
        commit('SET_NEW_CASES', newCase)
        return true

      })
      .catch(err => {
        console.error(err)
        return false
      })

      if(!request && month) {
        let data = require('../db.json')
        let response = data[month.toLowerCase()]


        response.forEach((item) =>{

          let day = moment(item.createdDate).date()
          if(item.closedDate == null){
            activeCase[day-1]++
          }
          if(item.closedDate){
            console.log()
            closedCase[day-1]++
          }
          if(moment(`2020-${month}-${day}`).format("MM-DD-YYYY") === moment(item.createdDate).format("MM-DD-YYYY")){
            newCase[day]++
          }


        })
        commit('SET_ACTIVE_CASES', activeCase)
        commit('SET_CLOSED_CASES', closedCase)
        commit('SET_NEW_CASES', newCase)
        console.log(activeCase, closedCase, newCase)
      }
      

  }
}

export const getters = {
  currentCases(state) {
    return state.currentCases
  },
  activeCases(state) {
    return state.activeCases
  },
  closedCases(state) {
    return state.closedCases
  },
  newCases(state) {
    return state.newCases
  },

}

