import '../styling/Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useEffect } from 'react'
import DisplaySignal from './DisplaySignal'



function Home({ openCreatePopup, refreshKey }){


    const [ feedError, setFeedError ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ feed, setFeed ] = useState([]);

    
    const API_URL = import.meta.env.VITE_API_URL;


    /*const logout = () => {
        localStorage.removeItem("token");
        setIsAuthed(false);
        navigate("/signup");
    };*/

    

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

    useEffect(() => {
        sendGetRecent();
    }, [refreshKey])

    return(
        <div className="home">
            <h1  className='home-title'>Home</h1>
            <section className="create-signal">
                <h2 className="create-title">Crete new Signal</h2>
                <button className='create-button' onClick={openCreatePopup}>
                    <FontAwesomeIcon className="create-icon" icon={faPlus} />
                </button>
            </section>

            
            
            {!loading ? feed.map( (signal) => {
                return(
                    <DisplaySignal signal={signal} key={signal.id}/>
                );
            }) : (<p>Loading Feed...</p>)}
                
            {feedError!==0 && <p>{feedError}</p>}
        </div>
    );

}

export default Home;