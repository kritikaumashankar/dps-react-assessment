import React from 'react'
import {Container,Header,Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {getBeerByName} from '../reducers/beers'
class Beer extends React.Component{

  componentDidMount(){
    const{dispatch,match} = this.props
    dispatch(getBeerByName(match.params.name))    
  }
  componentDidUpdate(prevProps,prevState){
    if(this.props.location !== prevProps.location)
      window.location.reload(); 
  }

  render(){
    const {beer} = this.props
    let beer0 = beer[0]
    if(beer0!==undefined){
      
      return(
        <Container text as={container}>
          <Header as="h1"> {beer0.name_display}</Header>
          <Header as="h4"> Description: </Header>
          <p>{beer0.description}</p>
          <Header as="h4"> Abv: </Header>
          <p>{beer0.abv}</p>
          <Header as="h4"> Is it Organic?: </Header>
          <p>{beer0.is_organic}</p>
          <Header as="h4"> Glass: </Header>
          {beer0.glass!==undefined? <p>{beer0.style.category.name}</p>: <p></p>}
          <Header as="h4"> Available: </Header>
          {beer0.available!==undefined? <p>{beer0.available.name} - {beer0.available.description} </p>: <p></p>}
          <Header as="h4"> Style: </Header>
          {beer0.style!==undefined? <p>{beer0.style.category.name}</p>: <p></p>}
          <Header as="h5"> Style Description: </Header>
          {beer0.style!==undefined? <p>{beer0.style.description}</p>: <p></p>}
          <Button onClick={this.props.history.goBack}>Back to Beer List</Button>
        </Container>
      )
    }else{
      return(<Container text as={container}>
        <Header as="h1"> No Record</Header>
        <Button onClick={this.props.history.goBack}>Back to Beers List</Button>

     </Container>)
    }
    
  }
}

const container = styled.div`
    margin-top: 100px;
    background:white;
    color: black;
    text-align:center;
`
const mapStateToProps = (state) =>{
  return {
    beer: state.beers,
    search: state.search,
  }
}

export default connect(mapStateToProps)(Beer)