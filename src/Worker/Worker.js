import React from 'react'
import Tasks from './Tasks/Tasks'
import './Worker.css'

const Worker = (props) => {

  const stressPercentage = (stressLevel) => {
    return Math.ceil((stressLevel * 100) / 40)
  }

  const stressBarStyles = (stressLevel) => {
    const stressPerc = stressPercentage(stressLevel)
    let bgColor = 'orange';
    if (stressPerc > 80) {
      bgColor = 'orangered'
    } else if (stressPerc > 50) {
      bgColor = 'darkorange'
    }
    return {
      width: stressPerc + '%',
      backgroundColor: bgColor
    }
  }

  return (
    <div className="Worker">
      <h2>{props.name}</h2>
      <div className="stress-level">
        <div style={stressBarStyles(props.stress)}></div>
        <div>Stress {stressPercentage(props.stress)}%</div>
      </div>
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
