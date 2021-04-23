import React from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import PizzaForm from "./PizzaForm";
// import "./App.css";

const PizzaHeader  = () => {
    return (
        <Router>
            <div className='nav'>
                <nav>
                    <Link to='/'><h1 id='home'>Anwar's Pizza</h1></Link>
                    <Link to='./Components/PizzaForm'><h2 id='order-pizza'>Order online</h2></Link>
                    <Route path={'./Components/PizzaForm'}>
                        <PizzaForm/>
                    </Route>
                </nav>
            </div>
        </Router>
    )
}

export default PizzaHeader