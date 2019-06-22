import React from 'react'
import './Resources.css'

const Resources = (props) => {

  return (
    <div className="Resources">
      <div>
        <div className="materials-grid">
          {
            props.materials.map(material => {
              return <span key={material.id}>
                <span>{material.name}:</span>
                <span className="value">{material.stock}</span>
              </span>
            })
          }
        </div>
        <hr />
        <div className="products-grid">
          {
            props.products.map(product => {
              return <span key={product.id}>
                <span>{product.name}:</span>
                <span className="value">{product.stock}</span>
              </span>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Resources
