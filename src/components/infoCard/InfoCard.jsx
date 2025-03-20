const InfoCard = ({ title, items, icon }) => {
    return (
      <div >
        <h3 className="font-bold flex items-center text-lg">
          {icon} {title}
        </h3>
        <ul className="mt-2 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex gap-2">
               {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default InfoCard;