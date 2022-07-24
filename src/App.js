import React, { useState } from "react";
import "./App.css"
function App() {
  const [input, setInput] = useState([{ text: ""}]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...input];
    list[index][name] = value;
    setInput(list);
  };
  const json = JSON.stringify(input);
  const obj = JSON.parse(json);
  return (
    <body>
      <h1 class="App">Erica Going Serverless</h1>
      {input.map((x, i) => {
        return (
          <div class="App">
            <input
              name="text"
              placeholder="Enter text"
              value={x.text}
              onChange={e => handleInputChange(e, i)}
            />
          </div>
        );
      })}
      <h2 class="App">{obj[0].text}</h2>
    </body>
  );
}

export default App;
