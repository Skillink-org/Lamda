/**
 * @file GenericButton.jsx
 * @author Shira Stern
 * @description A generic button component with support for icons, loading, and various design states.
 */

import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./GenericButton.module.scss";

const Icon = ({ icon }) => <span className={styles.icon}>{icon}</span>;

const Button = ({
  as, // button,link
  type, // button, submit, reset
  icon,
  loading,
  variant,
  children,
  disabled,
  className,
  iconPosition,
  onClick = () => {},
  ...props
}) => {
  const Tag = as === "link" ? "a" : "button";

  return (
    <Tag
      className={clsx(styles.button, styles[variant], className, {
        [styles.disabled]: disabled || loading,
      })}
      disabled={disabled || loading}
      onClick={!disabled && !loading ? onClick : undefined}
      {...(as !== "link" && { type })}
      {...props}
    >
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          {icon && iconPosition === "right" && <Icon icon={icon} />}
          <span>{children}</span>
          {icon && iconPosition === "left" && <Icon icon={icon} />}
        </>
      )}
    </Tag>
  );
};

Button.defaultProps = {
  variant: "primary",
  as: "button",
  type: "button",
  iconPosition: "left",
  disabled: false,
  loading: false,
  className: "",
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

// /*
//   Usage examples:

//   1. כפתור ראשי:
//      <Button variant="primary" onClick={() => alert("Clicked!")}>
//        התחיל את המבחן
//      </Button>

//   2. כפתור משני עם אייקון בצד שמאל:
//      <Button variant="secondary" icon={<FaChevronLeft />} iconPosition="left">
//        הבא
//      </Button>

//   3. כפתור משני עם אייקון בצד ימין:
//      <Button variant="secondary" icon={<FaChevronRight />} iconPosition="right">
//        חזור
//      </Button>

//   4. כפתור מסוכן (אדום) מבוטל:
//      <Button variant="danger" disabled>
//        כפתור מבוטל
//      </Button>

//   5. כפתור Outline במצב טעינה:
//      <Button variant="outline" loading>
//        טוען...
//      </Button>

//   6. כפתור כקישור:
//      <Button as="link" href="https://example.com" target="_blank">
//        עבור לאתר
//      </Button>

//   7. כפתור מותאם אישית עם מחלקה נוספת:
//      <Button className="my-custom-button">לחצן מותאם אישית</Button>
// */
