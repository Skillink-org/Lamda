import React from "react";
import styles from "./IconAndTitle.module.scss";

const IconAndTitle = ({ icon, title ,description}) => {
    console.log("IconAndTitle rendered with:", icon, title);
    return (
      <div >
        <div >{icon}</div>
        <h4 >{title}</h4>
        <p>{description}</p>
      </div>
    );
  };
  

export default IconAndTitle;
