import React from 'react'
import {connect} from 'react-redux'
import {getInfo} from '../reducers/search'
import Suggestion from './Suggestion'
import {Input} from 'semantic-ui-react'

class Search extends React.Component {
 state = {
   query: '',
   results: []
 }

 componentDidUpdate(prevProps, prevState){
   if(prevProps.allData.length !== this.props.allData.length)
      this.setState({ results: this.props.allData})
 }

 handleInputChange = (e) => {
  this.setState({
    query: e.target.value
  }, () => {
    if (this.state.query && this.state.query.length > 1) {
      if (this.state.query.length % 2 === 0) {
        this.props.dispatch(getInfo(this.state.query))
      }
    } else if(this.state.query && this.state.query.length < 2){
      this.setState({ results: []})
    }
  })
}

 render() {
     const {results,query} = this.state
   return (
     <form>
       <Input
         placeholder="Search for..."
         value={query}
         onChange={this.handleInputChange}
       />
      <Suggestion results={results} query={query}/>
     </form>
   )
 }
}

const mapStateToProps = (state) =>{
  return{
    allData: state.search,
  }
}
export default connect(mapStateToProps)(Search)
