import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faPause, faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import alarmSound from "../sounds/Clock-gong-sound.mp3";
import {playOrPause, changeCurrentActivity, setClockValues, countDown, stopRinging} from "../features/clock";

const CurrentBox = () => {
    const currentActivity = useSelector(state => state.currentActivity);
    const time = useSelector(state => state.times[currentActivity]);
    const play = useSelector(state => state.nowPlaying);
    const timeLeft = useSelector(state => state.clockValues);
    const ring = useSelector(state => state.ringing);
    const dispatch = useDispatch();
    const alarm = new Audio(alarmSound);

    useEffect(() => {
        const interval = setInterval(() => {
            play && dispatch(countDown());
            if (timeLeft.minutes === 0 && timeLeft.seconds === 0) alarm.play();
        }, 1000);
        return () => clearInterval(interval);
    }, [play]);

    useEffect(() => {
        dispatch(setClockValues({minutes: time, seconds: 0}))
    }, [time]);

    useEffect(() => {
        if (ring) {
            alarm.play();
            dispatch(stopRinging());
        }
    }, [ring]);

    function resetTimer() {
        dispatch(playOrPause(false));
        dispatch(changeCurrentActivity('Session'));
        dispatch(setClockValues({minutes: time, seconds: 0}));
    }

    return (
        <div>
            <div className="current-box">
                <h2>{currentActivity}</h2>
                <div className="time-left">
                    {timeLeft.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}
                    :
                    {timeLeft.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}
                </div>
            </div>
            <div className="controls">
                <FontAwesomeIcon className="click-me" icon={faPlay} onClick={() => dispatch(playOrPause(true))}/>
                <FontAwesomeIcon className="click-me" icon={faPause} onClick={() => dispatch(playOrPause(!play))}/>
                <FontAwesomeIcon className="click-me" icon={faSyncAlt} onClick={resetTimer}/>
            </div>
        </div>
    );
};

export default CurrentBox;