import React from 'react'
import './Moviejeeves.css';
import Axios from 'axios';
require('dotenv').config();

function randomizer(genre, platform){
  let randMovie = Math.floor(Math.random() * 1000) + 1;
}


class Moviejeeves extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      platform: '',
      genre: '',
      movieDisplay: '',
      movieImg: '',
      movieName: ''
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
    let key = process.env.REACT_APP_API_KEY;
    let genreQuery = this.state.genre;
    let platformQuery =  this.state.platform;
    let baseUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + key + '&';

    // Change query url to right paths
    let query = baseUrl + genreQuery + platformQuery;
    console.log(query);


    Axios.get(query)
      .then(res => {
        console.log(res);
        this.setState({movieDisplay: true});
        this.setState({movieImg: res.data.results[0].backdrop_path})
        console.log(this.state.movieImg)
      })
      .catch(err => {
        console.log(err);
    });
  }

  render(){
    return(
      <div className='movie_container'>
        <div className='buttons_container'>
          <select className='genre_button' onChange={this.genreChange}>
            <option defaultValue=''>Genre</option>
            <option value='action'>Action</option>
            <option value='horror'>Horror</option>
            <option value='comedy'>Comedy</option>
            <option value='animated'>Animated</option>
            <option value='thriller'>Thriller</option>
            <option value='rom com'>Rom Com</option>
            <option value='drama'>Drama</option>

          </select>
          <select className='genre_button' onChange={this.platformChange}>
            <option defaultValue=''>Platform</option>
            <option value='netflix'>Netflix</option>
            <option value='hulu'>Hulu</option>
            <option value='disney'>Disney+</option>
            <option value='hbo'>HBO</option>
          </select>
        </div>
        {this.state.movieDisplay === true && <div className='movie_display'>
          <span className='movie_title'></span>
          <img src={'https://image.tmdb.org/t/p/w500/' + this.state.movieImg} alt='Coming Soon'></img>
        </div>
        }
        <div className='button_container'>
          <button className='find_movieButton' onClick={this.searchChange}>MOVIESSS</button>
        </div>
    </div>
    )
  }
}

export default Moviejeeves;
