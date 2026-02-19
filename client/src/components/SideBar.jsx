import { useEffect } from 'react';
import '../styling/SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser } from '@fortawesome/free-solid-svg-icons'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'



function SideBar({ isOpen, onClose, createSignal }){


    useEffect(() => {
        if(!isOpen) return;

        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEsc);

        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;



    return(
        <div className="sidebar-overlay" onClick={onClose}>
            <div 
                className="sidebar"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="sidebar-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faCircleUser} size="2xl" />
                </button>
                <button className="sidebar-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faEraser} size="2xl" />
                </button>
                <button className="sidebar-button" onClick={ () => {
                    createSignal();
                    onClose();
                }
                }>
                    <FontAwesomeIcon icon={faPlus} size="2xl" />
                </button>

            </div>
        </div>
    );

}


export default SideBar;
