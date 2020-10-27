import React from 'react'
import './Moviejeeves.css';
require('dotenv').config();


function apiGenerator(genre, platform){
  var key = process.env.APIKEY
  // turn genre into query

  // turn platform into query

  // send to displayMovie
}

class Moviejeeves extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      platform: '',
      genre: '',
      movie: ''
    };
    this.genreChange = this.genreChange.bind(this);
    this.platformChange = this.platformChange.bind(this);
    this.searchChange = this.searchChange.bind(this);
  }

  genreChange(event){
    this.setState({genre: event.target.value})
  }

  platformChange(event){
    this.setState({platform: event.target.value})
  }

  searchChange(event){
    var genreQuery = this.state.genre;
    var platformQuery =  this.state.platform;
    apiGenerator(genreQuery, platformQuery);
  }

  displayMovie(apiQuery){

  }

  render(){
    return(
      <div className='movie_container'>
        <div className='buttons_container'>
          <select className='genre_button' onChange={this.genreChange}>
            <option selected value=''>Genre</option>
            <option value='action'>Action</option>
            <option value='horror'>Horror</option>
            <option value='comedy'>Comedy</option>
            <option value='animated'>Animated</option>
            <option value='thriller'>Thriller</option>
            <option value='rom com'>Rom Com</option>
            <option value='drama'>Drama</option>

          </select>
          <select className='genre_button' onChange={this.platformChange}>
            <option selected value=''>Platform</option>
            <option value='netflix'>Netflix</option>
            <option value='hulu'>Hulu</option>
            <option value='disney'>Disney+</option>
            <option value='hbo'>HBO</option>
          </select>
        </div>
        <div className='button_container'>
          <button className='find_movieButton' onClick={this.searchChange}>MOVIESSS</button>
        </div>

        {this.state.movie === true && <div className='movie_display'>
          <span className='movie_title'></span>
          <img src='#' alt='Coming Soon'></img>
        </div>
        }
    </div>
    )
  }
}

export default Moviejeeves;
