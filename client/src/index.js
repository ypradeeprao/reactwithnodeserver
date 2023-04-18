import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Imageupload} from './imageupload';
import {Videoeditor} from './imageupload';
import reportWebVitals from './reportWebVitals';
import {BuildImage2} from "./imageeditor";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <Sitecomp /> */}
    {/* <App /> */}
    {/* <Imageupload maxfilesize="300000" /> */}
    <Videoeditor />
    {/* <BuildImage2 /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
