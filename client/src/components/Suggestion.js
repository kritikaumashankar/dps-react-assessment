import React from 'react'
import {Link} from 'react-router-dom'

const Suggestions = (props) => {
  let url =''
    const options = props.results.map(r => {
      if(r.type === 'beer')
        url=`/beers/${r.name}`
      else
         url=`/breweries/${r.name}`

     return(
      <Link to={url}><li key={r.id}>
          {r.type} - {r.name}
        </li></Link>
     ) 
    }
      
    
  )
  return <ul>{options}</ul>
}

export default Suggestions