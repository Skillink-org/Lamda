import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import logo from "../../assets/logo_book.png";
import { logoutUser } from "../../services/api";
import { useUser } from "../../context/UserContext";


const Header = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn, clearUser } = useUser();

    const handleLogout = () => {
        logoutUser();
        clearUser();
        navigate('/');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <div className={styles.navGroup}>
                    <div className={styles.logo}>
                        <NavLink to="/">
                            <img src={logo} alt="Test" />
                            <span>מבחן התאמה תורני</span>
                        </NavLink>
                    </div>
                    <ul className={styles.navList}>
                        <li>
                            <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>בית</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : "")}>אודות</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={({ isActive }) => (isActive ? styles.active : "")}>יצירת קשר</NavLink>
                        </li>
                    </ul>
                </div>
                <div className={styles.profile}>
                    {isLoggedIn ? (
                        <div className={styles.profileContainer}>
                            <NavLink to="/profile" className={styles.profileLink}>
                                <span className={styles.profileText}>
                                    שלום {user?.firstName || ''} {user?.lastName || ''}
                                </span>
                                <AvatarIcon 
                                    firstName={user?.firstName || 'א'} 
                                    lastName={user?.lastName || 'א'} 
                                    size={40} 
                                />
                            </NavLink>
                            <button onClick={handleLogout} className={styles.logoutButton}>
                                התנתק
                            </button>
                        </div>
                    ) : (
                        <NavLink to="/">
                            <button className={styles.loginButton}>התחברות / הרשמה</button>
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
