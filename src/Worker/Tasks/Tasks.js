import React from 'react'
import './Tasks.css'

const Tasks = (props) => {
  return (
    <div className="Tasks">
      <div>
        {
          props.resources.map(resource => {
            return <button key={resource.id}
              className={
                resource.id === props.gathers && props.working ? 'selected' : ''
              }
              onClick={
                () => {
                  props.taskChangeHandler(resource.id)
                  if (!props.working || (props.working && resource.id === props.gathers)) {
                    props.workToggleHandler()
                  }
                }
              }>
              {resource.name}
            </button>
          })
        }
      </div>
    </div>
  )
}

export default Tasks
