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
    gameOver: false,
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
      salary: 100,
      currentTask: {
        task: 'gather',
        targetId: 1
      }
    }, {
      id: 2,
      name: 'Paco',
      working: true,
      salary: 100,
      currentTask: {
        task: 'gather',
        targetId: 1
      }
    }, {
      id: 3,
      name: 'Luis',
      working: true,
      salary: 100,
      currentTask: {
        task: 'gather',
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
      const coinsAtStart = this.state.coins;
      this.setState({ loading: true, gotNewCoins: false });
      this.doLabor()
      if (this.state.hours > 0 && this.hrsTillNextMonth(this.state.hours) === 0) this.paySalaries()
      this.setState({ hours: this.state.hours + 1, loading: false, gotNewCoins: this.state.coins > coinsAtStart })
      this.checkGameOver()
    }
  }

  checkGameOver() {
    if (this.state.coins < 0) {
      this.setState({ gameOver: true, paused: true })
    }
  }

  paySalaries = () => {
    this.setState({ coins: this.state.coins - this.sumSalaries(this.state.workers) })
  }

  gatherMaterial = (materialId, materials) => {
    const updatedMaterials = materials.map((material) => {
      if (material.id === materialId) {
        return {
          id: material.id,
          name: material.name,
          stock: material.stock + 1
        }
      }
      return material
    })

    return {
      updatedMaterials
    }
  }

  produceProduct = (productId, products, materials) => {
    let updatedMaterials = [...materials]
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        let produced = 0
        const craftingAttempt = this.craftRecipe(product.recipe, updatedMaterials)
        if (craftingAttempt.success) {
          updatedMaterials = craftingAttempt.updatedMaterials
          produced++
        }

        return {
          id: product.id,
          name: product.name,
          recipe: product.recipe,
          stock: product.stock + produced,
          price: product.price
        }
      }
      return product
    })

    return {
      updatedProducts,
      updatedMaterials
    }
  }

  sellProduct = (productId, updatedCoins, products) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        let newStock = product.stock
        if (product.stock > 0) {
          updatedCoins += product.price
          newStock--
        }

        return {
          id: product.id,
          name: product.name,
          recipe: product.recipe,
          stock: newStock,
          price: product.price,
          taskEffort: product.taskEffort
        }
      }
      return product
    })

    return {
      updatedCoins,
      updatedProducts
    }
  }

  doLabor = () => {
    this.setState(prevState => {
      let updatedMaterials = [...prevState.materials]
      let updatedProducts = [...prevState.products]
      let updatedCoins = prevState.coins
      const updatedWorkers = prevState.workers.map((worker) => {
        if (worker.working) {
          if (worker.currentTask.task === 'gather') {
            ({ updatedMaterials } = this.gatherMaterial(worker.currentTask.targetId, updatedMaterials))
          } else if (worker.currentTask.task === 'produce') {
            ({ updatedProducts, updatedMaterials } = this.produceProduct(worker.currentTask.targetId, updatedProducts, updatedMaterials))
          } else if (worker.currentTask.task === 'sell') {
            ({ updatedCoins, updatedProducts } = this.sellProduct(worker.currentTask.targetId, updatedCoins, updatedProducts))
          }
          return {
            id: worker.id,
            name: worker.name,
            working: worker.working,
            salary: worker.salary,
            currentTask: {
              task: worker.currentTask.task,
              targetId: worker.currentTask.targetId
            }
          }
        }
        return worker
      })

      return {
        coins: updatedCoins,
        materials: updatedMaterials,
        products: updatedProducts,
        workers: updatedWorkers
      }
    })
  }

  craftRecipe = (recipe, currentMaterials) => {
    let enoughMaterials = true
    let updatedMaterials = [...currentMaterials]
    recipe.map(requiredMaterial => {
      updatedMaterials = updatedMaterials.map(material => {
        if (material.id === requiredMaterial.materialId &&
          requiredMaterial.quantity > material.stock) {
          enoughMaterials = false
        }
        else if (material.id === requiredMaterial.materialId) {
          return {
            id: material.id,
            name: material.name,
            stock: material.stock - requiredMaterial.quantity,
            taskEffort: material.taskEffort
          }
        }
        return material
      })
      return requiredMaterial
    })
    return {
      updatedMaterials,
      success: enoughMaterials
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
              salary: worker.salary,
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
              salary: worker.salary,
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

  sumSalaries = (workers) => {
    return workers.reduce((totalSalaries, worker) => totalSalaries + worker.salary, 0)
  }

  hrsTillNextMonth = (hrs) => {
    return (Math.ceil(hrs / 160) * 160) - hrs
  }

  coinsEndMonth = (coins, workers) => {
    return coins - this.sumSalaries(workers)
  }

  render() {
    return (
      <div className={this.state.paused ? 'App paused' : 'App'}>
        <header>
          <h1>Resource Management</h1>
          <TimeTrack
            paused={this.state.paused}
            gameOver={this.state.gameOver}
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
            <div>
              <div className="current-coins" style={{ fontSize: this.calculateCoinsSize(this.state.coins) }}>{this.state.coins} CHA</div>
              <div><span>Monthly Salaries:</span><span>{this.sumSalaries(this.state.workers)} CHA</span></div>
              <div><span>End Of Month:</span><span>{this.coinsEndMonth(this.state.coins, this.state.workers)} CHA</span></div>
              <div><span>Till End Month:</span><span>{this.hrsTillNextMonth(this.state.hours)} HRS</span></div>
            </div>
          </div>
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
