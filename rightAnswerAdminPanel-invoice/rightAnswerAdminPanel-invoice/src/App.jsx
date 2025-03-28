import { useState } from 'react'
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import { Route, Routes, useRoutes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Landing from './landing'
import AddItem from './addItems'
import TableOrder from './TableOrder'
import Orderhistory from './Orderhistory'
import GenerateQrCode from './GenerateQrCode'
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route exact path="" element={<Landing/>}/>
    <Route exact path="addItem" element={<AddItem/>}/>
    <Route exact path="tableOrder" element={<TableOrder/>}/>
    <Route exact path="orderhistory" element={<Orderhistory/>}/>
    <Route exact path="generate-qr-code" element={<GenerateQrCode/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App
