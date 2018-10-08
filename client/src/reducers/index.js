import { combineReducers } from 'redux'
import flash from './flash'
import beers from './beers'
import search from './search'

const rootReducer = combineReducers({
  flash,
  beers,
  search,
})

export default rootReducer
