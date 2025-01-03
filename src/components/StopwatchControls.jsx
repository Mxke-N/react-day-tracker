
function StopwatchControls({ onStart, onPause, onReset }) {
  return (
    <div className='stopwatch-controls'>
      <button className='start-button' onClick={onStart}>Start</button>
      <button className='pause-button' onClick={onPause}>Pause</button>
      <button className='reset-button' onClick={onReset}>Reset</button>
    </div>
  );
}

export default StopwatchControls;