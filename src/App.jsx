import { useState, useEffect, useRef, use } from 'react';

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const SHORT_BREAK = 5 * 60; // 5 minutes in seconds
const LONG_BREAK = 15 * 60; // 15 minutes in seconds



function App() {

  const [secondsLeft, setSecondsLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            handleSessionEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleSessionEnd = () => {
    if (mode === 'work') {
      setMode('shortBreak');
      setSecondsLeft(SHORT_BREAK);
    } setIsRunning(false);
  };

  const formatTime = (secs) => {
    const m= String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const startTimer = () => {setIsRunning(true);};
  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    if (mode === 'work') {
      setSecondsLeft(WORK_TIME);
    } else if (mode === 'shortBreak') {
      setSecondsLeft(SHORT_BREAK);
    } else if (mode === 'longBreak') {
      setSecondsLeft(LONG_BREAK);
    };
  };

  return (
    <div className='min-h-screen flex flex-col text-white items-center justify-center bg-gray-900'>
      <h1 className='text-4xl mb-6 font-bold'>Pomodoro Timer</h1>

      <p className='text-lg mb-4'>
        {mode === 'work' ? 'Tiempo de trabajo' : mode === 'shortBreak' ? 'Descanso corto' : 'Descanso largo'}
      </p>
      <p className='text-6xl font-mono mb-8 text-white-400'>
        {formatTime(secondsLeft)}
      </p>
      <div className='flex gap-4 mb-4'>
        <button 
        onClick={startTimer}
        className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded'>
          Iniciar
        </button>
        <button 
        onClick={pauseTimer}
        className='bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded'>
          Pausar
        </button>
        <button 
        onClick={resetTimer}
        className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded'>
          Reiniciar
        </button>
      </div>
      <div className='flex gap-4'>
        <button 
        onClick={() => {
          setMode('work'); 
          setSecondsLeft(WORK_TIME);
          }}
          className={`px-3 py-1 rounded ${mode === 'work' ? 'bg-blue-500 hover:bg-blue-400' : 'bg-gray-700 hover:bg-gray-600'}`}>
            Trabajo
        </button>
        <button 
        onClick={() => {
          setMode('shortBreak'); 
          setSecondsLeft(SHORT_BREAK);
          }}
          className={`px-3 py-1 rounded ${mode === 'shortBreak' ? 'bg-blue-500 hover:bg-blue-400' : 'bg-gray-700 hover:bg-gray-600'}`}>
            Descanso corto
        </button>
        <button 
        onClick={() => {
          setMode('longBreak'); 
          setSecondsLeft(LONG_BREAK);
          }}
          className={`px-3 py-1 rounded ${mode === 'longBreak' ? 'bg-blue-500 hover:bg-blue-400' : 'bg-gray-700 hover:bg-gray-600'}`}>
            Descanso largo
        </button>
      </div>
    </div>
  );
}


export default App;