import React from "react";
import styles from "./AvatarIcon.module.scss";

const AvatarIcon = ({ firstName = "", lastName = "", size = 50 }) => {

    const initials = `${firstName.charAt(0) || ""}${lastName.charAt(0) || ""}`.toUpperCase();

    return (
        <div className={styles.avatarIcon} style={{ "--size": `${size}px` }}>
            {initials}
        </div>
    );
};

export default AvatarIcon;
