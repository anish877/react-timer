import React, { useEffect, useState, useRef } from 'react';
import './Timer.css';

const Timer = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const timerRef = useRef(null);
    const circleRef = useRef(null);

    // Apply dark/light theme to body
    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
    }, [isDarkMode]);

    const handleCountDown = () => {
        setTime(prevTime => prevTime > 0 ? prevTime - 1 : 0);
    };

    useEffect(() => {
        if (isRunning && time > 0) {
            timerRef.current = setInterval(handleCountDown, 1000);
            return () => clearInterval(timerRef.current);
        } else if (time === 0) {
            setIsRunning(false);
            clearInterval(timerRef.current);
        }
    }, [isRunning, time]);

    useEffect(() => {
        if (circleRef.current) {
            const totalTime = calculateTime();
            const remainingPercentage = (time / totalTime) * 100;
            circleRef.current.style.strokeDashoffset = `${
                300 - (remainingPercentage / 100) * 300
            }px`;
        }
    }, [time]);

    const calculateTime = () => {
        const hour = parseInt(document.getElementById("hour").value) || 0;
        const minute = parseInt(document.getElementById("minute").value) || 0;
        const second = parseInt(document.getElementById("second").value) || 0;
        return hour * 3600 + minute * 60 + second;
    };

    const formatTime = (time) => ({
        hours: Math.floor(time / 3600),
        minutes: Math.floor((time % 3600) / 60),
        seconds: Math.floor(time % 60)
    });

    const handlePlayClick = () => {
        const totalTime = calculateTime();
        if (totalTime > 0) {
            setTime(totalTime);
            setIsRunning(true);
        }
    };

    const handleStopClick = () => {
        setIsRunning(prev => !prev);
    };

    const handleResetClick = () => {
        setIsRunning(false);
        setTime(0);
        clearInterval(timerRef.current);
        
        // Reset input fields
        document.getElementById("hour").value = "";
        document.getElementById("minute").value = "";
        document.getElementById("second").value = "";
    };

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        
        // Limit input to 2 digits
        if (value.length > 2) {
            e.target.value = value.slice(0, 2);
        }

        // Auto-focus to next input
        if (value.length === 2) {
            const inputs = document.getElementsByTagName('input');
            const currentIndex = parseInt(name);
            const nextIndex = (currentIndex + 1) % inputs.length;
            inputs[nextIndex].focus();
        }
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const { hours, minutes, seconds } = formatTime(time);

    return (
        <div className="timer-container">
            <div className="theme-toggle-container">
                <button 
                    onClick={toggleTheme} 
                    className="theme-toggle-btn"
                    aria-label="Toggle theme"
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
            </div>
            <div className="timer-card">
                {/* Circular Progress */}
                <div className="timer-circle-container">
                    <svg className="timer-svg" viewBox="0 0 100 100">
                        <circle 
                            cx="50" 
                            cy="50" 
                            r="48" 
                            className="timer-circle-bg"
                        />
                        <circle 
                            ref={circleRef}
                            cx="50" 
                            cy="50" 
                            r="48" 
                            className="timer-circle-progress"
                        />
                    </svg>
                    <div className="timer-display">
                        {hours.toString().padStart(2, '0')}:
                        {minutes.toString().padStart(2, '0')}:
                        {seconds.toString().padStart(2, '0')}
                    </div>
                </div>

                {/* Input Fields */}
                <div className="timer-inputs">
                    <input 
                        id="hour" 
                        name="0"
                        type="number" 
                        placeholder="HH" 
                        min="0" 
                        max="99"
                        onChange={handleInputChange}
                    />
                    <input 
                        id="minute" 
                        name="1"
                        type="number" 
                        placeholder="MM" 
                        min="0" 
                        max="59"
                        onChange={handleInputChange}
                    />
                    <input 
                        id="second" 
                        name="2"
                        type="number" 
                        placeholder="SS" 
                        min="0" 
                        max="59"
                        onChange={handleInputChange}
                    />
                </div>

                {/* Control Buttons */}
                <div className="timer-controls">
                    <button 
                        onClick={handlePlayClick}
                        className="btn-start"
                    >
                        {isRunning ? 'Pause' : 'Start'}
                    </button>
                    <button 
                        onClick={handleStopClick}
                        className="btn-stop"
                        disabled={time === 0}
                    >
                        {isRunning ? 'Pause' : 'Resume'}
                    </button>
                    <button 
                        onClick={handleResetClick}
                        className="btn-reset"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Timer;