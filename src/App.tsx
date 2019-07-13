import React from "react";
import "./App.css";
import { PomodoroTimer } from "./components/PomodoroTimer";
import { TaskKeeper } from "./components/TaskKeeper";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        {/* TODO: insert logo */}
        <span className="header-items">DailyPomodoro</span>
        <a className="header-items" style={{ fontSize: "20px" }} href="/">
          詳細
        </a>
      </header>
      <div
        style={{
          display: "flex",
          margin: "auto",
          padding: "0",
          height: "100vh",
          overflowY: "auto"
        }}
      >
        {/* モバイルサイズになったらメディアクエリによって制御する、もしくはコンポーネント側で端末を制御してもいいかもしれない */}
        <TaskKeeper />
        <PomodoroTimer />
      </div>
    </div>
  );
};

export default App;
