import React, { Component } from 'react'
import Worker from './Worker/Worker'
import './App.css'

class App extends Component {

  state = {
    coins: 0,
    resources: [{
      id: 1,
      name: 'Wood',
      quantity: 0
    }, {
      id: 2,
      name: 'Rock',
      quantity: 0
    }, {
      id: 3,
      name: 'Gold',
      quantity: 0
    }],
    workers: [{
      id: 1,
      name: 'Hugo',
      working: true,
      gathers: 1
    }, {
      id: 2,
      name: 'Paco',
      working: false,
      gathers: 2
    }, {
      id: 3,
      name: 'Luis',
      working: false,
      gathers: 3
    }]
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
    this.collectResources()
  }

  collectResources = () => {
    this.setState(prevState => {
      const newResources = prevState.resources.map((resource) => {
        const gathered = this.state.workers.reduce((accumulatedResource, worker) => {
          return worker.working && worker.gathers === resource.id ? accumulatedResource + 1 : accumulatedResource
        }, 0)
        return {
          id: resource.id,
          name: resource.name,
          quantity: resource.quantity + gathered
        }
      })

      return {
        resources: newResources
      }
    })
  }

  workToggleHandler = (id) => {
    this.setState(prevState => {
      return {
        workers: prevState.workers.map((worker) => {
          if (worker.id === id) {
            return {
              id: worker.id,
              name: worker.name,
              working: !worker.working,
              gathers: worker.gathers
            }
          } else {
            return worker
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
            {
              this.state.resources.map(resource => {
                return <span key={resource.id}>
                  {resource.name}: {resource.quantity}
                </span>
              })
            }
          </div>
        </header>
        <main className="App-main">
          {
            this.state.workers.map(worker => {
              return <Worker
                key={worker.id}
                name={worker.name}
                working={worker.working}
                gathers={worker.gathers}
                resources={this.state.resources}
                workToggleHandler={() => this.workToggleHandler(worker.id)}>
              </Worker>
            })
          }
        </main>
      </div>
    )
  }
}

export default (App)
