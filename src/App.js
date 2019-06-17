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
    loading: false,
    gotNewCoins: false,
    materials: [{
      id: 1,
      name: 'Wood',
      stock: 0
    }, {
      id: 2,
      name: 'Leather',
      stock: 0
    }, {
      id: 3,
      name: 'Meat',
      stock: 0
    }],
    products: [{
      id: 1,
      name: 'Wooden Spoon',
      recipe: [{
        materialId: 1,
        quantity: 2
      }],
      stock: 0,
      price: 3
    }, {
      id: 3,
      name: 'Leather Jacket',
      recipe: [{
        materialId: 2,
        quantity: 10
      }],
      stock: 0,
      price: 16
    }, {
      id: 5,
      name: 'Frankfurter',
      recipe: [{
        materialId: 3,
        quantity: 2
      }],
      stock: 0,
      price: 3
    }, {
      id: 2,
      name: 'Wooden Bench',
      recipe: [{
        materialId: 1,
        quantity: 10
      }],
      stock: 0,
      price: 16
    }, {
      id: 4,
      name: 'Lederhosen',
      recipe: [{
        materialId: 2,
        quantity: 12
      }],
      stock: 0,
      price: 21
    }, {
      id: 6,
      name: 'Wiener Schnitzel',
      recipe: [{
        materialId: 3,
        quantity: 3
      }],
      stock: 0,
      price: 5
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
        task: 'gather',
        targetId: 2
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
      const coinsAtStart = this.state.coins;
      this.setState({ loading: true, gotNewCoins: false });
      this.collectMaterials()
      this.produceProducts()
      this.sellProducts()
      this.setState({ hours: this.state.hours + 1, loading: false, gotNewCoins: this.state.coins > coinsAtStart })
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
          stock: material.stock + gathered
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
          stock: product.stock + produced,
          price: product.price
        }
      })

      return {
        materials: newMaterials,
        products: newProducts
      }
    })
  }

  sellProducts = () => {
    this.setState(prevState => {
      let currentCoins = this.state.coins
      const newProducts = prevState.products.map((product) => {
        const selling = this.state.workers.reduce((accumulatedProduct, worker) => {
          if (worker.working &&
            worker.currentTask.task === 'sell' &&
            worker.currentTask.targetId === product.id) {
            return accumulatedProduct + 1
          }
          return accumulatedProduct
        }, 0)

        const selled = (product.stock - selling >= 0) ? selling : product.stock
        currentCoins += selled * product.price

        return {
          id: product.id,
          name: product.name,
          recipe: product.recipe,
          stock: product.stock - selled,
          price: product.price
        }
      })

      return {
        coins: currentCoins,
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
          requiredMaterial.quantity > material.stock) {
          enoughMaterials = false
        }
        else if (material.id === requiredMaterial.materialId) {
          return {
            id: material.id,
            name: material.name,
            stock: material.stock - requiredMaterial.quantity
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

  calculateCoinsSize = (coins) => {
    if (coins > 999999) return '3.5rem'
    if (coins > 99999) return '3.0rem'
    if (coins > 9999) return '2.5rem'
    if (coins > 999) return '2.0rem'
    if (coins > 99) return '1.5rem'
    if (coins > 9) return '1.1rem'
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
          <div className={!this.state.loading && this.state.gotNewCoins ? 'hoard highlight' : 'hoard'}>
            <span style={{fontSize: this.calculateCoinsSize(this.state.coins)}}>{this.state.coins}</span> Coins</div>
          <br />
          <Resources
            materials={this.state.materials}
            products={this.state.products} />
        </header>
        <main>
          <div className="worker-grid">
            {
              this.state.workers.map(worker => {
                return <Worker
                  key={worker.id}
                  name={worker.name}
                  working={worker.working}
                  currentTask={worker.currentTask}
                  materials={this.state.materials}
                  products={this.state.products}
                  loading={this.state.loading}
                  paused={this.state.paused}
                  workToggleHandler={() => this.workToggleHandler(worker.id)}
                  taskChangeHandler={(newTask) => this.taskChangeHandler(worker.id, newTask)} />
              })
            }
          </div>
        </main>
      </div>
    )
  }
}

export default (App)
