import axios from 'axios'
const ALL_BEERS = 'ALL_BEERS'

export const getAllBeers = () =>{
  return(dispatch)=> {
    axios.get(`/api/all_beers`)
      .then( res => dispatch({ type: ALL_BEERS, beers: res.data }) 
    )
  }
}

export default (state = [], action ) => {
  switch(action.type) {
    case ALL_BEERS:
      return action.beers
    default:
      return state;
  } 
}