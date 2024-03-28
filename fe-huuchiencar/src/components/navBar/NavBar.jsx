import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { logout } from "../../services/AuthService";
import React, { useEffect, useState } from 'react';
import styles from './NavBar.module.css';

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedNav, setSelectedNav] = useState('Dashboard');

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("user");
            navigate("/login");
        } catch (error) {
            toast.error('Error logging out:', error);
        }
    };

    const handleNavClick = (navName) => {
        setSelectedNav(navName);
    };

    useEffect(() => {
        const currentPath = location.pathname.split('/')[2];
        if (currentPath && currentPath !== selectedNav) {
            setSelectedNav(currentPath);
        }
    }, [location, selectedNav]);

    return (
        <div className={styles.nav_1}>
            <ToastContainer />
            <link
                rel="stylesheet"
                href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
            ></link>
            <nav>
                {/* <div className={styles.logo}>
                    <img src={require('../../assets/image/logo.jpg')} alt="Logo" />
                </div> */}
                <div className={styles.menu_items}>
                    <ul className={styles.menu_links}>
                        <div>
                            <li className={styles.menu_li}>
                                <Link to="/" onClick={() => handleNavClick('Dashboard')}>
                                    <i class="uil uil-tachometer-fast-alt"></i>
                                    <span className={styles.link_name}>Doanh thu</span>
                                </Link>
                            </li>

                            <li className={styles.menu_li}>
                                <Link to="/cars" onClick={() => handleNavClick('Cars')}>
                                    <i className="uil uil-car"></i>
                                    <span className={styles.link_name}>Xe</span>
                                </Link>
                            </li>

                            <li className={styles.menu_li}>
                            <Link Link to="/customers" onClick={() => handleNavClick('Customers')}>
                                <i className="uil uil-user"></i>
                                <span className="styles.link_name">Khách hàng</span>
                            </Link>
                        </li>

                        <li className={styles.menu_li}>
                            <Link to="/contracts" onClick={() => handleNavClick('Contracts')}>
                                <i className="uil uil-notes"></i>
                                <span className="styles.link_name">Hợp đồng</span>
                            </Link>
                        </li>

                        <li className={styles.menu_li}>
                            <Link to="/histories" onClick={() => handleNavClick('Histories')}>
                                <i className="uil uil-clock"></i>
                                <span className="styles.link_name">Lịch sử</span>
                            </Link>
                        </li>

                        <li className={styles.menu_li}>
                            <Link to="/payouts" onClick={() => handleNavClick('PayOuts')}>
                                <i className="uil uil-money-bill"></i>
                                <span className="styles.link_name">Chi phí</span>
                            </Link>
                        </li>

                </div>
            </ul>
            <ul className={styles.logout}>
                <li>
                    <a onClick={handleLogout}>
                        <i className="uil uil-signout"></i>
                        <span className={styles.link_name}>Đăng Xuất</span>
                    </a>
                </li>
            </ul>
        </div>
            </nav >
        </div >
    );
}

export default NavBar;