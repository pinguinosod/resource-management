import React from 'react'
import './Miner.css'

const Miner = (props) => {
  return (
    <div className="Miner">
      <h2>{props.name}</h2>
      <div>Working: {props.mining ? 'yes' : 'nope'}</div>
      <button onClick={props.workToggleHandler}>
        {props.mining ? 'Stop' : 'Start'}
      </button>
    </div>
  )
}

export default Miner