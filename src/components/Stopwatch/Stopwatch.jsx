function Stopwatch({ elapsedTime, onStart, onPause, onReset }) {
    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60) % 24);
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}`;
    }

    return (
        <div className='stopwatch-container'>
            <h4>Current Time</h4>
            <div className='display'>
                <h3>{formatTime()}</h3>
            </div>
            <div className='controls'>
                <button className='start-button' onClick={onStart}>Start</button>
                <button className='pause-button' onClick={onPause}>Pause</button>
                <button className='reset-button' onClick={onReset}>Reset</button>
            </div>
        </div>
    );
}

export default Stopwatch;