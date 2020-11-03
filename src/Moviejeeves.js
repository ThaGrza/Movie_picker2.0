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

  randomizer(genre, platform){
    let key = process.env.REACT_APP_API_KEY;
    let baseUrl = 'https://api.themoviedb.org/3/movie/'
    let randomMovie = Math.floor(Math.random() * 10000) + 1;
    let language = '&language=en-US';
    let query = baseUrl + randomMovie + '?api_key=' + key + language;
    this.getMovie(query);
  }


  getMovie(query){
    Axios.get(query)
      .then(res => {
        console.log(res);
        this.setState({movieDisplay: true});
        this.setState({movieName: res.data.title})
        this.setState({movieImg: res.data.backdrop_path})
      })
      .catch(err => {
        if(err.response.status === 404){
          this.randomizer()
        }
        console.log(err);
    });
  }

  searchChange(event){
    let genreQuery = this.state.genre;
    let platformQuery =  this.state.platform;
    this.randomizer(genreQuery, platformQuery);
  }

  render(){
    return(
      <div className='movie_container'>
        <div className='buttons_container'>
          <select className='genre_button' onChange={this.genreChange}>
            <option defaultValue=''>Genre</option>
            <option value='28'>Action</option>
            <option value='12'>Adventure</option>
            <option value='16'>Animation</option>
            <option value='35'>Comedy</option>
            <option value='80'>Crime</option>
            <option value='99'>Documentary</option>
            <option value='18'>Drama</option>
            <option value='10751'>Family</option>
            <option value='14'>Fantasy</option>
            <option value='36'>History</option>
            <option value='27'>Horror</option>
            <option value='10402'>Music</option>
            <option value='9648'>Mystery</option>
            <option value='10749'>Romance</option>
            <option value='878'>Science Fiction</option>
            <option value='53'>Thriller</option>
            <option value='10752'>War</option>
            <option value='37'>Western</option>
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
