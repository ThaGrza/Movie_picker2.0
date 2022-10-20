import React from 'react';
import './App.css';
import Moviejeeves from './components/moviejeeves/Moviejeeves'
import Banner from './components/banner/Banner';
import Footer from './components/footer/Footer';


function App() {
  return (
    <div className='app-container'>
      <Banner />
      <Moviejeeves />
      <Footer />
    </div>
  );
}

export default App;
