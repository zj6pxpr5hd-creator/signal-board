import '../styling/Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import SignalModal from './SignalModal'
import { useEffect } from 'react'
import DisplaySignal from './DisplaySignal'
import Nav from './Nav'

function Home({ setIsAuthed }){

    const [ isOpen, setIsOpen ] = useState(false);
    const [ createError, setCreateError ] = useState("");
    const [ feedError, setFeedError ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ feed, setFeed ] = useState([]);

    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const handleCreate = (content, title) => {

        if(!title.trim()) { 
            setCreateError("Invalid Title")
            return; //validation = checks that content isn't empty
        }

        if(!content.trim()) { 
            setCreateError("Invalid Content")
            return; //validation = checks that content isn't empty
        }

        setCreateError("")

        sendCreateSignal(content, title);
    };

    const sendCreateSignal = async (content, title) => {

        setLoading(true);

        const token = localStorage.getItem("token");
        
        const data = {
            title: title,
            content: content,
            token: token
        };

        console.log("Send to backend:", title, content, token); //placeholder for now
        
        try{
            const response = await fetch(`${API_URL}/api/signal/create`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok){
                const data = await response.json();
                throw new Error(data.message || `Server Error: ${response.status}`);
            }

            const result = await response.json();
            console.log("success: ", result);

            closePopup(); //closes popup if signal is creeted successfully
            sendGetRecent();

        }catch (error) {
            setCreateError(error.message)
        }finally{
            setLoading(false);
        }
    };

    const sendGetRecent = async () => {
        
        try{
            setLoading(true);
            const response = await fetch(`${API_URL}/api/signal/recent`);
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message || `Server Error: ${response.status}`);
            }

            const results = await response.json();
            setFeed(results.signals.rows);
            console.log("success: ", results);
            setFeedError("");

        }catch (error){
            setFeedError(error.message)
        }finally{
            setLoading(false);
        }
    }

    const closePopup = () => {
        setCreateError("");
        setIsOpen(false);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthed(false);
        navigate("/signup");
    };

    useEffect(() => {
        setCreateError("");
        sendGetRecent();
    }, [])

    return(
        <main className="home">
            <Nav />
            <h1  className='home-title'>Home</h1>
            <section className="create-signal">
                <h2 className="create-title">Crete new Signal</h2>
                <button className='create-button' onClick={() => {
                    setIsOpen(true); 
                    setCreateError("")
                    }}>
                    <FontAwesomeIcon className="create-icon" icon={faPlus} />
                </button>
            </section>

            <SignalModal 
                isOpen={isOpen} 
                onClose={closePopup} 
                onSubmit={handleCreate}
                parentError={createError}
            />
            {feedError.length===0 ? feed.map( (signal) => {
                return(
                    <DisplaySignal signal={signal} key={signal.id}/>
                );
            }) : (<p>{feedError}</p>)}
                
        
            <button className='logout-button' onClick={() => logout()}>Logout</button>
        </main>
    );

}

export default Home;