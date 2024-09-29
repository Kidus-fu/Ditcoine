import { useState,useEffect } from 'react'

import Home from './pages/Home'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AboutUs from './pages/About';
import NotFind from './pages/NotFind'
import NewsCard from './compount/NewsCard'
import Login from './pages/login'
import ProtectedRoute from './compount/Lgin'
import Register from './pages/regester'

import SingleNews from './compount/SingleNews'

function App() {
 
  
  return (
    <>
   <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/News' element={<NewsCard/>} />
        <Route path='*' element={<NotFind />} />
      
        <Route path='/' element={
          <ProtectedRoute >
          <Home />
          </ProtectedRoute>
          } />
           <Route path="/news/:id" element={<SingleNews />} />
       <Route path='/regester' element={<Register />} />
        <Route element={<AboutUs />} path='/About' />
</Routes>
</BrowserRouter>

     
    </>
  )
}

export default App
