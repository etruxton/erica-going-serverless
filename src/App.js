import React, { useState } from "react";
import { useSnackbar } from 'react-simple-snackbar'
import { CopyToClipboard } from "react-copy-to-clipboard";

import "./App.css"
//import jwt_decode from "jwt-decode";

function App() {
  
  const [openSnackbar] = useSnackbar(snack());
  const [input, setInput] = useState([{ header: "", payload: "", vsig: "", token: ""}]);

  
  //const tokenTest = "eyJhbGciOiJSUzI1NiIsImtpZCI6IkdnSmpWaFVncFlWMXlDd1hfYTk1dXBLVnpRcyJ9.eyJzdWIiOiJDSEFELkhBUlRNQU5AaW50LmFzdXJpb24uY29tIiwiYXVkIjoiQ2hhZFRlc3Q0IiwianRpIjoidGxxcTJoQzFIUGh3QmV2Q1k3ampvRSIsImlzcyI6Imh0dHBzOi8vbmRjc3NvZGV2LmFzdXJpb24uY29tOjkwMzEiLCJpYXQiOjE2MjEwMTQwOTYsImV4cCI6MTYyMTAxNDM5NiwiZW1wbG95ZWVJZCI6IjIxNjUzOSIsImdpdmVuX25hbWUiOiJDaGFkIiwiZmFtaWx5X25hbWUiOiJIYXJ0bWFuIiwiZW1haWwiOiJDSEFELkhBUlRNQU5AYXN1cmlvbi5jb20iLCJwaS5zcmkiOiJudURMTG93UzNrM2d4TEo4RmJISWZCenNBOFEuVGcubnJaUSIsIm5vbmNlIjoiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoifQ.E8u_awH7TkvCpYDpBEa7aDK_51s216dEI7SNhK-"
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
  console.log(JSON.stringify(parseJwtPayload(obj[0].token)).replace(/","/g,"\",\n\""))
  var tokenHeader = JSON.stringify(parseJwtHeader(obj[0].token)).replace(/","/g,"\",\n\"");
  var tokenPayload = JSON.stringify(parseJwtPayload(obj[0].token)).replace(/","/g,"\",\n\"");
  //console.log(JSON.stringify(parseJwt(token)));
  
  let hobj = headerObj(tokenHeader);
  let hval = headerVal(tokenHeader);

  let pobj = payloadObj(tokenPayload);
  let pval = payloadVal(tokenPayload);

  return (
    <body>
      <h1 class="App">Erica Going Serverless</h1>
      {input.map((x, i) => {
        return (
          <div class="textInput">
            <textarea
              name="token"
              placeholder="Please Enter a JWT Token."
              value={x.token}
              onChange={e => handleInputChange(e, i)}
              cols="60" rows="10"
            />
            </div>
        );
      })}
      <div class = "textOutput">
        <h2 title="Copy Text">
          Header:
          {'\n'}
          <div>
          {hobj.map((x, i) => { 
            return (
              <CopyToClipboard
                  text={hval[i]}
                  onCopy={() => openSnackbar("Copied "+hval[i]+" to clipboard" )}>
                <div>
                {hobj[i]}
                &nbsp;
                </div>
              </CopyToClipboard>
            );
          })}
          </div>
        </h2>
        <h2>
          Payload:
          {'\n'}
          <div>
          {pobj.map((x, i) => { 
            return (
              <CopyToClipboard
                  text={pval[i]}
                  onCopy={() => openSnackbar("Copied "+pval[i]+" to clipboard" )}>
                <div>
                {pobj[i]}
                &nbsp;
                </div>
              </CopyToClipboard>
            );
          })}
          </div>
        </h2>
      </div>
    </body>
  );
}

function parseJwtHeader (token) {
  try {
    var base64Url = token.split('.')[0];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.log(err.message);
    return {error: "invalid JWT token"}; 
  }
};

function parseJwtPayload (token) {
  try {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (err) {
      console.log(err.message);
      return {error: "invalid JWT token"}; 
  }
};

function headerObj(tokenHeader) {
  let obj = JSON.parse(tokenHeader);
  let list = [];
  let count = 0;
  for (const property in obj) {
    list[count]=`${property}: ${obj[property]}`;
    count++;
  }
  console.log(list)
  return list;
};

function headerVal(tokenHeader) {
  var obj = JSON.parse(tokenHeader);
  var list = [];
  let count = 0;
  for (const property in obj) {
    list[count]=`${obj[property]}`;
    count++;
  }
  console.log(list)
  return list;
};

function payloadObj(tokenPayload) {
  let obj = JSON.parse(tokenPayload);
  let list = [];
  let count = 0;
  for (const property in obj) {
    list[count]=`${property}: ${obj[property]}`;
    count++;
  }
  console.log(list)
  return list;
};

function payloadVal(tokenPayload) {
  var obj = JSON.parse(tokenPayload);
  var list = [];
  let count = 0;
  for (const property in obj) {
    list[count]=`${obj[property]}`;
    count++;
  }
  console.log(list)
  return list;
};


function snack() {
  const options = {
    position: 'bottom-center',
    style: {
      backgroundColor: 'midnightblue',
      border: '2px solid lightgreen',
      color: 'lightblue',
      fontFamily: 'Menlo, monospace',
      fontSize: '20px',
      textAlign: 'center',
    },
    closeStyle: {
      color: 'lightcoral',
      fontSize: '16px',
    },
  }
  return options;
}

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