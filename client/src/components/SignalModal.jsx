/*
this component handles Signal content state
validation 
Submission behavior

in general it is feature logic
*/

/*the Props: 
isOpen = passed down to the reusable Modal, this keeps visibility controlled by the parent
onClose = also passed down to Modal, keeps close behavior cotrolled by parent as well
onSubmit = passed down from its parent, calls whatever function the app needs on submit (es api call)
*/
import '../styling/SignalModal.css'
import { useState } from "react";
import Modal from "./Modal";

function SignalModal({ isOpen, onClose, onSubmit, parentError, loading }){

    //stores what the user types
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");


    //handle submission
    const handleSubmit = () => {

        onSubmit(content, title); // passes content upward so that the parent decides what to do with it
        setContent(""); // reset local state
    }


    return(
        <Modal isOpen={isOpen} onClose={onClose} >
            <h2>Create Signal</h2>
            <input 
                className='create-signal-title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'
            />
            <textarea 
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type her your signal"
                maxLength={280}
                value={content}
                className="create-signal-text"
            />
            <div className="content-length">
                <small>{content.length}/280</small>
            </div>
            {parentError && <p className='error-message'>{parentError}</p>}
            <div className='modal-buttons'>
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleSubmit}>{loading ? "Loading" : "Post"}</button>
            </div>

        </Modal>
    );

}


export default SignalModal;