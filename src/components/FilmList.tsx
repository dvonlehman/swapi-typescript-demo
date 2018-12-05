import React, { SFC } from 'react';
import { IFilm } from '../types';
import StyledTable from './StyledTable';

export interface IFilmListProps {
  films: IFilm[] | undefined;
  onFilmClick: (film: IFilm) => void;
}

const FilmList: SFC<IFilmListProps> = props => {
  if (!props.films) return null;

  return (
    <StyledTable>
      <thead>
        <tr>
          <td>Title</td>
          <td>Release Date</td>
          <td>Producer</td>
          <td>Episode Number</td>
        </tr>
      </thead>
      <tbody>
        {props.films.map(film => (
          <tr key={film.id} onClick={() => props.onFilmClick(film)}>
            <td>{film.title}</td>
            <td>{film.releaseDate}</td>
            <td>{film.producer}</td>
            <td>{film.episodeId}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default FilmList;
