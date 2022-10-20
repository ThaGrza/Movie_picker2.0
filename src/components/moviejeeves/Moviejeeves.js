import React from 'react'
import './Moviejeeves.css';
import Axios from 'axios';
require('dotenv').config();

const language = '&language=en-US';
// const key = process.env.REACT_APP_API_KEY;
const key = '5f9630b664fee3f1c639e0ae94090867'
const baseUrl = 'https://api.themoviedb.org/3/movie/';
const similarSearch= '/similar?api_key=';


export default class Moviejeeves extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      movieDisplay: '',
      movieLang: '',
      movieRelease: '',
      movieImg: '',
      movieTitle: '',
      description: '',
      similarMovie: '',
      movieId: '',
      movieImageNotFound: 'https://media1.tenor.com/images/ef4c232dab28b7581497cee047f21969/tenor.gif?itemid=5521264'
    };
    this.searchChange = this.searchChange.bind(this);
    this.randomizer = this.randomizer.bind(this);
    this.getSimilar = this.getSimilar.bind(this);
  }

  searchChange(event){
    this.randomizer(event);
  }

  getSimilar(event){
    let query = baseUrl + this.state.movieId + similarSearch + key + language;
    Axios.get(query)
      .then(res => {
        console.log(res);
        let simResults = Math.floor(Math.random() * res.data.results.length)
        console.log(simResults);
        if(res.data.adult === true || res.data.results[simResults].backdrop_path === null){
          this.getSimilar();
        }else{
          this.setState({movieTitle: res.data.results[simResults].title})
          this.setState({movieImg: res.data.results[simResults].backdrop_path})
          this.setState({releaseDate: res.data.results[simResults].release_date})
          this.setState({description: res.data.results[simResults].overview})
          this.setState({movieDisplay: true});
          this.setState({similarMovie: true});
        }
      })
      .catch(err => {
        if(err.response === 'TypeError'){
          this.randomizer();
          console.log(err);
        }else{
          this.setState({movieDisplay: false})
          this.setState({movieTitle: "No Similar Movies Found, Try Finding Another Movie"})
          console.log(err);
        }
    });
  }

  truncate(str, n){
     return str?.length > n ? str.substr(0, n -1) + ' ...' : str;
  }

  randomizer(event){
    let randomMovie = Math.floor(Math.random() * 300000) + 1;
    let query = baseUrl + randomMovie + '?api_key=' + key + language;
    this.setState({movieId: randomMovie})
    this.getMovie(query);
  }

  getMovie(query){
    Axios.get(query)
      .then(res => {
        console.log(res);
        if(res.data.adult === true || res.data.backdrop_path === null){
          this.setState({similarMovie: false});
          this.randomizer();
        }else{
          this.setState({movieDisplay: true});
          this.setState({similarMovie: true});
          this.setState({movieTitle: res.data.title})
          this.setState({movieImg: res.data.backdrop_path})
          this.setState({releaseDate: res.data.release_date})
          this.setState({description: res.data.overview})
        }
      })
      .catch(err => {
        if(err.response.status === 404){
          this.randomizer();
        }
        console.log(err);
    });
  }

  render(){
    return(
      <div className='movie-container'>
        {this.state.movieDisplay === false && <div className='movie-display'>
          <img src={this.state.movieImageNotFound} className='movie-image' alt='Not Found'/>
          <h1 className='noMovieFound'>{this.state.movieTitle}</h1>
          </div>
        }

        {this.state.movieDisplay === true && <div className='movie-display'>
          <div className='movie-info'>
            <h1 className='movie-title'>{this.state.movieTitle}</h1>
            <img src={'https://image.tmdb.org/t/p/w500/' + this.state.movieImg} className='movie-image' alt='Found'/>
            <p className='movie-desc'>{this.state.description}</p>
          </div>
        </div>
        }
        <div className='button-container'>
          <button className='find-movieButton' onClick={this.searchChange}>Randomizer</button>
        { this.state.similarMovie === true &&
          <button className='find-movieButton' onClick={this.getSimilar}>Similar To This</button>
        }
        </div>
    </div>
    )
  }
}