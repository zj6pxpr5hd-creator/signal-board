import '../styling/Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import SideBar from './SideBar';


function Nav(){

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openMenu = () => {
        setSidebarOpen(true);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return(
        <>
            <nav>
                <button
                    type="button"
                    className="menu-button"
                    onClick={openMenu}
                    aria-label="Open menu"
                >
                    <FontAwesomeIcon 
                        icon={faBars} 
                        size="lg" 
                        className="menu-icon"
                    />
                </button>
            </nav>
            <SideBar isOpen={sidebarOpen} onClose={closeSidebar}/>
        </>
    );

}


export default Nav;
