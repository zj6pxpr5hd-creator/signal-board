import '../styling/DisplaySignal.css'

function DisplaySignal({ signal }){

    return(
        <article className="signal-card">
            <header className="signal-header">
                <h4 className="signal-title">{signal.title}</h4>
                <span className="signal-time">{signal.created_at}</span>
            </header>
            <p className="signal-content">{signal.content}</p>
        </article>
    );


}

export default DisplaySignal;
