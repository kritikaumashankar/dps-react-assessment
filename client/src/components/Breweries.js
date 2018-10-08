import React from 'react'
import {connect} from 'react-redux'
import {getAllBreweries} from '../reducers/beers'
import {Container, Grid,Image, Header} from 'semantic-ui-react'
import ReactPaginate from 'react-paginate';
import styled from 'styled-components'
import './style.css'

class Breweries extends React.Component{
  state = { elements:[], offset: 1, perPage: 10 }

  componentDidMount(){
    const {dispatch} = this.props
    const {offset, perPage} = this.state
    dispatch(getAllBreweries(offset,perPage))
  }

  handlePageClick = (elements) => {
    const {dispatch} = this.props
    const {offset,perPage} = this.state
    if(elements.selected == 0 || elements.selected < offset){
      this.setState({ offset: offset - 1})
      dispatch(getAllBreweries(offset - 1,perPage))
    }else{
      this.setState({ offset: offset + 1})
      dispatch(getAllBreweries(offset + 1,perPage))
    }
  }

  render(){
    const {beers} =this.props
    if(beers.entries.length!==0){
      return(
        <Container as={container}>
          <Grid columns={5} divided>
            {
              beers.entries.slice(0, 49).map( b =>{
                let icon =""
                if(b.images !==undefined){
                  icon = b.images.icon
                  image=b.images.square_large
                }
                  
                return(
                  <Grid.Row>
                    <Link to=``>
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
                      <StyledHeader as="h2">{b.website}</StyledHeader>
                    </Grid.Column>
                  </Grid.Row>
                )
              })
            }
          </Grid>
          <div id="react-paginate">
            <ReactPaginate 
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={<a href="">...</a>}
                pageCount={5 }
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                forcePage={this.state.currentPage}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                previousLinkClassName={"previous_page"}
                nextLinkClassName={"next_page"}
                disabledClassName={"disabled"}
                activeClassName={"active"}/>
          </div>
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