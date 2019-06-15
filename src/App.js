import React, { Component } from 'react'
import Resources from './Resources/Resources'
import Worker from './Worker/Worker'
import TimeTrack from './TimeTrack/TimeTrack'
import './App.css'

class App extends Component {

  state = {
    coins: 0,
    paused: false,
    hours: 0,
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
    if (!this.state.paused) {
      this.collectResources()
      this.setState(prevState => {
        return { hours: prevState.hours + 1 }
      })
    }
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

  taskChangeHandler = (workerId, resourceId) => {
    this.setState(prevState => {
      return {
        workers: prevState.workers.map((worker) => {
          if (worker.id === workerId) {
            return {
              id: worker.id,
              name: worker.name,
              working: worker.working,
              gathers: resourceId
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
      <div className={this.state.paused ? 'App paused' : 'App'}>
        <header>
          <h1>Resource Management</h1>
          <TimeTrack paused={this.state.paused}
            hours={this.state.hours}
            pauseToggleHandler={() => {
              this.setState(prevState => {
                return {
                  paused: !prevState.paused
                }
              })
            }} />
          <br />
          <Resources resources={this.state.resources} />
        </header>
        <main>
          {
            this.state.workers.map(worker => {
              return <Worker
                key={worker.id}
                name={worker.name}
                working={worker.working}
                gathers={worker.gathers}
                resources={this.state.resources}
                workToggleHandler={() => this.workToggleHandler(worker.id)}
                taskChangeHandler={(resourceId) => this.taskChangeHandler(worker.id, resourceId)}>
              </Worker>
            })
          }
        </main>
      </div>
    )
  }
}

export default (App)
