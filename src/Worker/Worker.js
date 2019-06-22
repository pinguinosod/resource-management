import React from 'react'
import Tasks from './Tasks/Tasks'
import './Worker.css'

const Worker = (props) => {

  return (
    <div className="Worker">
      <h2>{props.name}</h2>
      <Tasks
        currentTask={props.currentTask}
        materials={props.materials}
        products={props.products}
        working={props.working}
        loading={props.loading}
        paused={props.paused}
        taskChangeHandler={props.taskChangeHandler}
        workToggleHandler={props.workToggleHandler} />
    </div>
  )
}

export default Worker
