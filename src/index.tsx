import './index.css';
import App from './components/app';
import ReactDOM from 'react-dom';
import React from 'react';
// import reportWebVitals from './reportWebVitals';
const pageSize = Math.ceil((window.innerHeight - 300) / 200) * 4;

ReactDOM.render(
  <React.StrictMode>
    <App pageSize={pageSize}/>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
