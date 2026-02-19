import '../styling/Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


function Nav(){


    
    const openMenu = () => {

    }


    return(
        <>
            <nav>
                <FontAwesomeIcon 
                icon={faBars} 
                size="lg" 
                className="menu-icon"
                onClick={openMenu} />

            </nav>
        </>
    );

}


export default Nav;