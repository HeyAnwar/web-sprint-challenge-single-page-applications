import React from 'react'

function PizzaOrder (props) {
    const {newOrder} = props
    return (
        <div className='checkout'>
            <h1>Your Order</h1>
            <p>Name: {newOrder.name}</p>
            <p>Size: {newOrder.size}</p>
            {/* <p>Topping 1: {newOrder.}</p> */}
            {/* <p>Topping 2: {newOrder.}</p> */}
            <p>Special Instructions: {newOrder.textarea}</p>
        </div>
    )
}

export default PizzaOrder