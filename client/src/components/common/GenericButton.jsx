/**
 * @file GenericButton.jsx
 * @author Shira Stern
 * @description רכיב כפתור גנרי עם תמיכה באייקונים, טעינה ומצבי עיצוב שונים.
 */

import React from "react";
import styles from "./GenericButton.module.scss";
import PropTypes from "prop-types";

const Button = ({
  children,
  variant = "primary",
  disabled = false,
  loading = false,
  className = "",
  onClick,
  type = "button",
  as = "button",
  icon,
  iconPosition = "left",
  ...props
}) => {
  const Tag = as === "link" ? "a" : "button";

  return (
    <Tag
      className={`${styles.button} ${styles[variant]} ${styles[className] || className} ${disabled ? styles.disabled : ""}`}

      disabled={disabled || loading}
      onClick={!disabled && !loading ? onClick : undefined}
      type={as === "link" ? undefined : type}
      {...props}
    >
      {loading ? "Loading..." : (
        <>
          {icon && iconPosition === "right" && <span className={styles.icon}>{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === "left" && <span className={styles.icon}>{icon}</span>}
        </>
      )}
    </Tag>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "danger"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  as: PropTypes.oneOf(["button", "link"]),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
};

export default Button;


/*
  דוגמאות שימוש:

  1. כפתור ראשי:
     <Button variant="primary" onClick={() => alert("Clicked!")}>
       התחיל את המבחן
     </Button>

  2. כפתור משני עם אייקון בצד שמאל:
     <Button variant="secondary" icon={<FaChevronLeft />} iconPosition="left">
       הבא
     </Button>

  3. כפתור משני עם אייקון בצד ימין:
     <Button variant="secondary" icon={<FaChevronRight />} iconPosition="right">
       חזור
     </Button>

  4. כפתור מסוכן (אדום) מבוטל:
     <Button variant="danger" disabled>
       כפתור מבוטל
     </Button>

  5. כפתור Outline במצב טעינה:
     <Button variant="outline" loading>
       טוען...
     </Button>

  6. כפתור כקישור:
     <Button as="link" href="https://example.com" target="_blank">
       עבור לאתר
     </Button>

  7. כפתור מותאם אישית עם מחלקה נוספת:
     <Button className="my-custom-button">לחצן מותאם אישית</Button>
*/
