import React from 'react'
import './Moviejeeves.css';
import Axios from 'axios';
require('dotenv').config();




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

  getMovie(query){

    Axios.get(query)
      .then(res => {
        console.log(res);
        this.setState({movieDisplay: true});
        this.setState({movieName: res.data.title})
        this.setState({movieImg: res.data.backdrop_path})
        console.log(this.state.movieImg)
        console.log(this.state.movieName)
      })
      .catch(err => {
        if(err.response.status === 404){
          this.setState({movieName: 'Could not find movie, Please try again'});
          this.setState({movieImg: ''});
        }
        console.log(err);
    });
  }

  searchChange(event){
    let genreQuery = this.state.genre;
    let platformQuery =  this.state.platform;
    let key = process.env.REACT_APP_API_KEY;
    let baseUrl = 'https://api.themoviedb.org/3/movie/'
    let randomMovie = Math.floor(Math.random() * 10000) + 1;
    let language = '&language=en-US';

    let query = baseUrl + randomMovie + '?api_key=' + key + language;
    this.getMovie(query);
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
          <span className='movie_title'>{this.state.movieName}</span>
          <img src={'https://image.tmdb.org/t/p/w500/' + this.state.movieImg} className='movie_image' alt='Image Not Found'></img>
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
