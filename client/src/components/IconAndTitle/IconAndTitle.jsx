import React from "react";

const IconAndTitle = ({ icon, title ,description}) => {
    return (
      <div >
        <div >{icon}</div>
        <h4 >{title}</h4>
        <p>{description}</p>
      </div>
    );
  };
  

  
export default IconAndTitle;

