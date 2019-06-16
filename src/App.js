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
    materials: [{
      id: 1,
      name: 'Wood',
      quantity: 0
    }, {
      id: 2,
      name: 'Leather',
      quantity: 0
    }, {
      id: 3,
      name: 'Meat',
      quantity: 0
    }],
    products: [{
      id: 1,
      name: 'Wooden Spoon',
      recipe: [{
        materialId: 1,
        quantity: 2
      }],
      quantity: 0
    }, {
      id: 3,
      name: 'Leather Jacket',
      recipe: [{
        materialId: 2,
        quantity: 10
      }],
      quantity: 0
    }, {
      id: 5,
      name: 'Frankfurter',
      recipe: [{
        materialId: 3,
        quantity: 2
      }],
      quantity: 0
    }, {
      id: 2,
      name: 'Wooden Bench',
      recipe: [{
        materialId: 1,
        quantity: 10
      }],
      quantity: 0
    }, {
      id: 4,
      name: 'Lederhosen',
      recipe: [{
        materialId: 2,
        quantity: 12
      }],
      quantity: 0
    }, {
      id: 6,
      name: 'Wiener Schnitzel',
      recipe: [{
        materialId: 3,
        quantity: 3
      }],
      quantity: 0
    }],
    workers: [{
      id: 1,
      name: 'Hugo',
      working: true,
      currentTask: {
        task: 'gather',
        targetId: 1
      }
    }, {
      id: 2,
      name: 'Paco',
      working: true,
      currentTask: {
        task: 'gather',
        targetId: 1
      }
    }, {
      id: 3,
      name: 'Luis',
      working: true,
      currentTask: {
        task: 'produce',
        targetId: 1
      }
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
      this.collectMaterials()
      this.produceProducts()
      this.setState(prevState => {
        return { hours: prevState.hours + 1 }
      })
    }
  }

  collectMaterials = () => {
    this.setState(prevState => {
      const newMaterials = prevState.materials.map((material) => {
        const gathered = this.state.workers.reduce((accumulatedMaterial, worker) => {
          if (worker.working &&
            worker.currentTask.task === 'gather' &&
            worker.currentTask.targetId === material.id) {
            return accumulatedMaterial + 1
          }
          return accumulatedMaterial
        }, 0)
        return {
          id: material.id,
          name: material.name,
          quantity: material.quantity + gathered
        }
      })

      return {
        materials: newMaterials
      }
    })
  }

  produceProducts = () => {
    this.setState(prevState => {
      let newMaterials = [...this.state.materials]
      const newProducts = prevState.products.map((product) => {
        const produced = this.state.workers.reduce((accumulatedProduct, worker) => {
          if (worker.working &&
            worker.currentTask.task === 'produce' &&
            worker.currentTask.targetId === product.id
          ) {
            const craftingAttempt = this.craftRecipe(product.recipe, newMaterials)
            if (craftingAttempt.success) {
              newMaterials = craftingAttempt.newMaterials
              return accumulatedProduct + 1
            }
          }
          return accumulatedProduct
        }, 0)
        return {
          id: product.id,
          name: product.name,
          recipe: product.recipe,
          quantity: product.quantity + produced
        }
      })

      return {
        materials: newMaterials,
        products: newProducts
      }
    })
  }

  craftRecipe = (recipe, currentMaterials) => {
    let enoughMaterials = true
    let newMaterials = [...currentMaterials]
    recipe.map(requiredMaterial => {
      newMaterials = newMaterials.map(material => {
        if (material.id === requiredMaterial.materialId &&
          requiredMaterial.quantity > material.quantity) {
          enoughMaterials = false
        }
        else if (material.id === requiredMaterial.materialId) {
          return {
            id: material.id,
            name: material.name,
            quantity: material.quantity - requiredMaterial.quantity
          }
        }
        return material
      })
      return requiredMaterial
    })
    return {
      success: enoughMaterials,
      newMaterials
    }
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
              currentTask: worker.currentTask
            }
          } else {
            return worker
          }
        })
      }
    })
  }

  taskChangeHandler = (workerId, newTask) => {
    this.setState(prevState => {
      return {
        workers: prevState.workers.map((worker) => {
          if (worker.id === workerId) {
            return {
              id: worker.id,
              name: worker.name,
              working: worker.working,
              currentTask: newTask
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
          <TimeTrack
            paused={this.state.paused}
            hours={this.state.hours}
            pauseToggleHandler={() => {
              this.setState(prevState => {
                return {
                  paused: !prevState.paused
                }
              })
            }} />
          <br />
          <Resources
            materials={this.state.materials}
            products={this.state.products} />
        </header>
        <main>
          {
            this.state.workers.map(worker => {
              return <Worker
                key={worker.id}
                name={worker.name}
                working={worker.working}
                currentTask={worker.currentTask}
                materials={this.state.materials}
                products={this.state.products}
                workToggleHandler={() => this.workToggleHandler(worker.id)}
                taskChangeHandler={(newTask) => this.taskChangeHandler(worker.id, newTask)} />
            })
          }
        </main>
      </div>
    )
  }
}

export default (App)
