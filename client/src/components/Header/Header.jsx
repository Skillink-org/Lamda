import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import logo from "../../assets/logo_book.png"; // Assuming you have a logo file


const Header = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>

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
                </ul>{
                    
                }
                <NavLink to="/profile">
                    <AvatarIcon firstName="sara" lastName="cohen" size={40}></AvatarIcon>
                </NavLink>
                {/* generic button */}
            </div>
        </nav>
    );
};

export default Header;
