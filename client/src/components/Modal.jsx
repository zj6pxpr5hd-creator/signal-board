/*This is a reusable modal for a PopUp (the project does not technically require such a complicated structure but i decided
to implement it for practice porpuses)*/

import '../styling/Modal.css';
import { useEffect } from "react";


/*Props: 
    isOpen = controls visibility (true modal appears, false, modal disappears)
    onClose = function passed from the parent that manages what happens on close
    children = children to display inside the Modal

    this structure makes the Modal reusable
    */
function Modal({ isOpen,onClose, children }){ 

    //every time isOpen changes this effect runs => if the modal is open than it activates the modal behavior
    useEffect(() => {
        if(!isOpen) return;

        //attach a global keybord listener = if user presses ESC => call onClose()
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEsc);

        //scroll lock = prevents background scrolling while modal is open
        document.body.style.overflow = "hidden";

        //cleanup function = when modal closes or component unmounts this removes the event listener and the scroll lock
        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    //conditional rendering = if isOpen is false the component does not exist in the DOM
    if (!isOpen) return null;


    //external div is for overlay over the actual page, internal div is for modal content and to prevent closing when clickinf inside
    return(
        <div className="modal-overlay" onClick={onClose}>
            <div 
                className="modal"
                onClick={(e) => e.stopPropagation()}
            >{children}</div>
        </div>
    );
}

export default Modal;

/*
Modal structure: 
Modal (infrastructure)
    ├── Overlay
    └── Content (children)

the modal:
controls visibility
constrols escape behavior
controls outside click
controls scroll locking
*/