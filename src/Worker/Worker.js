import React from 'react'
import Tasks from './Tasks/Tasks'
import './Worker.css'

const Worker = (props) => {
  return (
    <div className={props.working ? 'Worker active' : 'Worker idle'}>
      <h2>{props.name}</h2>
      <Tasks
        gathers={props.gathers}
        resources={props.resources}
        working={props.working}
        taskChangeHandler={props.taskChangeHandler} 
        workToggleHandler={props.workToggleHandler}/>
    </div>
  )
}

export default Worker
