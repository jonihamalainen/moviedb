export interface Credits {
  id: number;
  cast: Cast[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Moviedetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface UserSessionDetails {
  email: string | undefined;
  id: string | undefined;
}

export interface ElokuvaNostoTiedot {
  _id: ObjectId;
  nimi: string;
}

export interface NostoLista {
  id: number;
  nimi: string;
  elokuvat: JSON;
  julkaistu: boolean;
}

export interface TopLista {
  id: number;
  movie_id: string;
  genre: JSON;
  klikkaukset: number;
  nimi: string;
}

export interface ElokuvaLisays {
  alkuperainennimi: string;
  genre: Array<string>;
  imdbid: string;
  imdburl: string;
  kestomin: number;
  nimi: string;
  ohjaaja: Array<string>;
  tmdbid: number;
  tmdbkuva: string;
  tuotantomaa: Array<string>;
  valmistumisvuosi: number;
}