import '../styling/DisplaySignal.css'

function DisplaySignal({ signal }){

    const date = signal.created_at.split("T");
    const time = date[1].split(":");

    return(
        <article className="signal-card">
            <header className="signal-header">
                <h4 className="signal-title">{signal.title}</h4>
            </header>
            <p className="signal-content">{signal.content}</p>
            <div className='signal-time'>
                <span className="signal-time">{date[0]}</span> 
                <span className="signal-time">{time[0]}:{time[1]}</span>
            </div>
        </article>
    );


}

export default DisplaySignal;
