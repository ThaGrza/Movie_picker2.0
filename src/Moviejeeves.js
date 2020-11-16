import React from 'react'
import './Moviejeeves.css';
import Axios from 'axios';
require('dotenv').config();

const language = '&language=en-US';
const key = process.env.REACT_APP_API_KEY;
const baseUrl = 'https://api.themoviedb.org/3/movie/'


class Moviejeeves extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      movieDisplay: '',
      movieImg: '',
      movieTitle: '',
      releaseDate: '',
      genre: '',
      runtime: '',
      popularity: '',
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
    let query = baseUrl + this.state.movieId + '/similar' + '?api_key=' + key + language;
    Axios.get(query)
      .then(res => {
        let simResults = Math.floor(Math.random() * res.data.results.length)
        if(res.data.adult === true || res.data.backdrop_path === null){
          this.getSimilar();
        }else{
          this.setState({movieTitle: res.data.results[simResults].title})
          this.setState({movieImg: res.data.results[simResults].backdrop_path})
          this.setState({releaseDate: res.data.results[simResults].release_date})
          this.setState({genre: res.data.results[simResults].genre})
          this.setState({runtime: res.data.results[simResults].runtime})
          this.setState({popularity: res.data.results[simResults].popularity})
          this.setState({description: res.data.results[simResults].overview})
          this.setState({movieDisplay: true});
          this.setState({similarMovie: true});
        }
      })
      .catch(err => {
        if(err.response === 'TypeError'){
          this.getSimilar();
        }else{
          this.setState({movieDisplay: false})
          this.setState({movieTitle: "No Similar Movies Found, Try Finding Another Movie!"})
          console.log(err);
        }
    });
  }

  randomizer(event){
    let randomMovie = Math.floor(Math.random() * 300000) + 1;
    let query = baseUrl + randomMovie + '?api_key=' + key + language;
    this.setState({movieId: randomMovie})
    this.getMovie(query);
  }

  getMovie(query){
    let genreTypes = [];
    Axios.get(query)
      .then(res => {
        console.log(res);
        if(res.data.adult === true || res.data.backdrop_path === null){
          this.setState({similarMovie: false});
          this.randomizer();
        }else{
          this.setState({movieDisplay: true});
          this.setState({similarMovie: true});
          let genreNumber = res.data.genres.length;
          for(let i = 0; i < genreNumber; i++){
            genreTypes += res.data.genres[i].name + ' ';
          }
          this.setState({movieTitle: res.data.title})
          this.setState({movieImg: res.data.backdrop_path})
          this.setState({releaseDate: res.data.release_date})
          this.setState({genre: genreTypes})
          this.setState({runtime: res.data.runtime})
          this.setState({popularity: res.data.popularity})
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
      <div className='movie_container'>
        {this.state.movieDisplay === false && <div className='movie_display'>
          <img src={this.state.movieImageNotFound} className='movie_image' alt='Not Found'/>
          <h1 className='noMovieFound'>{this.state.movieTitle}</h1>
          </div>
        }
        
        {this.state.movieDisplay === true && <div className='movie_display'>
          <img src={'https://image.tmdb.org/t/p/w500/' + this.state.movieImg} className='movie_image' alt='Found'/>
          <table className='movieTable'>
            <tbody>
              <tr>
                <th className='table_heading'>Title:</th>
                <td className='table_data'>{this.state.movieTitle}</td>
              </tr>
              <tr>
                <th className='table_heading'>Release: Date</th>
                <td className='table_data'>{this.state.releaseDate}</td>
              </tr>
              <tr>
                <th className='table_heading'>Genre:</th>
                <td className='table_data'>{this.state.genre}</td>
              </tr>
              <tr>
                <th className='table_heading'>Runtime:</th>
                <td className='table_data'>{this.state.runtime}</td>
              </tr>
              <tr>
                <th className='table_heading'>Popularity:</th>
                <td className='table_data'>{this.state.popularity}</td>
              </tr>
              <tr>
                <th className='table_heading'>Description:</th>
                <td className='table_data'>{this.state.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
        }
        <div className='button_container'>
          <button className='find_movieButton' onClick={this.searchChange}>MOVIESSS</button>
        { this.state.similarMovie === true && 
          <button className='find_movieButton' onClick={this.getSimilar}>Get Similar Movie</button>
        }
        </div>
    </div>
    )
  }
}

export default Moviejeeves;
