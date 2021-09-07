import React from 'react';
import './App.css';
import Moviejeeves from './components/Moviejeeves'
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <div className='app_container'>
      <Header />
      <Moviejeeves />
      <Footer />
    </div>
  );
}

export default App;
