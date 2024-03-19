import React, { useState } from 'react';
import NavBar from '../navBar/NavBar';
import styles from './Header.module.css';

const Header = () => {

    const [showMenu, setShowMenu] = useState(false);

    const handleBarsClick = () => {
        setShowMenu(!showMenu); // Đảo ngược giá trị của showMenu khi click
    };


    return (
        <header>
            <div className={styles.bar} onClick={handleBarsClick} style={{ display: showMenu ? 'none' : 'block' }}> {/* Ẩn bars khi showMenu là true */}
                <i className="uil uil-bars"></i>
            </div>
            <div className={styles.logo}>
                <img src={require('../../assets/image/logo.jpg')} alt="Logo" />
            </div>
            <div className={showMenu ? styles.hideMenu : styles.showMenu}> {/* Ẩn menu khi showMenu là true */}
                <NavBar />
            </div>
        </header>
    );
    
}

export default Header;