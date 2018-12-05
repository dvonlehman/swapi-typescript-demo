export interface IEntity {
  id: number;
  edited: string;
  created: string;
  url: string;
  films?: IFilm[];
}

export interface IFilm extends IEntity {
  species: ISpecies[];
  releaseDate: string;
  title: string;
  producer: string;
  starships?: IStarship[];
  vehicles?: IVehicle[];
  episodeId: number;
  planets: IPlanet[];
  director: string;
  characters: IPerson[];
  openingCrawl: string;
}

export interface ICharacter extends IEntity {
  name: string;
  homeworld?: IPlanet;
  skinColors: string[];
  hairColors: string[];
}

export interface ISpecies extends ICharacter {
  designation: string;
  name: string;
  people?: IPerson[];
  language: string;
  averageLifespan: number;
  averageHeight: number;
  eyeColors: string[];
}

export interface IPerson extends ICharacter {
  starships?: IStarship[];
  vehicles?: IVehicle[];
  birthYear: string;
  gender?: string;
  eyeColor: string;
  species: ISpecies[];
  mass: number;
}

export interface IPlanet extends IEntity {
  orbitalPeriod: number;
  climate: string;
  rotationPeriod: number;
  terrain: string;
  residents?: IPerson[];
  population: number;
  surfaceWater: number;
}

export interface IStarship extends IVehicle {
  hyperdriveRating: string;
  MGLT: number;
  starshipClass: string;
}

export interface IVehicle extends IEntity {
  length: number;
  manufacturer: string;
  cargoCapacity: number;
  maxAtmosphericSpeed: number;
  costInCredits: number;
  pilots?: IPerson[];
  consumables: number;
  model: string;
  vehicleClass: string;
  passengers: number;
  crew: number;
}
