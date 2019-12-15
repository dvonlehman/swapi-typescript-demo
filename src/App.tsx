import React, { useState, useEffect } from 'react';
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

const App = () => {
  let myAppState: IAppState = {isInitializing: true}
  const [myState, setMyState] = useState(myAppState)

  const renderLoader = () => <h1>Loading...</h1>

  useEffect(() => {
    const getFiles = async () => {
      const films = await swapi.listAllFilms();
      setMyState({isInitializing: false, films: films})
    }
  
    getFiles()
  }, [])

  const handleSelectFilm = (film: IFilm) => {

    swapi.getFilm(film.id, ['characters']).then(fullFilmDetails => {
      setMyState({...myState, selectedFilmId: film.id, selectedFilm: fullFilmDetails})
    });
  };

  const handleCloseFilmModal = () => {
    setMyState({...myState, selectedFilmId: undefined, selectedFilm: undefined})
  };

  return (
    <>
      {myState.isInitializing ? (
        renderLoader()
      ) : (
        <div>
          <h3>Star Wars Films</h3>
          <FilmList
              films={myState.films}
              onFilmClick={handleSelectFilm}
            />
        </div>
      )} 
      <FilmDetailsModal
          isOpen={myState.selectedFilmId !== undefined}
          film={myState.selectedFilm}
          onRequestClose={(handleCloseFilmModal)}
        />  
    </>
  );
}

export default App;
