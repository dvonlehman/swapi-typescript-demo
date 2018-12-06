import { IFilm, IPerson, IPlanet, IEntity } from './types';
import mapEntity, {
  IMapEntityOptions,
  extractIdFromEntityUrl,
} from './map-entity';

export class SwApi {
  apiUrl: string;

  constructor(url = 'https://swapi.co/api') {
    this.apiUrl = url;
  }

  private async makeApiCall(apiPath: string): Promise<any> {
    const resp = await fetch(`${this.apiUrl}${apiPath}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!resp.ok) {
      throw new Error(
        `Error from api call ${apiPath}: status=${
          resp.status
        } ${await resp.text()}`
      );
    }

    return resp.json();
  }

  private async fetchArray<T extends IEntity>(
    apiPath: string,
    options?: IMapEntityOptions
  ): Promise<T[]> {
    const data = await this.makeApiCall(apiPath);
    const results = data.results;
    if (!Array.isArray(results)) {
      throw new Error('The results is not a valid array');
    }

    return results.map<T>(result => mapEntity<T>(result, options));
  }

  private async fetchOne<T extends IEntity>(apiPath: string): Promise<T> {
    const data = await this.makeApiCall(apiPath);
    return mapEntity<T>(data);
  }

  public async listAllFilms(): Promise<IFilm[]> {
    return this.fetchArray<IFilm>('/films');
  }

  public async getPerson(
    id: number,
    expand?: ('films' | 'vehicles' | 'homeworld' | 'starships')[]
  ): Promise<IPerson> {
    const data = await this.makeApiCall(`/people/${id}/`);
    return mapEntity<IPerson>(data, {
      numberFields: ['mass'],
    });
  }

  public async getPlanet(
    id: number,
    expand?: ('residents' | 'films')[]
  ): Promise<IPlanet> {
    const data = await this.makeApiCall(`/planets/${id}/`);
    return mapEntity<IPlanet>(data, {
      numberFields: [
        'surface_water',
        'diameter',
        'rotation_period',
        'orbital_period',
        'population',
      ],
    });
  }

  public async getFilm(
    id: number,
    expand?: ('planets' | 'characters' | 'starships' | 'species')[]
  ): Promise<IFilm> {
    const data = await this.makeApiCall(`/films/${id}`);

    const film = mapEntity<IFilm>(data);
    const characterIds: number[] = data.characters.map(extractIdFromEntityUrl);
    const planetIds: number[] = data.planets.map(extractIdFromEntityUrl);
    // const speciesIds = data.species.map(this.extractIdFromEntityUrl);

    if (expand) {
      if (expand.includes('characters')) {
        const characters: IPerson[] = await Promise.all(
          characterIds.map(id => this.getPerson(id))
        );

        film.characters = characters;
      }

      if (expand.includes('planets')) {
        const planets: IPlanet[] = await Promise.all(
          planetIds.map(id => this.getPlanet(id))
        );

        film.planets = planets;
      }
    }

    return film;
  }
}

export default SwApi;
