import React from 'react'
import './Balance.css'

const Balance = (props) => {

  const calculateCoinsSize = (coins) => {
    if (coins > 999999) return '3.5rem'
    if (coins > 499999) return '3.2rem'
    if (coins > 99999) return '3.0rem'
    if (coins > 49999) return '2.7rem'
    if (coins > 9999) return '2.5rem'
    if (coins > 4999) return '2.2rem'
    if (coins > 999) return '2.0rem'
    if (coins > 499) return '1.7rem'
    if (coins > 99) return '1.5rem'
    if (coins > 49) return '1.2rem'
    if (coins > 9) return '1.1rem'
    return '1.0rem'
  }

  return (
    <div className={!props.loading && props.gotNewCoins ? 'Balance card highlight' : 'Balance card'}>
      <div>
        <div className="current-coins" style={{ fontSize: calculateCoinsSize(props.coins) }}>{props.coins} CHA</div>
        <div><span>Till End Month:</span><span>{props.hrsTillNextMonth} HRS</span></div>
        <div><span>Monthly Salaries:</span><span>{props.summedSalaries} CHA</span></div>
        <div><span>End Of Month:</span><span>{props.coinsEndMonth} CHA</span></div>
      </div>
    </div>
  )
}
export default Balance