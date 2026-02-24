export interface Breed {
  id: string;
  name: string;
  origin: string;
  description: string;
  temperament: string;
  life_span: string;
  weight: {
    imperial: string;
    metric: string;
  };
  image?: {
    id: string;
    url: string;
  };
}

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: Breed[];
}

export interface Vote {
  id: number;
  image_id: string;
  value: 1 | -1;
  created_at: string;
}

export interface VoteResponse {
  message: string;
  id: number;
}
