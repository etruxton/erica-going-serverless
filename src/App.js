import React, { useState } from "react";
import "./App.css"
//import jwt_decode from "jwt-decode";

function App() {

  //var decoded=jwt_decode(token);
  //console.log(decoded);

  //console.log(parseJwt(token));
  //console.log(encodeJwtPlease());

  const [input, setInput] = useState([{ header: "", payload: "", vsig: "", token: ""}]);

  

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...input];
    list[index][name] = value;
    setInput(list);
  };
  const json = JSON.stringify(input);
  const obj = JSON.parse(json);
  console.log(obj[0].token);
  console.log(JSON.stringify(parseJwt(obj[0].token)).replace(/","/g,"\",\n\""))
  var token = JSON.stringify(parseJwt(obj[0].token)).replace(/","/g,"\",\n\"");
  //console.log(JSON.stringify(parseJwt(token)));
  return (
    <body>
      <h1 class="App">Erica Going Serverless</h1>
      {input.map((x, i) => {
        return (
          <div class="textInput">
            <textarea
              name="token"
              placeholder="Please Enter JWT Token."
              value={x.token}
              onChange={e => handleInputChange(e, i)}
              cols="60" rows="10"
            />
            </div>
        );
      })}
      <div class = "textOutput">
        <h2>
          Payload:
          {'\n'}
          {token}
        </h2>
      </div>
      
    </body>
  );
}

function parseJwt (token) {
  try {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (err) {
    console.log(err.message);
    return {error: "invalid JWT token"}; 
  }
  return JSON.parse(jsonPayload);
};
/*function encodeJwtPlease() {
  const sign = require('jwt-encode');
  const secret = 'super secret key';
  const data = {
    text: "encoded text"
  };
  const jwt = sign(data, secret);
  return jwt;
};*/

export default App;
