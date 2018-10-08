import React from 'react'
import {Link} from 'react-router-dom'

const Suggestions = (props) => {
  let url =''
  if(Array.isArray(props.results)){
    const options = props.results.map(r => {
      if(r.type === 'beer')
        url=`/beers/${r.name}`
      else
         url=`/breweries/${r.name}`

     return(
      <Link to={url} key={r.id}><li key={r.id}>
          {r.type} - {r.name}
        </li></Link>
     ) 
    }  
  )
  return <ul>{options}</ul>
  }else if(props.query.length>1){
    return <h4>No Records Found</h4>
  }else
    return <div></div>

}

export default Suggestions