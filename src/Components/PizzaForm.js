import React, { useState } from 'react'
import axios from 'axios'
import * as yup from 'yup'
import PizzaOrder from './PizzaOrder'

const defaultStatus = {
    name: '',
    email: '',
    phone: '',
    text: '',
    size: '',
    sauce: '',
    pineapple: false,
    olives: false,
    pepperoni: false,
    mushrooms: false,
    jalepenos: false,
    meatLovers: false,
    extraCheese: false,
    onions: false,
}

const defaultErrors = {
    name: '',
    email: '',
    phone: ''
}

const PizzaForm = () => {
    const formSchema = yup.object().shape({
        name: yup.string().required('Please enter your name').min(2, 'name must be at least 2 characters'),
        email: yup.string().required('Must be a valid email'),
        phone: yup.string().required('Must be a valid phone number'),
        size: yup.string().required('Pick a size'),
        sauce: yup.string().required('Pick a sauce'),
        pepperoni:yup.boolean(),
        mushrooms:yup.boolean(),
        pineapple:yup.boolean(),
        blackOlives:yup.boolean(),
        jalepenos:yup.boolean(),
        onions:yup.boolean(),
        meatLovers:yup.boolean(),
        extraCheese:yup.boolean(),
        specialInstructions: yup.string(),
        textarea: yup.string(),
    })

    const [order, setOrder] = useState(defaultStatus)
    const [newOrder, setNewOrder] = useState(defaultStatus)
    const [errors, setErrors] = useState(defaultErrors)

    const postNewOrder = (newOrder) => {
        axios
            .post(`https://reqres.in/api/orders`, newOrder)
            .then((res) => {
                console.log(res.data)
                setNewOrder(newOrder)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const onSubmit = (evt) => {
        evt.preventDefault();
        postNewOrder(order)
    }
    const onChange = (evt) => {
        const { name, value, type, checked } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value
        inputChange(name, valueToUse)
    }
    const inputChange = (name, value) =>{
        yup.reach(formSchema, name)
            .validate(value)
            .then(() => {
        setErrors({
                ...errors,
                [name]: '',
    })})
              .catch((err) => {
        setErrors({
                  ...errors,
                  [name]: err.errors[0],
    })})
        setOrder({
            ...order,
            [name]: value, 
    })
    }

    return (
        <form id='pizza-form' onSubmit={onSubmit}>
            <div className='form'>
                <h2>Customize your Pizza</h2>
                <label>
                    <input id='name-input'
                        value={order.name}
                        onChange={onChange}
                        name='name'
                        type='text'
                        placeholder='name'
                    />
                </label>
                <label>
                    <input
                        value={order.email}
                        onChange={onChange}
                        name='email'
                        type='email'
                        placeholder='email address'
                    />
                </label>
                <label>
                    <input
                        value={order.phone}
                        onChange={onChange}
                        name='phone'
                        type='text'
                        placeholder='(123)456-7890'
                    />
                </label>
                <label>
                    <div id='size-dropdown'>
                    <select
                        name='size'
                        value={order.size}
                        onChange={onChange}>
                        <option>---Chose your size---</option>
                        <option value="small">Small</option>
                        <option value="med">Medium</option>
                        <option value="lrg">Large</option>
                        <option value="xl">Extra Large</option>
                    </select>
                    </div>
                </label>
                <h2>Choice of Sauce</h2>
                <h4>(Required)</h4>
                <label>
                    Red Sauce
                    <input
                        type="radio"
                        name="sauce"
                        value="red"
                        checked={order.sauce === "red"}
                        onChange={onChange}
                    />
                </label>
                <label>
                    Garlic Ranch
                    <input
                        type="radio"
                        name="sauce"
                        value="gr"
                        checked={order.sauce === "gr"}
                        onChange={onChange}
                    />
                </label>
                <label>
                    Bbq Sauce
                    <input
                        type="radio"
                        name="sauce"
                        value="bbq"
                        checked={order.sauce === "bbq"}
                        onChange={onChange}
                    />
                </label>
                <label>
                    Spinach Alfredo
                    <input
                        type="radio"
                        name="sauce"
                        value="sce"
                        checked={order.sauce === "sce"}
                        onChange={onChange} 
                    />
                </label>
                <h2>Add Toppings</h2>
                <div className="toppings">
                    <label> Onions
                        <input
                            type="checkbox"
                            name="onions"
                            checked={order.onions}
                            onChange={onChange}
                        />
                    </label>
                    <label> Jalepenos
                        <input
                            type="checkbox"
                            name="jalepenos"
                            checked={order.jalepenos}
                            onChange={onChange}
                        />
                    </label>
                    <label> Mushrooms
                        <input
                            type="checkbox"
                            name="mushrooms"
                            checked={order.mushrooms}
                            onChange={onChange}
                        />
                    </label>
                    <label> Pepperoni
                        <input
                            type="checkbox"
                            name="pepperoni"
                            checked={order.pepperoni}
                            onChange={onChange}
                        />
                    </label>
                    <label> Pineapple
                        <input
                            type="checkbox"
                            name="pineapple"
                            checked={order.pineapple}
                            onChange={onChange}
                        />
                    </label>
                    <label> Extra Cheese
                        <input
                            type="checkbox"
                            name="extraCheese"
                            checked={order.extraCheese}
                            onChange={onChange}
                        />
                    </label>
                    <label> Meat Lovers
                        <input
                            type="checkbox"
                            name="meatLovers"
                            checked={order.meatLovers}
                            onChange={onChange}
                        />
                    </label>
                    <label> Black Olives
                        <input
                            type="checkbox"
                            name="blackOlives"
                            checked={order.blackOlives}
                            onChange={onChange}
                        />
                    </label>
                </div>
                <div className='comments'>
                    <label>Special Instructions
                        <input id='special-text'
                            name="textarea"
                            value={order.textarea}
                            onChange={onChange}
                            placeholder="Special delivery instructions? Let our driver know!" rows="4" cols="50"
                        />
                    </label>
                </div>
                <div className='checkout'>
                    <button id='order-button' onClick={(evt) => evt.preventDefault}>Add to order</button>
                </div>
                <PizzaOrder newOrder={newOrder} />
            </div>
        </form>
    )
}

export default PizzaForm