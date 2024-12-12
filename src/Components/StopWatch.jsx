import React, { useCallback, useRef, useState } from 'react'

const StopWatch = () => {
    const [time, setTime] = useState(0);
    const [isTimeStarted, setIsTimeStarted] = useState(false);
    const ref = useRef();

    const formatTime = (time) => {
        const getSec = `0${time % 60}`.slice(-2);
        const min = Math.floor(time/60);
        const getMin = `0${min % 60}`.slice(-2);
        const hrs = Math.floor(time/3600);
        const getHrs = `0${hrs}`.slice(-2);
        return `${getHrs} : ${getMin} : ${getSec}`
    }

    const handleStartTimer = useCallback(() => {
        if(!isTimeStarted) {
            setIsTimeStarted(true);
            ref.current = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
        }
    }, [isTimeStarted]);

    const handleStopTimer = useCallback(() => {
        if(isTimeStarted) {
            clearInterval(ref.current);
            setIsTimeStarted(false);
        }
    }, [isTimeStarted])

    const handleResetTimer = () => {
        clearInterval(ref.current);
        setIsTimeStarted(false);
        setTime(0);
    }
  return (
    <div>
        <div>{formatTime(time)}</div>
        <button onClick={() => handleStartTimer()}>Start Timer</button>
        <button onClick={() => handleStopTimer()}>Stop Timer</button>
        <button onClick={() => handleResetTimer()}>Reset Timer</button>
    </div>
  )
}

export default StopWatch