import { ToastContainer } from "react-toastify";
import React, { useEffect, useState } from 'react';
import NavBar from '../navBar/NavBar';
import styles from './Header.module.css';
import "../../styles/default.css"
import { useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        if (!jwtToken) {
            navigate('/login');
        }
    }, []);

    const [showMenu, setShowMenu] = useState(false);

    const handleBarsClick = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
            <div className={styles.top}></div>
            <header>
                <ToastContainer />
                <link
                    rel="stylesheet"
                    href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
                />
                <div className={styles.bar} onClick={handleBarsClick}>
                    <i className="uil uil-bars"></i>
                </div>
                <div className={styles.logo}>
                    <img src={require('../../assets/image/logo.jpg')} alt="Logo" />
                </div>
                <div className={styles.showMenu}>
                    {showMenu && (
                        <NavBar />
                    )}
                </div>

            </header>
        </>
    );
}

export default Header;
