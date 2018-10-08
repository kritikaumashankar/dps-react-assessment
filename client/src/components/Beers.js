import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllBeers} from '../reducers/beers'
import {Container, Table, Header} from 'semantic-ui-react'
import ReactPaginate from 'react-paginate';
import styled from 'styled-components'
import './style.css'

class Beers extends React.Component{
  state = { elements:[], offset: 1, perPage: 10 }

  componentDidMount(){
    const {dispatch} = this.props
    const {offset, perPage} = this.state
    dispatch(getAllBeers(offset,perPage))
  }

  componentDidUpdate(prevProps, prevState){
    const {dispatch} = this.props
    const {offset, perPage} = this.state
    if(prevProps.beers.entries.length !== this.props.beers.entries.length){
      dispatch(getAllBeers(offset,perPage))
    }
  }

  handlePageClick = (elements) => {
    const {dispatch} = this.props
    const {offset,perPage} = this.state
    if(elements.selected == 0 || elements.selected < offset){
      this.setState({ offset: offset - 1})
      dispatch(getAllBeers(offset - 1,perPage))
    }else{
      this.setState({ offset: offset + 1})
      dispatch(getAllBeers(offset + 1,perPage))
    }
  }

  render(){
    const {beers} =this.props
    if(beers.entries.length !== 0){
      return(
        <Container as={container}>
          <Table celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Organic</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Style</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
            {
              beers.entries.slice(0, 49).map(beer =>{
                let shortName =''
                if(beer.style!==undefined){
                  shortName = beer.style.short_name
                }
                return(
                <Table.Row>
                   <Link to={`/beers/${beer.name}`}>
                  <Table.Cell>{beer.name_display}</Table.Cell></Link>
                  <Table.Cell>{beer.description}</Table.Cell>
                  <Table.Cell>{beer.is_organic}</Table.Cell>
                  <Table.Cell>{beer.status_display}</Table.Cell>
                  <Table.Cell>{shortName}</Table.Cell>
                  
                </Table.Row>
                ) 
              })
            }
            </Table.Body>
          </Table>
          <div id="react-paginate">
            <ReactPaginate 
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={<a href="">...</a>}
                pageCount={5}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                previousLinkClassName={"previous_page"}
                nextLinkClassName={"next_page"}
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
    background:white;
`
const mapStateToProps = (state) =>{
  return {
    beers: state.beers,
  }
}
export default connect(mapStateToProps)(Beers)