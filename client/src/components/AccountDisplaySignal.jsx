import '../styling/AccountDisplaySignal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';


function AccountDisplaySignal({ signal }){

    const [error, setError] = useState("");
    const [deleted, setDeleted ] = useState(false);


    const date = signal.created_at.split("T");
    const time = date[1].split(":");

    const API_URL = import.meta.env.VITE_API_URL;

    /*DELETION CLIENT SIDE
    
    Gets signal title and uses it to send a delete request
    1) response = fetch
    2) checks if response.ok = true
    3) if not handles error
    4) if yes sends success message

    */

    const handleDeletion = async () => {

        console.log("request sent");
        deleteSignal();

    };


    const deleteSignal = async () => {

        const token = localStorage.getItem("token");
        setDeleted(true);

        try{
            const response = await fetch(`${API_URL}/api/signal/${signal.id}`, 
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            if(!response.ok){
                const data = response.json();
                throw new Error(data.message || `Server Error: ${response.status}, try refreshing the page`)
            }

            const result = await response.json();
            console.log(result);

            


        }catch(error){
            setError(error.message);
        }

    };


    return(
        <>
        {!deleted ? 
        <article className="account-signal-card">
            <header className="signal-header">
                <h4 className="signal-title">{signal.title}</h4>
            </header>
            <p className="account-signal-content">{signal.content}</p>
            <button className='delete-signal-button' onClick={handleDeletion}>
                <FontAwesomeIcon icon={faEraser} size="2xl" />
            </button>
            <div className='account-signal-time'>
                <span className="signal-time">{date[0]}</span> 
                <span className="signal-time">{time[0]}:{time[1]}</span>
            </div>
        </article>
        : <article className="account-signal-card">
            {error.length === 0 
            ? "Signal Deleted Successfully"
            : error}
        </article>}
       </> 
    );


}

export default AccountDisplaySignal;


