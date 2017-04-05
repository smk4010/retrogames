import '../dist/css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

//filestack api key
filepicker.setKey("AHDzy8LaOQ426z5MKlyy0z");

//Views rendered in #content div
ReactDOM.render(
  Routes,
  document.getElementById('content')
);
