import React, { useState, } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import { TbLogout2 } from "react-icons/tb";

function Sidebar(){
  const [sidebar, setSidebar] = useState(false);
  
  const showSidebar = () => {
    setSidebar(!sidebar);
  }

  function handleLogout() {
    //console.log("Handling logout");
    localStorage.removeItem("accessToken");
  }

  return(
    <>
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className='sidebar'>
        <Link to="#" className='menuBars'>
          <FaIcons.FaBars onClick={showSidebar}/>
        </Link>
      </div>
      <nav className={sidebar ? 'side-menu active' : 'side-menu'}>
        <ul className='side-menu-items' onClick={showSidebar}>
          <li className='side-menu-toggle'>
            <Link to="#" className='menuBars'>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
          <li className='side-menu-logout' onClick={handleLogout}>
            <Link to='/login'>
              <TbLogout2 />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;