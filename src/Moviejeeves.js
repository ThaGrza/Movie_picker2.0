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
      movieTitle: '',
      releaseDate: '',
      genre: '',
      runtime: '',
      popularity: '',
      description: '',
      movieImageNotFound: 'https://media1.tenor.com/images/ef4c232dab28b7581497cee047f21969/tenor.gif?itemid=5521264'
    };
    this.searchChange = this.searchChange.bind(this);
  }

  randomizer(event){
    let key = process.env.REACT_APP_API_KEY;
    let baseUrl = 'https://api.themoviedb.org/3/movie/'
    let randomMovie = Math.floor(Math.random() * 300000) + 1;
    let language = '&language=en-US';
    let query = baseUrl + randomMovie + '?api_key=' + key + language;
    this.getMovie(query);
  }

  getMovie(query){
    Axios.get(query)
      .then(res => {
        this.setState({movieTitle: res.data.title})
        this.setState({movieImg: res.data.backdrop_path})
        this.setState({releaseDate: res.data.release_date})
        this.setState({genre: res.data.genre})
        this.setState({runtime: res.data.runtime})
        this.setState({popularity: res.data.popularity})
        this.setState({description: res.data.overview})
        console.log(res);
        if (res.data.backdrop_path === null){
          this.setState({movieDisplay: false});
          this.randomizer();
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
    this.randomizer(event);
  }

  render(){
    return(
      <div className='movie_container'>
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
        </div>
    </div>
    )
  }
}

export default Moviejeeves;
