const Sidebar = ({ setSection }) => {
    return (
      <nav className="sidebar">
        <ul>
          <li><button onClick={() => setSection("tests")}>ניהול מבחנים</button></li>
          <li><button onClick={() => setSection("users")}>ניהול משתמשים</button></li>
        </ul>
      </nav>
    );
  };
  
  export default Sidebar;
  