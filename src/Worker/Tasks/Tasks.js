import React, { useState } from 'react'
import './Tasks.css'

const Tasks = (props) => {
  const [currentTab, setCurrentTab] = useState(props.currentTask.task);

  const getTaskTargetName = (currentTask) => {
    if (currentTask.task === 'gather') {
      return props.materials.filter(material => material.id === currentTask.targetId)[0].name
    }
    return props.products.filter(product => product.id === currentTask.targetId)[0].name
  }

  const currentTaskName = () => {
    if (!props.working) {
      return 'Resting'
    }
    if (props.currentTask.task === "produce") {
      return 'producing ' + getTaskTargetName(props.currentTask)
    }
    return props.currentTask.task + 'ing ' + getTaskTargetName(props.currentTask)
  }

  const showCurrentTaskMark = (taskName) => {
    return !props.paused && props.working && !props.loading && props.currentTask.task === taskName
  }

  return (
    <div className="Tasks">
      <div className="current-task">{currentTaskName()}</div>
      <br />
      <ul className="tab-list">
        <li className={currentTab === 'gather' ? 'selected' : ''}
          onClick={() => { setCurrentTab('gather') }}>
          {showCurrentTaskMark('gather') ? <span className="current-task-mark"></span> : ""}
          Gather
        </li>
        <li className={currentTab === 'produce' ? 'selected' : ''}
          onClick={() => { setCurrentTab('produce') }}>
          {showCurrentTaskMark('produce') ? <span className="current-task-mark"></span> : ""}
          Produce
        </li>
        <li className={currentTab === 'sell' ? 'selected' : ''}
          onClick={() => { setCurrentTab('sell') }}>
          {showCurrentTaskMark('sell') ? <span className="current-task-mark"></span> : ""}
          Sell
        </li>
      </ul>
      <div className="tab-wrapper">
        <div className={currentTab === 'gather' ? 'active' : 'inactive'}>
          <div className="button-grid">
            {
              props.materials.map(material => {
                return <button key={material.id}
                  className={
                    props.working &&
                      props.currentTask.task === 'gather' &&
                      material.id === props.currentTask.targetId ? 'selected' : ''
                  }
                  onClick={
                    () => {
                      props.taskChangeHandler({ task: 'gather', targetId: material.id })
                      if (
                        !props.working ||
                        (props.working &&
                          props.currentTask.task === 'gather' &&
                          material.id === props.currentTask.targetId)
                      ) {
                        props.workToggleHandler()
                      }
                    }
                  }>
                  {material.name}
                </button>
              })
            }
          </div>
        </div>

        <div className={currentTab === 'produce' ? 'active' : 'inactive'}>
          <div className="button-grid">
            {
              props.products.map(product => {
                return <button key={product.id}
                  className={
                    props.working &&
                      props.currentTask.task === 'produce' &&
                      product.id === props.currentTask.targetId ? 'selected' : ''
                  }
                  onClick={
                    () => {
                      props.taskChangeHandler({ task: 'produce', targetId: product.id })
                      if (
                        !props.working ||
                        (props.working &&
                          props.currentTask.task === 'produce' &&
                          product.id === props.currentTask.targetId)
                      ) {
                        props.workToggleHandler()
                      }
                    }
                  }>
                  {product.name}
                </button>
              })
            }
          </div>
        </div>

        <div className={currentTab === 'sell' ? 'active' : 'inactive'}>
          <div className="button-grid">
            {
              props.products.map(product => {
                return <button key={product.id}
                  className={
                    props.working &&
                      props.currentTask.task === 'sell' &&
                      product.id === props.currentTask.targetId ? 'selected' : ''
                  }
                  onClick={
                    () => {
                      props.taskChangeHandler({ task: 'sell', targetId: product.id })
                      if (
                        !props.working ||
                        (props.working &&
                          props.currentTask.task === 'sell' &&
                          product.id === props.currentTask.targetId)
                      ) {
                        props.workToggleHandler()
                      }
                    }
                  }>
                  {product.name}
                </button>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks
