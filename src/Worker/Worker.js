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
    return props.working ? props.currentTask.task + ' ' + getTaskTargetName(props.currentTask) : 'Rest'
  }

  return (
    <div className={props.working ? 'Worker active' : 'Worker idle'}>
      <h2>{props.name}</h2>
      <div>Task: <span className="current-task">{currentTask()}</span></div>
      <Tasks
        currentTask={props.currentTask}
        materials={props.materials}
        products={props.products}
        working={props.working}
        taskChangeHandler={props.taskChangeHandler}
        workToggleHandler={props.workToggleHandler} />
    </div>
  )
}

export default Worker
