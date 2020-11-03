import React from 'react'
import './Moviejeeves.css';
import Axios from 'axios';
require('dotenv').config();

class Moviejeeves extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      movieDisplay: '',
      movieImg: '',
      movieName: '',
      movieImageNotFound: 'https://media1.tenor.com/images/ef4c232dab28b7581497cee047f21969/tenor.gif?itemid=5521264'
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
        this.setState({movieName: res.data.title})
        this.setState({movieImg: res.data.backdrop_path})
        console.log(res);
        if (res.data.backdrop_path === null){
          this.setState({movieDisplay: false});
        }else{
          this.setState({movieDisplay: true});
        }
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
        {this.state.movieDisplay === true && <div className='movie_display'>
          <span className='movie_title'>{this.state.movieName}</span>
          <img src={'https://image.tmdb.org/t/p/w500/' + this.state.movieImg} className='movie_image' alt='Found'/>
        </div>
        }
        {this.state.movieDisplay === false && <div className='movie_display'>
          <span className='movie_title'>{this.state.movieName}</span>
          <span className='movie_image_NotFound'>Couldn't Find an Image</span>
          <img src={this.state.movieImageNotFound} className='movie_image' alt='Not Found'/>
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
