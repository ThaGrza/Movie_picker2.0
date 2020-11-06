import React from 'react';
import './App.css';
import Moviejeeves from './Moviejeeves';
import Header from './Header';
import Footer from './Footer';


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
