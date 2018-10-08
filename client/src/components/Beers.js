import React from 'react'
import {connect} from 'react-redux'
import {getAllBeers} from '../reducers/beers'
import {Container, Table, Menu, Icon, Header} from 'semantic-ui-react'
import ReactPaginate from 'react-paginate';
import styled from 'styled-components'

class Beers extends React.Component{
  state = { elements:[], offset: 0, perPage: 10, currentPage: 0 }


  componentDidMount(){
    const {dispatch} = this.props
    dispatch(getAllBeers())
  }

  setElementsForCurrentPage() {
    const {beers} =this.props
    let elements = beers.entries
                  .slice(this.state.offset, this.state.offset + this.state.perPage)
                  .map(post =>
      ( <img src="{post.thumburl}" />)
    )
    this.setState({ elements: elements });
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    this.setState({currentPage: selected, offset: offset}, () => {
      this.setElementsForCurrentPage();
    })
  }

  render(){
    const {beers} =this.props
    let paginationElement
    if(beers.length !== 0){
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
              beers.entries.slice(this.state.offset, this.state.offset + this.state.perPage).map(beer =>{
                let shortName =''
                if(beer.style!==undefined){
                  shortName = beer.style.short_name
                }
                return(
                <Table.Row>
                  <Table.Cell>{beer.name_display}</Table.Cell>
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
                <ReactPaginate 
                      as={reactli}
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
`
const reactli = styled.ul `
display: inline-block;
padding-left: 15px;
padding-right: 15px;
`

const mapStateToProps = (state) =>{
  return {
    beers: state.beers,
  }
}
export default connect(mapStateToProps)(Beers)