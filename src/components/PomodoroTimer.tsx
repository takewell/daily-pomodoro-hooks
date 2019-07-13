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
  const onClick = (): void => {
    const stop = () => {
      clearInterval(intervalId);
      setStop(isStop => {
        return !isStop;
      });
    };

    const start = () => {
      intervalId = setInterval(() => {
        setTime(time => {
          const next = time - 1;
          if (next === 0) {
            stop();
            if (isBreak) {
              setBreak(false);
              return POMODORO_TIME;
            } else {
              setBreak(true);
              return BREAK_TIME;
            }
          } else {
            window.document.title = calcTime(next);
            return next;
          }
        });
      }, 1000);
    };

    if (isStop) {
      setStop(false);
      start();
    } else {
      stop();
    }
  };

  const timerStyle = (() => {
    if (isStop) return {};
    return {
      animation: `${
        isBreak ? BREAK_TIME : POMODORO_TIME
      }s infinite linear App-logo-spin running`
    };
  })();

  return (
    <div className="pomodoro-timer">
      <div className="timer-view">
        <img src={logo} className="App-logo" alt="logo" style={timerStyle} />
        <p className="App-color timer-font">{calcTime(time)}</p>
      </div>
      <div className="switch-button-view">
        <button className="switch-bottom" onClick={onClick}>
          {isStop ? "Start" : "Stop"}
        </button>
      </div>
    </div>
  );
};
