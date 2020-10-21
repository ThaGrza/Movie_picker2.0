import React from 'react'
import './Moviejeeves.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


class Moviejeeves extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      platform: '',
      genre: '',
      search: ''
    };
  }

  genreChange(event){
    this.setState({genre: event.target.value})
  };

  platformChange(event){
    this.setState({platform: event.target.value})
  };

  searchChange(event){
    this.setState({search: event.target.value})
    console.log(this.state)
    console.log(" IS THIS BUTTON WORKING"); 
  }
  

  render(){
    return(
    <div className='movie_container'>
      <div className="buttons_container">
        <DropdownButton id="dropdown-basic-button" onChange={this.genreChange.bind(this)} className='genre_button' title="Genre">
          <Dropdown.Item>Action</Dropdown.Item>
          <Dropdown.Item>Comedy</Dropdown.Item>
          <Dropdown.Item href="/">Drama</Dropdown.Item>
          <Dropdown.Item href="/">Horror</Dropdown.Item>
          <Dropdown.Item href="/">Thriller</Dropdown.Item>
          <Dropdown.Item href="/">Animated</Dropdown.Item>
          <Dropdown.Item href="/">Romantic Comedy</Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" onChange={this.platformChange.bind(this)} className='genre_button' title="Platform">
          <Dropdown.Item id="Netflix" href="/">Netflix</Dropdown.Item>
          <Dropdown.Item href="/">Hulu</Dropdown.Item>
          <Dropdown.Item href="/">Disney+</Dropdown.Item>
          <Dropdown.Item href="/">HBO</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="button_container">
        <button className='find_movieButton' onClick={this.searchChange.bind(this)} >GIVE ME A MOVIE</button>
      </div>
    </div>
    )
  }
}

export default Moviejeeves;