import '../styling/AccountDisplaySignal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser } from '@fortawesome/free-solid-svg-icons'


function AccountDisplaySignal({ signal }){

    const date = signal.created_at.split("T");
    const time = date[1].split(":");

    return(
        <article className="account-signal-card">
            <header className="signal-header">
                <h4 className="signal-title">{signal.title}</h4>
            </header>
            <p className="account-signal-content">{signal.content}</p>
            <button className='delete-signal-button'>
                <FontAwesomeIcon icon={faEraser} size="2xl" />
            </button>
            <div className='account-signal-time'>
                <span className="signal-time">{date[0]}</span> 
                <span className="signal-time">{time[0]}:{time[1]}</span>
            </div>
        </article>
    );


}

export default AccountDisplaySignal;


