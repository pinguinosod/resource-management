import React from 'react'
import './Resources.css'

const Resources = (props) => {

  return (
    <div className="Resources">
      <div className="Materials card">
        <div>
          <table className="materials-table">
            <thead>
              <tr><th>Material</th><th>Stock</th></tr>
            </thead>
            <tbody>
              {
                props.materials.map(material => {
                  return <tr key={material.id}>
                    <td>{material.name}</td>
                    <td>{material.stock}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="Products card">
        <div>
          <table className="products-table">
            <thead>
              <tr><th>Product</th><th>Stock</th><th>Price</th></tr>
            </thead>
            <tbody>
              {
                props.products.map(product => {
                  return <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                    <td>{product.marketPrice} CHA</td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Resources
