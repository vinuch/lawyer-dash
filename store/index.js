import axios from 'axios'
import moment from 'moment'

export const state = () => ({
  currentCases: [],
  activeCases: [],
  // newCases: [],
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
  // SET_NEW_CASES(state, payload){
  //   state.newCases.push(payload)
  // },
  SET_CLOSED_CASES(state, payload){
    state.closedCases = payload
  },
  SET_ISLOADING(state, payload){
    state.isLoading = !state.isLoading
  },
}

export const actions = {
  async getCases({ commit }, month){
     await axios.get(`http://localhost:3000/${month}`)
      .then((res) => {
        commit('SET_CURRENT_CASES', res.data)

        let activeCase = new Array(moment(`${moment().year()} ${month}`).daysInMonth()).fill(0)
        let closedCase = new Array(moment(`${moment().year()} ${month}`).daysInMonth()).fill(0)
        // let newCase = new Array(moment(`${moment().year()} ${month}`).daysInMonth()).fill(0)
        console.log(activeCase, closedCase,'jkhkajldhfa')

        res.data.map((item) =>{
          let day = moment(item.createdDate).date()
          if(moment().diff(moment(item.closedDate)) < 0){
            // console.log(moment().diff(moment(item.closedDate)))
            activeCase[day]++
          }
          if(moment().diff(moment(item.closedDate)) > 0){
            console.log()

            console.log('closed')
            closedCase[day]++
          }
          // console.log(item.createdDate)
          // console.log(moment(`2020-${month}-${day}`).format("MM-DD-YYYY"), moment(item.createdDate).format("MM-DD-YYYY"))
          // if(moment(`2020-${month}-${day}`).format("MM-DD-YYYY") === moment(item.createdDate).format("MM-DD-YYYY")){
          //   // console.log('new')
          //   newCase[day]++
          // }

         
        })
        console.log(activeCase, closedCase)
        commit('SET_ACTIVE_CASES', activeCase)
        commit('SET_CLOSED_CASES', closedCase)
        commit('SET_ISLOADING')

        
      })
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
  isLoading(state) {
    return state.isLoading
  }
}

