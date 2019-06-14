import React, { Component } from 'react'
import Miner from './Miner/Miner'
import './App.css'

class App extends Component {

  state = {
    gold: 0,
    miners: [{
      id: 1,
      name: 'Hugo',
      mining: true
    }, {
      id: 2,
      name: 'Paco',
      mining: false
    }, {
      id: 3,
      name: 'Luis',
      mining: false
    }]
  }

  collectGold = () => {
    this.setState(prevState => {
      const goldMined = this.state.miners.reduce((accumulatedGold, miner) => {
        return miner.mining ? accumulatedGold + 1 : accumulatedGold
      }, 0)
      return {
        gold: prevState.gold + goldMined
      }
    })
  }

  componentDidMount() {
    this.intervalTicker = setInterval(() => {
      this.tick()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalTicker)
  }

  tick() {
    this.setState(prevState => {
      return {
        gold: prevState.gold + 1
      }
    })
  }

  workToggleHandler = (id) => {
    this.setState(prevState => {
      return {
        miners: prevState.miners.map((miner) => {
          if (miner.id === id) {
            return {
              id: miner.id,
              name: miner.name,
              mining: !miner.mining
            }
          } else {
            return miner
          }
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Resource Management</h1>
          <div className="topBar">
            <span>Gold: {this.state.gold}</span>
            <button onClick={this.collectGold}>Collect Gold</button>
          </div>
        </header>
        <main className="App-main">
          {
            this.state.miners.map((miner) => {
              return <Miner
                key={miner.id}
                name={miner.name}
                mining={miner.mining}
                workToggleHandler={() => this.workToggleHandler(miner.id)}>
              </Miner>
            })
          }
        </main>
      </div>
    )
  }
}

export default (App)
