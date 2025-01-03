
function StopwatchTime({ elapsedTime }) {
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
    <div className='stopwatch-time'>
      <h3>{formatTime()}</h3>
    </div>
  );
}

export default StopwatchTime;