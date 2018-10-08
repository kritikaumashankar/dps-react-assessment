import React from 'react'
import {Container,Header,Button,Image} from 'semantic-ui-react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {getBreweryByName} from '../reducers/beers'
class Brewery extends React.Component{

  componentDidMount(){
    const{dispatch,match} = this.props
    dispatch(getBreweryByName(match.params.name))
  }
  componentDidUpdate(prevProps,prevState){
    if((this.props.location !== prevProps.location && this.props.search.length !== 0) || (this.props.location == prevProps.location&& prevProps.search.length !== 0))
      window.location.reload(); 
  }
  render(){
    const {brewery} = this.props
    let brewery0 = brewery[0]
    if(brewery0!==undefined){
      
      return(
        <Container text as={container}>
          <Header as="h1"> {brewery0.name}</Header>
          {brewery0.images!==undefined? <Image src={brewery0.images.large} />: <p></p>}

          <Header as="h4"> Description: </Header>
          <p>{brewery0.description}</p>
          <Header as="h4"> Website: </Header>
          <p>{brewery0.website}</p>
          <Header as="h4"> Established: </Header>
          <p>{brewery0.established}</p>
          <Header as="h4"> Is Organ?ic: </Header>
          <p>{brewery0.is_organic}</p>
          <Header as="h4"> Status: </Header>
          <p>{brewery0.status_display}</p>
          <Button onClick={this.props.history.goBack}>Back to Breweries List</Button>
        </Container>
      )
    }else{
      return(
        <Container text as={container}>
           <Header as="h1"> No Record</Header>
           <Button onClick={this.props.history.goBack}>Back to Breweries List</Button>

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
    brewery: state.beers,
    search: state.search,
  }
}

export default connect(mapStateToProps)(Brewery)