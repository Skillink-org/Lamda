import styles from "../infoCard/InfoCard.module.scss";

const InfoCard = ({ title, items, icon }) => {
    return (
      <div className={styles["info-card"]} >
        <h3 >
          {icon} {title}
        </h3>
        <ul >
          {items.map((item, index) => (
            <li key={index} >
               {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default InfoCard;