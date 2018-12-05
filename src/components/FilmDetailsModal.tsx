import React, { SFC } from 'react';
import { IFilm } from '../types';
import Modal from 'react-modal';
import CharacterList from './CharacterList';

export interface IFilmDetailsModalProps {
  film: IFilm | undefined;
  isOpen: boolean;
  onRequestClose: () => void;
}

const FilmDetailsModal: SFC<IFilmDetailsModalProps> = props => {
  if (!props.film) return null;

  return (
    <Modal isOpen={props.isOpen} ariaHideApp={false}>
      {!props.film && <h2>Loading film...</h2>}
      {props.film && (
        <>
          <button onClick={props.onRequestClose}>Close</button>
          <dl>
            <dt>Title</dt>
            <dd>{props.film.title}</dd>
            <dt>Producer</dt>
            <dd>{props.film.producer}</dd>
            <dt>Release date</dt>
            <dd>{props.film.releaseDate}</dd>
          </dl>

          <h3>Characters</h3>
          <CharacterList characters={props.film.characters} />
        </>
      )}
    </Modal>
  );
};

export default FilmDetailsModal;
