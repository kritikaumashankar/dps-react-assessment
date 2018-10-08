import axios from 'axios'
const ALL_BEERS = 'ALL_BEERS'
const ALL_BREWERIES = 'ALL_BREWERIES'
const GET_BEER_BY_NAME = 'GET_BEER_BY_NAME'


export const getAllBeers = (offset,perPage) =>{
  return(dispatch)=> {
    axios.get(`/api/all_beers?page=${offset}&per_page=${perPage}`)
      .then( res => dispatch({ type: ALL_BEERS, beers: res.data }) 
    )
  }
}

export const getAllBreweries = (offset,perPage) =>{
  return(dispatch)=> {
    axios.get(`/api/all_breweries?page=${offset}&per_page=${perPage}`)
      .then( res => dispatch({ type: ALL_BREWERIES, breweries: res.data }) 
    )
  }
}

export const getBeerByName = (name) =>{
  return(dispatch)=> {
    axios.get(`/api/beer/${name}`)
      .then( res => dispatch({ type: GET_BEER_BY_NAME, beer: res.data }) 
    )
  }
}

export default (state = [], action ) => {
  switch(action.type) {
    case ALL_BEERS:
      return action.beers
    case ALL_BREWERIES:
      return action.breweries
    case GET_BEER_BY_NAME:
      return action.beer
    default:
      return state;
  } 
}