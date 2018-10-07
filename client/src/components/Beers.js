import React from 'react'
import {connect} from 'react-redux'
import {getAllBeers} from '../reducers/beers'
import {Container, Table, Menu, Icon, Header} from 'semantic-ui-react'
import styled from 'styled-components'

class Beers extends React.Component{

  componentDidMount(){
    const {dispatch} = this.props
    dispatch(getAllBeers())
  }

  render(){
    const {beers} =this.props
    if(beers.length !== 0){
      return(
        <Container as={container}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Glass</Table.HeaderCell>
                <Table.HeaderCell>Organic</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Style</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
            {
              beers.entries.slice(0,49).map(beer =>{
                debugger
                return(
                <Table.Row>
                  <Table.Cell>{beer.name_display}</Table.Cell>
                  <Table.Cell>{beer.description}</Table.Cell>
                  <Table.Cell>{beer.glass.name}</Table.Cell>
                  <Table.Cell>{beer.is_organic}</Table.Cell>
                  <Table.Cell>{beer.status_display}</Table.Cell>
                  <Table.Cell>{beer.style.short_name}</Table.Cell>
                </Table.Row>
                ) 
              })
            }
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='3'>
                  <Menu floated='right' pagination>
                    <Menu.Item as='a' icon>
                      <Icon name='chevron left' />
                    </Menu.Item>
                    <Menu.Item as='a'>1</Menu.Item>
                    <Menu.Item as='a'>2</Menu.Item>
                    <Menu.Item as='a'>3</Menu.Item>
                    <Menu.Item as='a'>4</Menu.Item>
                    <Menu.Item as='a' icon>
                      <Icon name='chevron right' />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
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
    color:white;
`
const mapStateToProps = (state) =>{
  return {
    beers: state.beers,
  }
}
export default connect(mapStateToProps)(Beers)