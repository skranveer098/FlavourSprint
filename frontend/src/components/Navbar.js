/* eslint-disable react/jsx-no-undef */

import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import './Navbar.css'; // Ensure you import the CSS file

export default function Navbar(props) {
    const [cartView, setCartView] = useState(false);
    localStorage.setItem('temp', "first");
    let navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    };

    const loadCart = () => {
        setCartView(true);
    };

    const items = useCart();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky custom-navbar">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">Happy Foods</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>
                            </li>
                            {localStorage.getItem("token") && (
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder">My Orders</Link>
                                </li>
                            )}
                        </ul>
                        {!localStorage.getItem("token") ? (
                            <form className="d-flex">
                                <Link className="btn custom-btn mx-1" to="/login">Login</Link>
                                <Link className="btn custom-btn mx-1" to="/signup">Signup</Link>
                            </form>
                        ) : (
                            <div className="d-flex align-items-center">
                                <div className="btn custom-btn mx-2" onClick={loadCart}>
                                    <Badge color="secondary" badgeContent={items.length}>
                                        <ShoppingCartIcon />
                                    </Badge>
                                    Cart
                                </div>
                                {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
                                <button onClick={handleLogout} className="btn custom-btn">Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
