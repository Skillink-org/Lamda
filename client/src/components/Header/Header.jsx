import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import logo from "../../assets/logo_book.png";


const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState({ "firstName": "sara", "lastName": "cohen" });

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setIsLoggedIn(true);
            setUser(JSON.parse(userData));
        }
    }, []);

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
                        <NavLink to="/profile" className={styles.profileLink}>
                            <span className={styles.profileText}>אזור אישי</span>
                            <AvatarIcon firstName={user.firstName} lastName={user.lastName} size={40} />
                        </NavLink>
                    ) : (
                        <NavLink to="/login">
                            {/* generic button */}
                            <button>התחברות / הרשמה</button>
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
