import React from 'react'
import {connect} from 'react-redux'
import {getAllBreweries} from '../reducers/beers'
import {Container, Grid, Icon,Image, Header} from 'semantic-ui-react'
import styled from 'styled-components'

class Breweries extends React.Component{

  componentDidMount(){
    const {dispatch} = this.props
    dispatch(getAllBreweries())
  }

  render(){
    const {beers} =this.props
    if(beers.entries.length!==0){
      return(
        <Container as={container}>
          <Grid columns={5} divided>
            {
              beers.entries.map( b =>{
                let icon =""
                let image =""
                if(b.images !==undefined){
                  icon = b.images.icon
                  image=b.images.square_large
                }
                  
                return(
                  <Grid.Row>
                    <Grid.Column>
                      <Image src={icon} />
                    </Grid.Column>
                    <Grid.Column>
                      <StyledHeader as="h2">{b.name}</StyledHeader>
                    </Grid.Column>
                    <Grid.Column>
                      <StyledHeader as="h2">{b.brand_classification}</StyledHeader>
                    </Grid.Column>
                    <Grid.Column>
                      <StyledHeader as="h2">{b.description}</StyledHeader>
                    </Grid.Column>
                    <Grid.Column>
                      <StyledHeader as="h2">{b.website}</StyledHeader>
                    </Grid.Column>
                  </Grid.Row>
                )
              })
            }
          </Grid>
        </Container>
      )
    }else{
      return(
        <Header as="h2">No Beers to Display</Header>
      )
    }
    
  }
}

const container = styled.div`
  margin-top: 100px;
  background:pink`

const StyledHeader = styled.h2`
    font-size:1rem;`
const mapStateToProps = (state) =>{
    return {
    beers: state.beers,
  }
}
export default connect(mapStateToProps)(Breweries)