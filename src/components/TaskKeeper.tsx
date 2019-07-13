import React, { useState, KeyboardEvent } from "react";
import "./TaskKeeper.css";

export const TaskKeeper: React.FC = () => {
  const keepInitState: { id: number; title: string; text: string }[] = [];
  const [keeps, setKeeps] = useState(keepInitState);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && e.metaKey) {
      e.preventDefault();
      setKeeps([
        ...keeps,
        {
          id: keeps.length,
          title: e.currentTarget.value,
          text: ""
        }
      ]);
      e.currentTarget.value = "";
    }
  };

  return (
    <div className="task-keeper">
      <input
        className="create-keeptask"
        type="text"
        placeholder="input memo"
        onKeyDown={onKeyDown}
      />
      {keeps.map((e, i) => (
        <div key={i} className="keep">
          <h2>{e.title}</h2>
          <p>{e.text}</p>
        </div>
      ))}
    </div>
  );
};
