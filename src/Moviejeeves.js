import React from 'react'
import './Moviejeeves.css';


class Moviejeeves extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      platform: '',
      genre: '',
    };
    this.genreChange = this.genreChange.bind(this);
    this.platformChange = this.platformChange.bind(this);
    this.searchChange = this.searchChange.bind(this);
  }

  genreChange(event){
    this.setState({genre: event.target.value})
  };

  platformChange(event){
    this.setState({platform: event.target.value})
  };

  searchChange(event){
    // Combine Platform and Genre into url query.

    // Ajax call to movie database

    // render 1 movie (second press render another, remove the original)
    console.log(this.state)
    console.log(" WHY IS STATE NOT WORKING ERMAHGSDFDFS"); 
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
      </div>

    )
  }
}

export default Moviejeeves;