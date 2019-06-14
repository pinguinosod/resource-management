import React from 'react'
import './Worker.css'

const Worker = (props) => {
  const resourceGathering = props.resources.filter((resource) => {
    return resource.id === props.gathers
  })[0]
  const gathers = resourceGathering.name;

  return (
    <div className="Worker">
      <h2>{props.name}</h2>
      <div>
        Gathers: {gathers}
      </div>
      <div>
        <button onClick={props.workToggleHandler}>
          State: {props.working ? 'Working' : 'Resting'}
        </button>
      </div>
    </div>
  )
}

export default Worker