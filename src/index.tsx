import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "@arco-design/web-react/dist/css/arco.css";
import './index.less'
import { BrowserRouter } from "react-router-dom";

const element = document.getElementById('root');

const Root = () =>  <BrowserRouter><App /></BrowserRouter>; 

if(element) {
  createRoot(element).render(<Root />)
}