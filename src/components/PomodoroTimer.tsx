import React, { useState } from "react";
import "./PomodoroTimer.css";
import logo from "../assets/logo.svg";

const POMODORO_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;
let intervalId: any;

export const PomodoroTimer: React.FC = () => {
  const [isStop, setStop] = useState(true);
  const [time, setTime] = useState(POMODORO_TIME);
  const [isBreak, setBreak] = useState(false);

  const calcTime = (time: number): string => {
    const totalSeconds = time;
    const minutes = (totalSeconds / 60) >> 0;
    const seconds = totalSeconds % 60;
    return [minutes, seconds]
      .map(value => String(value < 10 ? "0" + value : value))
      .join(":");
  };

  /**
   * TODO: refactor useReducer
   */
  const onClick = () => {
    if (isStop) {
      setStop(false);
      intervalId = setInterval(() => {
        setTime(time => {
          const next = time - 1;
          window.document.title = calcTime(next)
          return next;
        });
        if (time === 0) {
          if (isBreak) setTime(POMODORO_TIME);
          else setTime(BREAK_TIME);
          setBreak(!isBreak);
        }
      }, 1000);
    } else {
      setStop(true);
      clearInterval(intervalId);
    }
  };

  return (
    <div className="pomodoro-timer">
      <div className="timer-view">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={{
            animation: `App-logo-spin infinite 1500s linear ${
              isStop ? "paused" : "running"
            }`
          }}
        />
        <p className="App-color timer-font">{calcTime(time)}</p>
      </div>
      <div className="switch-button-view">
        <button
          className="switch-bottom"
          onClick={onClick}
        >
          {isStop ? "Start" : "Stop"}
        </button>
      </div>
    </div>
  );
};
