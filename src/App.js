import React, { useState, useEffect } from 'react'
import Miner from './Miner/Miner'
import './App.css'

function App() {
  const [goldState, setGoldState] = useState({
    gold: 0
  })

  const [minersState, setMinersState] = useState(
    [{
      id: 1,
      name: 'Hugo',
      mining: false
    }, {
      id: 2,
      name: 'Paco',
      mining: false
    }, {
      id: 3,
      name: 'Luis',
      mining: false
    }]
  )

  const collectGold = () => {
    setGoldState(prevState => {
      const goldMined = minersState.reduce((accumulatedGold, miner) => {
        return miner.mining ? accumulatedGold + 1 : accumulatedGold
      }, 0)
      return {
        gold: prevState.gold + goldMined
      }    
    })
  }

  useEffect(() => {
    const intervalTicker = setInterval(() => {
      setGoldState(prevState => {
        return {
          gold: prevState.gold + 1
        }
      })
    }, 1000)

    return () => {
      clearInterval(intervalTicker)
    }
  }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

  const workToggleHandler = (id) => {
    setMinersState(minersState.map((miner) => {
      if (miner.id === id) {
        return {
          id: miner.id,
          name: miner.name,
          mining: !miner.mining
        }
      } else {
        return miner
      }
    }))
  }

  let miners = null

  miners = (
    <div>
      {
        minersState.map((miner) => {
          return <Miner
            key={miner.id}
            name={miner.name}
            mining={miner.mining}
            workToggleHandler={() => workToggleHandler(miner.id)}>
          </Miner>
        })
      }
    </div>
  )

  return (
    <div className="App">
      <header className="App-header">
        <h1>Resource Management</h1>
        <div className="topBar">
          <span>Gold: {goldState.gold}</span>
          <button onClick={collectGold}>Collect Gold</button>
        </div>
      </header>
      <main className="App-main">
        {miners}
      </main>
    </div>
  )
}

export default (App)
