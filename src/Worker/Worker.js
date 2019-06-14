import React from 'react'
import Tasks from './Tasks/Tasks'
import './Worker.css'

const Worker = (props) => {
  return (
    <div className="Worker">
      <h2>{props.name}</h2>
      <Tasks
        gathers={props.gathers}
        resources={props.resources}
        taskChangeHandler={props.taskChangeHandler} />
      <div>
        <button className={props.working ? 'working' : 'resting'}
          onClick={props.workToggleHandler}>
          {props.working ? 'Working' : 'Resting'}
        </button>
      </div>
    </div>
  )
}

export default Worker