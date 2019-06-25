import React from 'react'
import Tasks from './Tasks/Tasks'
import './Worker.css'
import { stressPercentage, happinessPercentage } from './../functions'

const Worker = (props) => {

  const happinessBarStyles = (happinessLevel) => {
    const happinessPerc = happinessPercentage(happinessLevel)
    let bgColor = 'lightgreen'
    if (happinessPerc <= 20) {
      bgColor = 'orangered'
    } else if (happinessPerc < 50) {
      bgColor = 'orange'
    }
    return {
      height: happinessPerc + '%',
      backgroundColor: bgColor
    }
  }

  const stressBarStyles = (stressLevel) => {
    const stressPerc = stressPercentage(stressLevel)
    let bgColor = 'lightgreen'
    if (stressPerc >= 80) {
      bgColor = 'orangered'
    } else if (stressPerc > 50) {
      bgColor = 'orange'
    }
    return {
      height: stressPerc + '%',
      backgroundColor: bgColor
    }
  }

  return (
    <div className="Worker">
      <h2>{props.name}</h2>
      <div className="happiness-level">
        <div style={happinessBarStyles(props.happiness)}></div>
        <div>Happiness {happinessPercentage(props.happiness)}%</div>
      </div>
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
