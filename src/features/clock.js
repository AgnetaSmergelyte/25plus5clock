import {createSlice} from "@reduxjs/toolkit";

export const clockSlice = createSlice({
    name: "clock",
    initialState: {
        currentActivity: 'Session',
        nowPlaying: false,
        times: {
            Break: 5,
            Session: 25
        },
        clockValues: {
            minutes: 25,
            seconds: 0
        },
        ringing: false
    },
    reducers: {
        changeBreakTime: (state, action) => {
            state.times.Break += action.payload
        },
        changeSessionTime: (state, action) => {
            state.times.Session += action.payload
        },
        playOrPause: (state, action) => {
            state.nowPlaying = action.payload
        },
        changeCurrentActivity: (state, action) => {
            state.currentActivity = action.payload
        },
        setClockValues: (state, action) => {
            state.clockValues = action.payload;
        },
        countDown: (state, action) => {
            if (state.clockValues.minutes === 0 && state.clockValues.seconds === 0) {
                state.ringing = true;
                if (state.currentActivity === 'Session') {
                    state.currentActivity = 'Break'
                    state.clockValues.minutes = state.times.Break;
                    state.clockValues.seconds = 0;
                } else {
                    state.currentActivity = 'Session'
                    state.clockValues.minutes = state.times.Session;
                    state.clockValues.seconds = 0;
                }
            } else if (state.clockValues.seconds === 0) {
                state.clockValues.minutes -= 1;
                state.clockValues.seconds = 59;
            } else {
                state.clockValues.seconds -= 1;
            }
        },
        stopRinging: (state, action) => {
            state.ringing = false;
        }
    }
});

export const {
    changeBreakTime,
    changeSessionTime,
    playOrPause,
    changeCurrentActivity,
    setClockValues,
    countDown,
    stopRinging
} = clockSlice.actions;
export default clockSlice.reducer;