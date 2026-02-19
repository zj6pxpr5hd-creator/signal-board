import '../styling/Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import SideBar from './SideBar';


function Nav({ onClick }){



    return(
        <>
            <nav>
                <button
                    type="button"
                    className="menu-button"
                    onClick={onClick}
                    aria-label="Open menu"
                >
                    <FontAwesomeIcon 
                        icon={faBars} 
                        size="lg" 
                        className="menu-icon"
                    />
                </button>
            </nav>
        </>
    );

}


export default Nav;
