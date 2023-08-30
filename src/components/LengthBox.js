import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown , faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from "react-redux";
import {changeBreakTime, changeSessionTime} from "../features/clock";

const LengthBox = ({activity}) => {

    const play = useSelector(state => state.nowPlaying);
    const time = useSelector(state => state.times[activity]);
    const dispatch = useDispatch();

    function changeTime(dif) {
        if (play) return;
        if (time + dif <= 60 && time + dif > 0) {
            if (activity === 'Break') {
                dispatch(changeBreakTime(dif))
            } else {
                dispatch(changeSessionTime(dif))
            }
        }
    }

    return (
        <div className="activity-box">
            <h2>{activity} Length</h2>
            <div className="time-controls">
                <FontAwesomeIcon className="click-me" icon={faArrowDown} onClick={() => changeTime(-1)} />
                <span>{time}</span>
                <FontAwesomeIcon className="click-me" icon={faArrowUp} onClick={() => changeTime(+1)} />
            </div>
        </div>
    );
};

export default LengthBox;