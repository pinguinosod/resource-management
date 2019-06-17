import React from 'react'
import Tasks from './Tasks/Tasks'
import './Worker.css'

const Worker = (props) => {

  const getTaskTargetName = (currentTask) => {
    if (currentTask.task === 'gather') {
      return props.materials.filter(material => material.id === currentTask.targetId)[0].name
    }
    return props.products.filter(product => product.id === currentTask.targetId)[0].name
  }

  const currentTask = () => {
    if (!props.working) {
      return 'Resting'
    }
    if (props.currentTask.task === "produce") {
      return 'producing ' + getTaskTargetName(props.currentTask)
    }
    return props.currentTask.task + 'ing ' + getTaskTargetName(props.currentTask)
  }

  return (
    <div className={props.working ? 'Worker active' : 'Worker idle'}>
      <h2>{props.name}</h2>
      <span className="current-task">{currentTask()}</span>
      <br />
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
