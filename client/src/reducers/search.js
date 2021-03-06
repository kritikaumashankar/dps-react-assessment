import axios from 'axios'
export const getInfo = (query) => {
  return(dispatch)=> {
  axios.get(`/api/search_all?query=${query}`)
    .then(res => dispatch({ type: 'ALL_BEERS_BREWERIES', allData: res.data.entries }))
    .catch(error => {
      dispatch({type: 'ALL_BEERS_BREWERIES', allData: error.response.data.message })
  })
  }
}

export default (state = [], action ) => {
  switch(action.type) {
    case 'ALL_BEERS_BREWERIES':
      return action.allData
    default:
      return state;
  } 
}