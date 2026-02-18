import '../styling/Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import SignalModal from './SignalModal'


function Home({ setIsAuthed }){

    const [ isOpen, setIsOpen ] = useState(false);

    const navigate = useNavigate();

    const handleCreate = (content) => {
        console.log("Send to backend:", content); //placeholder for now
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthed(false);
        navigate("/signup");
    };


    return(
        <main className="home">
            <h1>Home</h1>
            <section className="create-signal">
                <h2 className="create-title">Crete new Signal</h2>
                <button className='create-button' onClick={() => setIsOpen(true)}><FontAwesomeIcon className="create-icon" icon={faPlus} /></button>
            </section>

            <SignalModal 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)} 
                onSubmit={handleCreate}
            />

            <button className='logout-button' onClick={() => logout()}>Logout</button>
        </main>
    );

}

export default Home;