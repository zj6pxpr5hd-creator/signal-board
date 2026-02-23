import '../styling/Home.css'
import { useNavigate } from "react-router-dom"
import { cloneElement, useState } from 'react'
import SignalModal from './SignalModal'
import Nav from './Nav'
import SideBar from './SideBar'
import Home from './Home'

function Page ({ children, setIsAuthed }) {


    //STATE VARIABLES
    const [ isOpen, setIsOpen ] = useState(false);
    const [ createError, setCreateError ] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ refreshKey, setRefreshKey ] = useState(0);

    const navigate = useNavigate();


    //GENERAL API ENDPOINT
    const API_URL = import.meta.env.VITE_API_URL;
    
    //METHODS

    const openMenu = () => {
        setSidebarOpen(true);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

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
        };

        
        try{
            const response = await fetch(`${API_URL}/api/signal/create`,
            {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok){
                const data = await response.json();
                throw new Error(data.message || `Server Error: ${response.status}`);
            }

            setRefreshKey((k) => k+1);
            closeCreatePopup(); //closes popup if signal is creeted successfully

        }catch (error) {
            setCreateError(error.message)
        }finally{
            setLoading(false);
        }
    };


    /*const logout = () => {
        localStorage.removeItem("token");
        setIsAuthed(false);
        navigate("/signup");
    };*/

    const closeCreatePopup = () => {
        setCreateError("");
        setIsOpen(false);
    }


    const openCreatePopup = () => {
        setIsOpen(true); 
        setCreateError("")
    };


    const goToAccount = () => {
        navigate("/account");
    };

    const goToHome = () => {
        navigate("/home");
    };

    //PROPS TO BE PASSED TO HOME

    const childrenProps = {
        openCreatePopup,
        refreshKey,
        setIsAuthed,
    }


  return (
    <>
        
        <nav>
            <Nav onClick={openMenu}/>
            <SideBar 
                isOpen={sidebarOpen} 
                onClose={closeSidebar}
                createSignal={openCreatePopup}
                goToAccount={goToAccount}
                goToHome={goToHome}
            />
        </nav>
        <main>

            {cloneElement(children, childrenProps)}

            <SignalModal 
                isOpen={isOpen} 
                onClose={closeCreatePopup} 
                onSubmit={handleCreate}
                parentError={createError}
                loading={loading}
            />
    
        </main>
        
    </>
  )
};

export default Page;