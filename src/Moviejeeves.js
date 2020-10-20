import React from 'react'
import './Moviejeeves.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


class Moviejeeves extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      platform: '',
      dropdown: false
    };
  }

  platformChange(event){
    this.setState({platform: event.target.value})
  };
  
  // platformChange(event){
  //   this.setState({platform: event.target.value})
  // };

  render(){
    return(
    <div className='movie_container'>
      <div className="buttons_container">
        <DropdownButton id="dropdown-basic-button" className='genre_button' title="Genre">
          <Dropdown.Item href="/">Action</Dropdown.Item>
          <Dropdown.Item href="/">Comedy</Dropdown.Item>
          <Dropdown.Item href="/">Drama</Dropdown.Item>
          <Dropdown.Item href="/">Horror</Dropdown.Item>
          <Dropdown.Item href="/">Thriller</Dropdown.Item>
          <Dropdown.Item href="/">Animated</Dropdown.Item>
          <Dropdown.Item href="/">Romantic Comedy</Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" className='genre_button' title="Platform">
          <Dropdown.Item href="#/action-1">Netflix</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Hulu</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Disney+</Dropdown.Item>
          <Dropdown.Item href="#/action-3">HBO</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="button_container">
        <button className='find_movieButton'>Big Red Button</button>
      </div>
    </div>
    )
  }
}

export default Moviejeeves;