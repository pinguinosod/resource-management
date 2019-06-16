import React from 'react'
import './Tasks.css'

const Tasks = (props) => {
  return (
    <div className="Tasks">
      <h4>Gather:</h4>
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
      <h4>Produce:</h4>
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
  )
}

export default Tasks
