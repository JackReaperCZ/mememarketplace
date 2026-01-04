export interface User {
  username: string;
  loggedIn: boolean;
}

export interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
  rating: number;
  category: string;
  price: number;
}

export interface CartItem extends Meme {
  quantity: number;
}

export interface ApiMemeResponse {
  success: boolean;
  data: {
    memes: {
      id: string;
      name: string;
      url: string;
      width: number;
      height: number;
      box_count: number;
    }[];
  };
}
