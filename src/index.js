import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PasswordProtected from './PasswordProtected';
//Remove later tktktk
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <React.StrictMode>
    <PasswordProtected />
  </React.StrictMode>,
  document.getElementById('root')
);