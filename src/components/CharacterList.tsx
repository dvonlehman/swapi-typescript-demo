import React, { SFC } from 'react';
import { IFilm, IPerson } from '../types';
import StyledTable from './StyledTable';

export interface ICharacterListProps {
  characters: IPerson[] | undefined;
}

const CharacterList: SFC<ICharacterListProps> = props => {
  if (!props.characters) return null;

  return (
    <StyledTable>
      <thead>
        <tr>
          <td>Name</td>
          <td>Birth Year</td>
          <td>Mass</td>
          <td>Gender</td>
        </tr>
      </thead>
      <tbody>
        {props.characters.map(character => (
          <tr key={character.id}>
            <td>{character.name}</td>
            <td>{character.birthYear}</td>
            <td>{character.mass}</td>
            <td>{character.gender}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default CharacterList;
