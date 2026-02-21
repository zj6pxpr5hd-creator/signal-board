import React, { useEffect, useState } from 'react'
import  AccountDisplaySignal from './AccountDisplaySignal';
import "../styling/Account.css"


const Account = ({ setIsAuthed, refreshKey }) => {

    const [signals, setSignals] = useState([]);
    const [user, setUser] = useState({});
    const [error, setError ] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    const getUserSignals = async () => {

        const token = localStorage.getItem("token");

        try{
            const response = await fetch(`${API_URL}/api/auth/account`, 
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            if(!response.ok){
                const data = response.json();
                throw new Error(data.message || `Server Error: ${response.status}`);
            }

            const result = await response.json();


            console.log(result.user);
            console.log(result.signals);
            setUser(result.user);
            setSignals(result.signals);
            

        }catch(error){
            setError(error.message);
        }

    }


    useEffect(() => {
        getUserSignals();
    }, [refreshKey])

  return (
    <section className='account-section'>

        {error.length!==0 && <p>{error}</p>}
       
        <div className="account-data">
            <h1>{user.username}</h1>
            <button onClick={() => 
            {   
                setIsAuthed(false)
                localStorage.removeItem("token");
            }
            }>Logout</button>
        </div>

        {error.length===0 
        ? (
            <div className='account-signals'>
                {signals.map((signal, index) => {
                return (
                    <AccountDisplaySignal signal={signal} key={index}/>
                );
                        })}
            </div>)
        : (<p>No signals yet</p>)}

         
    </section>
  )
}

export default Account;