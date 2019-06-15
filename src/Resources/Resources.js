import React from 'react'
import './Resources.css'

const Resources = (props) => {

  return (
    <div className="Resources">
      <ul>
        {
          props.resources.map(resource => {
            return <li key={resource.id}>
              {resource.name}: {resource.quantity}
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default Resources
