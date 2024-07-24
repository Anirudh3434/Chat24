// src/App.js
import { useState, useEffect } from 'react';
import './App.css';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Loader from './Component//Loader/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
