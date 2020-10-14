import React from 'react'
import './Moviejeeves.css';
import Dropdown from 'react-bootstrap/DropdownButton';




function Moviejeeves() {
  return (
    <div className='movie_container'>
      <div className='genre_selectContainer'>
        <Dropdown id="dropdown-basic-button"  onClick className='genre_button' title="Genre">
          <Dropdown.Item href="/">Action</Dropdown.Item>
          <Dropdown.Item href="/">Comedy</Dropdown.Item>
          <Dropdown.Item href="/">Drama</Dropdown.Item>
          <Dropdown.Item href="/">Horror</Dropdown.Item>
          <Dropdown.Item href="/">Thriller</Dropdown.Item>
          <Dropdown.Item href="/">Animated</Dropdown.Item>
          <Dropdown.Item href="/">Romantic Comedy</Dropdown.Item>
        </Dropdown>
      </div>



      <div className='=platform_selectContainer'>
        <Dropdown id="dropdown-basic-button" onClick className='genre_button' title="Platform">
          <Dropdown.Item href="#/action-1">Netflix</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Hulu</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Disney+</Dropdown.Item>
          <Dropdown.Item href="#/action-3">HBO</Dropdown.Item>
        </Dropdown>
      </div>

      <div className='movie_buttonContainer'>
        <button className='find_movieButton'>Big Red Button</button>
      </div>

    </div>
  )
}

export default Moviejeeves
