import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import alarmSound from "../sounds/Clock-gong-sound.mp3";
import {playOrPause, changeCurrentActivity} from "../features/clock";

const CurrentBox = () => {
    const currentActivity = useSelector(state => state.currentActivity);
    const time = useSelector(state => state.times[currentActivity]);
    const play = useSelector(state => state.nowPlaying);
    const dispatch = useDispatch();
    const [timeLeft, setTimeLeft] = useState({minutes: time, seconds: 0});
    const alarm = new Audio(alarmSound);

    useEffect(() => {
        setTimeLeft({minutes: time, seconds: 0});
    }, [time]);

    useEffect(() => {
        if (play) {
            setTimeout(() => {
                if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
                    alarm.play();
                    if (currentActivity === "Session") {
                        dispatch(changeCurrentActivity('Break'));
                    } else {
                        dispatch(changeCurrentActivity('Session'));
                    }
                } else if (timeLeft.seconds === 0) {
                    setTimeLeft({minutes: timeLeft.minutes - 1, seconds: 59});
                } else {
                    setTimeLeft({minutes: timeLeft.minutes, seconds: timeLeft.seconds - 1})
                }
            }, 1000);
        }
    }, [timeLeft, play]);

    function resetTimer() {
        dispatch(playOrPause(false));
        dispatch(changeCurrentActivity('Session'));
        setTimeLeft({minutes: time, seconds: 0});
    }

    return (
        <div>
            <div className="current-box">
                <h2>{currentActivity}</h2>
                <div className="time-left">
                    {timeLeft.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}
                    :
                    {timeLeft.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}
                </div>
            </div>
            <div className="controls">
                <FontAwesomeIcon className="click-me" icon={faPlay} onClick={() => dispatch(playOrPause(true))} />
                <FontAwesomeIcon className="click-me" icon={faPause} onClick={() => dispatch(playOrPause(!play))} />
                <FontAwesomeIcon className="click-me" icon={faSyncAlt} onClick={resetTimer} />
            </div>
        </div>
    );
};

export default CurrentBox;