import {createSlice} from "@reduxjs/toolkit";

export const clockSlice = createSlice({
    name: "clock",
    initialState: {
        currentActivity: 'Session',
        nowPlaying: false,
        times: {
            Break: 5,
            Session: 25
        }
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
        }
    }
});

export const {changeBreakTime, changeSessionTime, playOrPause, changeCurrentActivity} = clockSlice.actions;
export default clockSlice.reducer;