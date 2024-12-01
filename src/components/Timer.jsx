import React, { useEffect, useState } from 'react'

const Timer = () => {
    const [time,setTime]= useState(0)
    const [isRunning,setIsRunning] = useState(false)
    const [editState,setEditState] = useState({
        field: ''
    })
    const [timer,setTimer] = useState(null)

    const handleCountDown = ()=>{
        setTime(time=>{return ((time-1)>0?(time-1):(0))})
    }

    useEffect(()=>{
        if(isRunning===true){
            console.log("here", isRunning)
            const timer = setInterval(handleCountDown,1000)
            setTimer(timer)
        }else{
            clearInterval(timer)
            setTimer(null)
        }
    },[isRunning])

    const calculateTime = (hours,minutes,seconds)=>{
        const calculatedTime = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
        return calculatedTime
    }
    const formatTime = (time)=>{
        return {hours: Math.floor(time / 3600),minutes: Math.floor(time % 3600 / 60), seconds: Math.floor(time % 3600 % 60)}
    }

    useEffect(()=>{
        const totalTime = formatTime(time)
        document.getElementById("hour").value = totalTime.hours
        document.getElementById("minute").value = totalTime.minutes
        document.getElementById("second").value = totalTime.seconds
        if(time===0){
            setIsRunning(false)
            clearInterval(timer)
            setTimer(null)
        }
    },[time])

    const handlePlayClick = ()=>{
            const hour = document.getElementById("hour").value || 0
            const minute = document.getElementById("minute").value || 0
            const second = document.getElementById("second").value || 0
            const time = calculateTime(hour,minute,second)
            setTime(time)
            if(time!==0){
                setIsRunning(!isRunning)
            }
    }

    const handleStopClick = ()=>{
        setIsRunning(!isRunning)
    }

    const handleResetClick = ()=>{
        setIsRunning(false)
        setTime(0)
        clearInterval(timer)
        setTimer(null)
    }

    const handleInputChange = (e)=>{
        const value = e.target.value
        const name = parseInt(e.target.name)
        console.log(name,value,e.target.max)
        if(value.length>1){
            if(name<2){
                document.getElementsByTagName(`input`)[name+1].focus()
            }
            else{
                document.getElementsByTagName(`input`)[0].focus()
            }
        }
    }
  return (
    <div style={{display:'flex',justifyContent:'center',height:'100vh',alignItems:'center', width:'100%'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'100px'}}>
        <div style={{display:'flex',justifyContent:'center', gap:'100px'}}>
            <input type="number" name="0" id="hour" style={{border:0,backgroundColor:'#242424',textAlign:'center',fontSize:'3rem'}} min={0} max={99} onChange={handleInputChange}/>
            <span style={{fontSize:'2rem'}}>:</span>
            <input type="number" name="1" id="minute" style={{border:0,backgroundColor:'#242424',textAlign:'center',fontSize:'3rem',}} min={0} max={59} onChange={handleInputChange}/>
            <span style={{fontSize:'2rem'}}>:</span>
            <input type="number" id='second' name='2' style={{border:0,backgroundColor:'#242424',textAlign:'center',fontSize:'3rem',}} min={0} max={59} onChange={handleInputChange}/>
        </div>
        <div style={{display:'flex', justifyContent:'center', gap:'100px', fontSize:'1.5rem'}}>
            <button onClick={handlePlayClick} hidden={isRunning}>Play</button>
            <button hidden={!isRunning} onClick={handleStopClick}>Stop</button>
            <button onClick={handleResetClick}>Reset</button>
        </div>
        </div>       
    </div>
  )
}

export default Timer
