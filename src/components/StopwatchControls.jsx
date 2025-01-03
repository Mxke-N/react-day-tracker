
function StopwatchControls({ onStart, onPause, onReset, onToggleAutoStart, isRunning, isAutoStart }) {
  return (
    <div className='stopwatch-controls'>
      <button className='start-button' onClick={onStart}>
        {isRunning ? 'STARTED' : 'Start'}
      </button>
      <button className='pause-button' onClick={onPause}>
        {isRunning ? 'Pause' : 'PAUSED'}
      </button>
      <button className='reset-button' onClick={onReset}>Reset</button>
    </div>
  );
}

export default StopwatchControls;