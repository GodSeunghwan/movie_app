import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {
  state = {}

  componentDidMount() {
    this._getMovies()
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return <Movie
        title={movie.title}
        poster={movie.medium_cover_image}
        genres={movie.genres}
        synopsis={movie.synopsis}
        key={movie.id}
      />
    })
    return movies
  }

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch("https://yts.mx/api/v2/list_movies.json?sort_by=download_count")
      .then(res => res.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err))
  }

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : "Loading"}
      </div>
    );
  }
}

export default App;
