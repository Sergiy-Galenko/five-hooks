import React from "react";
import useInput from "./hooks/useInput";

function App() {
  const username = useInput('');
  const password = useInput('');

  return (
    <div className="App">
      <input {...username} type="text" placeholder="username"></input>
      <input {...password} type="text" placeholder="password"></input>
      <button>Click</button>
    </div>
  );
}

export default App;
