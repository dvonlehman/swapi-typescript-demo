import React, { Component } from 'react';
import './App.css';
import SwApi from './swapi';
import { IFilm } from './types';
import FilmList from './components/FilmList';
import FilmDetailsModal from './components/FilmDetailsModal';

const swapi = new SwApi();

interface IAppState {
  isInitializing: boolean;
  films?: IFilm[];
  selectedFilmId?: number;
  selectedFilm?: IFilm;
}

class App extends Component<{}, IAppState> {
  state: Readonly<IAppState> = {
    isInitializing: true,
  };

  async componentDidMount() {
    const films = await swapi.listAllFilms();

    this.setState({
      isInitializing: false,
      films,
    });
  }

  handleSelectFilm = (film: IFilm) => {
    this.setState({ selectedFilmId: film.id });

    swapi.getFilm(film.id, ['characters']).then(fullFilmDetails => {
      this.setState({ selectedFilm: fullFilmDetails });
    });
  };

  handleCloseFilmModal = () => {
    this.setState({ selectedFilmId: undefined, selectedFilm: undefined });
  };

  renderLoader() {
    return <h1>Loading...</h1>;
  }

  render() {
    return (
      <div className="App">
        {this.state.isInitializing ? (
          this.renderLoader()
        ) : (
          <div>
            <h3>Star Wars Films</h3>
            <FilmList
              films={this.state.films}
              onFilmClick={this.handleSelectFilm}
            />
          </div>
        )}
        <FilmDetailsModal
          isOpen={this.state.selectedFilmId !== undefined}
          film={this.state.selectedFilm}
          onRequestClose={this.handleCloseFilmModal}
        />
      </div>
    );
  }
}

export default App;
